module.exports = async function (req, res) {
  const { username } = req.query;
  const token = process.env.GITHUB_TOKEN;

  if (!token) return res.status(500).json({ error: "GITHUB_TOKEN not set." });
  if (!username) return res.status(400).json({ error: "username param missing." });

  try {
    // ✅ 1. Profile info with octokit
    const { Octokit } = await import("@octokit/rest");
    const octokit = new Octokit({ auth: token });

    const user = (await octokit.rest.users.getByUsername({ username })).data;

    // ✅ 2. Full contribution heatmap with graphql-request
    const { GraphQLClient, gql } = await import("graphql-request");
    const graphQLClient = new GraphQLClient("https://api.github.com/graphql", {
      headers: { Authorization: `Bearer ${token}` },
    });

    const query = gql`
      query($login: String!) {
        user(login: $login) {
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
    `;

    const data = await graphQLClient.request(query, { login: username });

    res.status(200).json({
      username: user.login,
      name: user.name,
      avatar_url: user.avatar_url,
      public_repos: user.public_repos,
      followers: user.followers,
      following: user.following,
      totalContributions: data.user.contributionCalendar.totalContributions,
      heatmapData: data.user.contributionCalendar.weeks.flatMap(week => week.contributionDays),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};