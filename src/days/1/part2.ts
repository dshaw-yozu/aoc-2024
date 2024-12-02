export function part2Solution(leftList: number[], rightList: number[]): number {
  return leftList.reduce((acc, number) => {
    const rightOccurances = rightList.filter((item) => item === number).length;

    return acc + number * rightOccurances;
  }, 0);
}
