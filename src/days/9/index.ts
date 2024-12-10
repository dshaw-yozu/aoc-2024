import { checksum, parseInput, compressDisc } from "./part1";
import { compressIntact } from "./part2";
import fs from "fs";
import path from "path";

const rawInput = fs.readFileSync(
  path.join(import.meta.dirname, "./input.txt"),
  "utf8"
);

// 288 too high

console.time("Part 1 Time");
const p1Input = parseInput(rawInput);
const p1Compressed = compressDisc(p1Input);
const p1 = checksum(p1Compressed);
console.timeEnd("Part 1 Time");
console.log(`Part 1 Solution: ${p1}`);

console.log("-".repeat(20));

console.time("Part 2 Time");
const p2Input = parseInput(rawInput);
const p2Compressed = compressIntact(p2Input);
const p2 = checksum(p2Compressed);
console.timeEnd("Part 2 Time");
console.log(`Part 2 Solution: ${p2}`);
