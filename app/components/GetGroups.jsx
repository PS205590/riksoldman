"use client"

import { useState, useEffect } from "react";

export default function GroupList() {
  const [groups, setGroups] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const res = await fetch("https://api.wiseoldman.net/v2/groups");
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || "Error fetching group data.");
        }

        setGroups(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchGroups();
  }, []);

  if (loading) return <p>Loading groups...</p>;

  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div>
      <h2>Groups List</h2>
      <div className="bg-black-800 p-4">
        {groups.length > 0 ? (
          <ul>
            {groups.map((group) => (
              <li key={group.id} className="rounded-2xl bg-gray-800 p-3 shadow-md mb-2">
                <p>{group.name}</p>
                <p>{group.description}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No groups found.</p>
        )}
      </div>
    </div>
  );
}
