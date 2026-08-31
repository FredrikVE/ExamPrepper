// test/ui/architecture/testSetRepositoryScope.test.js
import fs from "node:fs";
import path from "node:path";
import { describe, expect, test } from "@jest/globals";

describe("test-set repository scope", () => {
	test("has no global test-set catalog path", () => {
		const examDataSourceSource = fs.readFileSync(path.resolve("src/model/datasource/ExamDataSource.js"), "utf8");
		const chapterTestDataSourceSource = fs.readFileSync(path.resolve("src/model/datasource/ChapterTestDataSource.js"), "utf8");
		const repositorySource = fs.readFileSync(path.resolve("src/model/repositories/TestSetRepository.js"), "utf8");

		expect(examDataSourceSource).not.toContain("fetchAllTestSets");
		expect(chapterTestDataSourceSource).not.toContain("fetchAllTestSets");
		expect(repositorySource).not.toContain("getAllExams");
		expect(repositorySource).not.toContain("#allExamsPromise");
		expect(repositorySource).toContain("#testSetListPromisesByScope");
		expect(repositorySource).toContain("subjectId");
		expect(repositorySource).toContain("language");
		expect(repositorySource).not.toContain("durationMinutes");
		expect(repositorySource).not.toMatch(/\bduration:\s*testSet\.duration/);
		expect(repositorySource).not.toContain("testSet.questions?.length");
	});

	test("uses explicit Exam and ChapterTest datasource classes", () => {
		const dependenciesSource = fs.readFileSync(path.resolve("src/di/dependencies.js"), "utf8");

		expect(fs.existsSync(path.resolve("src/model/datasource/TestSetDataSource.js"))).toBe(false);
		expect(dependenciesSource).toContain("const examDataSource = new ExamDataSource(");
		expect(dependenciesSource).toContain("const chapterTestDataSource = new ChapterTestDataSource(");
		expect(dependenciesSource).not.toContain("new TestSetDataSource(");
	});

	test("uses explicit Exam and ChapterTest question datasource classes", () => {
		const dependenciesSource = fs.readFileSync(path.resolve("src/di/dependencies.js"), "utf8");

		expect(fs.existsSync(path.resolve("src/model/datasource/TestSetQuestionDataSource.js"))).toBe(false);
		expect(dependenciesSource).toContain("const examQuestionDataSource = new ExamQuestionDataSource(");
		expect(dependenciesSource).toContain("const chapterTestQuestionDataSource = new ChapterTestQuestionDataSource(");
		expect(dependenciesSource).not.toContain("new TestSetQuestionDataSource(");
	});

	test("wires Exam and ChapterTest as named instances of one repository implementation", () => {
		const dependenciesSource = fs.readFileSync(path.resolve("src/di/dependencies.js"), "utf8");

		expect(dependenciesSource).toContain("const examRepository = new TestSetRepository(");
		expect(dependenciesSource).toContain("const chapterTestRepository = new TestSetRepository(");
		expect(dependenciesSource).not.toContain("new ExamRepository(");
	});
});
