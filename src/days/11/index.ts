import { solution as part1Solution, parseInput as part1Parser } from "./part1";
import { solution as part2Solution } from "./part2";

const rawInput = "3935565 31753 437818 7697 5 38 0 123";

console.time("Part 1 Time");
const p1Input = part1Parser(rawInput);
const p1 = part1Solution(p1Input, 25);
console.timeEnd("Part 1 Time");
console.log(`Part 1 Solution: ${p1}`);

console.log("-".repeat(20));

console.time("Part 2 Time");
const p2 = part2Solution(p1Input, 75);
console.timeEnd("Part 2 Time");
console.log(`Part 2 Solution: ${p2}`);

console.log("-".repeat(20));

console.time("Part 1 with 2 Time");
const p1b = part2Solution(p1Input, 25);
console.timeEnd("Part 1 with 2 Time");
console.log(`Part 2 Solution: ${p1b}`);
