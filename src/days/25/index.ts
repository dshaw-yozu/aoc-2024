import { parseInput, solution } from "./part1";
import fs from "fs";
import path from "path";

const rawInput = fs.readFileSync(
  path.join(import.meta.dirname, "./input.txt"),
  "utf8"
);

console.time("Part 1 Time");
const p1Input = parseInput(rawInput);
const p1 = solution(p1Input.keys, p1Input.locks);
console.timeEnd("Part 1 Time");
console.log(`Part 1 Solution: ${p1}`);
