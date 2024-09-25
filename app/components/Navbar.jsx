// components/Navbar.js
"use client"; // Client-side component

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation"; // Import from next/navigation for App Router

const Navbar = () => {
  const [username, setUsername] = useState("");
  const router = useRouter(); // Use router from next/navigation

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username) {
      router.push(`/players/${username}`);
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
    </div>
  );
};

export default Navbar;
