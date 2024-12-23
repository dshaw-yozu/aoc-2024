import {
  coordToString,
  dikstras,
  drawMap,
  GraphMap,
  Position,
} from "../../dikstra/index";

type Tile = "#" | "." | "S" | "E";

export enum Direction {
  "Up" = 0,
  "Right" = 1,
  "Down" = 2,
  "Left" = 3,
}

type ParsedInput = {
  maze: GraphMap<Tile>;
  start: Position;
  end: Position;
  height: number;
  width: number;
};

export function parseInput(rawText: string): ParsedInput {
  const map: GraphMap<Tile> = new Map();
  let start: Position = [-1, -1];
  let end: Position = [-1, -1];

  const lines = rawText.split("\n");

  lines.forEach((line, y) => {
    line.split("").forEach((char, x) => {
      if (char !== "#") {
        map.set(coordToString([x, y]), {
          content: char as Tile,
          visited: false,
          cost: 1,
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

export function solution(input: ParsedInput) {
  const revPath = dikstras({
    graph: input.maze,
    start: input.start,
    end: input.end,
  });

  drawMap(input.maze, input.height, input.width);
}
