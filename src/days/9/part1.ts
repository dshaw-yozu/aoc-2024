export type ParsedInput = (number | undefined)[];

export function parseInput(rawText: string): ParsedInput {
  let output: number | undefined[] = [];
  let id = 0;

  for (let i = 0; i < rawText.length; i++) {
    const size = parseInt(rawText[i]);

    const content = new Array(size);
    if (i % 2) {
      content.fill(undefined);
    } else {
      content.fill(id);
      id++;
    }

    output.push(...content);
  }

  return output;
}

export function replaceAt(str: string, i: number, replacement: string): string {
  return (
    str.substring(0, i) + replacement + str.substring(i + replacement.length)
  );
}

export function compressDisc(disk: ParsedInput): ParsedInput {
  let i = 0;
  let j = disk.length - 1;

  while (i < j - 1) {
    if (!Number.isInteger(disk[i])) {
      for (let J = j; J >= 0; J--) {
        if (!!disk[J]) {
          disk[i] = disk[J];
          disk[J] = undefined;

          break;
        }
        j = J - 1;
      }
    }
    i++;
  }

  return disk;
}

export function checksum(disk: ParsedInput): number {
  let output = 0;

  disk.forEach((block, i) => {
    if (block) {
      output += block * i;
    }
  });

  return output;
}
