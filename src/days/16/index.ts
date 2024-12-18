import {
  parseInput as part1Parser,
  findPaths,
  findShortestPath,
  drawMap,
} from "./part1";
import fs from "fs";
import path from "path";

const rawInput = fs.readFileSync(
  path.join(import.meta.dirname, "./input.txt"),
  "utf8"
);

console.time("Part 1 Time");
const p1Input = part1Parser(rawInput);

findPaths(p1Input);
const shortestPath = findShortestPath(p1Input);
drawMap(p1Input.maze, p1Input.height, p1Input.width);
console.timeEnd("Part 1 Time");
console.log(`Part 1 Solution: ${0}`);

// console.log("-".repeat(20));

// console.time("Part 2 Time");
// const p2Input = part1Parser(rawInput);
// const p2 = part2Solution(p2Input);
// console.timeEnd("Part 2 Time");
// console.log(`Part 2 Solution: ${p2}`);
