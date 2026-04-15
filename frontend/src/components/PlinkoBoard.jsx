import { useEffect, useState } from "react";
import Ball from "./Ball";
import confetti from "canvas-confetti";


export default function PlinkoBoard({ rows = 12, path ,muted, binIndex}) {
  const COL_WIDTH = 35;
  const START_X = 240; // center adjust 
  const ROW_HEIGHT = 35;
  const [ballPos, setBallPos] = useState({ x: START_X, y: 0 });
const tickSound = new Audio("/tick.mp3");
const winSound = new Audio("/win.mp3");


useEffect(() => {
  if (!path) return;

  let pos = 0;
  let step = 0;

  const interval = setInterval(() => {
    if (step >= path.length) {
      clearInterval(interval);

      // 🎉 Confetti
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });

      // 🔊 Win sound
      if (!muted) {
        winSound.currentTime = 0;
        winSound.play();
      }

      return;
    }

    if (path[step] === "R") pos++;

    const x = START_X + (pos - step / 2) * COL_WIDTH;
    const y = step * ROW_HEIGHT;

    setBallPos({ x, y });

    // 🔊 Tick sound
    if (!muted) {
      tickSound.currentTime = 0;
      tickSound.play();
    }

    step++;
  }, 200);

  return () => clearInterval(interval);
}, [path]);

return (
  <div className="relative w-[500px] mx-auto mt-10 bg-gray-100 p-6 rounded-lg">
    {/* Ball */}
    <Ball position={ballPos} />

    {/* Pegs */}
    <div className="flex flex-col items-center">
      {Array.from({ length: rows }).map((_, r) => (
        <div key={r} className="flex justify-center">
          {Array.from({ length: r + 1 }).map((_, i) => (
            <div
              key={i}
              className="w-2 h-2 bg-gray-700 rounded-full m-2"
            />
          ))}
        </div>
      ))}
    </div>

    {/* Bins */}
    <div className="flex mt-4 justify-center">
      {Array.from({ length: 13 }).map((_, i) => (
        <div
          key={i}
          className={`w-8 h-8 border flex items-center justify-center ${
            i === binIndex ? "bg-green-400 scale-110" : ""
          }`}
        >
          {i}
        </div>
      ))}
    </div>
  </div>
);
}