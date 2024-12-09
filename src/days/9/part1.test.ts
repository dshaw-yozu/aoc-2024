import { checksum, compressDisc, parseInput, replaceAt } from "./part1";

export const rawInput = `2333133121414131402`;
describe("day 7", () => {
  describe("parseInput", () => {
    it("simple input", () => {
      expect(parseInput("12345")).toStrictEqual([
        0,
        undefined,
        undefined,
        1,
        1,
        1,
        undefined,
        undefined,
        undefined,
        undefined,
        2,
        2,
        2,
        2,
        2,
      ]);
    });

    it("example input", () => {
      expect(parseInput(rawInput)).toStrictEqual([
        0,
        0,
        undefined,
        undefined,
        undefined,
        1,
        1,
        1,
        undefined,
        undefined,
        undefined,
        2,
        undefined,
        undefined,
        undefined,
        3,
        3,
        3,
        undefined,
        4,
        4,
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
        7,
        7,
        7,
        undefined,
        8,
        8,
        8,
        8,
        9,
        9,
      ]);
    });

    it("handles ids greater than 9", () => {
      expect(parseInput("101010101010101010101010")).toStrictEqual([
        0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11,
      ]);
    });
  });

  describe("replaceAt", () => {
    it("should replace", () => {
      expect(replaceAt("aaaa", 0, "A")).toBe("Aaaa");
    });
  });

  describe("compressDisc", () => {
    it("should handle simple input", () => {
      expect(compressDisc(parseInput("12345"))).toStrictEqual([
        0,
        2,
        2,
        1,
        1,
        1,
        2,
        2,
        2,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
      ]);
    });
    it("example input", () => {
      expect(compressDisc(parseInput(rawInput))).toStrictEqual([
        0,
        0,
        9,
        9,
        8,
        1,
        1,
        1,
        8,
        8,
        8,
        2,
        7,
        7,
        7,
        3,
        3,
        3,
        6,
        4,
        4,
        6,
        5,
        5,
        5,
        5,
        6,
        6,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
      ]);
    });
  });

  describe("checksum", () => {
    it("should handle example", () => {
      expect(checksum(compressDisc(parseInput(rawInput)))).toBe(1928);
    });
  });
});
