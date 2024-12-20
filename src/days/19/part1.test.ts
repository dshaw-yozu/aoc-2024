import {
  checkTowel,
  findDesign,
  parseInput,
  simplifyPatterns,
  solution,
} from "./part1";

import fs from "fs";
import path from "path";

const exampleInput = `r, wr, b, g, bwu, rb, gb, br

brwrr
bggr
gbbr
rrbgbr
ubwu
bwurrg
brgr
bbrgwb`;

const input =
  parseInput(`urbu, wrrbwrg, rgug, uwb, uwg, wubwgu, bgrwu, gubbuu, wrrub, rbr, bgrr, rrgrrur, rgu, ugrrru, bgu, uubbwrb, ugru, bwb, uwuu, urb, gwubw, ubu, wubwu, ubb, rugrgw, guu, rbwg, rug, brgugb, rwbrbwu, wu, bgrb, wgburg, uuguw, wbggr, guurrbbu, rggw, guwr, rwgrbrb, urbb, bwggwg, wgr, bbwurrw, bgubr, uuu, grru, rbbrbgbr, buwub, urr, gwrgb, wrwrgubu, rurrb, bwbuub, bgbub, wguu, gbrburw, rrb, rwuu, wgwgwubb, rruw, rurru, uuw, uu, ruu, wrwb, wbrgu, gwbuu, bbgw, grgggbr, bwgww, wbuw, wwb, wubguurw, wbuu, uwurgw, ugwbbbr, rbg, uburg, wrbug, gu, bwuugb, rbuwrbur, wguur, wwwbgu, ugbb, guwubw, uwbug, rwub, uwwgug, uur, wrg, ubgbb, uw, wru, uww, uubwg, wgrgw, bu, ugb, rur, bbw, wbgru, ruug, rrbb, ugu, urbgb, bbgu, bgbwgg, gbrwb, brub, wbu, rwbuur, bgggrw, rg, bgwr, wgwwuwu, gbg, gw, ruuw, wr, bww, uwr, ubgg, guwrw, rrr, wburguu, wrbbrru, rwwrg, rwg, bgg, wgw, www, gggbrrur, gbw, rgrr, bb, bwrwww, rb, rgbbu, bubu, ubwubw, w, wgbb, gwwb, r, gru, wugr, b, bubwu, ub, uugggg, ruwuub, buw, uuruuub, gb, grbgr, wwrg, wwg, grwr, wwr, rbrb, wwrrub, uuwbwgw, gggr, rgubr, guggu, rgwwg, bggr, wrruu, grub, gbbbbr, ubw, rbubw, bbbwwww, wuu, uwuuwww, wwu, gww, wbw, rwb, gbwg, bwr, gubgu, urubwrub, uuuw, rrw, wwruu, ggg, bwrrg, bugw, urw, gggwgw, uwgrgwrr, ugr, rgru, bgr, wbbwb, brg, rwbw, bwuu, brw, bbwbuwu, grur, wgbbwu, ru, rwu, rrgb, urbwrub, ubug, bwu, wbgbbg, uuubu, wbrgwrwg, gbgg, buu, uugu, rrbuu, brbg, brwuw, rbbbw, rbgr, buggrug, gbwr, gwr, wrrw, urug, bbbb, bbrgu, rrbwuru, ugggw, bbb, rrbrw, ubg, bwubgw, ugw, urwgr, uwwrgw, ugrbwu, rggwwwb, grubb, brb, rww, ububwr, brruburb, bbrgrur, uwwbgg, gbbrr, rggu, bbwug, wrb, wgugu, br, bbu, gbr, wbg, gbuw, wwug, bru, grwrur, bbr, bugwur, wrug, rrwbu, rw, uug, rgr, ugrubu, rbb, brgwug, rgwbg, rub, gbbg, bur, grg, bubgg, ugg, rbwu, rwr, bub, rrguw, gubb, bbgr, wbbburg, bgw, wb, wubw, ggwuub, bwg, bwbbrw, ggw, grubrg, rgw, uwwuw, uwbr, grr, rgb, bwrggwg, brbwur, uru, bguuubr, wwuwg, wuruwwbw, grrwwrgr, bwbu, rbuuuw, ubru, uub, uwbb, ruw, gwg, rbur, grw, gbgbu, uwbugw, wbb, gurb, ugbwgub, rgubrw, bbugu, urg, wrr, bw, wbubruw, wwwr, rrrb, ggbbbg, wug, rgruu, guwb, uuuggug, brrbrr, gr, buwbguwu, rgg, rrwg, wwgwrr, rrg, wurur, ggwbbrg, rrwgr, rruwu, buww, gbu, rrwuruub, brgr, wguwuu, urbrbg, rru, wgb, urubb, rbw, guru, buru, gur, ww, u, rwgw, gug, wwurwuw, rrbgrw, bwuwubu, bgrw, gguuugub, rbu, rubub, wrw, ggb, buwugrg, wgu, wwrbuu, bgurbg, gwu, bbwgb, uwwrrb, urugu, wugwrrgr, gwbbr, rgubg, bwrww, ug, wrwr, brur, bwur, gwgguw, wuwub, burww, gubwru, gub, bug, bwww, gwgugg, gruw, wgg, wrub, uwuwbgu, bwbw, gwuw, ubr, gbb, ubggru, wwubuw, rgrgru, wg, wub, wrgww, bwwub, gbur, bwgu, ur, rgwrrbw, wguuurb, rwrrg, ubrbburg, rgbggww, rgbgrur, brr, wrggbwr, ggr, guw, bgwb, gwrbwg, wrwbug, ubggu, bgrrb, wbr, wgub, gwbw, grb, rwbubwur, ubgw, gwbb, ugwwggrb, ggww, wugwur, rubwg, bgugw, wbubbu, rbbw, bgug, uggu, bgwrwrw, gwb, bgb, uwug, gurguug, wrrbw, gg

wbrurgggrgbuwguwuwuwuwwwwgugwbwrwwuguwrrwubwuwrgwbugw
`);

