import createExamProgressNavigationModel, { clampExamQuestionIndex } from "../../../../src/ui/viewmodel/ExamPage/createExamProgressNavigationModel.js";

describe("createExamProgressNavigationModel", () => {
	it("marks the first question as unable to go previous", () => {
		expect(createExamProgressNavigationModel({
			currentQuestionIndex: 0,
			visibleQuestionCount: 3
		})).toEqual({
			currentQuestionNumber: 1,
			canGoPrevious: false,
			canGoNext: true,
			isFooterNavigationEnabled: true,
			isLastQuestion: false
		});
	});

	it("marks middle questions as navigable both ways", () => {
		expect(createExamProgressNavigationModel({
			currentQuestionIndex: 1,
			visibleQuestionCount: 3
		})).toEqual({
			currentQuestionNumber: 2,
			canGoPrevious: true,
			canGoNext: true,
			isFooterNavigationEnabled: true,
			isLastQuestion: false
		});
	});

	it("marks the last question as the submit step", () => {
		expect(createExamProgressNavigationModel({
			currentQuestionIndex: 2,
			visibleQuestionCount: 3
		})).toEqual({
			currentQuestionNumber: 3,
			canGoPrevious: true,
			canGoNext: false,
			isFooterNavigationEnabled: true,
			isLastQuestion: true
		});
	});

	it("keeps an empty question set non-navigable", () => {
		expect(createExamProgressNavigationModel({
			currentQuestionIndex: 0,
			visibleQuestionCount: 0
		})).toEqual({
			currentQuestionNumber: 1,
			canGoPrevious: false,
			canGoNext: false,
			isFooterNavigationEnabled: false,
			isLastQuestion: true
		});
	});
});

describe("clampExamQuestionIndex", () => {
	it("clamps to zero when there are no visible questions", () => {
		expect(clampExamQuestionIndex(7, 0)).toBe(0);
	});

	it("clamps negative indexes to the first question", () => {
		expect(clampExamQuestionIndex(-2, 4)).toBe(0);
	});

	it("clamps indexes past the end to the last question", () => {
		expect(clampExamQuestionIndex(9, 4)).toBe(3);
	});

	it("keeps valid indexes unchanged", () => {
		expect(clampExamQuestionIndex(2, 4)).toBe(2);
	});
});
