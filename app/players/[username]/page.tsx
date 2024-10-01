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

  const playerData = await res.json();

  const formattedEhb = playerData.ehb.toFixed(2);
  const formattedEhp = playerData.ehp.toFixed(2);
  const formattedExperience = playerData.exp.toLocaleString("en");

  return (
    <div>
      {/* Player Data */}
      <div className="bg-gray-800 p-4 mt-4 rounded-lg shadow-md">
        <div className="flex flex-wrap gap-4 justify-left font-bold text-white">
          <div className="flex gap-2 rounded-2xl bg-gray-400 p-3 shadow-md">
            <Image
              height={16}
              width={16}
              alt={"This displays the player type/status."}
              src={`/img/player_types/${playerData.type}.png`}
            />
            <p>
              {playerData.displayName}
            </p>
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
    </div>
  );
};

export default PlayerPage;
