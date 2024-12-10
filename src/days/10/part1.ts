type LocationInfo = {
  height: number;
  accessibleNines: number;
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
      map.set(coordToString(x, y), {
        height: parseInt(char),
        accessibleNines: char === "9" ? 1 : 0,
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
  for (let n = 8; n >= 0; n--) {
    for (let x = 0; x < width; x++) {
      for (let y = 0; y < height; y++) {
        const up = [x, y + 1];
        const down = [x, y - 1];
        const left = [x - 1, y];
        const right = [x + 1, y];

        let accessibleNines = 0;

        const current = map.get(coordToString(x, y))!;

        if (current.height !== n) {
          continue;
        }

        [up, right, down, left].forEach((direction) => {
          const adjacent = map.get(coordToString(direction[0], direction[1]))!;
          if (adjacent && current.height === adjacent.height - 1) {
            accessibleNines += adjacent.accessibleNines;
          }
        });

        console.log(accessibleNines);

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
        score += current.accessibleNines;
      }
    }
  }

  return score;
}
