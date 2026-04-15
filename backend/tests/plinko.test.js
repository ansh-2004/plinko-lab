import { runPlinko } from "../src/utils/plinkoEngine.js";

test("deterministic result", () => {
  const seed = "test-seed";

  const r1 = runPlinko({ combinedSeed: seed, rows: 12, dropColumn: 6 });
  const r2 = runPlinko({ combinedSeed: seed, rows: 12, dropColumn: 6 });

  expect(r1.binIndex).toBe(r2.binIndex);
});