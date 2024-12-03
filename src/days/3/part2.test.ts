import { findEnabledOperations, parseInput, solution } from "./part2";

describe("part1", () => {
  describe("parseInput", () => {
    it("should return list of valid mul operations", () => {
      expect(
        parseInput(
          "xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))"
        )
      ).toStrictEqual([
        "mul(2,4)",
        "don't()",
        "mul(5,5)",
        "mul(11,8)",
        "do()",
        "mul(8,5)",
      ]);
    });
  });

  describe("findEnabledOperations", () => {
    it("should filter out disabled operations", () => {
      expect(
        findEnabledOperations([
          "mul(2,4)",
          "don't()",
          "mul(5,5)",
          "mul(11,8)",
          "do()",
          "mul(8,5)",
        ])
      ).toStrictEqual(["mul(2,4)", "mul(8,5)"]);
    });
  });

  describe("solution", () => {
    it("should only excute enabled operations", () => {
      expect(
        solution([
          "mul(2,4)",
          "don't()",
          "mul(5,5)",
          "mul(11,8)",
          "do()",
          "mul(8,5)",
        ])
      ).toBe(48);
    });
  });
});
