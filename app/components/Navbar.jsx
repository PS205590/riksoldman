// components/Navbar.js
"use client"; // Client-side component

import Link from "next/link";
import { useState } from "react";

const Navbar = () => {
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
      {/* Navigation Bar */}
      <nav className="flex justify-between items-center bg-gray-800 p-4">
        <div className="text-white text-xl font-bold">
            <Link href="/">Riksironman</Link>
        </div>
        <div className="text-white text-xl font-bold">
            <Link href="/groups">Groups</Link>
        </div>
        <div className="text-white text-xl font-bold">
            <Link href="/ehb">Ehb</Link>
        </div>
        <div className="text-white text-xl font-bold">
            <Link href="/ehp">Ehp</Link>
        </div>
        
        <form onSubmit={handleSubmit} className="flex space-x-2">
          <input
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="px-4 py-2 rounded-md border border-gray-300 text-black focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
          <button
            type="submit"
            className="bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600 transition"
          >
            Search
          </button>
        </form>
      </nav>

      {/* Error message */}
      {error && <p className="text-red-500 mt-4">{error}</p>}

      {/* Player Data */}
      {playerData && (
        <div className="bg-gray-800 p-4 mt-4 rounded-lg shadow-md">
          <div className="flex flex-wrap gap-4 justify-left font-bold text-white">
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
};

export default Navbar;
