import { useState } from "react";
import { createRound, startRound, revealRound } from "../services/api";
import PlinkoBoard from "../components/PlinkoBoard";
import RecentRounds from "../components/RecentRounds";


export default function Game() {
  const [roundId, setRoundId] = useState(null);
  const [clientSeed, setClientSeed] = useState("");
  const [dropColumn, setDropColumn] = useState(6);
  const [result, setResult] = useState(null);
  const [path, setPath] = useState(null);
  const [muted, setMuted] = useState(false);
  const [binIndex, setBinIndex] = useState(null);
  const [serverSeed, setServerSeed] = useState(null);

  const handleStart = async () => {
    const commit = await createRound();
    
    setRoundId(commit.roundId);

    const start = await startRound(commit.roundId, {
      clientSeed,
      dropColumn,
      betCents: 100,
    });

    setPath(start.path);
    setResult(start);
    setBinIndex(start.binIndex);

    const reveal = await revealRound(commit.roundId);
    setServerSeed(reveal.serverSeed);
    console.log("serverSeed:", reveal.serverSeed);
  };

  return (
    <div className="p-6 text-center max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Plinko Game 🎮</h1>

      <div className="mb-4">
        <input
          placeholder="Client Seed"
          value={clientSeed}
          onChange={(e) => setClientSeed(e.target.value)}
          className="border p-2"
        />
      </div>

      <div className="mb-4">
        <input
          type="number"
          value={dropColumn}
          onChange={(e) => setDropColumn(Number(e.target.value))}
          className="border p-2"
        />
      </div>

      <button
        onClick={handleStart}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Drop Ball
      </button>

      <button
        onClick={() => setMuted(!muted)}
        className="ml-2 bg-gray-500 text-white px-2 py-1 rounded"
        >
        {muted ? "Unmute" : "Mute"}
      </button>

      <div className="mt-10">
        <PlinkoBoard path={path} muted={muted} binIndex={binIndex}/>
      </div>

      {result && (
        <div className="mt-4">
          <p>Bin: {result.binIndex}</p>
        </div>
      )}

        {serverSeed && (
        <div className="mt-4 text-sm bg-gray-100 p-3 rounded">
            <p><b>Server Seed:</b> {serverSeed}</p>
            <p><b>Client Seed:</b> {clientSeed}</p>
            <p><b>Round ID:</b> {roundId}</p>
        </div>
        )}
      <RecentRounds />
    </div>
  );
}