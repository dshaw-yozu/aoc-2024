function solution({ leftList, rightList }) {
  return leftList.reduce((acc, number) => {
    const rightOccurances = rightList.filter((item) => item === number).length;

    return acc + number * rightOccurances;
  }, 0);
}

module.exports = { solution };
