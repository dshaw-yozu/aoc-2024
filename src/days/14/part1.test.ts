import {
  findSafetyFactor,
  moveRobot,
  moveRobots,
  parseInput,
  Position,
  Velocity,
  wrap,
} from "./part1";

const exampleInput = `p=0,4 v=3,-3
p=6,3 v=-1,-3`;

const fullExampleInput = `p=0,4 v=3,-3
p=6,3 v=-1,-3
p=10,3 v=-1,2
p=2,0 v=2,-1
p=0,0 v=1,3
p=3,0 v=-2,-2
p=7,6 v=-1,-3
p=3,0 v=-1,-2
p=9,3 v=2,3
p=7,3 v=-1,2
p=2,4 v=2,-3
p=9,5 v=-3,-3`;

const exampleWidth = 11;
const exampleHeight = 7;
describe("day 14", () => {
  describe("parseInput", () => {
    expect(parseInput(exampleInput)).toStrictEqual([
      [
        [0, 4],
        [3, -3],
      ],
      [
        [6, 3],
        [-1, -3],
      ],
    ]);
  });

  describe("wrap", () => {
    it("should return existing if not wrapped", () => {
      expect(wrap(1, 0, 10)).toBe(1);
    });

    it("should return wrapped lower to upper", () => {
      expect(wrap(-1, 0, 10)).toBe(10);
    });

    it("should return wrapped upper to lower", () => {
      expect(wrap(11, 0, 10)).toBe(0);
    });
  });

  describe("moveRobot", () => {
    it("should move robot", () => {
      expect(
        moveRobot(
          [
            [2, 4],
            [2, -3],
          ],
          exampleWidth,
          exampleHeight
        )
      ).toStrictEqual([
        [4, 1],
        [2, -3],
      ]);
    });

    it("should wrap around - top", () => {
      expect(
        moveRobot(
          [
            [0, 0],
            [0, -1],
          ],
          exampleWidth,
          exampleHeight
        )
      ).toStrictEqual([
        [0, exampleHeight - 1],
        [0, -1],
      ]);
    });

    it("should wrap around - top and side", () => {
      expect(
        moveRobot(
          [
            [0, 0],
            [-1, -1],
          ],
          exampleWidth,
          exampleHeight
        )
      ).toStrictEqual([
        [exampleWidth - 1, exampleHeight - 1],
        [-1, -1],
      ]);
    });
  });

  describe("moveRobots", () => {
    const startPosition: Position = [2, 4];
    const velocity: Velocity = [2, -3];
    it.each<[number, Position]>([
      [1, [4, 1]],
      [2, [6, 5]],
      [3, [8, 2]],
      [4, [10, 6]],
      [5, [1, 3]],
    ])("it should move $i steps", (step, position) => {
      expect(
        moveRobots(
          [[startPosition, velocity]],
          step,
          exampleWidth,
          exampleHeight
        )[0][0]
      ).toStrictEqual(position);
    });
    it("should move 2 step", () => {
      expect(
        moveRobots(
          [
            [
              [2, 4],
              [2, -3],
            ],
          ],
          2,
          exampleWidth,
          exampleHeight
        )
      ).toStrictEqual([
        [
          [6, 5],
          [2, -3],
        ],
      ]);
    });
  });

  describe("findSafetyFactor", () => {
    it("should return robots in each quadrant", () => {
      expect(
        findSafetyFactor(
          [
            ...new Array(1).fill([
              [0, 0],
              [0, 0],
            ]),
            ...new Array(2).fill([
              [exampleWidth - 1, 0],
              [0, 0],
            ]),

            ...new Array(3).fill([
              [0, exampleHeight - 1],
              [0, 0],
            ]),
            ...new Array(4).fill([
              [exampleWidth - 1, exampleHeight - 1],
              [0, 0],
            ]),
          ],
          exampleWidth,
          exampleHeight
        )
      ).toStrictEqual({ safetyFactor: 24, quadrants: [1, 2, 3, 4] });
    });

    it("should return robots in each quadrant", () => {
      expect(
        findSafetyFactor(
          parseInput(fullExampleInput),
          exampleWidth,
          exampleHeight
        )
      ).toStrictEqual({ safetyFactor: 0, quadrants: [4, 0, 2, 2] });
    });

    it("should return robots in each quadrant - robot on boundary", () => {
      expect(
        findSafetyFactor(
          [
            [
              [0, 3],
              [0, 0],
            ],
          ],
          exampleWidth,
          exampleHeight
        )
      ).toStrictEqual({ safetyFactor: 0, quadrants: [0, 0, 0, 0] });
    });
  });
});
