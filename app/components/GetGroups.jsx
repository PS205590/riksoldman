"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function GroupList() {
  const [groups, setGroups] = useState([]); // All groups fetched from the API
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 18; // Number of items per page

  const totalPages = Math.ceil(groups.length / pageSize);

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        setLoading(true);
        const res = await fetch(`https://api.wiseoldman.net/v2/groups?limit=50`);
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || "Error fetching group data.");
        }

        console.log(data); // Debug fetched data
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

  const currentGroups = groups.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div>
      <div className="bg-black-800 p-4">
        {currentGroups.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ">
            {currentGroups.map((group) => (
              <div
                key={group.id}
                className="rounded-2xl bg-gray-800 p-3 shadow-md"
              >
                {group.bannerImage ? (
                  <Image
                    className="mb-4"
                    src={group.bannerImage}
                    alt={`${group.name} Image`}
                    width={100}
                    height={100}
                  />
                ) : (
                  <p className="font-bold text-red-600">No picture attached.</p>
                )}
                <p className="font-bold text-white">{group.name}</p>
                <p className="text-gray-400">{group.description}</p>
              </div>
            ))}
          </div>
        ) : (
          <p>No groups found.</p>
        )}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center mt-4 gap-2">
        <Button
          disabled={currentPage === 1}
          onClick={handlePrevious}
          variant="outline"
        >
          Previous
        </Button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <Button
          disabled={currentPage === totalPages}
          onClick={handleNext}
          variant="outline"
        >
          Next
        </Button>
      </div>
    </div>
  );
}
