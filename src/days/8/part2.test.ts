import { parseInput } from "./part1";
import { rawInput } from "./part1.test";
import {
  findHarmonicAntinodesWithinBound,
  solution,
  withinBound,
} from "./part2";

describe("part2", () => {
  describe("withinBound", () => {
    it("should return true if within bound", () => {
      expect(withinBound([1, 1], 2, 2)).toBe(true);
      expect(withinBound([0, 0], 2, 2)).toBe(true);
    });

    it("should return false if not within bound", () => {
      expect(withinBound([2, 1], 2, 2)).toBe(false);
      expect(withinBound([-1, 0], 2, 2)).toBe(false);
    });
  });

  describe("findHarmonicAntinodesWithinBound", () => {
    it("should handle simple row of harmonics", () => {
      expect(
        findHarmonicAntinodesWithinBound([2, 0], [3, 0], 1, 6)
      ).toStrictEqual([
        [1, 0],
        [4, 0],
        [0, 0],
        [5, 0],
        [3, 0],
        [2, 0],
        [4, 0],
        [1, 0],
        [5, 0],
        [0, 0],
      ]);
    });
  });

  describe("solution", () => {
    it("should handle example input", () => {
      expect(solution(parseInput(rawInput))).toBe(34);
    });
  });
});
