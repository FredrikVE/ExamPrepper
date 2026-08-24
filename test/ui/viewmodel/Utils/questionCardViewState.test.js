// test/ui/viewmodel/Utils/questionCardViewState.test.js
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
	questionTypeTapToFillMultipleBlank: "tapToFillMultipleBlank",
	questionTypeWriteToFillMultipleBlank: "writeToFillMultipleBlank",
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
	[QUESTION_TYPES.RADIO_BUTTON_GRID, labels.questionTypeRadioButtonGrid],
	[QUESTION_TYPES.TAP_TO_FILL_MULTIPLE_BLANK, labels.questionTypeTapToFillMultipleBlank],
	[QUESTION_TYPES.WRITE_TO_FILL_MULTIPLE_BLANK, labels.questionTypeWriteToFillMultipleBlank]
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

	test("builds shared presentation state before submit", () => {
		const state = getQuestionViewState({
			question: {
				type: QUESTION_TYPES.SINGLE,
				source: "Lecture"
			},
			submitted: false,
			showAllFeedback: true,
			correct: false
		});

		expect(state).toEqual({
			feedbackMode: false,
			hasInlineFillBlank: false,
			shouldShowPrompt: true,
			shouldShowWarning: false,
			shouldShowFillFeedback: false,
			shouldShowSource: false
		});
	});

	test("builds fill feedback state after submit", () => {
		const state = getQuestionViewState({
			question: {
				type: QUESTION_TYPES.FILL,
				prompt: "A ___ is B"
			},
			submitted: true,
			showAllFeedback: true,
			correct: true
		});

		expect(state).toEqual({
			feedbackMode: true,
			hasInlineFillBlank: true,
			shouldShowPrompt: true,
			shouldShowWarning: false,
			shouldShowFillFeedback: true,
			shouldShowSource: false
		});
	});

	test("hides the shared prompt for matrix placement", () => {
		const state = getQuestionViewState({
			question: {
				type: QUESTION_TYPES.MATRIX_PLACEMENT
			},
			submitted: false,
			showAllFeedback: false,
			correct: false
		});

		expect(state.shouldShowPrompt).toBe(false);
	});

	test("shows warning without full feedback and source with full feedback", () => {
		const question = {
			type: QUESTION_TYPES.SINGLE,
			source: "Lecture"
		};

		const warningState = getQuestionViewState({
			question,
			submitted: true,
			showAllFeedback: false,
			correct: false
		});

		const feedbackState = getQuestionViewState({
			question,
			submitted: true,
			showAllFeedback: true,
			correct: false
		});

		expect(warningState.shouldShowWarning).toBe(true);
		expect(warningState.shouldShowSource).toBe(false);
		expect(feedbackState.shouldShowWarning).toBe(false);
		expect(feedbackState.shouldShowSource).toBe(true);
	});
});
