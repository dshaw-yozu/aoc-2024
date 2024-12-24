import {
  coordToString,
  dikstras,
  GraphMap,
  Position,
} from "../../dikstra/index";

type NumPadButtons =
  | "1"
  | "2"
  | "3"
  | "4"
  | "5"
  | "6"
  | "7"
  | "8"
  | "9"
  | "0"
  | "A";

export const numPadButtons: Record<NumPadButtons, Position> = {
  "1": [0, 2],
  "2": [1, 2],
  "3": [2, 2],
  "4": [0, 1],
  "5": [1, 1],
  "6": [2, 1],
  "7": [0, 0],
  "8": [1, 0],
  "9": [2, 0],
  "0": [1, 3],
  A: [2, 3],
};

export function getNumPadGraph() {
  const graph: GraphMap<NumPadButtons> = new Map();

  Object.entries(numPadButtons).forEach(([key, position]) => {
    graph.set(coordToString(position), {
      content: key as NumPadButtons,
      position,
      cost: 1,
      visited: false,
      distanceFromStart: Infinity,
      onPath: false,
    });
  });

  return graph;
}

export type DirectionPadButtons = "^" | ">" | "v" | "<" | "A";

export const dPadButtons: Record<DirectionPadButtons, Position> = {
  "^": [1, 0],
  A: [2, 0],
  "<": [0, 1],
  v: [1, 1],
  ">": [2, 1],
};

export function getDPadGraph() {
  const graph: GraphMap<DirectionPadButtons> = new Map();

  Object.entries(dPadButtons).forEach(([key, position]) => {
    graph.set(coordToString(position), {
      content: key as DirectionPadButtons,
      position: position,
      cost: 1,
      visited: false,
      distanceFromStart: Infinity,
      onPath: false,
    });
  });

  return graph;
}

export function convertPathToDPad(path: Position[]) {
  let string = "";
  let newPath: Position[] = [];

  for (let n = 1; n < path.length; n++) {
    const prev = path[n - 1];
    const current = path[n];

    const dx = current[0] - prev[0];
    const dy = current[1] - prev[1];
    let dir: DirectionPadButtons | undefined;
    if (dx === 1) {
      dir = ">";
    }
    if (dx === -1) {
      dir = "<";
    }
    if (dy === 1) {
      dir = "v";
    }
    if (dy === -1) {
      dir = "^";
    }

    if (dir) {
      string += dir;
      newPath.push(dPadButtons[dir]);
    }
  }

  string += "A";
  newPath.push(dPadButtons.A);

  return { string, path: newPath };
}

export function enterNumPadSequence(sequence: NumPadButtons[]): {
  path: Position[];
  string: string;
} {
  sequence.unshift("A"); // always start at A
  const parts: Position[][] = [];

  for (let n = 1; n < sequence.length; n++) {
    const start = numPadButtons[sequence[n - 1]];
    const end = numPadButtons[sequence[n]];

    const graph = getNumPadGraph();

    const path = dikstras({ graph, start, end });
    parts.push(path);
  }

  const string = parts.map((part) => convertPathToDPad(part).string).join("");
  const path = parts.flatMap((part) => convertPathToDPad(part).path);
  return { string, path };
}
export function enterDPadSequence(sequence: DirectionPadButtons[]): {
  path: Position[];
  string: string;
} {
  sequence.unshift("A"); // always start at A
  const parts: Position[][] = [];

  for (let n = 1; n < sequence.length; n++) {
    const start = dPadButtons[sequence[n - 1]];
    const end = dPadButtons[sequence[n]];

    const graph = getDPadGraph();

    // TODO: doesnt work as I need to make dikstra
    // choose paths which have a few turns as possible
    const path = dikstras({ graph, start, end });
    parts.push(path);
  }

  const string = parts.map((part) => convertPathToDPad(part).string).join("");
  const path = parts.flatMap((part) => convertPathToDPad(part).path);

  return { string, path };
}

export function unlockDoor(sequence: NumPadButtons[]) {
  // Robot A - NumPad at door
  // Robot B - DPad to A
  // Robot C - DPad to B
  // Me - DPad to C

  //console.log(sequence.join(""));
  const robotA = enterNumPadSequence(sequence);

  const robotB = enterDPadSequence(
    robotA.string.split("") as DirectionPadButtons[]
  );
  //console.log(robotB.string);

  const robotC = enterDPadSequence(
    robotB.string.split("") as DirectionPadButtons[]
  );

  //console.log(robotC.string);

  return robotC.string;
}

export function getComplexity(code: string, sequence: string): number {
  const numeric = code.match(/\d+/);

  if (numeric) {
    return +numeric[0] * sequence.length;
  }

  return 0;
}

export function solution(codes: string[]): number {
  let total = 0;

  codes.forEach((code) => {
    const sequence = unlockDoor(code.split("") as NumPadButtons[]);

    total += getComplexity(code, sequence);
  });

  return total;
}
