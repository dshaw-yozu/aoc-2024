import { dikstras } from "../../dikstra/index";
import {
  convertPathToDPad,
  DirectionPadButtons,
  dPadButtons,
  enterDPadSequence,
  enterNumPadSequence,
  getComplexity,
  getNumPadGraph,
  numPadButtons,
  solution,
  unlockDoor,
} from "./part1";

describe("part 1", () => {
  describe("getNumPadGraph", () => {
    it("should return graph", () => {
      const graph = getNumPadGraph();

      expect(graph.size).toBe(11);
    });
    it("should return expected paths", () => {
      const graph = getNumPadGraph();

      const path = dikstras({
        graph,
        start: numPadButtons[7],
        end: numPadButtons.A,
      });

      expect(path).toStrictEqual([
        numPadButtons[7],
        numPadButtons[4],
        numPadButtons[1],
        numPadButtons[2],
        numPadButtons[0],
        numPadButtons.A,
      ]);
    });
  });

  describe("convertPathToDPad", () => {
    it("should return dpad string", () => {
      const { string, path } = convertPathToDPad([
        numPadButtons[7],
        numPadButtons[4],
        numPadButtons[1],
        numPadButtons[2],
        numPadButtons[0],
        numPadButtons.A,
      ]);
      expect(string).toBe("vv>v>A");
      expect(path).toStrictEqual([
        dPadButtons.v,
        dPadButtons.v,
        dPadButtons[">"],
        dPadButtons.v,
        dPadButtons[">"],
        dPadButtons.A,
      ]);
    });
  });

  describe("enterNumPadSequence", () => {
    it("should handle example", () => {
      expect(enterNumPadSequence(["0", "2", "9", "A"]).string).toBe(
        "<A^A>^^AvvvA"
      );
      expect(enterNumPadSequence(["0", "2", "9", "A"]).path).toStrictEqual([
        [0, 1],
        [2, 0],
        [1, 0],
        [2, 0],
        [2, 1],
        [1, 0],
        [1, 0],
        [2, 0],
        [1, 1],
        [1, 1],
        [1, 1],
        [2, 0],
      ]);
    });
  });
  describe("enterDPadSequence", () => {
    const numberSequence = enterNumPadSequence([
      "0",
      "2",
      "9",
      "A",
    ]).string.split("") as DirectionPadButtons[];

    const level1Sequence = enterDPadSequence(numberSequence);

    const level2Sequence = enterDPadSequence(
      level1Sequence.string.split("") as DirectionPadButtons[]
    );
    it("should handle simple example", () => {
      expect(level1Sequence.string.length).toBe(28);
    });
    it("should handle example 2", () => {
      expect(level2Sequence.string).toBe(
        "<vA<AA>>^AvAA<^A>A<v<A>>^AvA^A<vA>^A<v<A>^A>AAvA^A<v<A>A>^AAAvA<^A>A"
      );
      expect(level2Sequence.string.length).toBe(68);
    });
  });
  describe("unlockDoor", () => {
    it("should handle example 1", () => {
      const sequence = unlockDoor(["0", "2", "9", "A"]);
      console.log(sequence);
      expect(sequence.length).toBe(68);
    });
    it("should handle example 2", () => {
      expect(unlockDoor(["9", "8", "0", "A"]).length).toBe(60);
    });
    it("should handle example 3", () => {
      expect(unlockDoor(["1", "7", "9", "A"]).length).toBe(68);
    });
    it("should handle example 4", () => {
      expect(unlockDoor(["4", "2", "9", "A"]).length).toBe(64);
    });
    it("should handle example 5", () => {
      expect(unlockDoor(["3", "7", "9", "A"]).length).toBe(64);
    });
  });

  describe("getComplexity", () => {
    it("should return complexity", () => {
      expect(getComplexity("029A", "12345")).toBe(145);
    });
  });

  describe("solution", () => {
    it("should handle example", () => {
      expect(solution(["029A", "980A", "179A", "456A", "379A"])).toBe(126384);
    });
  });
});
