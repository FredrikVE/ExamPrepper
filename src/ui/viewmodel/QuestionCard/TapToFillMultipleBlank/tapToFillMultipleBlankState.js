//src/ui/viewmodel/QuestionCard/TapToFillMultipleBlank/tapToFillMultipleBlankState.js
function toAnswerObject(answer) {
	return answer && typeof answer === "object" && !Array.isArray(answer) ? answer : {};
}

export function createTapToFillMultipleBlankViewState({ question, answer, activeItemId }) {
	const safeAnswer = toAnswerObject(answer);
	const optionById = new Map(question.options.map((option) => [option.id, option]));
	const usedOptionIds = new Set(Object.values(safeAnswer).filter(Boolean));
	const correctOptionIds = new Set(question.items.map((item) => item.correctOptionId));

	return {
		lines: question.items.map((item, index) => ({
			id: item.id,
			index,
			beforeText: item.beforeText ?? "",
			afterText: item.afterText ?? "",
			selectedOptionId: safeAnswer[item.id] ?? null,
			selectedLabel: optionById.get(safeAnswer[item.id])?.label ?? "",
			isActive: activeItemId === item.id
		})),
		options: question.options.map((option) => ({
			id: option.id,
			label: option.label,
			isUsed: usedOptionIds.has(option.id),
			isCorrect: correctOptionIds.has(option.id)
		}))
	};
}

export function findFirstEmptyTapToFillItemId({ question, answer }) {
	const safeAnswer = toAnswerObject(answer);
	return question.items.find((item) => !safeAnswer[item.id])?.id ?? question.items[0]?.id ?? null;
}

export function resolveTapToFillTargetItemId({ question, answer, activeItemId }) {
	const safeAnswer = toAnswerObject(answer);
	if (activeItemId !== null && question.items.some((item) => item.id === activeItemId)) return activeItemId;
	return question.items.find((item) => !safeAnswer[item.id])?.id ?? null;
}

export function createTapToFillAnswerPreview({ answer, itemId, optionId }) {
	const safeAnswer = toAnswerObject(answer);
	const preview = { ...safeAnswer };
	for (const [currentItemId, currentOptionId] of Object.entries(preview)) {
		if (currentOptionId === optionId) delete preview[currentItemId];
	}
	preview[itemId] = optionId;
	return preview;
}
