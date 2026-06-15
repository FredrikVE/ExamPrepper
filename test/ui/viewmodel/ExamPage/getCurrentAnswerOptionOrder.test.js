import getCurrentAnswerOptionOrder from "../../../../src/ui/viewmodel/ExamPage/getCurrentAnswerOptionOrder.js";

describe("getCurrentAnswerOptionOrder", () => {
	const currentQuestion = { id: "question-1" };
	const answerOptionOrderByQuestionId = {
		"question-1": [2, 0, 1]
	};

	it("returns null when there is no current question", () => {
		expect(getCurrentAnswerOptionOrder(null, true, answerOptionOrderByQuestionId)).toBeNull();
	});

	it("returns null when answer option randomization is disabled", () => {
		expect(getCurrentAnswerOptionOrder(currentQuestion, false, answerOptionOrderByQuestionId)).toBeNull();
	});

	it("returns the order for the current question when randomization is enabled", () => {
		expect(getCurrentAnswerOptionOrder(currentQuestion, true, answerOptionOrderByQuestionId)).toEqual([2, 0, 1]);
	});

	it("returns null when the current question has no stored order", () => {
		expect(getCurrentAnswerOptionOrder({ id: "question-2" }, true, answerOptionOrderByQuestionId)).toBeNull();
	});
});
