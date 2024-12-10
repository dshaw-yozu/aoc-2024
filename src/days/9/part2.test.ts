import { parseInput } from "./part1";
import { rawInput } from "./part1.test";
import { compressIntact, insertAtIndex } from "./part2";

describe("part2", () => {
  describe("insertAtIndex", () => {
    it("should add to array at index", () => {
      expect(insertAtIndex([], 0, "a")).toStrictEqual(["a"]);
      expect(insertAtIndex(["a"], 0, "b")).toStrictEqual(["a", "b"]);

      expect(insertAtIndex(["a"], 1, "b")).toStrictEqual(["a", "b"]);
      expect(insertAtIndex(["a", "a"], 1, "b")).toStrictEqual(["a", "b", "a"]);
    });

    it("should insert object at index", () => {
      expect(
        insertAtIndex<Record<string, boolean>>([{ a: true }, { b: true }], 1, {
          c: true,
        })
      ).toStrictEqual([{ a: true }, { c: true }, { b: true }]);
    });
  });
  describe("compressIntact", () => {
    it("should move entire files if possible", () => {
      expect(
        compressIntact([0, undefined, undefined, 2, 3, 4, 4, 4])
      ).toStrictEqual([0, 3, 2, undefined, undefined, 4, 4, 4]);
    });

    it("should handle example input", () => {
      expect(compressIntact(parseInput(rawInput))).toStrictEqual([
        0,
        0,
        9,
        9,
        2,
        1,
        1,
        1,
        7,
        7,
        7,
        undefined,
        4,
        4,
        undefined,
        3,
        3,
        3,
        undefined,
        undefined,
        undefined,
        undefined,
        5,
        5,
        5,
        5,
        undefined,
        6,
        6,
        6,
        6,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        8,
        8,
        8,
        8,
        undefined,
        undefined,
      ]);
    });
  });
});
