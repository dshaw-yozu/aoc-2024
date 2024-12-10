import {
  coordToString,
  findAccessibleNines,
  parseInput,
  solution,
} from "./part1";

export const simpleInput = `...0...
...1...
...2...
6543456
7.....7
8.....8
9.....9`;

export const example2 = `..90..9
...1.98
...2..7
6543456
765.987
876....
987....`;

export const example3 = `10..9..
2...8..
3...7..
4567654
...8..3
...9..2
.....01`;
export const rawInput = `89010123
78121874
87430965
96549874
45678903
32019012
01329801
10456732`;

describe("day 10", () => {
  describe("parseInput", () => {
    it("should handle simple input", () => {
      const { map, height, width } = parseInput(simpleInput);
      expect(height).toBe(7);
      expect(width).toBe(7);
      expect(map.get("0|0")).toStrictEqual({
        height: NaN,
        validInclines: 0,
        accessibleNines: 0,
      });

      expect(map.get("3|0")).toStrictEqual({
        height: 0,
        validInclines: 0,
        accessibleNines: 0,
      });
      expect(map.get("0|6")).toStrictEqual({
        height: 9,
        validInclines: 0,
        accessibleNines: 0,
      });
      expect(map.size).toBe(49);
    });
  });

  describe("findAccessibleNines", () => {
    it("should handle simple input", () => {
      const { map, height, width } = parseInput(simpleInput);
      findAccessibleNines(map, height, width);

      expect(map.get(coordToString(0, 5))?.accessibleNines).toBe(1);
      expect(map.get(coordToString(0, 4))?.accessibleNines).toBe(1);
      expect(map.get(coordToString(0, 3))?.accessibleNines).toBe(1);
      expect(map.get(coordToString(1, 3))?.accessibleNines).toBe(1);
      expect(map.get(coordToString(2, 3))?.accessibleNines).toBe(1);
      expect(map.get(coordToString(3, 3))?.accessibleNines).toBe(2);
      expect(map.get(coordToString(3, 2))?.accessibleNines).toBe(2);
      expect(map.get(coordToString(3, 1))?.accessibleNines).toBe(2);
      expect(map.get(coordToString(3, 0))?.accessibleNines).toBe(2);
    });

    it("should handle example input", () => {
      const { map, height, width } = parseInput(rawInput);
      findAccessibleNines(map, height, width);

      expect(map.get(coordToString(2, 0))?.accessibleNines).toBe(5);
      expect(map.get(coordToString(4, 0))?.accessibleNines).toBe(6);
    });
  });

  describe("solution", () => {
    it("should handle simple input", () => {
      const { map, height, width } = parseInput(simpleInput);
      findAccessibleNines(map, height, width);
      expect(solution(map, height, width)).toBe(2);
    });

    it("should handle example2 input", () => {
      const { map, height, width } = parseInput(example2);
      findAccessibleNines(map, height, width);
      expect(solution(map, height, width)).toBe(4);
    });

    it("should handle example3 input", () => {
      const { map, height, width } = parseInput(example3);
      findAccessibleNines(map, height, width);
      expect(solution(map, height, width)).toBe(3);
    });

    it("should handle example input", () => {
      const { map, height, width } = parseInput(rawInput);
      findAccessibleNines(map, height, width);
      expect(solution(map, height, width)).toBe(36);
    });
  });
});
