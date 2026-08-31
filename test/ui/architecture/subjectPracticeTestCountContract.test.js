// test/ui/architecture/subjectPracticeTestCountContract.test.js
import fs from "node:fs";
import path from "node:path";
import { describe, expect, test } from "@jest/globals";
import { LANGUAGES, translations } from "../../../src/i18n/translations.js";

describe("subject practice-test count contract", () => {
	test("uses practiceTestCount naming without the mock-exam legacy", () => {
		const repositorySource = fs.readFileSync(path.resolve("src/model/repositories/SubjectRepository.js"), "utf8");
		const cardSource = fs.readFileSync(path.resolve("src/ui/view/components/SubjectSelectPage/SubjectSelectCard.jsx"), "utf8");

		expect(repositorySource).not.toContain("ExamRepository");
		expect(repositorySource).not.toContain("buildExamCountsBySubject");
		expect(repositorySource).not.toContain("examCount");
		expect(cardSource).toContain("subject.practiceTestCount");
		expect(cardSource).toContain("subjectPracticeTestCount");
		expect(cardSource).not.toContain("subjectMockExamCount");
	});

	test("keeps Norwegian copy and names English copy as practice tests", () => {
		expect(translations[LANGUAGES.NO].subjectPracticeTestCount(1)).toBe("1 øveprøve");
		expect(translations[LANGUAGES.NO].subjectPracticeTestCount(16)).toBe("16 øveprøver");
		expect(translations[LANGUAGES.EN].subjectPracticeTestCount(1)).toBe("1 practice test");
		expect(translations[LANGUAGES.EN].subjectPracticeTestCount(16)).toBe("16 practice tests");
	});
});
