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

  return (
    <div>
      {/* Player Data */}
      <div className="bg-gray-800 p-4 mt-4 rounded-lg shadow-md">
        <div className="flex flex-wrap gap-4 justify-left font-bold text-white">
          <div>
            <p className="rounded-2xl bg-gray-400 p-3 shadow-md">
              Username: {playerData.displayName}
            </p>
          </div>
          <div>
            <p className="rounded-2xl bg-gray-400 p-3 shadow-md">
              Account type: {playerData.type}
            </p>
          </div>
          <div>
            <p className="rounded-2xl bg-gray-400 p-3 shadow-md">
              Combat level: {playerData.combatLevel}
            </p>
          </div>
          <div>
            <p className="rounded-2xl bg-gray-400 p-3 shadow-md">
              Total experience: {playerData.exp}
            </p>
          </div>
          <div>
            <p className="rounded-2xl bg-gray-400 p-3 shadow-md">
              Efficient hours played: {playerData.ehp}
            </p>
          </div>
          <div>
            <p className="rounded-2xl bg-gray-400 p-3 shadow-md">
              Efficient hours bossed: {playerData.ehb}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerPage;
