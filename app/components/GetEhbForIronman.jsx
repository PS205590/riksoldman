"use client"

import { useState, useEffect } from "react";

export default function GroupList() {
  const [ehb, setEhb] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEhb = async () => {
      try {
        const res = await fetch("https://api.wiseoldman.net/v2/efficiency/rates?metric=ehb&type=ironman");
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
      <h2>Efficient Hours Bossed for Ironman</h2>
      <div className="bg-black-700 p-4">
        {ehb.length > 0 ? (
          <ul>
            {ehb.map((ehbs) => (
              <li key={ehbs.id} className="rounded-2xl bg-gray-400 p-3 shadow-md mb-2">
                <img src="public/images/404_troll.png" />
                <p>{formatBossName(ehbs.boss)}</p>
                <p>{ehbs.rate} kills per hour</p>
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
