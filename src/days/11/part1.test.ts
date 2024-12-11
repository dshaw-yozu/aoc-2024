import { blinkStones, parseInput, solution, splitStone } from "./part1";

describe("day 11", () => {
  describe("parseInput", () => {
    it("should return list of digits", () => {
      expect(parseInput(`123 12 123`)).toStrictEqual([123, 12, 123]);
    });
  });

  describe("splitStone", () => {
    it("should return halved stone", () => {
      expect(splitStone(11)).toStrictEqual([1, 1]);
      expect(splitStone(1000)).toStrictEqual([10, 0]);
    });
  });

  describe("blink", () => {
    it("should update the stones", () => {
      let stones = [125, 17];

      stones = blinkStones(stones);
      expect(stones).toStrictEqual([253000, 1, 7]);

      stones = blinkStones(stones);
      expect(stones).toStrictEqual([253, 0, 2024, 14168]);

      stones = blinkStones(stones);
      expect(stones).toStrictEqual([512072, 1, 20, 24, 28676032]);

      stones = blinkStones(stones);
      expect(stones).toStrictEqual([512, 72, 2024, 2, 0, 2, 4, 2867, 6032]);

      stones = blinkStones(stones);
      expect(stones).toStrictEqual([
        1036288, 7, 2, 20, 24, 4048, 1, 4048, 8096, 28, 67, 60, 32,
      ]);

      stones = blinkStones(stones);
      expect(stones).toStrictEqual([
        2097446912, 14168, 4048, 2, 0, 2, 4, 40, 48, 2024, 40, 48, 80, 96, 2, 8,
        6, 7, 6, 0, 3, 2,
      ]);
    });
  });

  describe("solution", () => {
    it("should blink 6 times", () => {
      const stones = [125, 17];

      expect(solution(stones, 6)).toBe(22);
      expect(solution(stones, 25)).toBe(55312);
    });
  });
});
