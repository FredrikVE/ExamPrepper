// src/model/domain/grading/GradeAnswerUseCase.js
import { QUESTION_TYPES } from "../../../constants/QuestionTypes.js";
import { getFillMatchType, isMultiChoiceAnswerCorrect, isSingleChoiceAnswerCorrect } from "../../algorithms/simpleAnswerGrading.js";
import { getDragCategorizeQuestionScore, getDragCategorizeStats, getDragDropQuestionScore, getDragDropStats, getMatrixPlacementQuestionScore, getMatrixPlacementStats, getSequenceOrderQuestionScore, getSequenceOrderStats, isDragCategorizeAnswerFullyCorrect, isDragDropAnswerFullyCorrect, isMatrixPlacementAnswerFullyCorrect, isSequenceOrderAnswerFullyCorrect } from "../../algorithms/placementAnswerGrading.js";
import { getDropdownFillQuestionScore, getDropdownFillStats, getRadioButtonGridQuestionScore, getRadioButtonGridStats, getWriteToFillMultipleBlankQuestionScore, isDropdownFillAnswerFullyCorrect, isRadioButtonGridAnswerFullyCorrect, isWriteToFillMultipleBlankAnswerFullyCorrect } from "../../algorithms/structuredAnswerGrading.js";

export default class GradeAnswerUseCase {
	execute(question, answer) {
		if (!question) {
			return false;
		}

		switch (question.type) {
			case QUESTION_TYPES.SINGLE:
				return isSingleChoiceAnswerCorrect(question, answer);

			case QUESTION_TYPES.MULTI:
				return isMultiChoiceAnswerCorrect(question, answer);

			case QUESTION_TYPES.FILL:
				return getFillMatchType(question, answer) !== "none";

			case QUESTION_TYPES.DRAG_DROP:
				return isDragDropAnswerFullyCorrect(question, answer);

			case QUESTION_TYPES.DRAG_CATEGORIZE:
				return isDragCategorizeAnswerFullyCorrect(question, answer);

			case QUESTION_TYPES.MATRIX_PLACEMENT:
				return isMatrixPlacementAnswerFullyCorrect(question, answer);

			case QUESTION_TYPES.SEQUENCE_ORDER:
				return isSequenceOrderAnswerFullyCorrect(question, answer);

			case QUESTION_TYPES.DROPDOWN_FILL:
			case QUESTION_TYPES.TAP_TO_FILL_MULTIPLE_BLANK:
				return isDropdownFillAnswerFullyCorrect(question, answer);

			case QUESTION_TYPES.WRITE_TO_FILL_MULTIPLE_BLANK:
				return isWriteToFillMultipleBlankAnswerFullyCorrect(question, answer);

			case QUESTION_TYPES.RADIO_BUTTON_GRID:
				return isRadioButtonGridAnswerFullyCorrect(question, answer);

			default:
				return false;
		}
	}

	getQuestionScore(question, answer) {
		if (!question) {
			return 0;
		}

		switch (question.type) {
			case QUESTION_TYPES.DRAG_DROP:
				return getDragDropQuestionScore(question, answer);

			case QUESTION_TYPES.DRAG_CATEGORIZE:
				return getDragCategorizeQuestionScore(question, answer);

			case QUESTION_TYPES.MATRIX_PLACEMENT:
				return getMatrixPlacementQuestionScore(question, answer);

			case QUESTION_TYPES.SEQUENCE_ORDER:
				return getSequenceOrderQuestionScore(question, answer);

			case QUESTION_TYPES.DROPDOWN_FILL:
			case QUESTION_TYPES.TAP_TO_FILL_MULTIPLE_BLANK:
				return getDropdownFillQuestionScore(question, answer);

			case QUESTION_TYPES.WRITE_TO_FILL_MULTIPLE_BLANK:
				return getWriteToFillMultipleBlankQuestionScore(question, answer);

			case QUESTION_TYPES.RADIO_BUTTON_GRID:
				return getRadioButtonGridQuestionScore(question, answer);

			default: {
				const isCorrect = this.execute(question, answer);

				if (isCorrect) {
					return question.points;
				}

				return 0;
			}
		}
	}

	getFillMatchType(question, answer) {
		return getFillMatchType(question, answer);
	}

	getDragDropStats(question, answer) {
		return getDragDropStats(question, answer);
	}

	getDragCategorizeStats(question, answer) {
		return getDragCategorizeStats(question, answer);
	}

	getMatrixPlacementStats(question, answer) {
		return getMatrixPlacementStats(question, answer);
	}

	getSequenceOrderStats(question, answer) {
		return getSequenceOrderStats(question, answer);
	}

	getDropdownFillStats(question, answer) {
		return getDropdownFillStats(question, answer);
	}

	getRadioButtonGridStats(question, answer) {
		return getRadioButtonGridStats(question, answer);
	}
}
