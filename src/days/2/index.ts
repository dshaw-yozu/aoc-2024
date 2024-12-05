import { solution, parseInput } from "./part1";
import { solution as part2Solution } from "./part2";
// import { part2Solution } from "./part2";
import fs from "fs";
import path from "path";

const rawInput = fs.readFileSync(
  path.join(import.meta.dirname, "./input.txt"),
  "utf8"
);

const reports = parseInput(rawInput);

console.time("Part 1 Time");
const p1 = solution(reports);
console.timeEnd("Part 1 Time");
console.log(`Part 1 Solution: ${p1}/${reports.length}`);

console.time("Part 2 Time");
const p2 = part2Solution(reports);
console.timeEnd("Part 2 Time");
console.log(`Part 2 Solution: ${p2}/${reports.length}`);
