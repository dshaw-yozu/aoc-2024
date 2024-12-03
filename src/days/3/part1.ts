export function parseInput(rawText: string) {
  const mulRegex = /mul\(\d+,\d+\)/g;

  const matches = rawText.match(mulRegex);

  return matches ?? [];
}

export function handleMul(mulOperation: string) {
  const digitsRegex = /(\d+)/g;

  const matches = mulOperation.match(digitsRegex);

  if (matches) {
    return matches.reduce((acc, current) => acc * parseInt(current), 1);
  }
  return 0;
}

export function solution(mulOperations: string[]) {
  return mulOperations.reduce((acc, current) => acc + handleMul(current), 0);
}
