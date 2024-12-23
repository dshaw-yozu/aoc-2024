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

  const height = 71;
  const width = 71;

  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      map.set(coordToString(x, y), {
        content: ".",
        visited: false,
        position: [x, y],
        distanceFromStart: Infinity,
        onPath: false,
      });
    }
  }

  const lines = rawText.split("\n");

  for (let l = 0; l < 1024; l++) {
    const [x, y] = lines[l].split(",");
    updateTile(map, [+x, +y], { content: "#" });
  }

  return {
    maze: map,
    start: [0, 0],
    end: [width - 1, height - 1],
    height: height,
    width: width,
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

export function updateTile(
  maze: MazeMap,
  position: Position,
  update: Partial<MazeTile>
) {
  const key = coordToString(...position);
  const content = maze.get(key);

  maze.set(key, { ...content, ...update } as MazeTile);
}

export function dikstras({ maze, start, end }: ParsedInput) {
  updateTile(maze, start, { distanceFromStart: 0 });

  const visitedTiles: string[] = [];
  const revPath: Record<string, string> = {};

  const walkableTiles = Array.from(maze.values()).filter(
    (t) => t.content !== "#"
  );

  let foundEnd = false;

  while (visitedTiles.length < walkableTiles.length && !foundEnd) {
    // find next unvisited with lowest distance

    let lowestUnvisitedDistance = Infinity;
    let nextTile: MazeTile | undefined;

    Array.from(maze.values()).forEach((t) => {
      if (!t.visited && t.distanceFromStart < lowestUnvisitedDistance) {
        lowestUnvisitedDistance = t.distanceFromStart;
        nextTile = t;
      }
    });

    if (nextTile) {
      updateTile(maze, nextTile.position, { visited: true });
      visitedTiles.push(coordToString(...nextTile.position));

      const neighbours = getNeighbours(maze, nextTile.position);

      const neighbourDistance = nextTile.distanceFromStart + 1;

      neighbours.forEach((n) => {
        updateTile(maze, n.position, { distanceFromStart: neighbourDistance });

        if (neighbourDistance < n.distanceFromStart) {
          // new  shorter route;
          revPath[coordToString(...n.position)] = coordToString(
            ...nextTile!.position
          );
        }
      });

      if (coordToString(...nextTile.position) === coordToString(...end)) {
        console.log("end");
        foundEnd = true;
      }
    }
  }

  return revPath;
}

export function solution(input: ParsedInput) {
  const revPath = dikstras(input);

  let currentPathStep = coordToString(...input.end);
  let actualPath = [currentPathStep];

  while (currentPathStep !== coordToString(...input.start)) {
    const [x, y] = currentPathStep.split("|");

    updateTile(input.maze, [+x, +y], { onPath: true });
    currentPathStep = revPath[currentPathStep];
    actualPath.push(currentPathStep);
  }

  console.log(actualPath);

  drawMap(input.maze, input.height, input.width);

  return actualPath.length + 1;
}
