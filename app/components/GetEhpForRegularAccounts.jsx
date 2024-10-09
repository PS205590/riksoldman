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

  useEffect(() => {
    const fetchEhp = async () => {
      try {
        const res = await fetch(
          "https://api.wiseoldman.net/v2/efficiency/rates?metric=ehp&type=main"
        );
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || "Error fetching ehp data.");
        }

        setEhp(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEhp();
  }, []);

  if (loading) return <p>Loading ehp...</p>;

  if (error) return <p style={{ color: "red" }}>{error}</p>;

  const capitalizedName = (name) => {
    if (!name) return "";
    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
  };

  return (
    <div className="p-4">
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
            <div className="bg-gray-900 rounded-lg p-4">
              <table className="min-w-full table-auto text-left bg-gray-800 text-white rounded-lg" style={{ tableLayout: 'fixed' }}>
                <thead>
                  <tr className="bg-gray-700">
                    <th className="px-6 py-3 text-sm font-medium text-gray-300" style={{ width: '20%' }}>
                      Starting exp.
                    </th>
                    <th className="px-6 py-3 text-sm font-medium text-gray-300" style={{ width: '20%' }}>
                      Rate
                    </th>
                    <th className="px-6 py-3 text-sm font-medium text-gray-300" style={{ width: '20%' }}>
                      Description
                    </th>
                  </tr>
                </thead>
                <tbody className="overflow-auto" style={{ maxHeight: '400px' }}> {/* Apply fixed height for tbody */}
                  {ehps.methods && ehps.methods.length > 0 ? (
                    ehps.methods.map((method, index) => (
                      <tr
                        key={index}
                        className="bg-gray-800 hover:bg-gray-700 border-b border-gray-600"
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
                      <td colSpan="5" className="px-4 py-2 text-center">
                        No methods available
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        ))
      ) : (
        <p>No data found.</p>
      )}
    </div>
  );
}
