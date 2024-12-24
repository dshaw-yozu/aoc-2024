export function parseInput(rawString: string): bigint[] {
  const numbers = rawString.split("\n");
  return numbers.map((s) => BigInt(s));
}

export function mix(secret: bigint, addititve: bigint): bigint {
  const mixed = BigInt(secret ^ addititve);
  return mixed;
}

export function prune(secret: bigint): bigint {
  return secret % BigInt(16777216);
}

export function getNextSecretNumber(secret: bigint): bigint {
  const stage1 = prune(mix(secret, secret * BigInt(64)));
  const stage2 = prune(mix(stage1, BigInt(stage1 / BigInt(32))));
  const stage3 = prune(mix(stage2, stage2 * BigInt(2048)));

  return stage3;
}

export function getNthSecretNumber(secret: bigint, n: number): bigint {
  let current = secret;

  for (let i = 0; i < n; i++) {
    current = getNextSecretNumber(current);
  }

  return current;
}

export function solution(secrets: bigint[]): bigint {
  let sum = 0n;

  secrets.forEach((secret) => {
    sum += getNthSecretNumber(secret, 2000);
  });

  return sum;
}
