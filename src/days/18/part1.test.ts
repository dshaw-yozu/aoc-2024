import { parseInput } from "./part1";

describe("part1", () => {
  describe("parseInput", () => {
    it("should handle example input", () => {
      const output = parseInput(`37,6
59,27`);
      expect(output.start).toStrictEqual([0, 0]);
      expect(output.end).toStrictEqual([70, 70]);
    });
  });
});
