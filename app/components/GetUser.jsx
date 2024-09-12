"use client";

import { useState } from "react";

export default function Home() {
  const [username, setUsername] = useState("");
  const [playerData, setPlayerData] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const res = await fetch(
        `https://api.wiseoldman.net/v2/players/${username}`
      );
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "User not active and/or not found.");
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

      {error && <p style={{ color: "red" }}>{error}</p>}

      {playerData && (
        <div className="bg-black-700 p-4">
          <div className="flex flex-wrap gap-4 justify-center font-bold">
            <div>
              <p className="rounded-2xl bg-gray-400 p-3 shadow-md">
                Username: {playerData.displayName}
              </p>
            </div>
            <div>
              <p className="rounded-2xl bg-gray-400 p-3 shadow-md">
                Account type: {playerData.type}
              </p>
            </div>
            <div>
              <p className="rounded-2xl bg-gray-400 p-3 shadow-md">
                Combat level: {playerData.combatLevel}
              </p>
            </div>
            <div>
              <p className="rounded-2xl bg-gray-400 p-3 shadow-md">
                Total experience: {playerData.exp}
              </p>
            </div>
            <div>
              <p className="rounded-2xl bg-gray-400 p-3 shadow-md">
                Efficient hours played: {playerData.ehp}
              </p>
            </div>
            <div>
              <p className="rounded-2xl bg-gray-400 p-3 shadow-md">
                Efficient hours bossed: {playerData.ehb}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
