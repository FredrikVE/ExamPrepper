// test/ui/viewmodel/ExamPage/createQuestionCorrectnessByQuestionId.test.js
import { describe, expect, jest, test } from "@jest/globals";
import createQuestionCorrectnessByQuestionId from "../../../../src/ui/viewmodel/ExamPage/createQuestionCorrectnessByQuestionId.js";

describe("createQuestionCorrectnessByQuestionId", () => {
	test("grades each question once and returns correctness by question id", () => {
		const questions = [
			{ id: "q1" },
			{ id: "q2" }
		];
		const answers = {
			q1: "A",
			q2: "B"
		};
		const gradeAnswerUseCase = {
			execute: jest.fn((question, answer) => question.id === "q1" && answer === "A")
		};

		const result = createQuestionCorrectnessByQuestionId(
			questions,
			answers,
			gradeAnswerUseCase
		);

		expect(result).toEqual({
			q1: true,
			q2: false
		});
		expect(gradeAnswerUseCase.execute).toHaveBeenCalledTimes(2);
		expect(gradeAnswerUseCase.execute).toHaveBeenNthCalledWith(1, questions[0], "A");
		expect(gradeAnswerUseCase.execute).toHaveBeenNthCalledWith(2, questions[1], "B");
	});
});
