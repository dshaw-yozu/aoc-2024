import {
  calculateRegionSize,
  findRegions,
  parseInput,
  solution,
} from "./part1";

const firstExample = `AAAA
BBCD
BBCC
EEEC`;

const secondExample = `OOOOO
OXOXO
OOOOO
OXOXO
OOOOO`;

const thirdExample = `RRRRIICCFF
RRRRIICCCF
VVRRRCCFFF
VVRCCCJFFF
VVVVCJJCFE
VVIVCCJJEE
VVIIICJJEE
MIIIIIJJEE
MIIISIJEEE
MMMISSJEEE`;

const simpleRightHangRegion = `AAAAA
ABAAB
BBBBB`;

describe("part1", () => {
  describe("parseInput", () => {
    it("should return input as map", () => {
      const { map } = parseInput(`AB
CD`);
      expect(map.get("0|0")).toStrictEqual({ content: "A", region: undefined });
      expect(map.get("1|0")).toStrictEqual({ content: "B", region: undefined });
      expect(map.get("0|1")).toStrictEqual({ content: "C", region: undefined });
      expect(map.get("1|1")).toStrictEqual({ content: "D", region: undefined });
    });
  });

  describe("findRegions", () => {
    it("should return 5 regions for first example", async () => {
      const input = parseInput(firstExample);
      const regions = await findRegions(input);

      expect(input.map.get("0|0")).toStrictEqual({ content: "A", region: 0 });
      expect(input.map.get("1|0")).toStrictEqual({ content: "A", region: 0 });
      expect(input.map.get("3|1")).toStrictEqual({ content: "D", region: 3 });
      expect(input.map.get("1|1")).toStrictEqual({ content: "B", region: 1 });
      expect(input.map.get("2|2")).toStrictEqual({ content: "C", region: 2 });
      expect(input.map.get("0|3")).toStrictEqual({ content: "E", region: 4 });

      expect(regions).toBe(5);
    });

    it("should return 5 regions for second example", async () => {
      const input = parseInput(secondExample);
      const regions = await findRegions(input);

      expect(input.map.get("0|0")).toStrictEqual({ content: "O", region: 0 });
      expect(input.map.get("2|2")).toStrictEqual({ content: "O", region: 0 });
      expect(input.map.get("4|4")).toStrictEqual({ content: "O", region: 0 });

      expect(input.map.get("1|1")).toStrictEqual({ content: "X", region: 1 });
      expect(input.map.get("3|1")).toStrictEqual({ content: "X", region: 2 });
      expect(input.map.get("1|3")).toStrictEqual({ content: "X", region: 3 });
      expect(input.map.get("3|3")).toStrictEqual({ content: "X", region: 4 });

      expect(regions).toBe(5);
    });

    it("should return 11 regions for second example", async () => {
      const input = parseInput(thirdExample);
      const regions = await findRegions(input);

      expect(regions).toBe(11);
    });

    it("should return 2 regions for rightHang example", async () => {
      const input = parseInput(simpleRightHangRegion);
      const regions = await findRegions(input);

      expect(regions).toBe(2);
    });

    it("should handle super simple example 1", async () => {
      const input = parseInput("AA");
      const regions = await findRegions(input);

      expect(regions).toBe(1);
    });

    it("should handle super simple example 2", async () => {
      const input = parseInput("AB");
      const regions = await findRegions(input);

      expect(regions).toBe(2);
    });
  });

  describe("calculateRegionSize", () => {
    describe("example 1", () => {
      it.each([
        [0, 4, 10],
        [1, 4, 8],
        [2, 4, 10],
        [3, 1, 4],
        [4, 3, 8],
      ])("region %i size %i fences %i", async (id, size, fences) => {
        const input = parseInput(firstExample);
        await findRegions(input);
        expect(calculateRegionSize(input, id)).toStrictEqual({
          size,
          fences,
        });
      });
    });

    describe("example 2", () => {
      it.each([
        [0, 21, 36],
        [1, 1, 4],
        [2, 1, 4],
        [3, 1, 4],
        [4, 1, 4],
      ])("region %i size %i fences %i", async (id, size, fences) => {
        const input = parseInput(secondExample);
        await findRegions(input);
        expect(calculateRegionSize(input, id)).toStrictEqual({
          size,
          fences,
        });
      });
    });

    describe("example 3", () => {
      it.each([
        [0, 12, 18],
        [1, 4, 8],
        [2, 14, 28],
        [3, 10, 18],
        [4, 13, 20],
        [5, 11, 20],
        [6, 1, 4],
        [7, 13, 18],
        [8, 14, 22],
        [9, 5, 12],
        [10, 3, 8],
      ])("region %i size %i fences %i", async (id, size, fences) => {
        const input = parseInput(thirdExample);
        await findRegions(input);
        expect(calculateRegionSize(input, id)).toStrictEqual({
          size,
          fences,
        });
      });
    });
  });

  describe("solution", () => {
    it("should find total price - firstExample", async () => {
      const input = parseInput(firstExample);

      expect(await solution(input)).toBe(140);
    });
    it("should find total price - secondExample", async () => {
      const input = parseInput(secondExample);

      expect(await solution(input)).toBe(772);
    });
    it("should find total price - thirdExample", async () => {
      const input = parseInput(thirdExample);

      expect(await solution(input)).toBe(1930);
    });
  });
});
