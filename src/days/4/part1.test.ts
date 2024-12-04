import {
  checkBackwards,
  checkDiagonal,
  checkForwards,
  checkVertical,
  findXMAS,
  parseInput,
} from "./part1";

describe("day 4", () => {
  describe("parseInput", () => {
    it("should return list of lines", () => {
      expect(parseInput(`XMAS\nXMAS\nXMAS\nXMAS`)).toStrictEqual([
        "XMAS",
        "XMAS",
        "XMAS",
        "XMAS",
      ]);
    });
  });

  describe("checkers", () => {
    describe("checkForward", () => {
      it("should return true", () => {
        expect(checkForwards(["XMAS"], 0, 0)).toBe(true);
      });

      it("should return false", () => {
        expect(checkForwards(["XMAS"], 0, 1)).toBe(false);
      });
    });

    describe("checkBackwards", () => {
      it("should return true", () => {
        expect(checkBackwards(["SAMX"], 0, 3)).toBe(true);
      });

      it("should return false", () => {
        expect(checkBackwards(["SAMX"], 0, 1)).toBe(false);
      });
    });

    describe("checkVertical", () => {
      it("should return true", () => {
        expect(checkVertical(["X", "M", "A", "S"], 0, 0)).toBe(true);
      });
      it("should return false", () => {
        expect(checkVertical(["X", "X", "A", "S"], 0, 0)).toBe(false);
      });
    });

    describe("checkVertical - backwards", () => {
      it("should return false", () => {
        expect(checkVertical(["X", "M", "A", "S"], 0, 0, true)).toBe(false);
      });
      it("should return true", () => {
        expect(checkVertical(["S", "A", "M", "X"], 3, 0, true)).toBe(true);
      });
    });

    describe("checkDiagonal - down - right", () => {
      it("should return true", () => {
        expect(
          checkDiagonal(["X...", ".M..", "..A.", "...S"], 0, 0, false, true)
        ).toBe(true);
      });
    });

    describe("checkDiagonal - down - left", () => {
      it("should return true", () => {
        expect(
          checkDiagonal(["...X", "..M.", ".A..", "S..."], 0, 3, false, false)
        ).toBe(true);
      });
    });

    describe("checkDiagonal - up - right", () => {
      it("should return true", () => {
        expect(
          checkDiagonal(["...S", "..A.", ".M..", "X..."], 3, 0, true, true)
        ).toBe(true);
      });
    });

    describe("checkDiagonal - up - left", () => {
      it("should return true", () => {
        expect(
          checkDiagonal(["S...", ".A..", "..M.", "...X"], 3, 3, true, false)
        ).toBe(true);
      });
    });
  });

  describe("findXMAS", () => {
    it("should find horizontal", () => {
      expect(findXMAS(["XMAS"])).toBe(1);
    });
    it("should find backwards horizontal xmas", () => {
      expect(findXMAS(["SAMX"])).toBe(1);
    });
    it("should find vertial xmas", () => {
      expect(findXMAS(["X", "M", "A", "S"])).toBe(1);
    });
    it("should find backwards vertical xmas", () => {
      expect(findXMAS(["S", "A", "M", "X"])).toBe(1);
    });
    it("should find diagonal xmas", () => {
      expect(findXMAS(["X...", ".M..", "..A.", "...S"])).toBe(1);
    });
    it("should find backwards diagonal xmas", () => {
      expect(findXMAS(["S...", ".A..", "..M.", "...X"])).toBe(1);
    });
    it("should find other diagonal xmas", () => {
      expect(findXMAS(["...X", "..M.", ".A..", "S..."])).toBe(1);
    });

    it("should find other backwards diagonal xmas", () => {
      expect(findXMAS(["...S", "..A.", ".M..", "X..."])).toBe(1);
    });

    it("should find multiple XMAS", () => {
      expect(findXMAS(["XMAS", "..A.", ".M..", "X..."])).toBe(2);
      expect(findXMAS(["XMAS", "..AA", ".M.M", "X..X"])).toBe(3);
    });
  });
});
