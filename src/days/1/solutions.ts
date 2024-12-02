import { part1Solution, parseInput } from "./part1";
import { part2Solution } from "./part2";
import fs from "fs";
import path from "path";

const rawInput = fs.readFileSync(
  path.join(import.meta.dirname, "./input.txt"),
  "utf8"
);

const [leftInput, rightInput] = parseInput(rawInput);

console.time("Part 1 Time");
const p1 = part1Solution(leftInput, rightInput);
console.timeEnd("Part 1 Time");
console.log(`Part 1 Solution: ${p1}`);

console.log("-".repeat(20));

console.time("Part 2 Time");
const p2 = part2Solution(leftInput, rightInput);
console.timeEnd("Part 2 Time");
console.log(`Part 2 Solution: ${p2}`);
