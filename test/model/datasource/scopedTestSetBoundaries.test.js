// test/model/datasource/scopedTestSetBoundaries.test.js
import fs from "node:fs";
import path from "node:path";
import { afterEach, beforeEach, describe, expect, jest, test } from "@jest/globals";
import ExamDataSource from "../../../src/model/datasource/ExamDataSource.js";
import ChapterTestDataSource from "../../../src/model/datasource/ChapterTestDataSource.js";
import { TEST_TYPES } from "../../../src/navigation/navigation.js";

const FIXTURE_PATH = path.resolve("test/fixtures/scoped-test-set/scoped-test-set-dtos.json");

function readFixture() {
	return JSON.parse(fs.readFileSync(FIXTURE_PATH, "utf8"));
}

function getFixture(testType) {
	return readFixture().find((testSet) => testSet.testType === testType);
}

function createResponse(payload) {
	return {
		ok: true,
		status: 200,
		text: jest.fn().mockResolvedValue(JSON.stringify(payload))
	};
}

function createExamDataSource() {
	return new ExamDataSource({ baseUrl: "https://api.example.test" });
}

function createChapterTestDataSource() {
	return new ChapterTestDataSource({ baseUrl: "https://api.example.test" });
}

async function fetchExamList(payload) {
	global.fetch.mockResolvedValueOnce(createResponse(payload));
	return await createExamDataSource().fetchTestSetsBySubject({ subjectId: "contract-subject", language: "no" });
}

async function fetchChapterTestList(payload) {
	global.fetch.mockResolvedValueOnce(createResponse(payload));
	return await createChapterTestDataSource().fetchTestSetsBySubject({ subjectId: "contract-subject", language: "en" });
}

describe("scoped TestSet DataSource boundaries", () => {
	let originalFetch;

	beforeEach(() => {
		originalFetch = global.fetch;
		global.fetch = jest.fn();
	});

	afterEach(() => {
		global.fetch = originalFetch;
	});

	test("accepts the documented DTO and preserves explicit nullable values", async () => {
		const exam = getFixture(TEST_TYPES.EXAM);
		const chapterTest = getFixture(TEST_TYPES.CHAPTER_TEST);

		await expect(fetchExamList([exam])).resolves.toEqual([exam]);
		await expect(fetchChapterTestList([chapterTest])).resolves.toEqual([chapterTest]);
		expect(exam.description).toBeNull();
		expect(exam.modeLabel).toBeNull();
		expect(exam.estimatedMinutes).toBeNull();
	});

	test("rejects a missing required field", async () => {
		const exam = getFixture(TEST_TYPES.EXAM);
		delete exam.baseId;

		await expect(fetchExamList([exam])).rejects.toThrow("Invalid Exam TestSet transport response");
	});

	test("rejects an unknown testType", async () => {
		const exam = getFixture(TEST_TYPES.EXAM);
		exam.testType = "mock";

		await expect(fetchExamList([exam])).rejects.toThrow("Invalid Exam TestSet transport response");
	});

	test("rejects the wrong registered testType for each scoped port", async () => {
		const exam = getFixture(TEST_TYPES.EXAM);
		const chapterTest = getFixture(TEST_TYPES.CHAPTER_TEST);

		await expect(fetchExamList([chapterTest])).rejects.toThrow("Invalid Exam TestSet transport response");
		await expect(fetchChapterTestList([exam])).rejects.toThrow("Invalid ChapterTest TestSet transport response");
	});

	test("rejects snake_case leakage and other fields outside the exact DTO", async () => {
		const exam = getFixture(TEST_TYPES.EXAM);
		exam.base_id = exam.baseId;

		await expect(fetchExamList([exam])).rejects.toThrow("Invalid Exam TestSet transport response");
	});

	test("enforces nullable and non-nullable field types", async () => {
		const invalidNullable = getFixture(TEST_TYPES.EXAM);
		invalidNullable.description = 42;
		await expect(fetchExamList([invalidNullable])).rejects.toThrow("Invalid Exam TestSet transport response");

		const invalidRequired = getFixture(TEST_TYPES.EXAM);
		invalidRequired.title = null;
		await expect(fetchExamList([invalidRequired])).rejects.toThrow("Invalid Exam TestSet transport response");
	});

	test("rejects languages outside the canonical language registry", async () => {
		const exam = getFixture(TEST_TYPES.EXAM);
		exam.lang = "sv";

		await expect(fetchExamList([exam])).rejects.toThrow("Invalid Exam TestSet transport response");
	});

	test("validates detail responses at the same boundary", async () => {
		const exam = getFixture(TEST_TYPES.EXAM);
		const chapterTest = getFixture(TEST_TYPES.CHAPTER_TEST);

		global.fetch
			.mockResolvedValueOnce(createResponse(exam))
			.mockResolvedValueOnce(createResponse(chapterTest));

		await expect(createExamDataSource().fetchTestSetById(exam.id)).resolves.toEqual(exam);
		await expect(createChapterTestDataSource().fetchTestSetById(chapterTest.id)).resolves.toEqual(chapterTest);
	});

	test("rejects non-array list responses", async () => {
		const exam = getFixture(TEST_TYPES.EXAM);
		await expect(fetchExamList({ exams: [exam] })).rejects.toThrow("Invalid Exam TestSet transport response");
	});
});
