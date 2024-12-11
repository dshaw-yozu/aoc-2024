import { parseInput } from "./part1";
import { recursiveBlink, solution } from "./part2";

describe("part2", () => {
  describe("recursiveBlink", () => {
    it("should return number of stones generated after n blinks", () => {
      expect(recursiveBlink(1, 1)).toBe(1);
      expect(recursiveBlink(1, 2)).toBe(2);
      expect(recursiveBlink(1, 3)).toBe(4);
      expect(recursiveBlink(1, 4)).toBe(4);
      expect(recursiveBlink(1, 5)).toBe(7);
      expect(recursiveBlink(1, 6)).toBe(14);
      expect(recursiveBlink(1, 75)).toBe(34840149002654);
    });
  });

  describe("solution", () => {
    it("should return amount of stones", () => {
      expect(solution([125, 17], 6)).toBe(22);
      expect(solution([125, 17], 25)).toBe(55312);
    });
  });
});
