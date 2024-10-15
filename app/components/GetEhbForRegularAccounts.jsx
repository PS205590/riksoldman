"use client"

import { useState, useEffect } from "react";
import Image from "next/image";

export default function GroupList() {
  const [ehb, setEhb] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEhb = async () => {
      try {
        const res = await fetch("https://api.wiseoldman.net/v2/efficiency/rates?metric=ehb&type=main");
        const data = await res.json();
        console.log(data);

        if (!res.ok) {
          throw new Error(data.error || "Error fetching ehb data.");
        }

        setEhb(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEhb();

  }, []);

  if (loading) return <p>Loading ehb...</p>;

  if (error) return <p style={{ color: "red" }}>{error}</p>;

  // Utility function to format boss names
  const formatBossName = (bossName) => {
    return bossName
      .replace(/_/g, " ")              // Replace underscores with spaces
      .toLowerCase()                   // Convert the whole string to lowercase
      .split(" ")                      // Split the string into an array of words
      .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize each word
      .join(" ");                      // Join the words back into a single string
  };


  return (
    <div>
      <div className="bg-black-700 p-4">
        {ehb.length > 0 ? (
          <ul>
            {ehb.map((ehbs) => (
              <li
                key={ehbs.id}
                className="flex items-center justify-between bg-gray-800 p-3 rounded-2xl shadow-md mb-2"
              >
                {/* Left Side: Boss Image and Name */}
                <div className="flex items-center">
                  <Image
                    height={25}
                    width={25}
                    alt={`${ehbs.boss} name`}
                    src={`/img/metrics/${ehbs.boss}.png`}
                    className="mr-2" // Add margin to the right for spacing
                  />
                  <p className="text-white">
                    <strong>{formatBossName(ehbs.boss)}</strong>
                  </p>
                </div>

                {/* Right Side: Kills per hour */}
                <p className="text-white">{ehbs.rate} kills per hour</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No bosses found.</p>
        )}
      </div>
    </div>
  );
}
