import { solution } from "./part1";
import fs from "fs";
import path from "path";

const rawInput = fs.readFileSync(
  path.join(import.meta.dirname, "./input.txt"),
  "utf8"
);

console.time("Part 1 Time");
const p1Input = rawInput.split("\n");
// not correct - not optimised for fewest button presses
const p1 = solution(p1Input);
console.timeEnd("Part 1 Time");
console.log(`Part 1 Solution: ${p1}`);

// 226832 too high

// console.log("-".repeat(20));

// console.time("Part 2 Time");
// const p2Input = part1Parser(rawInput);
// const p2 = part2Solution(p2Input);
// console.timeEnd("Part 2 Time");
// console.log(`Part 2 Solution: ${p2}`);
