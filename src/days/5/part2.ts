import {
  checkRule,
  createPageMap,
  middlePage,
  PageMap,
  PagesList,
  ParsedInput,
  Rule,
} from "./part1";

export function getIncorrect(parsedInput: ParsedInput): {
  pageMaps: PageMap[];
  pageLists: PagesList;
} {
  const { rules, pageMaps, pagesList } = parsedInput;

  let invalidPageMaps: PageMap[] = [];
  let invalidPageLists: PagesList = [];
  pageMaps.forEach((pageMap, index) => {
    const isValid = rules.every((rule) => checkRule(rule, pageMap));
    if (!isValid) {
      invalidPageMaps.push(pageMap);
      invalidPageLists.push(pagesList[index]);
    }
  });

  return { pageMaps: invalidPageMaps, pageLists: invalidPageLists };
}

export function correctPageList(rules: Rule[], pageList: number[]) {
  const updatedList = [...pageList];

  rules.forEach((rule) => {
    const map = createPageMap(updatedList);
    if (!checkRule(rule, map)) {
      const [target, toBeBefore] = rule;

      const targetIndex = map.get(target)!;
      // remove to be moved page
      updatedList.splice(targetIndex, 1);
      // insert before
      const toBeBeforeIndex = updatedList.findIndex((i) => i === toBeBefore);
      updatedList.splice(toBeBeforeIndex, 0, target);
    }
  });

  if (!rules.every((rule) => checkRule(rule, createPageMap(updatedList)))) {
    return correctPageList(rules, updatedList);
  }

  return updatedList;
}

export function solution(parsedInput: ParsedInput): number {
  const incorrectPages = getIncorrect(parsedInput);

  const { pageLists } = incorrectPages;

  const correctedPageLists = pageLists.map((pageList) =>
    correctPageList(parsedInput.rules, pageList)
  );

  let total = 0;
  correctedPageLists.forEach((pageList) => {
    total += middlePage(pageList);
  });
  return total;
}
