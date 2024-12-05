import { createPageMap } from "./part1";
import { parsedRules } from "./part1.test";
import { correctPageList, getIncorrect, solution } from "./part2";

describe("part2", () => {
  describe("getIncorrect", () => {
    it("should return incorrect page lists", () => {
      const invalidList = [75, 97, 47, 61, 53];
      const invalidMap = createPageMap(invalidList);

      const validList = [75, 47, 61, 53, 29];
      const validMap = createPageMap(validList);

      const result = getIncorrect({
        rules: parsedRules,
        pageMaps: [invalidMap, validMap],
        pagesList: [invalidList, validList],
      });
      expect(result.pageLists).toStrictEqual([invalidList]);
      expect(Object.fromEntries(result.pageMaps[0])).toStrictEqual({
        "75": 0,
        "97": 1,
        "47": 2,
        "61": 3,
        "53": 4,
      });
    });
  });

  describe("correctPageList", () => {
    it("should return correct page list", () => {
      expect(correctPageList(parsedRules, [75, 97, 47, 61, 53])).toStrictEqual([
        97, 75, 47, 61, 53,
      ]);

      expect(correctPageList(parsedRules, [61, 13, 29])).toStrictEqual([
        61, 29, 13,
      ]);
    });

    it("should handle several reorders", () => {
      expect(correctPageList(parsedRules, [97, 13, 75, 29, 47])).toStrictEqual([
        97, 75, 47, 29, 13,
      ]);
    });
  });

  describe("solution", () => {
    it("should return correct value", () => {
      const invalidList = [61, 13, 29];
      const invalidMap = createPageMap(invalidList);

      const validList = [75, 47, 61, 53, 29];
      const validMap = createPageMap(validList);
      expect(
        solution({
          rules: parsedRules,
          pageMaps: [invalidMap, validMap],
          pagesList: [invalidList, validList],
        })
      ).toBe(29);
    });
  });
});
