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

export async function checkRegions(
  input: ParsedInput,
  x: number,
  y: number,
  regionId: number,
  content: string
) {
  const { map } = input;

  if (!map.has(coordToString(x, y))) {
    // console.log("outside of grid");
    return;
  }

  const current = map.get(coordToString(x, y))!;

  if (current.content !== content) {
    // console.log("not match");
    return;
  }

  if (typeof current.region !== "undefined") {
    // console.log("region defined");
    return;
  }

  //   console.log("set current");
  map.set(coordToString(x, y), { content, region: regionId });

  //   console.log("check others");

  const coords = [
    [x, y - 1], // up
    [x - 1, y], // left
    [x + 1, y], // right
    [x, y + 1], // down
  ];

  await Promise.all(
    coords.map(async ([a, b]) => {
      await checkRegions(input, a, b, regionId, content);
    })
  );
}

export async function findRegions(input: ParsedInput): Promise<number> {
  const { map, height, width } = input;

  let regionId = 0;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const { region, content } = map.get(coordToString(x, y))!;
      if (typeof region === "number") {
        continue;
      }

      await checkRegions(input, x, y, regionId, content);
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

export async function solution(input: ParsedInput) {
  const regions = await findRegions(input);

  let price = 0;

  for (let r = 0; r < regions; r++) {
    const { size, fences } = calculateRegionSize(input, r);
    price += size * fences;
  }

  return price;
}
