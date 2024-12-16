import {
  findSafetyFactor as part1Solution,
  parseInput as part1Parser,
  moveRobots,
} from "./part1";
import fs from "fs";
import path from "path";

const rawInput = fs.readFileSync(
  path.join(import.meta.dirname, "./input.txt"),
  "utf8"
);

console.time("Part 1 Time");
const p1Input = part1Parser(rawInput);
const movedInput = moveRobots(p1Input, 100, 101, 103);
const p1 = part1Solution(movedInput);
console.log(p1.quadrants);
console.timeEnd("Part 1 Time");
console.log(`Part 1 Solution: ${p1.safetyFactor}`);
