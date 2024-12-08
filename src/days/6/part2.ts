// need to check if 2/3 positions match every time guard turns

import {
  GuardLocation,
  GuardMap,
  moveGuard,
  rotateGuard,
  ROTATION,
} from "./part1";

// 1. Find distance to # = D
// 2. for each distance d upto D
//    check [x + d, y] rotated 0
//    check [x + d, y + d] rotated 1
//    check [x, y + d] rotated 2

export function getFacingLocation(
  map: GuardMap,
  location: GuardLocation,
  overRideFacing?: ROTATION
) {
  const guardFacing =
    overRideFacing || (map.get(`${location[0]}|${location[1]}`) as ROTATION);

  let [guardFacingX, guardFacingY] = location;
  switch (guardFacing) {
    case "^":
      guardFacingY -= 1;
      break;
    case ">":
      guardFacingX += 1;
      break;
    case "v":
      guardFacingY += 1;
      break;
    case "<":
      guardFacingX -= 1;
      break;
  }
  return `${guardFacingX}|${guardFacingY}`;
}

export function findLoops(map: GuardMap, location: GuardLocation): number {
  let directionIndex = 0;
  let directionModifier = 1;

  const guardFacing = map.get(`${location[0]}|${location[1]}`) as ROTATION;

  switch (guardFacing) {
    case "^":
      directionIndex = 1;
      directionModifier = -1;
      break;
    case ">":
      directionIndex = 0;
      directionModifier = 1;
      break;
    case "v":
      directionIndex = 1;
      directionModifier = 1;
      break;
    case "<":
      directionIndex = 0;
      directionModifier = -1;
      break;
  }

  const trialLocation = [...location];
  do {
    trialLocation[directionIndex] += 1 * directionModifier;
  } while (
    ![undefined, "#"].includes(
      map.get(`${trialLocation[0]}|${trialLocation[1]}`)
    )
  );

  const distance = trialLocation[directionIndex] - location[directionIndex];

  let potentialLoops = 0;

  for (let i = 1; i <= distance; i++) {
    //    check [x + d, y] rotated 0
    //    check [x + d, y + d] rotated 1
    //    check [x, y + d] rotated 2
    const loopCorners: GuardLocation[] = [
      // starts at valid corner
      [location[0] + i, location[1]],
      [location[0] + i, location[1] + i],
      [location[0], location[1] + i],
    ];

    let facing = guardFacing;

    const validCorners = loopCorners.filter((l) => {
      const content = map.get(getFacingLocation(map, l, facing));
      facing = rotateGuard(facing);

      return content === "#";
    });

    if (validCorners.length === 2) {
      // a third obstical would create the loop
      potentialLoops++;
    }
  }

  console.log(potentialLoops);

  return potentialLoops;
}

export function tryObsticalInFront(
  map: GuardMap,
  location: GuardLocation
): boolean {
  // TODO
  return false;
}

export function solution(map: GuardMap, location: GuardLocation): number {
  let isLeaving = false;
  let currentLocation = location;
  let steps = 0;
  let loops = 0;

  while (!isLeaving) {
    steps++;
    const {
      isLeaving: newIsLeaving,
      location: newLocation,
      justRotated,
    } = moveGuard(map, currentLocation);

    if (justRotated) {
      loops += findLoops(map, newLocation);
    }

    isLeaving = newIsLeaving;
    currentLocation = newLocation;
  }

  return loops;
}
