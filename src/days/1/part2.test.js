const part2 = require("./part2");

describe("part2", () => {
  it("basic similarity score", () => {
    expect(part2.solution({ leftList: [1], rightList: [] })).toBe(0);
    expect(part2.solution({ leftList: [1], rightList: [1, 1, 1] })).toBe(3);
  });
});
