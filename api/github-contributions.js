const { GraphQLClient, gql } = require("graphql-request");

module.exports = async function (req, res) {
  const { username } = req.query;
  const token = process.env.GITHUB_TOKEN;

  if (!token) {
    return res.status(500).json({ error: "GITHUB_TOKEN not set." });
  }

  if (!username) {
    return res.status(400).json({ error: "username query param required." });
  }

  console.log(`👉 Requested GitHub contributions for username: ${username}`);

  try {
    const client = new GraphQLClient("https://api.github.com/graphql", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // Get token owner
    const viewer = await client.request(gql`
      query {
        viewer {
          login
        }
      }
    `);
    console.log(`👉 Token belongs to GitHub user: ${viewer.viewer.login}`);

    // Get contributions
    const data = await client.request(gql`
      query ($username: String!) {
        user(login: $username) {
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
    `, { username });

    const contributions = data.user?.contributionCalendar?.totalContributions ?? 0;
    console.log(`👉 Total contributions returned: ${contributions}`);

    if (!data.user || contributions === 0) {
      console.warn("⚠️ User not found or zero contributions returned.");
    }

    return res.status(200).json(data.user ?? { error: "No data found" });
  } catch (error) {
    console.error("❌ GitHub API error:", error);
    return res.status(500).json({ error: "GitHub API error", details: error.message });
  }
}