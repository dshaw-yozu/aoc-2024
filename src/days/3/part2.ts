import { handleMul } from "./part1";

export function parseInput(rawText: string) {
  const mulRegex = /(mul\(\d+,\d+\)|do\(\)|don't\(\))/g;

  const matches = rawText.match(mulRegex);

  return matches ?? [];
}

export function findEnabledOperations(operations: string[]) {
  let isEnabled = true;
  const enabledOperations = [];

  for (let operation of operations) {
    if (operation === "do()") {
      isEnabled = true;
      continue;
    }

    if (operation === "don't()") {
      isEnabled = false;
      continue;
    }

    if (isEnabled) {
      enabledOperations.push(operation);
    }
  }

  return enabledOperations;
}

export function solution(mulOperations: string[]) {
  const enabledOperations = findEnabledOperations(mulOperations);
  return enabledOperations.reduce(
    (acc, current) => acc + handleMul(current),
    0
  );
}
