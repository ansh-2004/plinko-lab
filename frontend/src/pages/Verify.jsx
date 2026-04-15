import { useState } from "react";
import { verifyRound } from "../services/api";

export default function Verify() {
  const [form, setForm] = useState({});
  const [result, setResult] = useState(null);

  const handleVerify = async () => {
    const res = await verifyRound(form);
    setResult(res);
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Verify Fairness 🔍</h1>

      {["serverSeed", "clientSeed", "nonce", "dropColumn"].map((key) => (
        <input
          key={key}
          placeholder={key}
          className="border p-2 block mb-2 w-full"
          onChange={(e) =>
            setForm({ ...form, [key]: e.target.value })
          }
        />
      ))}

      <button
        onClick={handleVerify}
        className="bg-green-500 text-white px-4 py-2 mt-2"
      >
        Verify
      </button>

      {result && (
        <div className="mt-4 bg-gray-100 p-4 rounded">
          <p><b>Commit:</b> {result.commitHex}</p>
          <p><b>Bin:</b> {result.binIndex}</p>
          <p><b>Hash:</b> {result.pegMapHash}</p>
        </div>
      )}
    </div>
  );
}