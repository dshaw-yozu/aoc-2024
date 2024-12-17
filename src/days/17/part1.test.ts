import { bitwiseXOR, getCombo, parseInput, solution } from "./part1";

const example = `Register A: 729
Register B: 0
Register C: 0

Program: 0,1,5,4,3,0`;

describe("part1", () => {
  describe("parseInput", () => {
    it("should handle simple example", () => {
      const output = parseInput(example);
      expect(output.registry.get("A")!).toBe(729);
      expect(output.registry.get("B")!).toBe(0);
      expect(output.registry.get("C")!).toBe(0);

      expect(output.program).toStrictEqual([0, 1, 5, 4, 3, 0]);
    });
  });

  describe("solution", () => {
    it("should handle example", () => {
      expect(solution(parseInput(example))).toBe("4,6,3,5,6,3,5,2,1,0");
    });

    it("should handle example 1", () => {
      const example = `Register A: 0
        Register B: 0
        Register C: 9
        
        Program: 2,6`;

      const input = parseInput(example);

      solution(input);

      expect(input.registry.get("B")).toBe(1);
    });

    it("should handle example 2", () => {
      const example = `Register A: 10
          Register B: 0
          Register C: 0
          
          Program: 5,0,5,1,5,4`;

      const input = parseInput(example);

      expect(solution(input)).toBe("0,1,2");
    });

    it("should handle example 3", () => {
      const example = `Register A: 2024
            Register B: 0
            Register C: 0
            
            Program: 0,1,5,4,3,0`;

      const input = parseInput(example);

      expect(solution(input)).toBe("4,2,5,6,7,7,7,7,3,1,0");
      expect(input.registry.get("A")).toBe(0);
    });

    it("should handle example 4", () => {
      const example = `Register A: 0
              Register B: 29
              Register C: 0
              
              Program: 1,7`;

      const input = parseInput(example);
      solution(input);

      expect(input.registry.get("B")).toBe(26);
    });

    it("should handle example 5", () => {
      const example = `Register A: 0
                Register B: 2024
                Register C: 43690
                
                Program: 4,0`;

      const input = parseInput(example);
      solution(input);

      expect(input.registry.get("B")).toBe(44354);
    });
  });

  describe("bitwiseXOR", () => {
    it("should return bitwise result", () => {
      expect(bitwiseXOR(0, 0)).toBe(0);
      expect(bitwiseXOR(0, 1)).toBe(1);
      expect(bitwiseXOR(1, 1)).toBe(0);

      //101 - 5
      //011 - 3
      //  =
      //110 - 6
      expect(bitwiseXOR(5, 3)).toBe(6);
    });
  });

  describe("getCombo", () => {
    it("should return expected combo value", () => {
      const example = `Register A: 44
        Register B: 55
        Register C: 66
        
        Program: 4,0`;

      const { registry } = parseInput(example);

      expect(getCombo(registry, 0)).toBe(0);
      expect(getCombo(registry, 1)).toBe(1);
      expect(getCombo(registry, 2)).toBe(2);
      expect(getCombo(registry, 3)).toBe(3);

      expect(getCombo(registry, 4)).toBe(44);
      expect(getCombo(registry, 5)).toBe(55);
      expect(getCombo(registry, 6)).toBe(66);
    });
  });
});
