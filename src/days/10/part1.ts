type LocationInfo = {
  height: number;
  accessibleNines: Set<string>;
};
type TrailMap = Map<string, LocationInfo>;

export function parseInput(rawText: string): {
  map: TrailMap;
  height: number;
  width: number;
} {
  const map: TrailMap = new Map();
  const lines = rawText.split("\n");

  lines.forEach((line, y) => {
    line.split("").forEach((char, x) => {
      // can't use [x,y] here as [1,2]!==[1,2]
      const accessibleNines = new Set<string>();

      if (char === "9") {
        accessibleNines.add(coordToString(x, y));
      }
      map.set(coordToString(x, y), {
        height: parseInt(char),
        accessibleNines,
      });
    });
  });

  return { map, height: lines.length, width: lines[0].length };
}

export function coordToString(x: number, y: number) {
  return `${x}|${y}`;
}

export function findAccessibleNines(
  map: TrailMap,
  height: number,
  width: number
) {
  // starting from 8 work way down trail adding to a set the coords of
  // 9 accessible to that grid ref
  // when it reaches the 0 it will have a set of accessible 9s

  for (let n = 8; n >= 0; n--) {
    for (let x = 0; x < width; x++) {
      for (let y = 0; y < height; y++) {
        const up = [x, y + 1];
        const down = [x, y - 1];
        const left = [x - 1, y];
        const right = [x + 1, y];

        let accessibleNines: Set<string> = new Set();

        const current = map.get(coordToString(x, y))!;

        if (current.height !== n) {
          continue;
        }

        [up, right, down, left].forEach((direction) => {
          const adjacent = map.get(coordToString(direction[0], direction[1]))!;
          if (adjacent && current.height === adjacent.height - 1) {
            accessibleNines = new Set([
              ...accessibleNines,
              ...adjacent.accessibleNines,
            ]);
          }
        });

        map.set(coordToString(x, y), { ...current, accessibleNines });
      }
    }
  }
}

export function solution(map: TrailMap, height: number, width: number): number {
  let score = 0;
  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      const current = map.get(coordToString(x, y))!;
      if (current.height === 0) {
        score += current.accessibleNines.size;
      }
    }
  }

  return score;
}
