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

export function blink(stone: Stone): [Stone] | [Stone, Stone] {
  // 0 => 1
  if (stone === 0) {
    return [1];
  }

  // even digits split |  12 => 1 and 2 | 1000 => 10 and 0

  if (stone.toString().length % 2 === 0) {
    return splitStone(stone);
  }
  // stone * 2024
  return [stone * 2024];
}

export function blinkStones(stones: Stone[]): Stone[] {
  return stones.flatMap(blink);
}

export function solution(stones: Stone[], blinks: number) {
  for (let b = 0; b < blinks; b++) {
    stones = blinkStones(stones);
  }

  return stones.length;
}
