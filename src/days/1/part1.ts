export function parseInput(rawInput: string): [number[], number[]] {
  const lines = rawInput.split("\n");
  const leftList: number[] = [];
  const rightList: number[] = [];

  lines.forEach((line) => {
    const matches = /(\d+)\s+(\d+)/.exec(line);
    if (matches) {
      leftList.push(parseInt(matches[1]));
      rightList.push(parseInt(matches[2]));
    }
  });
  return [leftList, rightList];
}

export function part1Solution(leftList: number[], rightList: number[]): number {
  const leftNumbers = leftList.sort();
  const rightNumbers = rightList.sort();

  return leftNumbers.reduce((acc, current, index) => {
    return acc + Math.abs(current - rightNumbers[index]);
  }, 0);
}
