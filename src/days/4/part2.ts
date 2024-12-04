//.M. .S. .M. .S.
//MAS MAS SAM MAS
//.S. .M. .S. .M.

export function checkVerticalCross(
  lines: string[],
  row: number,
  column: number
): boolean {
  const horizontalText = lines[row].slice(column - 1, column + 2);
  if (!["MAS", "SAM"].includes(horizontalText)) return false;

  const aboveLetter = lines?.[row - 1]?.[column];
  const belowLetter = lines?.[row + 1]?.[column];

  if (aboveLetter === "M" && belowLetter === "S") return true;
  if (aboveLetter === "S" && belowLetter === "M") return true;

  return false;
}

//M.M  S.M  S.S  M.S
//.A.  .A.  .A.  .A.
//S.S  S.M  M.M  M.S

export function checkDiagonalCross(
  lines: string[],
  row: number,
  column: number
): boolean {
  const upLeft = lines?.[row - 1]?.[column - 1];
  const upRight = lines?.[row - 1]?.[column + 1];
  const downLeft = lines?.[row + 1]?.[column - 1];
  const downRight = lines?.[row + 1]?.[column + 1];

  let leftToRightValid = false;
  let rightToLeftValid = false;

  if (
    (upLeft === "M" && downRight === "S") ||
    (upLeft === "S" && downRight === "M")
  ) {
    leftToRightValid = true;
  }

  if (
    (upRight === "M" && downLeft === "S") ||
    (upRight === "S" && downLeft === "M")
  ) {
    rightToLeftValid = true;
  }

  return rightToLeftValid && leftToRightValid;
}

export function findMASes(lines: string[]): number {
  let foundMASes = 0;

  for (var row = 0; row < lines.length; row++) {
    for (var column = 0; column < lines[row].length; column++) {
      if (lines[row][column] !== "A") continue;
      if (checkVerticalCross(lines, row, column)) {
        foundMASes++;
      }
      if (checkDiagonalCross(lines, row, column)) {
        foundMASes++;
      }
    }
  }

  return foundMASes;
}
