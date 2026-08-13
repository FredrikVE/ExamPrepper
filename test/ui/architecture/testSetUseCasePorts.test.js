// test/ui/architecture/testSetUseCasePorts.test.js
import fs from "node:fs";
import path from "node:path";
import { describe, expect, test } from "@jest/globals";

describe("test-set use-case ports", () => {
    test("wires explicit Exam and ChapterTest ports to shared test-set implementations", () => {
        const dependenciesSource = fs.readFileSync(path.resolve("src/di/dependencies.js"), "utf8");

        expect(dependenciesSource).toContain("const getAvailableExamsUseCase = new GetAvailableTestSetsUseCase(examRepository);");
        expect(dependenciesSource).toContain("const getAvailableChapterTestsUseCase = new GetAvailableTestSetsUseCase(chapterTestRepository);");
        expect(dependenciesSource).toContain("const getExamQuestionsUseCase = new GetTestSetQuestionsUseCase(examRepository);");
        expect(dependenciesSource).toContain("const getChapterTestQuestionsUseCase = new GetTestSetQuestionsUseCase(chapterTestRepository);");
        expect(dependenciesSource).toContain("const getExamByIdUseCase = new GetTestSetByIdUseCase(examRepository);");
        expect(dependenciesSource).toContain("const getChapterTestByIdUseCase = new GetTestSetByIdUseCase(chapterTestRepository);");
        expect(dependenciesSource).toContain("const getExamByBaseIdAndLangUseCase = new GetTestSetByBaseIdAndLangUseCase(examRepository);");
        expect(dependenciesSource).toContain("const getChapterTestByBaseIdAndLangUseCase = new GetTestSetByBaseIdAndLangUseCase(chapterTestRepository);");
    });

    test("does not keep Exam-named implementations for shared test-set reads", () => {
        const domainDirectory = path.resolve("src/model/domain");
        for (const filename of [
            "GetAvailableExamsUseCase.js",
            "GetExamQuestionsUseCase.js",
            "GetExamByIdUseCase.js",
            "GetExamByBaseIdAndLangUseCase.js",
            "GetAvailableChapterTestsUseCase.js",
            "GetChapterTestQuestionsUseCase.js",
            "GetChapterTestByIdUseCase.js",
            "GetChapterTestByBaseIdAndLangUseCase.js"
        ]) {
            expect(fs.existsSync(path.join(domainDirectory, filename))).toBe(false);
        }
    });

    test("keeps shared test-set read policy in one implementation per capability", () => {
        for (const filename of [
            "GetAvailableTestSetsUseCase.js",
            "GetTestSetQuestionsUseCase.js",
            "GetTestSetByIdUseCase.js",
            "GetTestSetByBaseIdAndLangUseCase.js"
        ]) {
            expect(fs.existsSync(path.resolve("src/model/domain", filename))).toBe(true);
        }
    });
});
