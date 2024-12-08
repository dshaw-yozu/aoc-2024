export const rotations = ["^", ">", "v", "<"] as const;

const terrain = {
  OBSTICAL: "#",
  EMPTY: ".",
  VISITED: "X",
} as const;
export type ROTATION = (typeof rotations)[number];
export type GuardLocation = [number, number];
export type GuardMap = Map<
  string,
  (typeof terrain)[keyof typeof terrain] | ROTATION
>;

export function parseInput(rawText: string): [GuardMap, GuardLocation] {
  const map = new Map();
  const lines = rawText.split("\n");

  let guardLocation: GuardLocation = [0, 0];

  lines.forEach((line, y) => {
    line.split("").forEach((char, x) => {
      // can't use [x,y] here as [1,2]!==[1,2]
      map.set(`${x}|${y}`, char);

      if (rotations.includes(char as ROTATION)) {
        guardLocation = [x, y];
      }
    });
  });

  return [map, guardLocation];
}

export function rotateGuard(currentRotation: ROTATION): ROTATION {
  const index = rotations.findIndex((i) => i === currentRotation)!;
  return rotations[(index + 1) % rotations.length];
}

export function moveGuard(
  map: GuardMap,
  location: GuardLocation
): { isLeaving: boolean; location: GuardLocation; justRotated: boolean } {
  let isLeaving = false;
  const originalLocation = `${location[0]}|${location[1]}`;
  let [guardX, guardY] = [...location];
  let [guardFacingX, guardFacingY] = [...location];

  // find guards facing

  const guardOriginalFacing = map.get(originalLocation) as ROTATION;

  // move guard

  switch (guardOriginalFacing) {
    case "^":
      guardY -= 1;
      guardFacingY -= 2;
      break;
    case ">":
      guardX += 1;
      guardFacingX += 2;
      break;
    case "v":
      guardY += 1;
      guardFacingY += 2;
      break;
    case "<":
      guardX -= 1;
      guardFacingX -= 2;
      break;
  }
  // mark visited location
  map.set(originalLocation, "X");

  // find what guard is facing
  // check if guard has left
  // rotate guard if needed

  const newLocation = `${guardX}|${guardY}`;
  const newFacingContent = map.get(`${guardFacingX}|${guardFacingY}`);

  switch (newFacingContent) {
    case undefined:
      map.set(newLocation, guardOriginalFacing);
      isLeaving = true;
      break;
    case "#":
      map.set(newLocation, rotateGuard(guardOriginalFacing));
      break;
    default:
      map.set(newLocation, guardOriginalFacing);
      break;
  }

  return {
    isLeaving: isLeaving,
    location: [guardX, guardY],
    justRotated: newFacingContent === "#",
  };
}

export function solution(map: GuardMap, location: GuardLocation): number {
  let isLeaving = false;
  let currentLocation = location;
  let steps = 0;

  while (!isLeaving) {
    steps++;
    const { isLeaving: newIsLeaving, location: newLocation } = moveGuard(
      map,
      currentLocation
    );

    isLeaving = newIsLeaving;
    currentLocation = newLocation;
  }

  console.log(`Guard left after ${steps + 1} steps`);

  const uniqueVisits = Array.from(map.values()).reduce(
    (acc, value) => (acc += value === "X" ? 1 : 0),
    0
  );

  // add the extra step to leave the area
  return uniqueVisits + 1;
}
