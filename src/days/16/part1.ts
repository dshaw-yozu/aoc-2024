import { coordToString } from "../10/part1";

type Tile = "#" | "." | "S" | "E";
type MazeMap = Map<string, Tile>;
type Position = [number, number];
export enum Direction {
  "Up" = 0,
  "Right" = 1,
  "Down" = 2,
  "Left" = 3,
}

type ParsedInput = {
  maze: MazeMap;
  start: Position;
  end: Position;
};

export function parseInput(rawText: string): ParsedInput {
  const map: MazeMap = new Map();
  let start: Position = [-1, -1];
  let end: Position = [-1, -1];

  const lines = rawText.split("\n");

  lines.forEach((line, y) => {
    line.split("").forEach((char, x) => {
      map.set(coordToString(x, y), char as Tile);

      if ((char as Tile) === "S") {
        start = [x, y];
      }

      if ((char as Tile) === "E") {
        end = [x, y];
      }
    });
  });

  return { maze: map, start, end };
}

type Junction = { position: Position; tried: boolean; direction: Direction };
type Path = {
  position: Position;
  junctions: Junction[];
};

export function getInitialJunctions(
  maze: MazeMap,
  position: Position
): Junction[] {
  const [x, y] = position;
  const junctions: Junction[] = [];

  const up: Position = [x, y - 1];
  const left: Position = [x + 1, y];
  const down: Position = [x, y + 1];
  const right: Position = [x - 1, y];

  const upContent = maze.get(coordToString(...up))!;
  const leftContent = maze.get(coordToString(...left))!;
  const downContent = maze.get(coordToString(...down))!;
  const rightContent = maze.get(coordToString(...right))!;

  if (upContent === ".") {
    junctions.push({ position: up, tried: false, direction: Direction.Up });
  }

  if (leftContent === ".") {
    junctions.push({ position: left, tried: false, direction: Direction.Left });
  }

  if (rightContent === ".") {
    junctions.push({
      position: right,
      tried: false,
      direction: Direction.Right,
    });
  }

  if (downContent === ".") {
    junctions.push({ position: down, tried: false, direction: Direction.Down });
  }

  return junctions;
}

export function getJunctions(
  maze: MazeMap,
  position: Position,
  direction: Direction
): Junction[] {
  const [x, y] = position;
  const junctions = [];
  let forwards: Position;
  let left: Position;
  let right: Position;

  switch (direction) {
    case Direction.Up:
      forwards = [x, y - 1];
      left = [x - 1, y];
      right = [x + 1, y];
      break;
    case Direction.Down:
      forwards = [x, y + 1];
      left = [x + 1, y];
      right = [x - 1, y];
      break;

    case Direction.Left:
      forwards = [x - 1, y];
      left = [x, y + 1];
      right = [x, y - 1];
      break;

    case Direction.Right:
      forwards = [x + 1, y];
      left = [x, y - 1];
      right = [x, y + 1];
      break;
  }

  const forwardsContent = maze.get(coordToString(...forwards))!;
  const leftContent = maze.get(coordToString(...left))!;
  const rightContent = maze.get(coordToString(...right))!;

  if ([".", "E"].includes(forwardsContent)) {
    junctions.push({ position: forwards, tried: false, direction });
  }
  if ([".", "E"].includes(leftContent)) {
    junctions.push({
      position: left,
      tried: false,
      direction: direction - 1 === -1 ? 3 : direction - 1,
    });
  }
  if ([".", "E"].includes(rightContent)) {
    junctions.push({
      position: right,
      tried: false,
      direction: (direction + 1) % 4,
    });
  }

  return junctions;
}

export function move(maze: MazeMap, path: Path[], validPath: Path[][]) {
  const currentPath = path[path.length - 1];

  const { junctions, position } = currentPath;
  const currentContent = maze.get(coordToString(...position));

  if (currentContent === "E") {
    validPath.push(path);
    return true;
  }

  const nextJunctionIndex = junctions.findIndex((j) => !j.tried);

  if (junctions.length === 0 || nextJunctionIndex === -1) {
    //dead end, go back to last path entry with an untried junction

    const lastUntestedJunction = path.findLastIndex((p) =>
      p.junctions.some((j) => !j.tried)
    );

    if (lastUntestedJunction === -1) {
      console.log("no previous options left - BS");
      return false;
    }

    // remove path after that junction;

    path.splice(lastUntestedJunction + 1);

    const newPath = path[lastUntestedJunction];
    const nextJunctionIndex = newPath.junctions.findIndex((j) => !j.tried);
    const nextJunction = newPath.junctions[nextJunctionIndex];
    nextJunction.tried = true;

    return move(maze, [...path], validPath);
  }

  const { position: nextPosition, direction: nextDirection } =
    junctions[nextJunctionIndex];
  junctions[nextJunctionIndex].tried = true;
  path.push({
    position: nextPosition,
    junctions: getJunctions(maze, nextPosition, nextDirection),
  });

  return move(maze, [...path], validPath);
}
export function findPath({ maze, start }: ParsedInput) {
  const validMazePaths: Path[][] = [];

  const junctions = getInitialJunctions(maze, start);

  const initialPath: Path[] = [{ position: start, junctions }];

  move(maze, initialPath, validMazePaths);
  return validMazePaths.map((p) => p.map((q) => q.position));
}
