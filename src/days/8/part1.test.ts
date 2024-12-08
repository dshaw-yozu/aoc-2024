import {
  arrayCombinations,
  findAntinodes,
  parseInput,
  solution,
} from "./part1";

export const rawInput = `............
........0...
.....0......
.......0....
....0.......
......A.....
............
............
........A...
.........A..
............
............`;
describe("day 7", () => {
  describe("parseInput", () => {
    it("should handle simple input", () => {
      const result = parseInput("A..");
      expect(result.map.get("A")).toStrictEqual([[0, 0]]);
      expect(result.mapHeight).toBe(1);
      expect(result.mapLength).toBe(3);
    });

    it("should handle example input", () => {
      const result = parseInput(rawInput);
      expect(result.map.get("A")).toStrictEqual([
        [9, 2],
        [8, 3],
        [6, 6],
      ]);
      expect(result.map.get("0")).toStrictEqual([
        [4, 7],
        [7, 8],
        [5, 9],
        [8, 10],
      ]);
      expect(result.mapHeight).toBe(12);
      expect(result.mapLength).toBe(12);
    });
  });

  describe("findAntinodes", () => {
    it("should handle simple example", () => {
      expect(findAntinodes([1, 1], [2, 2])).toStrictEqual([
        [0, 0],
        [3, 3],
      ]);
    });

    it("should handle simple example", () => {
      expect(findAntinodes([1, 2], [3, 6])).toStrictEqual([
        [-1, -2],
        [5, 10],
      ]);
    });
  });

  describe("arrayCombinations", () => {
    it("should return list of how elements in an array can be combined", () => {
      expect(arrayCombinations([1, 2])).toStrictEqual([[1, 2]]);
      expect(arrayCombinations([1, 2, 3])).toStrictEqual([
        [1, 2],
        [1, 3],
        [2, 3],
      ]);
    });

    it("should handle array of arrays", () => {
      expect(
        arrayCombinations([
          [1, 1],
          [2, 2],
          [3, 3],
        ])
      ).toStrictEqual([
        [
          [1, 1],
          [2, 2],
        ],
        [
          [1, 1],
          [3, 3],
        ],
        [
          [2, 2],
          [3, 3],
        ],
      ]);
    });
  });

  describe("solution", () => {
    it("should handle example input", () => {
      expect(solution(parseInput(rawInput))).toBe(14);
    });

    it("should discount antinodes outside of area", () => {
      expect(solution(parseInput(`AA.`))).toBe(1);
    });
    it("should discount antinodes outside of area", () => {
      expect(solution(parseInput(`AA`))).toBe(0);
    });
  });
});
