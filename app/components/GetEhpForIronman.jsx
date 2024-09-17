"use client"

import { useState, useEffect } from "react";

export default function GroupList() {
  const [ehp, setEhp] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEhp = async () => {
      try {
        const res = await fetch("https://api.wiseoldman.net/v2/efficiency/rates?metric=ehp&type=ironman");
        const data = await res.json();
        console.log(data);

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
    if (!name) return "";  // Handle edge cases where name might be undefined or null
    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
  };

  return (
    <div>
      <h2>Ehp rates</h2>
      <div className="bg-black-700 p-4">
        {ehp.length > 0 ? (
          <ul>
            {ehp.map((ehps) => (
              <li key={ehps.skill} className="rounded bg-red-500 m-4 p-3">
                <p><strong>{capitalizedName(ehps.skill)}</strong></p> {/* Pass skill as string */}
                {ehps.methods && ehps.methods.length > 0 ? (
                  <ul>
                    {ehps.methods.map((method, index) => (
                      <li key={index}>
                        <p><strong>{method.rate}</strong> xp per hour</p>
                        <p><strong>Description:</strong> {method.description}</p>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No methods available.</p>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p>No data found.</p>
        )}
      </div>
    </div>
  );
}
