import { graphql } from "@octokit/graphql";

export default async function handler(req, res) {
  const { username } = req.query;
  const token = process.env.GITHUB_TOKEN;

  if (!token) {
    console.error("GITHUB_TOKEN not found in environment variables.");
    return res.status(500).json({ error: "GITHUB_TOKEN not set." });
  }

  if (!username) {
    return res.status(400).json({ error: "username query param required." });
  }

  console.log(`👉 Requested GitHub contributions for username: ${username}`);

  try {
    const graphqlWithAuth = graphql.defaults({
      headers: {
        authorization: `token ${token}`,
      },
    });

    // 👇 First get the viewer login to know which account the token belongs to
    const viewerData = await graphqlWithAuth(`
      query {
        viewer {
          login
        }
      }
    `);
    console.log(`👉 Token belongs to GitHub user: ${viewerData.viewer.login}`);

    const result = await graphqlWithAuth(`
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
      }
    `, { username });

    const contributions = result.user?.contributionCalendar?.totalContributions ?? 0;
    console.log(`👉 Total contributions returned: ${contributions}`);

    if (!result.user || contributions === 0) {
      console.warn("⚠️ User not found or zero contributions returned.");
    }

    return res.status(200).json(result.user ?? { error: "No data found" });
  } catch (error) {
    console.error("❌ GitHub API error:", error);
    return res.status(500).json({ error: "GitHub API error", details: error.message });
  }
}