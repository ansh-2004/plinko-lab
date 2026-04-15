import { prisma } from "../utils/db.js"
import {
  generateServerSeed,
  createCommit,
  createCombinedSeed,
} from "../utils/fairness.js"

import { runPlinko } from "../utils/plinkoEngine.js"


export async function createRound(req, res) {
  try {
    const serverSeed = generateServerSeed()
    const nonce = Date.now().toString()

    const commitHex = createCommit(serverSeed, nonce)

    const round = await prisma.round.create({
      data: {
        status: "CREATED",
        serverSeed,
        nonce,
        commitHex,
        clientSeed: "",
        combinedSeed: "",
        pegMapHash: "",
        rows: 12,
        dropColumn: 0,
        binIndex: 0,
        payoutMultiplier: 0,
        betCents: 0,
        pathJson: [],
      },
    })

    res.json({
      roundId: round.id,
      commitHex,
      nonce,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create round" });
  }
}

export async function startRound(req, res) {
  try {
    const { id } = req.params;
    const { clientSeed, dropColumn, betCents } = req.body;

    const round = await prisma.round.findUnique({ where: { id } });

    if (!round) {
      return res.status(404).json({ error: "Round not found" });
    }

    const combinedSeed = createCombinedSeed(
      round.serverSeed,
      clientSeed,
      round.nonce
    );

    const result = runPlinko({
      combinedSeed,
      rows: 12,
      dropColumn,
    });

    // simple payout example
    const payoutMultiplier = getPayout(result.binIndex);

    const updated = await prisma.round.update({
      where: { id },
      data: {
        status: "STARTED",
        clientSeed,
        combinedSeed,
        pegMapHash: result.pegMapHash,
        dropColumn,
        binIndex: result.binIndex,
        payoutMultiplier,
        betCents,
        pathJson: result.path,
      },
    });

    res.json({
      roundId: id,
      pegMapHash: result.pegMapHash,
      rows: 12,
      binIndex: result.binIndex,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to start round" });
  }
}

export async function revealRound(req, res) {
  try {
    const { id } = req.params;

    const round = await prisma.round.findUnique({ where: { id } });

    if (!round) {
      return res.status(404).json({ error: "Round not found" });
    }

    const updated = await prisma.round.update({
      where: { id },
      data: {
        status: "REVEALED",
        revealedAt: new Date(),
      },
    });

    res.json({
      serverSeed: round.serverSeed,
    });
  } catch (err) {
    res.status(500).json({ error: "Reveal failed" });
  }
}

export function verifyRound(req, res) {
  try {
    const { serverSeed, clientSeed, nonce, dropColumn } = req.query;

    const commitHex = createCommit(serverSeed, nonce);
    const combinedSeed = createCombinedSeed(
      serverSeed,
      clientSeed,
      nonce
    );

    const result = runPlinko({
      combinedSeed,
      rows: 12,
      dropColumn: Number(dropColumn),
    });

    res.json({
      commitHex,
      combinedSeed,
      pegMapHash: result.pegMapHash,
      binIndex: result.binIndex,
    });
  } catch (err) {
    res.status(500).json({ error: "Verification failed" });
  }
}

function getPayout(bin) {
  const table = [
    5, 3, 2, 1.5, 1.2, 1, 0.8, 1, 1.2, 1.5, 2, 3, 5
  ];
  return table[bin];
}