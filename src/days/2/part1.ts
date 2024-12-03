export type Report = number[];

export function parseInput(rawText: string): Report[] {
  const lines = rawText.split("\n");
  return lines.map((line) => line.split(" ").map((level) => parseInt(level)));
}

export function isSorted(report: Report, ascending: boolean): boolean {
  const sortedArray = [...report].sort((a, b) => {
    return ascending ? a - b : b - a;
  });

  return JSON.stringify(sortedArray) === JSON.stringify(report);
}

export function noDuplicateLevels(report: Report): boolean {
  return new Set(report).size === report.length;
}

export function isReportSafe(report: Report): boolean {
  // Any two adjacent levels differ by at least one and at most three.
  const isSafelyFluxuating = report.every((level, index) => {
    // last level - ignore
    if (index === report.length - 1) return true;

    const adjacentLevel = report[index + 1];
    const levelDifference = Math.abs(adjacentLevel - level);

    return levelDifference <= 3 && levelDifference > 0;
  });

  if (noDuplicateLevels(report)) {
    if (isSorted(report, true)) {
      return isSafelyFluxuating;
    }

    if (isSorted(report, false)) {
      return isSafelyFluxuating;
    }
  }
  return false;
}

export function solution(reports: Report[]): number {
  return reports.filter((report) => isReportSafe(report)).length;
}
