import { parseInput, solution, testLock } from "./part1";

const exampleInput = `#####
.####
.####
.####
.#.#.
.#...
.....

#####
##.##
.#.##
...##
...#.
...#.
.....

.....
#....
#....
#...#
#.#.#
#.###
#####

.....
.....
#.#..
###..
###.#
###.#
#####

.....
.....
.....
#....
#.#..
#.#.#
#####`;

describe("part1", () => {
  describe("parseInput", () => {
    it("should return keys and locks", () => {
      const result = parseInput(exampleInput);
      expect(result.keys).toStrictEqual([
        [5, 0, 2, 1, 3],
        [4, 3, 4, 0, 2],
        [3, 0, 2, 0, 1],
      ]);
      expect(result.locks).toStrictEqual([
        [0, 5, 3, 4, 3],
        [1, 2, 0, 5, 3],
      ]);
    });
  });

  describe("testLock", () => {
    it("should return false for incompatible key & lock", () => {
      expect(testLock([3, 3, 3, 3, 3], [3, 3, 3, 3, 3])).toBe(false);
    });

    it("should return true for compatible key & lock", () => {
      expect(testLock([2, 2, 2, 2, 2], [3, 3, 3, 3, 3])).toBe(true);
    });
  });

  describe("solution", () => {
    it("should handle example", () => {
      const input = parseInput(exampleInput);
      expect(solution(input.keys, input.locks)).toBe(3);
    });
  });
});
