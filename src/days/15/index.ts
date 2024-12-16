import {
  solution as part1Solution,
  parseInput as part1Parser,
  executeMoves,
} from "./part1";
// import { solution as part2Solution } from "./part2";
import fs from "fs";
import path from "path";

const rawInput = fs.readFileSync(
  path.join(import.meta.dirname, "./input.txt"),
  "utf8"
);

// 288 too high

console.time("Part 1 Time");
const p1Input = part1Parser(rawInput);
console.log(Array.from(p1Input.map.values()).filter((a) => a === "O").length);
executeMoves(p1Input);
console.log(Array.from(p1Input.map.values()).filter((a) => a === "O").length);

const p1 = part1Solution(p1Input);
console.timeEnd("Part 1 Time");
console.log(`Part 1 Solution: ${p1}`);

// console.log("-".repeat(20));

// console.time("Part 2 Time");
// const p2Input = part1Parser(rawInput);
// const p2 = part2Solution(p2Input);
// console.timeEnd("Part 2 Time");
// console.log(`Part 2 Solution: ${p2}`);
