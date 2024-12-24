import { executeGates, getNumber, parseInput, solution } from "./part1";

const exampleInput = `x00: 1
x01: 1
x02: 1
y00: 0
y01: 1
y02: 0

x00 AND y00 -> z00
x01 XOR y01 -> z01
x02 OR y02 -> z02`;
describe("part1", () => {
  describe("parseInput", () => {
    it("should return gates and wires", () => {
      const result = parseInput(exampleInput);
      expect(result.gates).toStrictEqual([
        { a: "x00", b: "y00", output: "z00", operator: "AND", executed: false },
        { a: "x01", b: "y01", output: "z01", operator: "XOR", executed: false },
        { a: "x02", b: "y02", output: "z02", operator: "OR", executed: false },
      ]);
      expect(result.wires).toStrictEqual({
        x00: 1,
        x01: 1,
        x02: 1,
        y00: 0,
        y01: 1,
        y02: 0,
        z00: undefined,
        z01: undefined,
        z02: undefined,
      });
    });
  });

  describe("executeGates", () => {
    it("should handle example", () => {
      const result = executeGates(parseInput(exampleInput));
      expect(result.z00).toBe(0);
      expect(result.z01).toBe(0);
      expect(result.z02).toBe(1);
    });
  });

  describe("getNumber", () => {
    it("should handle example", () => {
      const result = getNumber(executeGates(parseInput(exampleInput)));
      expect(result).toBe(4);
    });
  });

  describe("solution", () => {
    it("should handle example", () => {
      expect(solution(parseInput(exampleInput))).toBe(4);
    });
  });
});
