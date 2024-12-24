import {
  createCalculation,
  executeCalculation,
  parseInput,
  findValidOperatorCombinations,
  permutate,
  solution,
} from "./part1";
const rawText = `190: 10 19
3267: 81 40 27
83: 17 5
156: 15 6
7290: 6 8 6 15
161011: 16 10 13
192: 17 8 14
21037: 9 7 18 13
292: 11 6 16 20`;
describe("day 7", () => {
  describe("parseInput", () => {
    expect(parseInput(rawText)).toStrictEqual([
      {
        numbers: [10, 19],
        target: 190,
      },
      {
        numbers: [81, 40, 27],
        target: 3267,
      },
      {
        numbers: [17, 5],
        target: 83,
      },
      {
        numbers: [15, 6],
        target: 156,
      },
      {
        numbers: [6, 8, 6, 15],
        target: 7290,
      },
      {
        numbers: [16, 10, 13],
        target: 161011,
      },
      {
        numbers: [17, 8, 14],
        target: 192,
      },
      {
        numbers: [9, 7, 18, 13],
        target: 21037,
      },
      {
        numbers: [11, 6, 16, 20],
        target: 292,
      },
    ]);
  });

  describe("permute", () => {
    it("should return all combinations", () => {
      expect(permutate(["+", "*"], 1)).toStrictEqual([["+"], ["*"]]);
    });
    expect(permutate(["+", "*"], 2)).toStrictEqual([
      ["+", "+"],
      ["+", "*"],
      ["*", "+"],
      ["*", "*"],
    ]);

    expect(permutate(["+", "*"], 3)).toHaveLength(8);
  });

  describe("createCalculation", () => {
    it("should return operation as a string", () => {
      expect(createCalculation([1, 2], ["+"])).toStrictEqual([1, "+", 2]);
    });
  });

  describe("executeCalculation", () => {
    it("should execute operations from left to right", () => {
      expect(executeCalculation([1, "+", 2])).toBe(3);
      expect(executeCalculation([1, "+", 2, "*", 3])).toBe(9);
    });
  });

  describe("findValidOperatorCombinations", () => {
    it("should return 1 for input with one combination", () => {
      expect(
        findValidOperatorCombinations({ target: 190, numbers: [10, 19] })
      ).toBe(1);
    });

    it("should return 2 for input with 2 combinations", () => {
      expect(
        findValidOperatorCombinations({ target: 3267, numbers: [81, 40, 27] })
      ).toBe(2);
    });
  });

  describe("solution", () => {
    it("should return expected answer from example", () => {
      const inputs = parseInput(rawText);

      expect(solution(inputs)).toBe(3749);
    });
  });
});
