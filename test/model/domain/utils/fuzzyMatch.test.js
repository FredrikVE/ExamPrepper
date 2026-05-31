// test/model/domain/utils/fuzzyMatch.test.js
import { describe, expect, test } from "@jest/globals";
import { levenshteinDistance, getAllowedDistance, isFuzzyMatch } from "../../../../src/model/domain/utils/fuzzyMatch.js";

describe("levenshteinDistance", () => {
    test("returns 0 for identical strings", () => {
        expect(levenshteinDistance("abc", "abc")).toBe(0);
    });

    test("returns length of other string when one is empty", () => {
        expect(levenshteinDistance("", "abc")).toBe(3);
        expect(levenshteinDistance("abc", "")).toBe(3);
    });

    test("counts a single substitution", () => {
        expect(levenshteinDistance("cat", "bat")).toBe(1);
    });

    test("counts a single insertion", () => {
        expect(levenshteinDistance("cat", "cats")).toBe(1);
    });

    test("counts a single deletion", () => {
        expect(levenshteinDistance("cats", "cat")).toBe(1);
    });

    test("counts a transposition as two edits", () => {
        expect(levenshteinDistance("ab", "ba")).toBe(2);
    });

    test("handles realistic dyslexia example: missing letter", () => {
        expect(levenshteinDistance("diskonteringsrat", "diskonteringsrate")).toBe(1);
    });

    test("handles realistic dyslexia example: swapped letters", () => {
        expect(levenshteinDistance("diskonteirngrate", "diskonteringrate")).toBe(2);
    });

    test("handles realistic dyslexia example: extra letter", () => {
        expect(levenshteinDistance("diskontteringsrate", "diskonteringsrate")).toBe(1);
    });
});

describe("getAllowedDistance", () => {
    test("returns 0 for very short words (1-3 chars)", () => {
        expect(getAllowedDistance(1)).toBe(0);
        expect(getAllowedDistance(2)).toBe(0);
        expect(getAllowedDistance(3)).toBe(0);
    });

    test("returns 1 for medium words (4-7 chars)", () => {
        expect(getAllowedDistance(4)).toBe(1);
        expect(getAllowedDistance(7)).toBe(1);
    });

    test("returns 2 for long words (8+ chars)", () => {
        expect(getAllowedDistance(8)).toBe(2);
        expect(getAllowedDistance(17)).toBe(2);
    });
});

describe("isFuzzyMatch", () => {
    test("returns false for exact match (that is not fuzzy, it is exact)", () => {
        expect(isFuzzyMatch("hello", "hello")).toBe(false);
    });

    test("returns false for empty input", () => {
        expect(isFuzzyMatch("", "hello")).toBe(false);
        expect(isFuzzyMatch("hello", "")).toBe(false);
    });

    test("returns false for short words regardless of distance", () => {
        expect(isFuzzyMatch("ti", "tid")).toBe(false);
    });

    test("returns true for one-letter typo in medium word", () => {
        expect(isFuzzyMatch("tidsplan", "tidsplam")).toBe(true);
    });

    test("returns true for two-letter typo in long-enough word", () => {
        expect(isFuzzyMatch("tidplen", "tidsplan")).toBe(true);
    });

    test("returns false for two-letter typo in medium word within 1-edit threshold", () => {
        expect(isFuzzyMatch("tidsplam", "tidplan")).toBe(false);
    });

    test("returns true for one-letter typo in long word", () => {
        expect(isFuzzyMatch("diskonteringsrat", "diskonteringsrate")).toBe(true);
    });

    test("returns true for two-letter typo in long word", () => {
        expect(isFuzzyMatch("diskonteirngrate", "diskonteringrate")).toBe(true);
    });

    test("returns false for completely different answer", () => {
        expect(isFuzzyMatch("banankake", "diskonteringsrate")).toBe(false);
    });

    test("returns false when null or undefined is passed", () => {
        expect(isFuzzyMatch(null, "hello")).toBe(false);
        expect(isFuzzyMatch("hello", null)).toBe(false);
        expect(isFuzzyMatch(undefined, undefined)).toBe(false);
    });
});
