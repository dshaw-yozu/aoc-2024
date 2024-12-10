import { ParsedInput } from "./part1";

type DiskSegment = { contents: number | undefined; size: number };

export function findFirstEmptyBlock(segments: DiskSegment[]): number {
  return segments.findIndex((v) => !Number.isInteger(v.contents));
}

export function findNextBlockToMove(
  segments: DiskSegment[],
  checkedBlocks: number[]
) {
  return segments.findLastIndex(
    (v) => v.contents && !checkedBlocks.includes(v.contents)
  );
}

export function insertAtIndex<T = any>(
  array: T[],
  index: number,
  object: T
): T[] {
  return [...array.slice(0, index), object, ...array.slice(index)];
}

export function diskToSegments(disk: ParsedInput): DiskSegment[] {
  let segments: DiskSegment[] = [];
  let currentSegment: DiskSegment = { contents: undefined, size: 0 };

  disk.forEach((value, index) => {
    if (value !== currentSegment.contents) {
      if (index !== 0) {
        segments.push({ ...currentSegment });
      }

      currentSegment.contents = value;
      currentSegment.size = 1;
    } else {
      currentSegment.size++;
    }
  });
  segments.push(currentSegment);

  return segments;
}

export function segmentsToDisk(segments: DiskSegment[]): ParsedInput {
  const disk: ParsedInput = [];

  segments.forEach(({ contents, size }) => {
    const block = new Array(size).fill(contents);

    disk.push(...block);
  });

  return disk;
}

// Doesn't work :(
//
// this solution tries to move each block from right to left into the
// left *most* empty space block
//
// the exepected solution can move a block into an *available* empty space block
// starting from  right to left
export function compressIntact(disk: ParsedInput): ParsedInput {
  let segments = diskToSegments(disk);
  const blocksWithMoveAttempts: number[] = [];

  let i = findFirstEmptyBlock(segments);
  let j = findNextBlockToMove(segments, blocksWithMoveAttempts);
  while (i <= j && i !== -1) {
    let iSize = segments[i].size;

    const { size, contents } = segments[j]!;
    if (Number.isInteger(contents)) {
      blocksWithMoveAttempts.push(contents!);

      console.log(contents, size, iSize);
      if (size <= iSize) {
        // move content

        segments[i].contents = segments[j].contents;
        segments[i].size = segments[j].size;

        segments[j] = { ...segments[j], contents: undefined };
        // create new empty block if necessary

        if (iSize - size > 0) {
          segments = insertAtIndex(segments, i + 1, {
            contents: undefined,
            size: iSize - size,
          });
        }
        i = findFirstEmptyBlock(segments);
      }
    }

    j = findNextBlockToMove(segments, blocksWithMoveAttempts);
  }
  console.log(blocksWithMoveAttempts);

  const compressedDisk = segmentsToDisk(segments);

  return compressedDisk;
}
