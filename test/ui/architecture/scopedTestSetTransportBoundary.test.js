// test/ui/architecture/scopedTestSetTransportBoundary.test.js
import fs from "node:fs";
import path from "node:path";
import { describe, expect, test } from "@jest/globals";

const VALIDATOR_PATH = path.resolve("src/model/datasource/validateScopedTestSetTransport.js");
const EXAM_DATA_SOURCE_PATH = path.resolve("src/model/datasource/ExamDataSource.js");
const CHAPTER_TEST_DATA_SOURCE_PATH = path.resolve("src/model/datasource/ChapterTestDataSource.js");
const REPOSITORY_PATH = path.resolve("src/model/repositories/TestSetRepository.js");

describe("scoped TestSet transport boundary architecture", () => {
	test("uses the existing TestType and language SSOTs instead of local enum copies", () => {
		const validator = fs.readFileSync(VALIDATOR_PATH, "utf8");

		expect(validator).toContain('import { LANGUAGES } from "../../i18n/translations.js";');
		expect(validator).toContain('import { TEST_TYPES } from "../../navigation/navigation.js";');
		expect(validator).not.toMatch(/const\s+(?:TEST_TYPES|LANGUAGES)\s*=/);
	});

	test("validates both explicit resource DataSources at list and detail boundaries", () => {
		const examDataSource = fs.readFileSync(EXAM_DATA_SOURCE_PATH, "utf8");
		const chapterTestDataSource = fs.readFileSync(CHAPTER_TEST_DATA_SOURCE_PATH, "utf8");

		expect(examDataSource).toContain("validateExamTestSetList(response)");
		expect(examDataSource).toContain("validateExamTestSet(response)");
		expect(chapterTestDataSource).toContain("validateChapterTestList(response)");
		expect(chapterTestDataSource).toContain("validateChapterTest(response)");
	});

	test("does not retain legacy TestSet transport fallbacks in the repository", () => {
		const repository = fs.readFileSync(REPOSITORY_PATH, "utf8");

		expect(repository).not.toContain("durationMinutes");
		expect(repository).not.toMatch(/\bduration:\s*testSet\.duration/);
		expect(repository).not.toContain("testSet.questions?.length");
	});
});
