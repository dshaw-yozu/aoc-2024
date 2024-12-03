import { solution } from "./part2";

describe("solution", () => {
  it("should attempt return 1 for a report that has 1 abnormal level", () => {
    expect(solution([[1, 3, 2, 4, 5]])).toBe(1);
  });

  it("should attempt return 0 for a report that has 2 abnormal level", () => {
    expect(solution([[1, 1, 3, 2, 4, 5]])).toBe(0);
  });

  it("should attempt return 0 for a report that has 2 abnormal level", () => {
    expect(solution([[1, 5, 2, 4, 5]])).toBe(1);
  });

  it("should attempt return 0 for a report that has 2 abnormal level", () => {
    expect(solution([[1, 5, 2, 4, 4]])).toBe(0);
  });

  it("should handle example", () => {
    expect(
      solution([
        [7, 6, 4, 2, 1],
        [1, 2, 7, 8, 9],
        [9, 7, 6, 2, 1],
        [1, 3, 2, 4, 5],
        [8, 6, 4, 4, 1],
        [1, 3, 6, 7, 9],
      ])
    ).toBe(4);
  });

  it("should handle case where there are numbers pairs", () => {
    expect(solution([[13, 12, 9, 6, 5, 5]])).toBe(1);
    expect(solution([[13, 13, 12, 9, 6, 5, 5]])).toBe(0);
  });
});
