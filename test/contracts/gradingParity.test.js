//test/contracts/gradingParity.test.js
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, test } from "@jest/globals";
import GradeAnswerUseCase from "../../src/model/domain/GradeAnswerUseCase.js";
import { mapGradingFixtureAnswerToFrontend, mapGradingFixtureQuestionToFrontend } from "./gradingFixtureAdapter.js";

const currentDirectory = path.dirname(fileURLToPath(import.meta.url));
const fixtures = JSON.parse(fs.readFileSync(path.resolve(currentDirectory, "../fixtures/grading/question-grading-fixtures.json"), "utf8"));

describe("shared grading parity fixtures", () => {
	const gradeAnswerUseCase = new GradeAnswerUseCase();

	for (const fixture of fixtures) {
		test(fixture.id, () => {
			expect(Object.keys(fixture).sort()).toEqual(["answer", "expected", "id", "question"]);

			const frontendQuestion = mapGradingFixtureQuestionToFrontend(fixture.question);
			const frontendAnswer = mapGradingFixtureAnswerToFrontend(fixture.question, fixture.answer);
			const actual = {
				isCorrect: gradeAnswerUseCase.execute(frontendQuestion, frontendAnswer),
				pointsAwarded: gradeAnswerUseCase.getQuestionScore(frontendQuestion, frontendAnswer),
				maxPoints: frontendQuestion.points
			};

			expect(actual).toEqual(fixture.expected);
		});
	}
});
