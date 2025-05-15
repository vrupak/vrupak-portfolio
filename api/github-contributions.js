export default async function handler(req, res) {
  const username = req.query.username || 'vrupak'  // fallback default

  const query = `
  {
    user(login: "${username}") {
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
    }`;

  try {
    const response = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ query })
    });

    const data = await response.json();
    res.status(200).json(data.data.user.contributionsCollection);
  } catch (error) {
    res.status(500).json({ error: 'GitHub API request failed' });
  }
}
