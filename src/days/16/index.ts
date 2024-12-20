import { parseInput as part1Parser, solution, drawMap } from "./part1";
import fs from "fs";
import path from "path";

const rawInput = fs.readFileSync(
  path.join(import.meta.dirname, "./input.txt"),
  "utf8"
);

console.time("Part 1 Time");
const p1Input = part1Parser(rawInput);

solution(p1Input);
console.timeEnd("Part 1 Time");
console.log(`Part 1 Solution: ${0}`);

// console.log("-".repeat(20));

// console.time("Part 2 Time");
// const p2Input = part1Parser(rawInput);
// const p2 = part2Solution(p2Input);
// console.timeEnd("Part 2 Time");
// console.log(`Part 2 Solution: ${p2}`);
