// Copied rational behind this post's example
// https://www.reddit.com/r/adventofcode/comments/1hbnyx1/2024_day_11python_mega_tutorial/

import { blink } from "./part1";

const cache = new Map<string, number>();

export function recursiveBlink(stone: number, depth: number): number {
  const key = `${stone}|${depth}`;

  const stones = blink(stone);

  if (depth === 1) {
    return stones.length;
  }

  if (cache.has(key)) {
    return cache.get(key)!;
  }

  let output = recursiveBlink(stones[0], depth - 1);

  if (stones?.length == 2) {
    output += recursiveBlink(stones[1], depth - 1);
  }
  cache.set(key, output);

  return output;
}

export function solution(stones: number[], blinks: number): number {
  let stoneCount = 0;

  stones.forEach((stone) => {
    stoneCount += recursiveBlink(stone, blinks);
  });

  return stoneCount;
}
