// api/github-contributions.js
const { Octokit } = require("@octokit/rest");

module.exports = async function (req, res) {
  const { username } = req.query;
  const token = process.env.GITHUB_TOKEN;

  if (!token) {
    return res.status(500).json({ error: "GITHUB_TOKEN not set." });
  }

  if (!username) {
    return res.status(400).json({ error: "username param missing." });
  }

  console.log(`👉 Requested GitHub contributions for username: ${username}`);

  try {
    const octokit = new Octokit({ auth: token });

    // ✅ Get authenticated user (to confirm token account)
    const viewer = await octokit.rest.users.getAuthenticated();
    console.log(`👉 Token belongs to GitHub user: ${viewer.data.login}`);

    // ✅ Get public user data
    const { data: user } = await octokit.rest.users.getByUsername({ username });

    // ✅ Get public events (last 30 days)
    const { data: events } = await octokit.rest.activity.listPublicEventsForUser({
      username,
      per_page: 100,
    });

    // ✅ Calculate contribution-like activity (push events = commits)
    const contributions = events.filter(e => e.type === "PushEvent").reduce((sum, e) => {
      return sum + e.payload.commits.length;
    }, 0);

    console.log(`👉 Total contributions (PushEvents) last 100 events: ${contributions}`);

    res.status(200).json({
      username: user.login,
      name: user.name,
      avatar_url: user.avatar_url,
      public_repos: user.public_repos,
      followers: user.followers,
      following: user.following,
      contributionsEstimate: contributions, // last 100 events estimate
    });
  } catch (error) {
    console.error("❌ GitHub API error:", error);
    res.status(500).json({ error: error.message });
  }
};
