import Image from "next/image";

const PlayerPage = async ({ params }: { params: { username: string } }) => {
  const { username } = params;

  // Fetch player data from the external API
  const res = await fetch(`https://api.wiseoldman.net/v2/players/${username}`);
  if (!res.ok) {
    return (
      <div>
        <p className="text-red-500 mt-4">User not active and/or not found.</p>
      </div>
    );
  }

  interface SkillData {
    metric: string;         // Type of the skill, e.g., "attack", "defense"
    experience: number;     // Total experience in this skill
    rank: number;           // Rank of the player in this skill
    level: number;   
    ehp: number;       // Current level in this skill
  }
  
  interface LatestSnapshot {
    id: number;
    playerId: number;
    createdAt: string;
    importedAt: null | string;
    data: {
      skills: Record<string, SkillData>; // Using Record to map skill names to SkillData
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
  
  const playerData: PlayerData = await res.json(); // Ensure playerData is typed correctly

  const formattedEhb = playerData.ehb.toFixed(2);
  const formattedEhp = playerData.ehp.toFixed(2);
  const formattedExperience = playerData.exp.toLocaleString("en");

  // Extract skills from playerData.latestSnapshot.data.skills
  const skills = playerData.latestSnapshot.data.skills;

  return (
    <div>
      {/* Player Data */}
      <div className="bg-gray-800 p-4 mt-4 rounded-lg shadow-md">
      <h2 className="text-white font-bold text-xl mb-2">Quick summary</h2>
        <div className="flex flex-wrap gap-4 justify-left font-bold text-white">
          <div className="flex gap-2 rounded-2xl bg-gray-400 p-3 shadow-md">
            <Image
              height={16}
              width={16}
              alt={"This displays the player type/status."}
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
            <tbody>
              {Object.entries(skills).map(([skillName, skillData]) => {
                const skill = skillData as SkillData; // Assert skillData type

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
                    <td className="px-4 py-2">{skill.rank.toLocaleString("en")}</td>
                    <td className="px-4 py-2">{(skill.ehp || 0).toFixed(2)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PlayerPage;
