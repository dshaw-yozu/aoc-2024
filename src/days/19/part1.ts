type Pattern = string;
type Towel = string;

export function parseInput(rawInput: string): {
  patterns: Pattern[];
  towels: Towel[];
} {
  const [patternRaw, towelRaw] = rawInput.split("\n\n");

  const patterns = patternRaw.split(", ");

  const towels = towelRaw.split("\n");

  const lengthSortedPatterns = patterns.sort((a, b) => b.length - a.length);

  return { patterns, towels };
}

export function checkTowel(towel: Towel, patterns: Pattern[]): boolean {
  let updatedTowel = [towel];
  let i = 0;

  while (i < patterns.length) {
    updatedTowel = updatedTowel
      .flatMap((t) => t.split(patterns[i]))
      .filter((b) => b.length > 0);
    i++;
  }

  return updatedTowel.length === 0;
}

export function simplifyPatterns(patterns: Pattern[]): Pattern[] {
  let longestPattern: number = 0;

  patterns.forEach((pattern) => {
    if (pattern.length > longestPattern) {
      longestPattern = pattern.length;
    }
  });

  const longestPatterns = patterns.filter((p) => p.length === longestPattern);

  const notLongestPatterns = patterns.filter(
    (p) => p.length !== longestPattern
  );

  const notLongestRegex = new RegExp(`^(${notLongestPatterns.join("|")})+$`);

  const updatedPatterns = [...notLongestPatterns];

  longestPatterns.forEach((long: string) => {
    if (!notLongestRegex.test(long)) {
      updatedPatterns.push(long);
    }
  });

  if (JSON.stringify(updatedPatterns) === JSON.stringify(patterns)) {
    return updatedPatterns;
  } else {
    return simplifyPatterns(updatedPatterns);
  }
}

const cache = new Map<string, boolean>();

export function findDesign(
  towel: Towel,
  patterns: Pattern[],
  level: number = 0
): boolean {
  const key = `${towel}-${level}`;
  const cached = cache.get(key);
  if (typeof cached !== "undefined") return cached;

  let result = true;

  if (towel === "") {
    result = true;
  } else {
    const tokens = towel.split("").map((_, i) => towel.slice(0, i + 1));
    const availablePatterns = patterns.filter((pattern) =>
      tokens.includes(pattern)
    );

    if (availablePatterns.length === 0) {
      result = false;
    } else {
      result = availablePatterns.some((pattern) => {
        const shorterPattern = towel.slice(pattern.length);

        return findDesign(shorterPattern, patterns, level - 1);
      });
    }
  }

  cache.set(key, result);

  return result;
}

export function solution({
  patterns,
  towels,
}: {
  patterns: Pattern[];
  towels: Towel[];
}) {
  return towels.filter((t) => {
    const result = findDesign(t, patterns);
    return result;
  }).length;
}
