import {
  checkRule,
  middlePage,
  ParsedInput,
  parseInput,
  Rule,
  solution,
} from "./part1";

export const parsedRules: Rule[] = [
  [47, 53],
  [97, 13],
  [97, 61],
  [97, 47],
  [75, 29],
  [61, 13],
  [75, 53],
  [29, 13],
  [97, 29],
  [53, 29],
  [61, 53],
  [97, 53],
  [61, 29],
  [47, 13],
  [75, 47],
  [97, 75],
  [47, 61],
  [75, 61],
  [47, 29],
  [75, 13],
  [53, 13],
];

describe("part1", () => {
  describe("parseInput", () => {
    let result: ParsedInput;

    beforeEach(() => {
      result = parseInput(`47|53
97|13
97|61
97|47
75|29
61|13
75|53
29|13
97|29
53|29
61|53
97|53
61|29
47|13
75|47
97|75
47|61
75|61
47|29
75|13
53|13

75,47,61,53,29
97,61,53,29,13
75,29,13
75,97,47,61,53
61,13,29
97,13,75,29,47
`);
    });
    it("should return expected rules", () => {
      expect(result.rules).toStrictEqual(parsedRules);
    });

    it("should return expected pageMaps", () => {
      expect(Object.fromEntries(result.pageMaps[0])).toStrictEqual({
        29: 4,
        47: 1,
        53: 3,
        61: 2,
        75: 0,
      });
      expect(Object.fromEntries(result.pageMaps[1])).toStrictEqual({
        13: 4,
        29: 3,
        53: 2,
        61: 1,
        97: 0,
      });
    });
  });

  describe("checkRule", () => {
    it("should return true for valid rule", () => {
      const map = new Map().set(1, 0).set(10, 1);
      expect(checkRule([1, 10], map)).toBe(true);
    });

    it("should return false for invalid rule", () => {
      const map = new Map().set(1, 1).set(10, 0);
      expect(checkRule([1, 10], map)).toBe(false);
    });
  });

  describe("middlePage", () => {
    it("should return middle entry in map", () => {
      expect(middlePage([0, 10, 20])).toBe(10);
    });

    it("should return middle entry in map - even list", () => {
      expect(middlePage([0, 10, 20, 30])).toBe(20);
    });
  });

  describe("solution", () => {
    it("should return middle number for valid page map", () => {
      const map = new Map()
        .set(29, 4)
        .set(47, 1)
        .set(53, 3)
        .set(61, 2)
        .set(75, 0);

      expect(
        solution({
          rules: parsedRules,
          pageMaps: [map],
          pagesList: [[75, 47, 61, 53, 29]],
        })
      ).toBe(61);
    });
  });
});
