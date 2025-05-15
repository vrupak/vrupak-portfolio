module.exports = async function (req, res) {
  const token = process.env.GITHUB_TOKEN;

  if (!token) return res.status(500).json({ error: "GITHUB_TOKEN not set." });

  try {
    // 1. Get profile info with octokit
    const { Octokit } = await import("@octokit/rest");
    const octokit = new Octokit({ auth: token });
    const viewer = await octokit.rest.users.getAuthenticated();
    const user = viewer.data;

    // 2. Get contribution heatmap with graphql-request
    const { GraphQLClient, gql } = await import("graphql-request");
    const graphQLClient = new GraphQLClient("https://api.github.com/graphql", {
      headers: { Authorization: `Bearer ${token}` },
    });

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
    `;

    const data = await graphQLClient.request(query);
    const calendar = data.viewer.contributionsCollection.contributionCalendar;

    res.status(200).json({
      username: user.login,
      name: user.name,
      avatar_url: user.avatar_url,
      public_repos: user.public_repos,
      followers: user.followers,
      following: user.following,
      totalContributions: calendar.totalContributions,
      heatmapData: calendar.weeks.flatMap(week => week.contributionDays),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};