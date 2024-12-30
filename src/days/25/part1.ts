type Key = number[];
type Lock = number[];
export function parseInput(rawString: string): {
  keys: Key[];
  locks: Lock[];
} {
  const keys: Key[] = [];
  const locks: Lock[] = [];

  const schematics = rawString.split("\n\n");

  schematics.forEach((s) => {
    const lines = s.split("\n");
    let combo = new Array(lines[0].length).fill(-1);
    lines.forEach((l, y) => {
      l.split("").forEach((char, x) => {
        if (char === "#") {
          combo[x] = combo[x] + 1;
        }
      });
    });

    if (lines[0] === "#".repeat(lines[0].length)) {
      locks.push(combo);
    } else {
      keys.push(combo);
    }
  });
  return { keys, locks };
}

export function testLock(key: Key, lock: Lock): boolean {
  return lock.every((pin, i) => pin + key[i] < 6);
}

export function solution(keys: Key[], locks: Lock[]): number {
  let matches = 0;

  locks.forEach((lock) => {
    keys.forEach((key) => {
      matches += testLock(key, lock) ? 1 : 0;
    });
  });

  return matches;
}
