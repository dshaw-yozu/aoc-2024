type Input = {
  target: number;
  numbers: number[];
};

export function parseInput(rawText: string): Input[] {
  const lines = rawText.split("\n");

  return lines.map((line) => {
    const [target, rest] = line.split(":");
    const numbers = rest
      .trim()
      .split(" ")
      .map((n) => parseInt(n));

    return { target: parseInt(target), numbers };
  });
}

export function permutate(items: any[], count: number) {
  const results: any[] = [];

  req([]);

  return results;

  function req(array: any[]) {
    if (array.length == count) {
      results.push(array);
      return;
    }
    for (const item of items) {
      req(array.concat(item));
    }
  }
}

export function createCalculation(
  numbers: number[],
  operators: string[]
): (string | number)[] {
  let calculation: (string | number)[] = [];

  numbers.forEach((number, index) => {
    calculation.push(number);
    if (operators[index]) {
      calculation.push(operators[index]);
    }
  });

  return calculation;
}

export function executeCalculation(calculation: (string | number)[]): number {
  let result = calculation[0] as number;

  for (let i = 1; i < calculation.length; i = i + 2) {
    const operator = calculation[i] as string;
    const number = calculation[i + 1] as number;

    switch (operator) {
      case "+":
        result += number;
        break;
      case "*":
        result = result * number;
        break;
    }
  }

  return result;
}

const validOperators = ["+", "*"];

export function findValidOperatorCombinations(input: Input): number {
  const { target, numbers } = input;

  const operatorCombinations = permutate(validOperators, numbers.length - 1);

  return operatorCombinations.filter((combination) => {
    const calculation = createCalculation(numbers, combination);
    return target === executeCalculation(calculation);
  }).length;
}

export function solution(inputs: Input[]): number {
  let solution = 0;

  inputs.forEach((input) => {
    const validCombinations = findValidOperatorCombinations(input);
    if (validCombinations > 0) {
      solution += input.target;
    }
  });

  return solution;
}
