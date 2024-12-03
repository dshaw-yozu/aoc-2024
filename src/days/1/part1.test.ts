import { parseInput, part1Solution } from "./part1";

describe("day 1", () => {
  describe("parseInput", () => {
    test("given the raw input text, should return the left and right number lists", () => {
      expect(
        parseInput(`17113   23229
55260   78804
92726   24891`)
      ).toStrictEqual([
        [17113, 55260, 92726],
        [23229, 78804, 24891],
      ]);
    });
  });

  describe("part1", () => {
    test("given one pair of numbers, should return the absolute difference between the smallest numbers", () => {
      expect(part1Solution([1], [2])).toBe(1);
      expect(part1Solution([2], [1])).toBe(1);
      expect(part1Solution([1], [1])).toBe(0);

      expect(part1Solution([2, 0, 0], [0, 0, 1])).toBe(1);
    });

    test("given a few pairs of numbers, should return the sum of the absolute difference between the numbers", () => {
      expect(part1Solution([1, 2], [2, 1])).toBe(0);
      expect(part1Solution([1, 2], [2, 3])).toBe(2);

      expect(part1Solution([17113, 55260, 92726], [23229, 78804, 24891])).toBe(
        50407
      );
    });
  });
});
