module.exports = async function (req, res) {
  const isLocalhost = req.headers.host.includes('localhost')

  if (isLocalhost) {
    // Serve mock file in local dev
    const path = require('path')
    const fs = require('fs')
    const mockPath = path.join(__dirname, '../src/mock/github-mock.json')

    try {
      const mockData = JSON.parse(fs.readFileSync(mockPath, 'utf-8'))
      return res.status(200).json(mockData)
    } catch (err) {
      return res.status(500).json({ error: 'Failed to load mock data' })
    }
  }

  // --- Live GitHub API logic below ---
  const token = process.env.GITHUB_TOKEN
  if (!token) return res.status(500).json({ error: "GITHUB_TOKEN not set." })

  try {
    const { Octokit } = await import("@octokit/rest")
    const octokit = new Octokit({ auth: token })
    const viewer = await octokit.rest.users.getAuthenticated()
    const user = viewer.data

    const { GraphQLClient, gql } = await import("graphql-request")
    const graphQLClient = new GraphQLClient("https://api.github.com/graphql", {
      headers: { Authorization: `Bearer ${token}` },
    })

    const query = gql`
      query {
        viewer {
          contributionsCollection {
            contributionCalendar {
              totalContributions
              weeks {
                contributionDays {
                  date
                  contributionCount
                }
              }
            }
          }
        }
      }
    `

    const data = await graphQLClient.request(query)
    const calendar = data.viewer.contributionsCollection.contributionCalendar

    res.status(200).json({
      username: user.login,
      name: user.name,
      avatar_url: user.avatar_url,
      public_repos: user.public_repos,
      followers: user.followers,
      following: user.following,
      totalContributions: calendar.totalContributions,
      heatmapData: calendar.weeks.flatMap(week => week.contributionDays),
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: error.message })
  }
}
