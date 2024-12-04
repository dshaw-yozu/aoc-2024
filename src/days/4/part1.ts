export function parseInput(rawText: string): string[] {
  return rawText.split("\n");
}

export function checkForwards(
  lines: string[],
  row: number,
  column: number
): boolean {
  const line = lines[row];

  const text = line.slice(column, column + 4);

  return text === "XMAS";
}

export function checkBackwards(
  lines: string[],
  row: number,
  column: number
): boolean {
  const line = lines[row];

  const text = line.slice(column - 3, column + 1);

  return text === "SAMX";
}

export function checkVertical(
  lines: string[],
  row: number,
  column: number,
  isBackwards?: boolean
): boolean {
  const letters = [];
  for (let i = 0; i < 4; i++) {
    const rowIndex = isBackwards ? row - i : row + i;
    letters.push(lines?.[rowIndex]?.[column]);
  }

  return letters.join("") === "XMAS";
}

export function checkDiagonal(
  lines: string[],
  row: number,
  column: number,
  isUp: boolean,
  isRight: boolean
): boolean {
  const letters = [];
  for (let i = 0; i < 4; i++) {
    const rowIndex = isUp ? row - i : row + i;
    const columnIndex = isRight ? column + i : column - i;

    letters.push(lines?.[rowIndex]?.[columnIndex]);
  }

  return letters.join("") === "XMAS";
}

export function findXMAS(lines: string[]): number {
  let foundXMASes = 0;

  for (var row = 0; row < lines.length; row++) {
    for (var column = 0; column < lines[row].length; column++) {
      if (lines[row][column] !== "X") continue;

      if (checkForwards(lines, row, column)) {
        foundXMASes += 1;
      }

      if (checkBackwards(lines, row, column)) {
        foundXMASes += 1;
      }

      if (checkVertical(lines, row, column)) {
        foundXMASes += 1;
      }

      if (checkVertical(lines, row, column, true)) {
        foundXMASes += 1;
      }

      if (checkDiagonal(lines, row, column, true, true)) {
        foundXMASes += 1;
      }
      if (checkDiagonal(lines, row, column, true, false)) {
        foundXMASes += 1;
      }
      if (checkDiagonal(lines, row, column, false, true)) {
        foundXMASes += 1;
      }
      if (checkDiagonal(lines, row, column, false, false)) {
        foundXMASes += 1;
      }
    }
  }

  return foundXMASes;
}
