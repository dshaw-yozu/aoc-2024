import { parseInput, drawMap } from "./part1";

describe("part1", () => {
  describe("parseInput", () => {
    it("should handle example input", () => {
      const output = parseInput(`#S.E#`);
      expect(output.start).toStrictEqual([1, 0]);
      expect(output.end).toStrictEqual([3, 0]);
    });
  });

  describe("drawMap", () => {
    it("should handle simple example", () => {
      const output = parseInput(`#S.E#`);
      expect(drawMap(output.maze, output.height, output.width)).toStrictEqual([
        1, 0,
      ]);
    });
  });
});
