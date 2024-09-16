const { WOMClient } = require('@wise-old-man/utils');

export default async function handler(req, res) {
  const { username } = req.query;

  if (!username) {
    return res.status(400).json({ error: 'Username is required' });
  }

  const client = new WOMClient({
    apiKey: process.env.NEXT_PUBLIC_WOM_API_KEY,
    userAgent: process.env.NEXT_PUBLIC_WOM_USER_AGENT,
  });

  try {
    // Fetch player data
    const player = await client.players.getPlayer(username);

    // Send back the player data as a response
    return res.status(200).json(player);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to fetch player data' });
  }
}
