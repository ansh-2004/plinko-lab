import { useEffect, useState } from "react";
import { getRecentRounds } from "../services/api";

export default function RecentRounds() {
  const [rounds, setRounds] = useState([]);

  useEffect(() => {
    async function fetchRounds() {
      const data = await getRecentRounds();
      setRounds(Array.isArray(data) ? data : []);
    }
    fetchRounds();
  }, []);

  return (
    <div className="mt-6">
      <h2 className="text-lg font-bold mb-2">Recent Rounds</h2>

      <div className="bg-gray-100 p-3 rounded">
        {rounds.map((r) => (
          <div key={r.id} className="text-sm border-b py-1">
            ID: {r.id} | Bin: {r.binIndex}
          </div>
        ))}
      </div>
    </div>
  );
}