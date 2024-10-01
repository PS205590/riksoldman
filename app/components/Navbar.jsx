// components/Navbar.js
"use client"; // Client-side component

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation"; // Import from next/navigation for App Router

const Navbar = () => {
  const [username, setUsername] = useState("");
  const [isOpen, setIsOpen] = useState(false); // State to control mobile menu
  const router = useRouter(); // Use router from next/navigation

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username) {
      router.push(`/players/${username}`);
    }
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen); // Toggle the mobile menu
  };

  return (
    <div>
      {/* Navigation Bar */}
      <nav className="flex justify-between items-center bg-gray-800 p-4">
        {/* Site Name */}
        <div className="text-white text-xl font-bold">
          <Link href="/">Riksironman</Link>
        </div>

        {/* Hamburger Menu (visible on mobile) */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-white text-3xl focus:outline-none"
          >
            ☰
          </button>
        </div>

        {/* Links (visible on larger screens) */}
        <div className="hidden md:flex space-x-4 items-center">
          <Link href="/groups" className="text-white text-xl font-bold">
            Groups
          </Link>
          <Link href="/ehb" className="text-white text-xl font-bold">
            Ehb
          </Link>
          <Link href="/ehp" className="text-white text-xl font-bold">
            Ehp
          </Link>

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
        </div>

        {/* Mobile Menu (visible when hamburger is clicked) */}
        {isOpen && (
          <div className="md:hidden absolute top-16 left-0 right-0 bg-gray-800 text-white p-4 space-y-4">
            <Link href="/groups" className="block text-xl font-bold">
              Groups
            </Link>
            <Link href="/ehb" className="block text-xl font-bold">
              Ehb
            </Link>
            <Link href="/ehp" className="block text-xl font-bold">
              Ehp
            </Link>

            <form onSubmit={handleSubmit} className="flex flex-col space-y-2">
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
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
