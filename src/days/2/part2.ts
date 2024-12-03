import { isReportSafe, type Report } from "./part1";

export function solution(reports: Report[]): number {
  let goodLevels = 0;
  let warningLevels = 0;
  const safeLevels = reports.filter((report) => {
    // check the original report
    if (isReportSafe(report)) {
      goodLevels += 1;
      return true;
    }

    // remove each level iteratively for a good solution
    return report.some((_, index) => {
      const amendedReport = [...report];
      amendedReport.splice(index, 1);

      if (isReportSafe(amendedReport)) {
        warningLevels += 1;
        return true;
      } else {
        return false;
      }
    });
  }).length;

  return safeLevels;
}
