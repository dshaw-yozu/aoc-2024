import { coordToString } from "../10/part1";
import {
  Direction,
  executeMoves,
  moveRobot,
  parseInput,
  solution,
  Tiles,
} from "./part1";

const exampleInput = `##########
#..O..O.O#
#......O.#
#.OO..O.O#
#..O@..O.#
#O#..O...#
#O..O..O.#
#.OO.O.OO#
#....O...#
##########

<vv>^<v^>v>^vv^v>v<>v^v<v<^vv<<<^><<><>>v<vvv<>^v^>^<<<><<v<<<v^vv^v>^
vvv<<^>^v^^><<>>><>^<<><^vv^^<>vvv<>><^^v>^>vv<>v<<<<v<^v>^<^^>>>^<v<v
><>vv>v^v^<>><>>>><^^>vv>v<^^^>>v^v^<^^>v^^>v^<^v>v<>>v^v^<v>v^^<^^vv<
<<v<^>>^^^^>>>v^<>vvv^><v<<<>^^^vv^<vvv>^>v<^^^^v<>^>vvvv><>>v^<<^^^^^
^><^><>>><>^^<<^^v>>><^<v>^<vv>>v>>>^v><>^v><<<<v>>v<v<v>vvv>^<><<>^><
^>><>^v<><^vvv<^^<><v<<<<<><^v<<<><<<^^<v<^^^><^>>^<v^><<<^>>^v<v^v<v^
>^>>^v>vv>^<<^v<>><<><<v<<v><>v<^vv<<<>^^v^>^^>>><<^v>>v^v><^^>>^<>vv^
<><^^>^^^<><vvvvv^v<v<<>^v<v>v<<^><<><<><<<^^<<<^<<>><<><^^^>^^<>^>v<>
^^>vv<^v^v<vv>^<><v<^v>^^^>>>^^vvv^>vvv<>>>^<^>>>>>^<<^v>^vvv<>^<><<v>
v^^>>><<^^<>>^v^<v^vv<>v^<<>^<^v^v><^<<<><<^<v><v<>vv>>v><v^<vv<>v^<<^`;

const smallExample = `########
#..O.O.#
##@.O..#
#...O..#
#.#.O..#
#...O..#
#......#
########

<^^>>>vv<v>>v<<`;
describe("part1", () => {
  describe("parseInput", () => {
    it("should handle example input", () => {
      const output = parseInput(exampleInput);
      expect(output.map.get("0|0")).toBe(Tiles.WALL);
      expect(output.instructions).toMatch(/^<vv>\^<v/);
      expect(output.initialPosition).toStrictEqual([4, 4]);
    });
  });

  describe("moveRobot", () => {
    it("should move if moving into space", () => {
      const output = parseInput("#.@");

      expect(
        moveRobot(output.map, Direction.LEFT, output.initialPosition)
      ).toStrictEqual([1, 0]);
      expect(output.map.get(coordToString(1, 0))).toBe(Tiles.ROBOT);
      expect(output.map.get(coordToString(2, 0))).toBe(Tiles.EMPTY);
    });

    it("should move if moving barrel into space", () => {
      const output = parseInput("#.O@");

      expect(
        moveRobot(output.map, Direction.LEFT, output.initialPosition)
      ).toStrictEqual([2, 0]);

      expect(output.map.get(coordToString(1, 0))).toBe(Tiles.BARREL);
      expect(output.map.get(coordToString(2, 0))).toBe(Tiles.ROBOT);
      expect(output.map.get(coordToString(3, 0))).toBe(Tiles.EMPTY);
    });

    it("should move multiple barrel into space", () => {
      const output = parseInput("#.OO@");

      expect(
        moveRobot(output.map, Direction.LEFT, output.initialPosition)
      ).toStrictEqual([3, 0]);

      expect(output.map.get(coordToString(1, 0))).toBe(Tiles.BARREL);
      expect(output.map.get(coordToString(2, 0))).toBe(Tiles.BARREL);
      expect(output.map.get(coordToString(3, 0))).toBe(Tiles.ROBOT);
      expect(output.map.get(coordToString(4, 0))).toBe(Tiles.EMPTY);
    });
    it("should not move if moving into wall", () => {
      const output = parseInput("#@");

      expect(
        moveRobot(output.map, Direction.LEFT, output.initialPosition)
      ).toStrictEqual(output.initialPosition);
    });

    it("should not move if moving barrel into wall", () => {
      const output = parseInput("#O@");

      expect(
        moveRobot(output.map, Direction.LEFT, output.initialPosition)
      ).toStrictEqual(output.initialPosition);
    });

    it("should not move if moving barrels into wall", () => {
      const output = parseInput("#OO@");

      expect(
        moveRobot(output.map, Direction.LEFT, output.initialPosition)
      ).toStrictEqual(output.initialPosition);
    });
  });

  describe("executeMoves", () => {
    it("should match small example", () => {
      const input = parseInput(smallExample);
      executeMoves(input);
      expect(input.map.get(coordToString(4, 4))).toBe(Tiles.ROBOT);
      expect(input.map.get(coordToString(3, 4))).toBe(Tiles.BARREL);
      expect(input.map.get(coordToString(4, 5))).toBe(Tiles.BARREL);
    });
  });

  describe("solution", () => {
    it("should match tiny example", () => {
      const tinyExample = `#######
#...O..
#......`;
      const input = parseInput(tinyExample);
      expect(solution(input)).toBe(104);
    });
    it("should match example", () => {
      const input = parseInput(exampleInput);
      executeMoves(input);
      expect(solution(input)).toBe(10092);
    });

    it("should match small example", () => {
      const input = parseInput(smallExample);
      executeMoves(input);
      expect(solution(input)).toBe(2028);
    });
  });
});
