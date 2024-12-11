type Stone = number;

export function parseInput(rawText: string): Stone[] {
  return rawText.split(" ").map((s) => parseInt(s));
}

export function splitStone(stone: Stone): [Stone, Stone] {
  const stoneString = stone.toString();

  const firstHalf = stoneString.substring(0, stoneString.length / 2);
  const secondHalf = stoneString.substring(stoneString.length / 2);
  return [parseInt(firstHalf), parseInt(secondHalf)];
}

export function blink(stones: Stone[]): Stone[] {
  return stones.flatMap((stone) => {
    // 0 => 1

    if (stone === 0) {
      return 1;
    }

    // even digits split |  12 => 1 and 2 | 1000 => 10 and 0

    if (stone.toString().length % 2 === 0) {
      return splitStone(stone);
    }
    // stone * 2024
    return stone * 2024;
  });
}

export function solution(stones: Stone[], blinks: number) {
  for (let b = 0; b < blinks; b++) {
    console.time(`Blink: ${b}`);
    stones = blink(stones);
    console.timeEnd(`Blink: ${b}`);
  }

  return stones.length;
}

export function blinkBatched(stones: Stone[]) {
  const MAX_ARRAY_SIZE = 10000;

  let updatedStones: Stone[][] = [];

  for (let n = 0; n < stones.length / MAX_ARRAY_SIZE; n++) {
    updatedStones.push(
      blink(stones.slice(n * MAX_ARRAY_SIZE, (n + 1) * MAX_ARRAY_SIZE))
    );
  }
  // crashes at blink 39
  return updatedStones.flat();
}

export function solutionPart2(stones: Stone[], blinks: number) {
  for (let b = 0; b < blinks; b++) {
    console.time(`Blink: ${b}`);
    stones = blinkBatched(stones);
    console.timeEnd(`Blink: ${b}`);
  }

  return stones.length;
}
