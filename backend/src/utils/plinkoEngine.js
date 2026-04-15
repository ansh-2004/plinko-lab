import crypto from "crypto";
import { xorshift32 } from "./prng.js";

function getSeedNumber(hex) {
  const bytes = Buffer.from(hex.substring(0, 8), "hex");
  return bytes.readUInt32BE(0);
}

export function runPlinko({ combinedSeed, rows = 12, dropColumn }) {
  const seedNumber = getSeedNumber(combinedSeed);
  const rand = xorshift32(seedNumber);

  const pegMap = [];

  for (let r = 0; r < rows; r++) {
    const row = [];

    for (let i = 0; i <= r; i++) {
      let leftBias = 0.5 + (rand() - 0.5) * 0.2;
      leftBias = parseFloat(leftBias.toFixed(6));
      row.push(leftBias);
    }

    pegMap.push(row);
  }

  const pegMapHash = crypto
    .createHash("sha256")
    .update(JSON.stringify(pegMap))
    .digest("hex");

  const center = Math.floor(rows / 2);
  const adj = (dropColumn - center) * 0.01;

  let pos = 0;
  const path = [];

  for (let r = 0; r < rows; r++) {
    const pegIndex = Math.min(pos, r);
    let bias = pegMap[r][pegIndex];

    bias = Math.min(1, Math.max(0, bias + adj));

    const rnd = rand();

    if (rnd < bias) {
      path.push("L");
    } else {
      path.push("R");
      pos++;
    }
  }

  return {
    pegMap,
    pegMapHash,
    path,
    binIndex: pos,
  };
}