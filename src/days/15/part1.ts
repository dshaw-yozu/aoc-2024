import { coordToString } from "../10/part1";

export enum Direction {
  UP = "^",
  DOWN = "v",
  LEFT = "<",
  RIGHT = ">",
}

export enum Tiles {
  WALL = "#",
  EMPTY = ".",
  ROBOT = "@",
  BARREL = "O",
}

export type WarehouseMap = Map<string, Tiles>;
export type Instructions = string;
export type Position = [number, number];

export function parseInput(rawText: string): {
  map: WarehouseMap;
  instructions: Instructions;
  initialPosition: Position;
} {
  const map: WarehouseMap = new Map();
  let initialPosition: [number, number] = [-1, -1];

  const [mapRaw, instructionsRaw] = rawText.split("\n\n");

  const mapLines = mapRaw.split("\n");

  mapLines.forEach((line, y) => {
    line.split("").forEach((char, x) => {
      map.set(coordToString(x, y), char as Tiles);

      if (char === Tiles.ROBOT) {
        initialPosition = [x, y];
      }
    });
  });

  return { map, instructions: instructionsRaw, initialPosition };
}

export function getCoordAtDistanceAway(
  position: Position,
  direction: Direction,
  distance: number
): Position {
  const [x, y] = position;
  switch (direction) {
    case Direction.UP:
      return [x, y - distance];
    case Direction.DOWN:
      return [x, y + distance];
    case Direction.LEFT:
      return [x - distance, y];
    case Direction.RIGHT:
      return [x + distance, y];
  }
}

export function handleBarrelPush(
  map: WarehouseMap,
  currentPosition: Position,
  direction: Direction
): Position {
  //check if there is an empty space after the joined group of barrels

  let pushDistance = 1;
  let foundPush = false;

  while (!foundPush) {
    const nextTile = getCoordAtDistanceAway(
      currentPosition,
      direction,
      pushDistance + 1
    );

    const nextTileContent = map.get(coordToString(...nextTile))!;

    if (nextTileContent === Tiles.BARREL) {
      pushDistance++;
      continue;
    }
    if (nextTileContent === Tiles.WALL) {
      // pushed into wall
      pushDistance = 0;
      foundPush = true;
      continue;
    }
    if (nextTileContent === Tiles.EMPTY) {
      foundPush = true;
    }
  }

  if (pushDistance === 0) {
    return currentPosition;
  }

  // update position of barrels

  const emptySpace = getCoordAtDistanceAway(
    currentPosition,
    direction,
    pushDistance + 1
  );

  const newRobotPosition = getCoordAtDistanceAway(
    currentPosition,
    direction,
    1
  );

  map.set(coordToString(...emptySpace), Tiles.BARREL);
  map.set(coordToString(...currentPosition), Tiles.EMPTY);
  map.set(coordToString(...newRobotPosition), Tiles.ROBOT);

  return newRobotPosition;
}

export function moveRobot(
  map: WarehouseMap,
  instruction: Direction,
  currentPosition: Position
): Position {
  const nextSpace = getCoordAtDistanceAway(currentPosition, instruction, 1);
  const nextSpaceContent = map.get(coordToString(...nextSpace));

  switch (nextSpaceContent) {
    case Tiles.WALL:
      // nothing happens
      return currentPosition;
    case Tiles.EMPTY:
      map.set(coordToString(...currentPosition), Tiles.EMPTY);
      map.set(coordToString(...nextSpace), Tiles.ROBOT);

      return nextSpace;
    case Tiles.BARREL:
      return handleBarrelPush(map, currentPosition, instruction);
    default:
      return [-1, -1];
  }
}

export function executeMoves(input: {
  map: WarehouseMap;
  instructions: Instructions;
  initialPosition: Position;
}) {
  const moves = input.instructions
    .split("")
    .filter((m) =>
      [Direction.DOWN, Direction.LEFT, Direction.RIGHT, Direction.UP].includes(
        m as Direction
      )
    ) as Direction[];
  let position = input.initialPosition;
  moves.forEach((move) => {
    position = moveRobot(input.map, move, position);
  });
}

export function solution(input: {
  map: WarehouseMap;
  instructions: Instructions;
  initialPosition: Position;
}): number {
  let output = 0;
  Array.from(input.map.entries()).forEach(([location, value]) => {
    const [x, y] = location.split("|");

    if (value === Tiles.BARREL) {
      output += 100 * parseInt(y) + parseInt(x);
    }
  }, 0);

  return output;
}
