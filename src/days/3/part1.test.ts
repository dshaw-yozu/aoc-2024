import { handleMul, parseInput, solution } from "./part1";

describe("part1", () => {
  describe("parseInput", () => {
    it("should return list of valid mul operations", () => {
      expect(
        parseInput(
          "xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))"
        )
      ).toStrictEqual(["mul(2,4)", "mul(5,5)", "mul(11,8)", "mul(8,5)"]);
    });
  });

  describe("handleMul", () => {
    it("should handle valid mul input", () => {
      expect(handleMul("mul(2,5)")).toBe(10);
    });

    it("should handle invalid mul input", () => {
      expect(handleMul("")).toBe(0);
    });
  });

  describe("solution", () => {
    it("should return the sum of the multiplied values", () => {
      expect(solution([])).toBe(0);
      expect(solution(["mul(2,4)"])).toBe(8);
      expect(solution(["mul(2,4)", "mul(5,5)", "mul(11,8)", "mul(8,5)"])).toBe(
        161
      );
    });
  });
});
