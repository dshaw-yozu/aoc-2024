import { isReportSafe, isSorted, parseInput, solution } from "./part1";

describe("day 2", () => {
  describe("parseInput", () => {
    it("should return a list of level reports", () => {
      expect(parseInput(`1 2 3 4 5\n2 3 4 5 6\n7 8 9 10 11`)).toStrictEqual([
        [1, 2, 3, 4, 5],
        [2, 3, 4, 5, 6],
        [7, 8, 9, 10, 11],
      ]);
    });
  });

  describe("isSorted", () => {
    it("ascending list is provided", () => {
      expect(isSorted([1, 2, 3, 4], true)).toBe(true);
      expect(isSorted([1, 2, 3, 4], false)).toBe(false);
    });

    it("decending list is provided", () => {
      expect(isSorted([4, 3, 2, 1], true)).toBe(false);
      expect(isSorted([4, 3, 2, 1], false)).toBe(true);
    });

    it("unsorted list is provided", () => {
      expect(isSorted([3, 4, 2, 1], false)).toBe(false);
      expect(isSorted([3, 4, 2, 1], true)).toBe(false);
    });
  });

  describe("isReportSafe", () => {
    test("all ascending", () => {
      expect(isReportSafe([1, 2, 3])).toBe(true);
    });

    test("all decreasing", () => {
      expect(isReportSafe([3, 2, 1])).toBe(true);
    });

    test("fluxuating", () => {
      // Any two adjacent levels differ by at least one and at most three.
      expect(isReportSafe([1, 3, 5, 7])).toBe(true);
      expect(isReportSafe([1, 4, 8])).toBe(false); // over 3 jump on unsorted array
      expect(isReportSafe([1, 1, 3, 4])).toBe(false); // equal levels on unsorted array
    });
  });

  describe("solution", () => {
    expect(
      solution([
        [1, 2, 3],
        [3, 2, 1],
        [1, 3, 2, 0],
      ])
    ).toBe(2);

    expect(
      solution([
        [7, 6, 4, 2, 1],
        [1, 2, 7, 8, 9],
        [9, 7, 6, 2, 1],
        [8, 6, 4, 4, 1],
        [1, 3, 6, 7, 9],
      ])
    ).toBe(2);
  });
});
