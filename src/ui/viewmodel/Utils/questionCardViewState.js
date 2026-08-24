// src/ui/viewmodel/Utils/questionCardViewState.js
import { QUESTION_TYPES } from "../../../constants/QuestionTypes.js";

const INLINE_FILL_BLANK_PATTERN = /_{3,}/;

export function hasInlineFillBlank(question) {
	return question.type === QUESTION_TYPES.FILL && INLINE_FILL_BLANK_PATTERN.test(question.prompt);
}

export function getQuestionTypeLabel(type, t) {
	switch (type) {
		case QUESTION_TYPES.SINGLE:
			return t.questionTypeSingle;

		case QUESTION_TYPES.FILL:
			return t.questionTypeFill;

		case QUESTION_TYPES.MULTI:
			return t.questionTypeMulti;

		case QUESTION_TYPES.DRAG_DROP:
			return t.questionTypeDragDrop;

		case QUESTION_TYPES.DRAG_CATEGORIZE:
			return t.questionTypeDragCategorize;

		case QUESTION_TYPES.MATRIX_PLACEMENT:
			return t.questionTypeMatrixPlacement;

		case QUESTION_TYPES.SEQUENCE_ORDER:
			return t.questionTypeSequenceOrder;

		case QUESTION_TYPES.DROPDOWN_FILL:
			return t.questionTypeDropdownFill;

		case QUESTION_TYPES.RADIO_BUTTON_GRID:
			return t.questionTypeRadioButtonGrid;

		case QUESTION_TYPES.TAP_TO_FILL_MULTIPLE_BLANK:
			return t.questionTypeTapToFillMultipleBlank;

		case QUESTION_TYPES.WRITE_TO_FILL_MULTIPLE_BLANK:
			return t.questionTypeWriteToFillMultipleBlank;

		default:
			return t.questionTypeUnknown;
	}
}

export function getQuestionViewState({ question, submitted, showAllFeedback, correct }) {
	const fillQuestion = question.type === QUESTION_TYPES.FILL;
	const feedbackMode = Boolean(submitted && showAllFeedback);

	return {
		feedbackMode,
		hasInlineFillBlank: hasInlineFillBlank(question),
		shouldShowPrompt: question.type !== QUESTION_TYPES.MATRIX_PLACEMENT,
		shouldShowWarning: Boolean(submitted && !showAllFeedback && !correct),
		shouldShowFillFeedback: feedbackMode && fillQuestion,
		shouldShowSource: feedbackMode && !fillQuestion && Boolean(question.source)
	};
}
