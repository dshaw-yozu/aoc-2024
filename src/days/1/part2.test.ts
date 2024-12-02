import { part2Solution } from "./part2";

describe("part2", () => {
  it("basic similarity score", () => {
    expect(part2Solution([1], [])).toBe(0);
    expect(part2Solution([1], [1, 1, 1])).toBe(3);
  });
});
