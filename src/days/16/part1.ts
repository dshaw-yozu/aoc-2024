import { coordToString } from "../10/part1";

type Tile = "#" | "." | "S" | "E";
type MazeTile = {
  position: Position;
  content: Tile;
  visited: boolean;
  distanceFromStart: number;
  onPath: boolean;
};
type MazeMap = Map<string, MazeTile>;
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
  height: number;
  width: number;
};

export function parseInput(rawText: string): ParsedInput {
  const map: MazeMap = new Map();
  let start: Position = [-1, -1];
  let end: Position = [-1, -1];

  const lines = rawText.split("\n");

  lines.forEach((line, y) => {
    line.split("").forEach((char, x) => {
      map.set(coordToString(x, y), {
        content: char as Tile,
        visited: false,
        position: [x, y],
        distanceFromStart: Infinity,
        onPath: false,
      });

      if ((char as Tile) === "S") {
        start = [x, y];
      }

      if ((char as Tile) === "E") {
        end = [x, y];
      }
    });
  });

  return {
    maze: map,
    start,
    end,
    height: lines.length,
    width: lines[0].length,
  };
}

export function drawMap(map: MazeMap, height: number, width: number): string {
  let output = "";
  let endSteps = 0;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const { content, distanceFromStart, onPath } = map.get(
        coordToString(x, y)
      )!;
      if (content === ".") {
        output += onPath ? "×" : " ";

        continue;
      }

      if (content === "#") {
        output += "█";
        continue;
      }

      if (content === "E") {
        endSteps = distanceFromStart;
      }

      output += content;
    }

    output += "\n";
  }

  console.log(output);

  return output;
}

export function getNeighbours(
  maze: MazeMap,
  currentPosition: Position
): MazeTile[] {
  const [x, y] = currentPosition;
  const up = maze.get(coordToString(x, y - 1));
  const down = maze.get(coordToString(x, y + 1));
  const left = maze.get(coordToString(x - 1, y));
  const right = maze.get(coordToString(x + 1, y));

  return [up, down, left, right]
    .filter((t) => !!t)
    .filter((t) => t.content !== "#");
}

export function findPaths({ maze, start, width, height }: ParsedInput) {
  const initialNeighbours = getNeighbours(maze, start);

  const unexploredJunctions: Position[] = initialNeighbours
    .filter((n) => !n.visited)
    .map((n) => n.position);

  let currentPosition: Position = unexploredJunctions[0];
  let distanceFromStart = 0;

  function backToUnvisitedJunction() {
    currentPosition = unexploredJunctions.pop()!;
    distanceFromStart = maze.get(
      coordToString(...currentPosition)
    )!?.distanceFromStart;
  }

  while (unexploredJunctions.length > 0) {
    const positionContent = maze.get(coordToString(...currentPosition))!;

    maze.set(coordToString(...currentPosition), {
      ...positionContent,
      distanceFromStart: distanceFromStart,
      visited: true,
    });

    if (positionContent.content === "E") {
      console.log("Found Exit");
      backToUnvisitedJunction();
      continue;
    }

    const currentNeighbours = getNeighbours(maze, currentPosition);

    const unvisitedNeighbours = currentNeighbours.filter((n) => !n.visited);

    if (unvisitedNeighbours.length > 1) {
      // allow backtrack to this point
      unexploredJunctions.push(currentPosition);
    }

    if (unvisitedNeighbours.length === 0) {
      // dead end, go back to previous junction;
      backToUnvisitedJunction();
    } else {
      currentPosition = unvisitedNeighbours[0].position;
      distanceFromStart++;
    }
  }
}

export function findShortestPath({ maze, end }: ParsedInput) {
  const path: Position[] = [];

  let distanceToEnd = maze.get(coordToString(...end))!?.distanceFromStart;
  let currentPosition: Position = end;

  let n = distanceToEnd;
  while (n > 0) {
    const neighbours = getNeighbours(maze, currentPosition);

    let lowestDistance = n;
    let nextTile: MazeTile;

    neighbours.forEach((neighbour) => {
      if (neighbour.distanceFromStart < lowestDistance) {
        lowestDistance = neighbour.distanceFromStart;
        nextTile = neighbour;
      }
    });

    path.push(nextTile!?.position);

    currentPosition = nextTile!?.position;

    maze.set(coordToString(...currentPosition), {
      ...nextTile!,
      onPath: true,
    });

    n = lowestDistance;
  }

  return path;
}