describe("part1", () => {
  describe("parseInput", () => {
    it("should return expected output", () => {
      expect(parseInput(exampleInput)).toStrictEqual({
        patterns: ["bwu", "wr", "rb", "gb", "br", "r", "b", "g"],
        towels: [
          "brwrr",
          "bggr",
          "gbbr",
          "rrbgbr",
          "ubwu",
          "bwurrg",
          "brgr",
          "bbrgwb",
        ],
      });
    });
  });

  describe("checkTowel", () => {
    it("should return true for possible design", () => {
      expect(checkTowel("abc", ["bc", "a"])).toBe(true);
      expect(checkTowel("a", ["a"])).toBe(true);
    });
    it("should return false for impossible design", () => {
      expect(checkTowel("abc", ["d", "e", "f"])).toBe(false);
    });

    it("should not allow new pattern", () => {
      expect(checkTowel("aabc", ["ab", "ac"])).toBe(false);
    });

    it.each([
      ["brwrr", true],
      ["bggr", true],
      ["gbbr", true],
      ["rrbgbr", true],
      ["ubwu", false],
      ["bwurrg", true],
      ["brgr", true],
      ["bbrgwb", false],
    ])(
      "given %s checkTowels should return %p for example patterns",
      (input, expected) => {
        expect(
          checkTowel(input, ["bwu", "wr", "rb", "gb", "br", "r", "b", "g"])
        ).toBe(expected);
      }
    );

    it("should handle troublesome design", () => {
      expect(
        checkTowel(
          "gbggwbrwugrbbrrbbrgbbbuguwwurrgguwrbubbbgbbgbbbg",
          input.patterns
        )
      ).toBe(false);
    });
  });

  describe("simplifyPatterns", () => {
    it("should remove long patterns which can be made by the others", () => {
      expect(simplifyPatterns(["abc", "a", "bc"])).toStrictEqual(["a", "bc"]);

      expect(simplifyPatterns(["abc", "aabc", "a", "bc"])).toStrictEqual([
        "a",
        "bc",
      ]);

      expect(simplifyPatterns(["abc", "aabc", "bcb", "a", "bc"])).toStrictEqual(
        ["a", "bc", "bcb"]
      );
    });
  });

  describe("findDesign", () => {
    it("should return true for possible design", () => {
      expect(findDesign("abc", ["bc", "a"])).toBe(true);
      expect(findDesign("a", ["a"])).toBe(true);
    });
    it("should return false for impossible design", () => {
      expect(findDesign("abc", ["d", "e", "f"])).toBe(false);
    });

    it("should not allow new pattern", () => {
      expect(findDesign("aabc", ["ab", "ac"])).toBe(false);
    });

    it.each([
      ["brwrr", true],
      ["bggr", true],
      ["gbbr", true],
      ["rrbgbr", true],
      ["ubwu", false],
      ["bwurrg", true],
      ["brgr", true],
      ["bbrgwb", false],
    ])(
      "given %s checkTowels should return %p for example patterns",
      (input, expected) => {
        expect(
          findDesign(input, ["bwu", "wr", "rb", "gb", "br", "r", "b", "g"])
        ).toBe(expected);
      }
    );

    it("should handle troublesome design", () => {
      expect(
        findDesign(
          "gbggwbrwugrbbrrbbrgbbbuguwwurrgguwrbubbbgbbgbbbg".slice(14),
          input.patterns
        )
      ).toBe(false);
    });
  });

  describe("solution", () => {
    it("should return amount of possilbe designs", () => {
      const input = parseInput(exampleInput);

      expect(solution(input)).toBe(6);
    });
  });
});
