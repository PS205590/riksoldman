'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

// Skill and Boss Data Interfaces
interface SkillData {
  metric: string;
  experience: number;
  rank: number;
  level: number;
  ehp: number;
}

interface BossData {
  kills: number;
  rank: number;
}

interface LatestSnapshot {
  id: number;
  playerId: number;
  createdAt: string;
  importedAt: null | string;
  data: {
    skills: Record<string, SkillData>;
    bosses: Record<string, BossData>;
  };
}

interface PlayerData {
  id: number;
  username: string;
  displayName: string;
  type: string;
  build: string;
  status: string;
  country: null | string;
  patron: boolean;
  exp: number;
  ehp: number;
  ehb: number;
  ttm: number;
  combatLevel: number;
  tt200m: number;
  registeredAt: string;
  updatedAt: string;
  lastChangedAt: string;
  lastImportedAt: null | string;
  latestSnapshot: LatestSnapshot;
}

// Helper function to format boss names
const formatBossName = (bossName: string) => {
  return bossName
    .replace(/_/g, ' ') // Replace underscores with spaces
    .toLowerCase() // Convert to lowercase
    .split(' ') // Split by spaces
    .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize each word
    .join(' '); // Rejoin words
};

const PlayerPage = ({ params }: { params: { username: string } }) => {
  const { username } = params;
  const [playerData, setPlayerData] = useState<PlayerData | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Fetch player data
  useEffect(() => {
    const fetchPlayerData = async () => {
      try {
        const res = await fetch(`https://api.wiseoldman.net/v2/players/${username}`);
        if (!res.ok) {
          setError('User not active and/or not found.');
          return;
        }
        const data = await res.json();
        setPlayerData(data);
      } catch {
        setError('Failed to fetch data.');
      }
    };

    fetchPlayerData();
    const intervalId = setInterval(fetchPlayerData, 30000); // Refresh every 30 seconds

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, [username]);

  if (error) {
    return <p className="text-red-500 mt-4">{error}</p>;
  }

  if (!playerData) {
    return <p className="text-white mt-4">Loading...</p>;
  }

  // Formatting
  const formattedEhb = playerData.ehb.toFixed(2);
  const formattedEhp = playerData.ehp.toFixed(2);
  const formattedExperience = playerData.exp.toLocaleString('en');
  const { skills, bosses } = playerData.latestSnapshot.data;

  // Helper to render skill rows
  const renderSkillRows = () => {
    return Object.entries(skills).map(([skillName, skillData]) => {
      const skill = skillData as SkillData;
      return (
        <tr key={skillName} className="bg-gray-800 border-b border-gray-700">
          <td className="px-4 py-2 flex items-center">
            <Image
              height={16}
              width={16}
              alt={skillName}
              src={`/img/metrics_small/${skillName}.png`}
            />
            <span className="ml-2 font-bold capitalize">{skillName}</span>
          </td>
          <td className="px-4 py-2">{skill.level}</td>
          <td className="px-4 py-2">{(skill.experience / 1000000).toFixed(2)}m</td>
          <td className="px-4 py-2">{skill.rank.toLocaleString('en')}</td>
          <td className="px-4 py-2">{(skill.ehp || 0).toFixed(2)}</td>
        </tr>
      );
    });
  };

  // Helper to render boss rows
  const renderBossRows = () => {
    return Object.entries(bosses).map(([bossName, bossData]) => {
      const boss = bossData as BossData;
      const formattedBossName = formatBossName(bossName);
      return (
        <tr key={bossName} className="bg-gray-800 border-b border-gray-700">
          <td className="px-4 py-2 flex items-center">
            <Image
              height={16}
              width={16}
              alt={formattedBossName}
              src={`/img/metrics/${bossName}.png`}
            />
            <span className="ml-2 font-bold">{formattedBossName}</span>
          </td>
          <td className="px-4 py-2">{boss.kills}</td>
          <td className="px-4 py-2">{boss.rank.toLocaleString('en')}</td>
        </tr>
      );
    });
  };

  return (
    <>
      {/* Player Data */}
      <div className="bg-gray-800 p-4 mt-4 rounded-lg shadow-md">
        <h2 className="text-white font-bold text-xl mb-2">Quick summary</h2>
        <div className="flex flex-wrap gap-4 justify-left font-bold text-white">
          <div className="flex gap-2 rounded-2xl bg-gray-400 p-3 shadow-md">
            <Image
              height={16}
              width={16}
              alt="Player type/status"
              src={`/img/player_types/${playerData.type}.png`}
            />
            <p>{playerData.displayName}</p>
          </div>
          <div>
            <p className="rounded-2xl bg-gray-400 p-3 shadow-md">
              Combat level: {playerData.combatLevel}
            </p>
          </div>
          <div>
            <p className="rounded-2xl bg-gray-400 p-3 shadow-md">
              Total experience: {formattedExperience}
            </p>
          </div>
          <div>
            <p className="rounded-2xl bg-gray-400 p-3 shadow-md">
              Efficient hours played: {formattedEhp}
            </p>
          </div>
          <div>
            <p className="rounded-2xl bg-gray-400 p-3 shadow-md">
              Efficient hours bossed: {formattedEhb}
            </p>
          </div>
        </div>
      </div>

      {/* Skills Section */}
      <div className="bg-gray-800 p-4 mt-4 rounded-lg shadow-md">
        <h2 className="text-white font-bold text-xl mb-2">Skills</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm text-gray-400">
            <thead className="text-xs bg-gray-700">
              <tr>
                <th className="px-4 py-2">Skill</th>
                <th className="px-4 py-2">Level</th>
                <th className="px-4 py-2">Experience</th>
                <th className="px-4 py-2">Rank</th>
                <th className="px-4 py-2">EHP</th>
              </tr>
            </thead>
            <tbody>{renderSkillRows()}</tbody>
          </table>
        </div>
      </div>

      {/* Bosses Section */}
      <div className="bg-gray-800 p-4 mt-4 rounded-lg shadow-md">
        <h2 className="text-white font-bold text-xl mb-2">Boss Killcounts</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm text-gray-400">
            <thead className="text-xs bg-gray-700">
              <tr>
                <th className="px-4 py-2">Boss</th>
                <th className="px-4 py-2">Killcount</th>
                <th className="px-4 py-2">Rank</th>
              </tr>
            </thead>
            <tbody>{renderBossRows()}</tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default PlayerPage;
