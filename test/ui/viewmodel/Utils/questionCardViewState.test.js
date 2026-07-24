import { describe, expect, test } from "@jest/globals";
import { QUESTION_TYPES } from "../../../../src/constants/QuestionTypes.js";
import { getQuestionTypeLabel, getQuestionViewState } from "../../../../src/ui/viewmodel/Utils/questionCardViewState.js";

const labels = {
	questionTypeSingle: "single",
	questionTypeFill: "fill",
	questionTypeMulti: "multi",
	questionTypeDragDrop: "dragDrop",
	questionTypeDragCategorize: "dragCategorize",
	questionTypeMatrixPlacement: "matrixPlacement",
	questionTypeSequenceOrder: "sequenceOrder",
	questionTypeDropdownFill: "dropdownFill",
	questionTypeRadioButtonGrid: "radioButtonGrid",
	questionTypeUnknown: "unknown"
};

const expectedLabelsByQuestionType = new Map([
	[QUESTION_TYPES.SINGLE, labels.questionTypeSingle],
	[QUESTION_TYPES.FILL, labels.questionTypeFill],
	[QUESTION_TYPES.MULTI, labels.questionTypeMulti],
	[QUESTION_TYPES.DRAG_DROP, labels.questionTypeDragDrop],
	[QUESTION_TYPES.DRAG_CATEGORIZE, labels.questionTypeDragCategorize],
	[QUESTION_TYPES.MATRIX_PLACEMENT, labels.questionTypeMatrixPlacement],
	[QUESTION_TYPES.SEQUENCE_ORDER, labels.questionTypeSequenceOrder],
	[QUESTION_TYPES.DROPDOWN_FILL, labels.questionTypeDropdownFill],
	[QUESTION_TYPES.RADIO_BUTTON_GRID, labels.questionTypeRadioButtonGrid]
]);

describe("questionCardViewState", () => {
	test("maps every registered question type to its product label", () => {
		for (const questionType of Object.values(QUESTION_TYPES)) {
			expect(getQuestionTypeLabel(questionType, labels)).toBe(expectedLabelsByQuestionType.get(questionType));
		}
	});

	test("uses the explicit unknown label for unregistered question types", () => {
		expect(getQuestionTypeLabel("future-question-type", labels)).toBe(labels.questionTypeUnknown);
		expect(getQuestionTypeLabel(null, labels)).toBe(labels.questionTypeUnknown);
	});

	test.each([
		[QUESTION_TYPES.SINGLE, { shouldShowSingleOptions: true, shouldShowMultiOptions: false }],
		[QUESTION_TYPES.MULTI, { shouldShowSingleOptions: false, shouldShowMultiOptions: true }],
		[QUESTION_TYPES.FILL, { shouldShowFillInput: true, shouldShowOptions: false }],
		[QUESTION_TYPES.DRAG_DROP, { shouldShowDragDrop: true, shouldShowOptions: false }],
		[QUESTION_TYPES.DRAG_CATEGORIZE, { shouldShowDragCategorize: true, shouldShowOptions: false }],
		[QUESTION_TYPES.MATRIX_PLACEMENT, { shouldShowMatrixPlacement: true, shouldShowPrompt: false }],
		[QUESTION_TYPES.SEQUENCE_ORDER, { shouldShowSequenceOrder: true, shouldShowOptions: false }],
		[QUESTION_TYPES.DROPDOWN_FILL, { shouldShowDropdownFill: true, shouldShowOptions: false }],
		[QUESTION_TYPES.RADIO_BUTTON_GRID, { shouldShowRadioButtonGrid: true, shouldShowOptions: false }]
	])("characterizes the presentation branch for %s", (questionType, expectedState) => {
		const state = getQuestionViewState({
			question: { type: questionType, prompt: "Prompt" },
			submitted: false,
			showAllFeedback: false,
			correct: false
		});

		expect(state).toMatchObject(expectedState);
	});
	test("does not route an unknown question type through a choice renderer", () => {
		const state = getQuestionViewState({
			question: { type: "future-question-type", options: [{ id: "option-1" }] },
			submitted: false,
			showAllFeedback: false,
			correct: false
		});

		expect(state).toMatchObject({
			shouldShowOptions: false,
			shouldShowMultiOptions: false,
			shouldShowSingleOptions: false,
			inputType: null
		});
	});

});
