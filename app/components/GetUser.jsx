"use client";

import { useState } from 'react';

export default function Home() {
  const [username, setUsername] = useState('');
  const [playerData, setPlayerData] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const res = await fetch(`https://api.wiseoldman.net/v2/players/${username}`);
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'User not active and/or not found.');
      }

      setPlayerData(data);
    } catch (err) {
      setError(err.message);
      setPlayerData(null);
    }
  };

  return (
    <div>
      <h1>WiseOldMan Player Lookup</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <button type="submit">Search</button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {playerData && (
        <div>
          <h2>Player Information:</h2>
          <p>Username: {playerData.displayName}</p>
          <p>Account type: {playerData.type}</p>
          <p>Combat level: {playerData.combatLevel}</p>
          <p>Total experience: {playerData.exp}</p>
          <p>Efficient hours played: {playerData.ehp}</p>
          <p>Efficient hours bossed: {playerData.ehb}</p>
          <p>Status:: {playerData.status}</p>
        </div>
      )}
    </div>
  );
}
