import { solution as part1Solution, parseInput as part1Parser } from "./part1";
import { solution as part2Solution } from "./part2";

const rawInput = `Register A: 61657405
Register B: 0
Register C: 0

Program: 2,4,1,2,7,5,4,3,0,3,1,7,5,5,3,0`;

console.time("Part 1 Time");
const p1Input = part1Parser(rawInput);
const p1 = part1Solution(p1Input);
console.timeEnd("Part 1 Time");
console.log(`Part 1 Solution: ${p1}`);

console.log("-".repeat(20));

// BRUTE FORCE - doesn't work
console.time("Part 2 Time");
const p2 = part2Solution(rawInput);
console.timeEnd("Part 2 Time");
console.log(`Part 2 Solution: ${p2}`);
