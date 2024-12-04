import { checkDiagonalCross, findMASes } from "./part2";

describe("part 2", () => {
  // M.M  S.M  S.S  M.S
  // .A.  .A.  .A.  .A.
  // S.S  S.M  M.M  M.S
  describe("checkDiagonalCross", () => {
    it("should return true for valid diagonal MAS cross", () => {
      expect(checkDiagonalCross(["M.M", ".A.", "S.S"], 1, 1)).toBe(true);
      expect(checkDiagonalCross(["S.S", ".A.", "M.M"], 1, 1)).toBe(true);

      expect(checkDiagonalCross(["M.S", ".A.", "M.S"], 1, 1)).toBe(true);
      expect(checkDiagonalCross(["S.M", ".A.", "S.M"], 1, 1)).toBe(true);
    });
    it("should return false for invalid vertical MAS cross", () => {
      expect(checkDiagonalCross([".M.", "MAS", ".M."], 1, 1)).toBe(false);
      expect(checkDiagonalCross([".S.", ".AM", ".M."], 1, 1)).toBe(false);
      expect(checkDiagonalCross(["M.S", ".A.", "S.M"], 1, 1)).toBe(false);
    });
  });

  describe("findMASes", () => {
    it("should return 9 for the example input", () => {
      expect(
        findMASes([
          ".M.S......",
          "..A..MSMS.",
          ".M.S.MAA..",
          "..A.ASMSM.",
          ".M.S.M....",
          "..........",
          "S.S.S.S.S.",
          ".A.A.A.A..",
          "M.M.M.M.M.",
          "..........",
        ])
      ).toBe(9);
    });
  });
});
