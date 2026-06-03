// src/ui/viewmodel/Utils/deriveWorkspaceClassName.js
import { QUESTION_TYPES } from "../../../constants/QuestionTypes.js";

export default function deriveWorkspaceClassName(question, submitted) {
	const shouldUseScrollFooter = shouldQuestionUseScrollFooter(question, submitted);
	const shouldUseWideQuestionLayout = shouldQuestionUseWideLayout(question);
	const shouldUseExtraWideQuestionLayout = shouldQuestionUseExtraWideLayout(question);
	const shouldUseDenseDragCategorizeLayout = shouldQuestionUseDenseDragCategorizeLayout(question);
	const isMatrixPlacementQuestion = question?.type === QUESTION_TYPES.MATRIX_PLACEMENT;

	return [
		"exam-workspace",
		submitted ? "exam-workspace-feedback-mode" : "",
		shouldUseScrollFooter ? "exam-workspace-scroll-footer-mode" : "",
		shouldUseWideQuestionLayout ? "exam-workspace-wide-question-mode" : "",
		shouldUseExtraWideQuestionLayout ? "exam-workspace-extra-wide-question-mode" : "",
		shouldUseDenseDragCategorizeLayout ? "exam-workspace-dense-drag-categorize-mode" : "",
		isMatrixPlacementQuestion ? "exam-workspace-matrix-placement-mode" : ""
	].filter(Boolean).join(" ");
}

const shouldQuestionUseScrollFooter = (question, submitted) => {
	if (submitted) {
		return false;
	}

	const optionCount = question?.options?.length ?? 0;
	const dragDropTargetCount = question?.targets?.length ?? 0;
	const dragCategorizeCategoryCount = question?.categories?.length ?? 0;
	const matrixQuadrantCount = getMatrixPlacementQuadrantCount(question);
	const isDragDropQuestion = question?.type === QUESTION_TYPES.DRAG_DROP;
	const isDragCategorizeQuestion = question?.type === QUESTION_TYPES.DRAG_CATEGORIZE;
	const isMatrixPlacementQuestion = question?.type === QUESTION_TYPES.MATRIX_PLACEMENT;
	const isSequenceOrderQuestion = question?.type === QUESTION_TYPES.SEQUENCE_ORDER;

	return optionCount >= 6 ||
		isDragDropQuestion ||
		isDragCategorizeQuestion ||
		isMatrixPlacementQuestion ||
		isSequenceOrderQuestion ||
		dragDropTargetCount >= 5 ||
		dragCategorizeCategoryCount >= 4 ||
		matrixQuadrantCount >= 4;
};

const shouldQuestionUseWideLayout = (question) => {
	if (question?.type === QUESTION_TYPES.DRAG_CATEGORIZE) {
		return question.categories?.length >= 5 || getLongestDragCategorizeTextLength(question) >= 34;
	}

	if (question?.type === QUESTION_TYPES.MATRIX_PLACEMENT) {
		return getMatrixPlacementQuadrantCount(question) >= 4 || getLongestMatrixPlacementTextLength(question) >= 34;
	}

	return false;
};

const shouldQuestionUseExtraWideLayout = (question) => {
	if (question?.type === QUESTION_TYPES.DRAG_CATEGORIZE) {
		const categoryCount = question.categories?.length ?? 0;
		const longestTextLength = getLongestDragCategorizeTextLength(question);

		return (categoryCount >= 5 && longestTextLength >= 44) || longestTextLength >= 62;
	}

	if (question?.type === QUESTION_TYPES.MATRIX_PLACEMENT) {
		return getLongestMatrixPlacementTextLength(question) >= 70;
	}

	return false;
};

const shouldQuestionUseDenseDragCategorizeLayout = (question) => {
	if (question?.type !== QUESTION_TYPES.DRAG_CATEGORIZE) {
		return false;
	}

	return question.categories?.length >= 5 || getLongestDragCategorizeTextLength(question) >= 44;
};

const getMatrixPlacementQuadrantCount = (question) => {
	return question?.matrix?.quadrants?.length ?? question?.quadrants?.length ?? 0;
};

const getLongestDragCategorizeTextLength = (question) => {
	if (question?.type !== QUESTION_TYPES.DRAG_CATEGORIZE) {
		return 0;
	}

	const itemLengths = (question.items ?? []).map((questionItem) => String(questionItem?.label ?? "").length);
	const categoryLengths = (question.categories ?? []).map((category) => String(category?.label ?? "").length);

	return Math.max(0, ...itemLengths, ...categoryLengths);
};

const getLongestMatrixPlacementTextLength = (question) => {
	if (question?.type !== QUESTION_TYPES.MATRIX_PLACEMENT) {
		return 0;
	}

	const quadrants = question.matrix?.quadrants ?? question.quadrants ?? [];
	const itemLengths = (question.items ?? []).map((questionItem) => String(questionItem?.label ?? questionItem?.text ?? questionItem?.title ?? "").length);
	const quadrantLengths = quadrants.flatMap((quadrant) => [
		String(quadrant?.title ?? quadrant?.label ?? "").length,
		String(quadrant?.description ?? quadrant?.text ?? "").length
	]);
	const axisLengths = [
		String(question.matrix?.xAxis?.label ?? "").length,
		String(question.matrix?.yAxis?.label ?? "").length
	];

	return Math.max(0, ...itemLengths, ...quadrantLengths, ...axisLengths);
};
