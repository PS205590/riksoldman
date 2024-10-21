"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function GroupList() {
  const [groups, setGroups] = useState([]); // All groups fetched from the API
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true); // Track if more groups are available to fetch

  const pageSize = 18; // Number of items per page for display

  // Fetch groups from the API with pagination
  const fetchGroups = async (offset) => {
    try {
      setLoading(true);
      const res = await fetch(
        `https://api.wiseoldman.net/v2/groups?limit=50&offset=${offset}`
      );
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Error fetching group data.");
      }

      // Append new groups to the existing ones
      setGroups((prevGroups) => [...prevGroups, ...data]);

      // If fewer than 50 groups are returned, stop fetching more
      if (data.length < 50) {
        setHasMore(false);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Initial load of the first set of groups
    fetchGroups("0"); // Using "0" as the starting offset in string form
  }, []);

  // Handle loading more groups when the user navigates to the next page
  const loadMoreGroups = () => {
    if (hasMore) {
      const nextOffset = groups.length.toString(); // Convert length to a string for offset
      fetchGroups(nextOffset);
    }
  };

  const totalPages = Math.ceil(groups.length / pageSize);

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
      // Load more groups if we're close to the end and there are more groups to fetch
      if (currentPage === totalPages - 1 && hasMore) {
        loadMoreGroups();
      }
    }
  };

  if (loading && groups.length === 0) return <p>Loading groups...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div>
      <div className="bg-black-800 p-4">
        {currentGroups.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
            {currentGroups.map((group) => (
              <div
                key={group.id}
                className="rounded-2xl bg-gray-800 p-3 flex items-start space-x-4"
              >
                {group.profileImage ? (
                  <Image
                    className="rounded-full"
                    src={group.profileImage}
                    alt={`${group.name} Image`}
                    width={100}
                    height={100}
                  />
                ) : (
                  <p className="font-bold text-red-600">No picture attached.</p>
                )}
                <div>
                  <p className="font-bold text-white">{group.name}</p>
                  <p className="text-white">
                    <strong>{group.memberCount} members</strong>
                  </p>
                  <p className="text-gray-400 mt-2">{group.description}</p>
                </div>
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
          disabled={currentPage === totalPages && !hasMore}
          onClick={handleNext}
          variant="outline"
        >
          Next
        </Button>
      </div>
    </div>
  );
}
