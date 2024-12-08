export type Location = [number, number];
export type AnteneaMap = Map<string, Location[]>;
export type ParsedInput = {
  map: AnteneaMap;
  mapHeight: number;
  mapLength: number;
};

export function parseInput(rawText: string): ParsedInput {
  const lines = rawText.split("\n");
  const map: AnteneaMap = new Map();
  // start in bottom left corner
  for (let y = 0; y < lines.length; y++) {
    for (let x = 0; x < lines[y].length; x++) {
      const characterAtLocation = lines[lines.length - y - 1][x];
      if (characterAtLocation === ".") {
        continue;
      }

      const updatedList = map.get(characterAtLocation) ?? [];

      updatedList.push([x, y]);

      map.set(characterAtLocation, updatedList);
    }
  }

  return { map, mapLength: lines[0].length, mapHeight: lines.length };
}

export function findAntinodes(
  a: Location,
  b: Location
): false | [Location, Location] {
  if (!a || !b) return false;
  const [aX, aY] = a;
  const [bX, bY] = b;

  const dX = aX - bX;
  const dY = aY - bY;

  const antinode1: Location = [aX + dX, aY + dY];
  const antinode2: Location = [bX - dX, bY - dY];

  return [antinode1, antinode2];
}

export function arrayCombinations(array: any[]) {
  return array.flatMap((v, i) => array.slice(i + 1).map((w) => [v, w]));
}

export function solution({ map, mapHeight, mapLength }: ParsedInput): number {
  const allAntinodes = new Set<string>();

  Array.from(map.values()).forEach((nodeLocations) => {
    const combinations = arrayCombinations(nodeLocations);
    combinations.forEach((locations) => {
      const antinodes = findAntinodes(locations[0], locations[1]);
      if (antinodes) {
        antinodes.forEach((antinode) => {
          if (
            antinode[0] >= 0 &&
            antinode[0] < mapLength &&
            antinode[1] >= 0 &&
            antinode[1] < mapHeight
          ) {
            allAntinodes.add(JSON.stringify(antinode));
          }
        });
      }
    });
  });

  return allAntinodes.size;
}
