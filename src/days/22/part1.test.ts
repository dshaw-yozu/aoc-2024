import {
  getNextSecretNumber,
  getNthSecretNumber,
  mix,
  parseInput,
  prune,
  solution,
} from "./part1";

describe("part1", () => {
  describe("parseInput", () => {
    it("should return list of numbers", () => {
      expect(
        parseInput(`123
222
333`)
      ).toStrictEqual([123n, 222n, 333n]);
    });
  });

  describe("mix", () => {
    it("should handle example", () => {
      expect(mix(42n, 15n)).toBe(37n);
    });
  });

  describe("prune", () => {
    it("should handle example", () => {
      expect(prune(100000000n)).toBe(16113920n);
    });
  });

  describe("getNextSecretNumber", () => {
    it("should handle example", () => {
      expect(getNextSecretNumber(123n)).toBe(15887950n);
    });
  });

  describe("getNthSecretNumber", () => {
    const sequence = [
      15887950n,
      16495136n,
      527345n,
      704524n,
      1553684n,
      12683156n,
      11100544n,
      12249484n,
      7753432n,
      5908254n,
    ];
    it.each(sequence)("%i", (expected) => {
      const n = sequence.findIndex((s) => s === expected) + 1;
      expect(getNthSecretNumber(123n, n)).toBe(expected);
    });
  });

  describe("solution", () => {
    it("should handle example", () => {
      expect(solution([1n, 10n, 100n, 2024n])).toBe(37327623n);
    });
  });
});
