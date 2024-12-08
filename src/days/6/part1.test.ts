import {
  GuardMap,
  moveGuard,
  parseInput,
  rotateGuard,
  solution,
} from "./part1";

export const rawInput = `....#.....
.........#
..........
..#.......
.......#..
..........
.#..^.....
........#.
#.........
......#...`;

describe("part 1", () => {
  describe("parseInput", () => {
    it("should return a 2d map", () => {
      const [map, guardLocation] = parseInput(rawInput);

      expect(map.get("0|0")).toEqual(".");
      expect(map.get("4|0")).toEqual("#");
      expect(map.get("4|6")).toEqual("^");
    });

    it("should return a 2d map", () => {
      const [map, guardLocation] = parseInput(rawInput);

      expect(guardLocation).toEqual([4, 6]);
    });
  });

  describe("rotateGuard", () => {
    it("should return next direction", () => {
      expect(rotateGuard("^")).toBe(">");
      expect(rotateGuard(">")).toBe("v");
      expect(rotateGuard("v")).toBe("<");
      expect(rotateGuard("<")).toBe("^");
    });
  });

  describe("moveGuard", () => {
    it("should move into empty space, leaving left space as marked", () => {
      const map: GuardMap = new Map().set("0|0", ".").set("0|1", "^");
      expect(moveGuard(map, [0, 1])).toStrictEqual({
        isLeaving: true,
        location: [0, 0],
        justRotated: false,
      });

      expect(map.get("0|1")).toBe("X");
      expect(map.get("0|0")).toBe("^");
    });

    it("should rotate when facing a new obstical", () => {
      const map: GuardMap = new Map()
        .set("0|0", "#")
        .set("0|1", ".")
        .set("0|2", "^");
      expect(moveGuard(map, [0, 2])).toStrictEqual({
        isLeaving: false,
        location: [0, 1],
        justRotated: true,
      });
      expect(map.get("0|0")).toBe("#");
      expect(map.get("0|1")).toBe(">");
      expect(map.get("0|2")).toBe("X");
    });

    it("should move right", () => {
      const map: GuardMap = new Map().set("0|0", ">").set("1|0", ".");
      expect(moveGuard(map, [0, 0])).toStrictEqual({
        isLeaving: true,
        location: [1, 0],
        justRotated: false,
      });

      expect(map.get("0|0")).toBe("X");
      expect(map.get("1|0")).toBe(">");
    });

    it("should move down", () => {
      const map: GuardMap = new Map().set("0|0", "v").set("0|1", ".");
      expect(moveGuard(map, [0, 0])).toStrictEqual({
        isLeaving: true,
        location: [0, 1],
        justRotated: false,
      });

      expect(map.get("0|0")).toBe("X");
      expect(map.get("0|1")).toBe("v");
    });

    it("should move left", () => {
      const map: GuardMap = new Map().set("0|0", ".").set("1|0", "<");
      expect(moveGuard(map, [1, 0])).toStrictEqual({
        isLeaving: true,
        location: [0, 0],
        justRotated: false,
      });

      expect(map.get("0|0")).toBe("<");
      expect(map.get("1|0")).toBe("X");
    });
  });

  describe("solution", () => {
    it("should return amount of visited tiles after guard has left", () => {
      const map: GuardMap = new Map().set("0|0", ".").set("1|0", "<");
      expect(solution(map, [1, 0])).toBe(2);
    });

    it("should match example", () => {
      const [map, location] = parseInput(rawInput);

      expect(solution(map, location)).toBe(41);
    });
  });
});
