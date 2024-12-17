import { executeCommand, ParsedInput, parseInput } from "./part1";

export function checkExpected(actual: number[], expected: number[]) {
  return actual.every((number, i) => number === expected[i]);
}

export function tryAValue(input: ParsedInput, expected: number[]): number[] {
  const output: number[] = [];

  let i = 0;

  while (i <= input.program.length - 2) {
    const command = input.program[i];
    const operand = input.program[i + 1];

    const [updatedPointer, out] = executeCommand(
      input.registry,
      command,
      operand,
      i
    );

    if (typeof out === "number") {
      output.push(out);
    }

    if (updatedPointer === -1) {
      i === input.program.length;
    } else if (checkExpected(output, expected)) {
      i = updatedPointer;
    } else {
      i = input.program.length;
    }
  }

  return output;
}

export function solution(rawInput: string) {
  let a = 0;

  let found = false;

  const targetOutput = parseInput(rawInput).program;

  let longestSequence = 0;

  while (!found) {
    const input = parseInput(rawInput);

    input.registry.set("A", a);

    const output = tryAValue(input, targetOutput);

    if (
      checkExpected(output, targetOutput) &&
      output.length > longestSequence
    ) {
      longestSequence = output.length;
      console.log(a, output.join(""));
    }

    if (output.join(",") === targetOutput.join(",")) {
      found = true;
    } else {
      a++;
    }
  }

  return a;
}
