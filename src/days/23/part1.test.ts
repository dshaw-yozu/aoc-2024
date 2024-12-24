import { findTripleConnections, parseInput, solution } from "./part1";

const exampleInput = `kh-tc
qp-kh
de-cg
ka-co
yn-aq
qp-ub
cg-tb
vc-aq
tb-ka
wh-tc
yn-cg
kh-ub
ta-co
de-co
tc-td
tb-wq
wh-td
ta-ka
td-qp
aq-cg
wq-ub
ub-vc
de-ta
wq-aq
wq-vc
wh-yn
ka-de
kh-ta
co-tc
wh-qp
tb-vc
td-yn`;
describe("part1", () => {
  describe("parseInput", () => {
    it("should return list of connections", () => {
      expect(
        parseInput(`kh-tc
qp-kh
de-cg`)
      ).toStrictEqual({
        kh: new Set(["tc", "qp"]),
        tc: new Set(["kh"]),
        qp: new Set(["kh"]),
        de: new Set(["cg"]),
        cg: new Set(["de"]),
      });
    });
  });

  describe("findTripleConnections", () => {
    it("should return list of triple connected", () => {
      expect(
        findTripleConnections(
          parseInput(`a-b
b-c
c-a
b-d
d-a`)
        )
      ).toStrictEqual(["a,b,c", "a,b,d"]);
    });

    it("should handle example input", () => {
      const result = findTripleConnections(parseInput(exampleInput));
      expect(result).toStrictEqual([
        "kh,qp,ub",
        "tc,td,wh",
        "qp,td,wh",
        "co,de,ka",
        "co,de,ta",
        "de,ka,ta",
        "aq,cg,yn",
        "co,ka,ta",
        "td,wh,yn",
        "aq,vc,wq",
        "ub,vc,wq",
        "tb,vc,wq",
      ]);
    });
  });

  describe("solution", () => {
    it("should handle example", () => {
      expect(solution(parseInput(exampleInput))).toBe(7);
    });
  });
});
