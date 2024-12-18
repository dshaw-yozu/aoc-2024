import { Direction, findPath, getJunctions, parseInput } from "./part1";

describe("part1", () => {
  describe("parseInput", () => {
    it("should handle example input", () => {
      const output = parseInput(`#S.E#`);
      expect(output.start).toStrictEqual([1, 0]);
      expect(output.end).toStrictEqual([3, 0]);
    });
  });

  describe("getJunctions", () => {
    it("should return junctions list", () => {
      const input = parseInput(`#.#
.S.
###`);

      expect(getJunctions(input.maze, input.start, Direction.Up)).toStrictEqual(
        [
          { position: [1, 0], direction: Direction.Up, tried: false },
          { position: [0, 1], direction: Direction.Left, tried: false },
          { position: [2, 1], direction: Direction.Right, tried: false },
        ]
      );

      expect(
        getJunctions(input.maze, input.start, Direction.Left)
      ).toStrictEqual([
        { position: [0, 1], direction: Direction.Left, tried: false },
        { position: [1, 0], direction: Direction.Up, tried: false },
      ]);
    });
  });

  describe("findPath", () => {
    it("should handle a tunnel", () => {
      const input = parseInput(`#####
#S.E#
#####`);
      expect(findPath(input)).toStrictEqual([
        [1, 1],
        [2, 1],
        [3, 1],
      ]);
    });
  });
});
