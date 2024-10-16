// components/Navbar.js
"use client"; // Client-side component

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // Import from next/navigation for App Router

const Navbar = () => {
  const [username, setUsername] = useState("");
  const [isOpen, setIsOpen] = useState(false); // State to control mobile menu
  const router = useRouter(); // Use router from next/navigation

  // Handle search submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (username) {
      router.push(`/player/${username}`);
      setIsOpen(false); // Close the navbar after search
    }
  };

  // Toggle the mobile menu
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Close the mobile menu when a link is clicked
  const closeMenu = () => {
    setIsOpen(false);
  };

  // Disable scrolling when the mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"; // Prevent scrolling
    } else {
      document.body.style.overflow = ""; // Restore scrolling
    }
  }, [isOpen]);

  return (
    <div>
      {/* Navigation Bar */}
      <nav className="flex justify-between items-center bg-gray-800 p-4 relative z-50">
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
            {/* Toggle between hamburger and X icon */}
            {isOpen ? '✕' : '☰'}
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
              placeholder="Search user..."
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="text-white px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
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

        {/* Mobile Menu with overlay (visible when hamburger is clicked) */}
        {isOpen && (
          <>
            {/* Full-screen overlay */}
            <div
              className="fixed inset-0 bg-black opacity-70 z-40"
              onClick={closeMenu} // Click outside the menu to close
            ></div>

            {/* Mobile Menu */}
            <div className="md:hidden fixed inset-0 top-16 bg-gray-800 text-white p-4 space-y-4 z-50">
              <Link href="/groups" className="block text-xl font-bold" onClick={closeMenu}>
                Groups
              </Link>
              <Link href="/ehb" className="block text-xl font-bold" onClick={closeMenu}>
                Ehb
              </Link>
              <Link href="/ehp" className="block text-xl font-bold" onClick={closeMenu}>
                Ehp
              </Link>

              <form onSubmit={handleSubmit} className="flex flex-col space-y-2">
                <input
                  type="text"
                  placeholder="Search user..."
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="px-4 py-2 rounded-md border text-white border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
          </>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
