function parseInput(rawInput) {
  const lines = rawInput.split("\n");
  const leftList = [];
  const rightList = [];

  lines.forEach((line) => {
    const matches = /(\d+)\s+(\d+)/.exec(line);
    leftList.push(parseInt(matches[1]));
    rightList.push(parseInt(matches[2]));
  });
  return { leftList, rightList };
}

function solution({ leftList, rightList }) {
  const leftNumbers = leftList.sort();
  const rightNumbers = rightList.sort();

  return leftNumbers.reduce((acc, current, index) => {
    return acc + Math.abs(current - rightNumbers[index]);
  }, 0);
}

module.exports = { parseInput, solution };
