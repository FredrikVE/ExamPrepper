// test/ui/architecture/activeScopedTestSetLoad.test.js
import fs from "node:fs";
import path from "node:path";
import { describe, expect, test } from "@jest/globals";

const viewModelPath = path.resolve("src/ui/viewmodel/LearningContentSelectPageViewModel.js");

describe("active scoped test-set load", () => {
    test("enables exactly the selected test-type port", () => {
        const source = fs.readFileSync(viewModelPath, "utf8");

        expect(source).toContain("const isExamLoadEnabled = isLoadEnabled");
        expect(source).toContain("selectedTestType === TEST_TYPES.EXAM");
        expect(source).toContain("const isChapterTestLoadEnabled = isLoadEnabled");
        expect(source).toContain("selectedTestType === TEST_TYPES.CHAPTER_TEST");
        expect(source).toContain("isEnabled: isExamLoadEnabled");
        expect(source).toContain("isEnabled: isChapterTestLoadEnabled");
    });

    test("derives page status from the active content load instead of both test-type loads", () => {
        const source = fs.readFileSync(viewModelPath, "utf8");
        const pageStatusStart = source.indexOf("const pageStatus = combineLoadStatuses([");
        const pageStatusEnd = source.indexOf("]);", pageStatusStart);
        const pageStatusSource = source.slice(pageStatusStart, pageStatusEnd);

        expect(pageStatusSource).toContain("activeContentLoad.status");
        expect(pageStatusSource).toContain("topicAreaLoad.status");
        expect(pageStatusSource).not.toContain("examLoad.status");
        expect(pageStatusSource).not.toContain("chapterTestLoad.status");
        expect(source).not.toContain("return [...ordinaryExams, ...chapterTests]");
    });
});
