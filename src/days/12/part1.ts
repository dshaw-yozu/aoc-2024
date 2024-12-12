export type FarmMap = Map<string, { content: string; region?: number }>;
export type Region = FarmMap;
export type ParsedInput = {
  map: FarmMap;
  width: number;
  height: number;
};

export function coordToString(x: number, y: number) {
  return `${x}|${y}`;
}

export function parseInput(rawInput: string): ParsedInput {
  const map: FarmMap = new Map();

  const lines = rawInput.split(/\n/);

  lines.forEach((line, y) => {
    line.split("").forEach((char, x) => {
      map.set(coordToString(x, y), { content: char, region: undefined });
    });
  });
  return { map, width: lines[0].length, height: lines.length };
}

export function findRegions({ map, height, width }: ParsedInput): number {
  // scan over map
  // if current square is the different to up or left square
  //      create new region and add it
  // else
  //      add to region of neighbour

  let regionId = 0;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const current = map.get(coordToString(x, y))!;
      const up = map.get(coordToString(x, y - 1));
      const left = map.get(coordToString(x - 1, y));
      const right = map.get(coordToString(x + 1, y));
      //   const upRight = map.get(coordToString(x + 1, y - 1));

      if (up && up.content === current.content) {
        // same region
        map.set(coordToString(x, y), { ...current, region: up.region });
        continue;
      }

      if (left && left.content === current.content) {
        // same region
        map.set(coordToString(x, y), { ...current, region: left.region });
        continue;
      }

      if (right && right.content === current.content) {
        let foundRegionId = undefined;
        // find if right is connected to row above
        for (let r = x + 1; r < width; r++) {
          const square = map.get(coordToString(r, y));
          const squareUp = map.get(coordToString(r, y - 1));

          if (square && square.content !== current.content) {
            break;
          }

          if (squareUp && squareUp?.content === current.content) {
            foundRegionId = squareUp.region;
            break;
          }
        }

        if (foundRegionId) {
          map.set(coordToString(x, y), { ...current, region: foundRegionId });
          continue;
        }
      }

      map.set(coordToString(x, y), { ...current, region: regionId });
      regionId++;
    }
  }
  return regionId;
}

export function calculateRegionSize(
  { map, height, width }: ParsedInput,
  regionId: number
): { size: number; fences: number } {
  let size = 0;
  let fences = 0;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const content = map.get(coordToString(x, y));

      if (content?.region === regionId) {
        size++;

        const up = map.get(coordToString(x, y - 1));
        const down = map.get(coordToString(x, y + 1));
        const left = map.get(coordToString(x - 1, y));
        const right = map.get(coordToString(x + 1, y));

        fences += [up, down, left, right].filter(
          (square) => square?.region !== regionId
        ).length;
      }
    }
  }

  return { size, fences };
}

export function solution(input: ParsedInput) {
  const regions = findRegions(input);

  console.log(regions);
  console.log(Array.from(input.map).map(([, { region }]) => region));

  let price = 0;

  for (let r = 0; r < regions; r++) {
    const { size, fences } = calculateRegionSize(input, r);
    price += size * fences;
  }

  return price;
}
