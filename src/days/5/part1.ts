export type Rule = [number, number];
export type PageMap = Map<number, number>;
export type PagesList = number[][];

export type ParsedInput = {
  rules: Rule[];
  pageMaps: PageMap[];
  pagesList: PagesList;
};

export function createPageMap(pageList: number[]): PageMap {
  const pageMap: PageMap = new Map();
  pageList.forEach((page, index) => {
    pageMap.set(page, index);
  });
  return pageMap;
}

export function parseInput(rawText: string): ParsedInput {
  const [rulesRaw, pagesRaw] = rawText.split("\n\n");

  const rules = rulesRaw
    .split("\n")
    .map((ruleRaw) => ruleRaw.split("|").map((rule) => parseInt(rule)) as Rule);

  const pageInputs = pagesRaw.split("\n");
  const pagesList = pageInputs.map((pages) =>
    pages.split(",").map((page) => parseInt(page))
  );

  const pageMaps = pageInputs.map((_, index) => {
    return createPageMap(pagesList[index]);
  });

  return { pageMaps, rules, pagesList };
}

export function checkRule(rule: Rule, pageMap: PageMap): boolean {
  const [x, y] = rule;

  if (!pageMap.has(x) || !pageMap.has(y)) return true; // ignore

  return pageMap.get(x)! < pageMap.get(y)!;
}

export function middlePage(pageList: number[]): number {
  return pageList[Math.floor(pageList.length / 2)];
}

export function solution(parsedInput: ParsedInput): number {
  const { rules, pageMaps, pagesList } = parsedInput;

  let total = 0;
  pageMaps.forEach((pageMap, index) => {
    const isValid = rules.every((rule) => checkRule(rule, pageMap));
    if (isValid) {
      total += middlePage(pagesList[index]);
    }
  }, 0);

  return total;
}
