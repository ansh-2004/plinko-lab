
import { runPlinko } from "./utils/plinkoEngine.js";

const result = runPlinko({
  combinedSeed: "e1dddf77de27d395ea2be2ed49aa2a59bd6bf12ee8d350c16c008abd406c07e0",
  rows: 12,
  dropColumn: 6,
});

console.log("result of run plinko",result);