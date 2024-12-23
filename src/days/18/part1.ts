import {
  dikstras,
  GraphMap,
  updateTile,
  coordToString,
  Position,
  drawMap,
} from "../../dikstra/index";

export enum Direction {
  "Up" = 0,
  "Right" = 1,
  "Down" = 2,
  "Left" = 3,
}

type ParsedInput = {
  maze: GraphMap;
  start: Position;
  end: Position;
  height: number;
  width: number;
};

export function parseInput(rawText: string): ParsedInput {
  const map: GraphMap = new Map();

  const height = 71;
  const width = 71;

  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      map.set(coordToString([x, y]), {
        content: ".",
        visited: false,
        position: [x, y],
        distanceFromStart: Infinity,
        onPath: false,
        cost: 1,
      });
    }
  }

  const lines = rawText.split("\n");

  for (let l = 0; l < 1024; l++) {
    const [x, y] = lines[l].split(",");
    map.delete(coordToString([+x, +y]));
  }

  return {
    maze: map,
    start: [0, 0],
    end: [width - 1, height - 1],
    height: height,
    width: width,
  };
}

export function solution(input: ParsedInput) {
  const revPath = dikstras({
    graph: input.maze,
    start: input.start,
    end: input.end,
  });

  let currentPathStep = coordToString(input.end);
  let actualPath = [currentPathStep];

  while (currentPathStep !== coordToString(input.start)) {
    const [x, y] = currentPathStep.split("|");

    updateTile(input.maze, [+x, +y], { onPath: true });
    currentPathStep = revPath[currentPathStep];
    actualPath.push(currentPathStep);
  }

  drawMap(input.maze, input.height, input.width);

  return actualPath.length + 1;
}
