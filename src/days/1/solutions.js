const fs = require("fs");
const path = require("path");
const part1 = require("./part1");
const part2 = require("./part2");

const rawInput = fs.readFileSync(path.resolve(__dirname, "input.txt"), "utf8");

console.time("Part 1 Time");
const part1Solution = part1.solution(part1.parseInput(rawInput));
console.timeEnd("Part 1 Time");
console.log(`Part 1 Solution: ${part1Solution}`);
console.log("-".repeat(20));
console.time("Part 2 Time");
const part2Solution = part2.solution(part1.parseInput(rawInput));
console.timeEnd("Part 2 Time");
console.log(`Part 2 Solution: ${part2Solution}`);
