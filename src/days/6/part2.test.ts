import { parseInput } from "./part1";
import { rawInput } from "./part1.test";
import { findLoops, getFacingLocation, solution } from "./part2";

describe("part 2", () => {
  describe("getFacingContent", () => {
    it("should get content", () => {
      const [map, location] = parseInput(`.N.
W^E
.S.`);
      expect(map.get(getFacingLocation(map, location))).toBe("N");
    });

    it("should allow override", () => {
      const [map, location] = parseInput(`.N.
W^E
.S.`);
      expect(map.get(getFacingLocation(map, location, ">"))).toBe("E");
      expect(map.get(getFacingLocation(map, location, "v"))).toBe("S");
      expect(map.get(getFacingLocation(map, location, "<"))).toBe("W");
    });
  });
  describe("findLoops", () => {
    it("should find 1 loop", () => {
      const [map, location] = parseInput(`....
.#..
.>.#
....
..#.`);
      expect(findLoops(map, location)).toBe(1);
    });
  });

  describe("solution", () => {
    it.skip("should find 6 loops", () => {
      expect(solution(...parseInput(rawInput))).toBe(6);
    });
  });
});
