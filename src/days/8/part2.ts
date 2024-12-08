import { arrayCombinations, ParsedInput, type Location } from "./part1";

export function withinBound(
  location: Location,
  width: number,
  height: number
): boolean {
  return (
    location[0] >= 0 &&
    location[0] < width &&
    location[1] >= 0 &&
    location[1] < height
  );
}

export function findHarmonicAntinodesWithinBound(
  a: Location,
  b: Location,
  height: number,
  width: number
): false | Location[] {
  if (!a || !b) return false;
  const [aX, aY] = a;
  const [bX, bY] = b;

  const dX = aX - bX;
  const dY = aY - bY;

  const antinodes: Location[] = [];

  let multiplier = 0;
  let locationA: Location;
  let locationB: Location;
  // positive
  do {
    multiplier++;
    locationA = [aX + dX * multiplier, aY + dY * multiplier];
    locationB = [bX - dX * multiplier, bY - dY * multiplier];
    if (withinBound(locationA, width, height)) {
      antinodes.push(locationA);
    }
    if (withinBound(locationB, width, height)) {
      antinodes.push(locationB);
    }
  } while (
    withinBound(locationA, width, height) ||
    withinBound(locationB, width, height)
  );
  // negative
  multiplier = 0;
  do {
    multiplier = multiplier - 1;
    locationA = [aX + dX * multiplier, aY + dY * multiplier];
    locationB = [bX - dX * multiplier, bY - dY * multiplier];
    if (withinBound(locationA, width, height)) {
      antinodes.push(locationA);
    }
    if (withinBound(locationB, width, height)) {
      antinodes.push(locationB);
    }
  } while (
    withinBound(locationA, width, height) ||
    withinBound(locationB, width, height)
  );

  return antinodes;
}

export function solution({ map, mapHeight, mapLength }: ParsedInput): number {
  const allAntinodes = new Set<string>();

  Array.from(map.values()).forEach((nodeLocations) => {
    const combinations = arrayCombinations(nodeLocations);
    combinations.forEach((locations) => {
      const antinodes = findHarmonicAntinodesWithinBound(
        locations[0],
        locations[1],
        mapHeight,
        mapLength
      );
      if (antinodes) {
        antinodes.forEach((antinode) => {
          allAntinodes.add(JSON.stringify(antinode));
        });
      }
    });
  });

  return allAntinodes.size;
}
