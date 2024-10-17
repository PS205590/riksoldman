"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

// Function to format the XP rate (e.g., 1560000 => 1560k)
const formatRate = (rate) => {
  if (rate >= 1000) {
    return `${(rate / 1000)}k`; // Divide by 1000 and round to 1 decimal place
  }
  return rate; // Return the rate as it is if less than 1000
};

export default function GroupList() {
  const [ehp, setEhp] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [accountType, setAccountType] = useState("main"); // State to store selected account type

  // Fetch data from the API based on the selected account type
  useEffect(() => {
    const fetchEhp = async () => {
      setLoading(true); // Start loading
      setError(null); // Reset error state

      try {
        const res = await fetch(
          `https://api.wiseoldman.net/v2/efficiency/rates?metric=ehp&type=${accountType}`
        );
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || "Error fetching ehp data.");
        }

        setEhp(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchEhp();
  }, [accountType]); // Re-fetch data when accountType changes

  if (loading) return <p>Loading ehp...</p>;

  if (error) return <p style={{ color: "red" }}>{error}</p>;

  const capitalizedName = (name) => {
    if (!name) return "";
    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
  };

  return (
    <div className="p-4">
      {/* Dropdown to select account type */}
      <div className="mb-4">
        <label className="text-white mr-4" htmlFor="accountType">Select account type:</label>
        <select
          id="accountType"
          value={accountType}
          onChange={(e) => setAccountType(e.target.value)} // Update account type on change
          className="p-2 bg-gray-700 text-white rounded"
        >
          <option value="main">Main</option>
          <option value="ironman">Ironman</option>
          <option value="ultimate">Ultimate</option>
          <option value="lvl3">Level 3</option>
          <option value="f2p">Free 2 Play</option>
          <option value="f2p_lvl3">Free 2 Play & Level 3</option>
          <option value="f2p_ironman">Free 2 Play Ironman</option>
          <option value="f2p_lvl3_ironman">Free 2 Play & Level 3 Ironman</option>
          {/* Add more options here if needed */}
        </select>
      </div>

      {ehp.length > 0 ? (
        ehp.map((ehps) => (
          <div key={ehps.skill} className="mb-8">
            {/* Skill name and icon outside the table */}
            <div className="flex items-center mb-4">
              <Image
                height={25}
                width={25}
                alt={ehps.skill}
                src={`/img/metrics/${ehps.skill}.png`}
                className="mr-2"
              />
              <h2 className="text-xl text-white">{capitalizedName(ehps.skill)}</h2>
            </div>

            {/* Table for each skill */}
            <table
              className="min-w-full table-auto text-left bg-gray-800 text-white rounded-lg border border-gray-600 overflow-hidden"
              style={{ tableLayout: "fixed" }}
            >
              <thead>
                <tr className="bg-gray-700">
                  <th
                    className="px-6 py-3 text-sm font-medium text-gray-300"
                    style={{ width: "20%" }}
                  >
                    Starting exp.
                  </th>
                  <th
                    className="px-6 py-3 text-sm font-medium text-gray-300"
                    style={{ width: "20%" }}
                  >
                    Rate
                  </th>
                  <th
                    className="px-6 py-3 text-sm font-medium text-gray-300"
                    style={{ width: "20%" }}
                  >
                    Description
                  </th>
                </tr>
              </thead>
              <tbody className="overflow-auto" style={{ maxHeight: "400px" }}>
                {/* Apply fixed height for tbody */}
                {ehps.methods && ehps.methods.length > 0 ? (
                  ehps.methods.map((method, index) => (
                    <tr
                      key={index}
                      className="bg-gray-800 border-b border-gray-600"
                    >
                      <td className="px-6 py-3">
                        {method.startExp || "0"} exp
                      </td>
                      <td className="px-6 py-3">
                        {formatRate(method.rate)} xp per hour
                      </td>
                      <td className="px-6 py-3">{method.description}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="px-4 py-2 text-center">
                      No methods available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        ))
      ) : (
        <p>No data found.</p>
      )}
    </div>
  );
}
