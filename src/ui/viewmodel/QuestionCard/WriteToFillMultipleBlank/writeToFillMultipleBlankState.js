//src/ui/viewmodel/QuestionCard/WriteToFillMultipleBlank/writeToFillMultipleBlankState.js
function toAnswerObject(answer) {
	return answer && typeof answer === "object" && !Array.isArray(answer) ? answer : {};
}

export function createWriteToFillMultipleBlankViewState({ question, answer, t }) {
	const safeAnswer = toAnswerObject(answer);
	const optionById = new Map(question.options.map((option) => [option.id, option]));

	return {
		lines: question.items.map((item, index) => {
			const expectedLength = optionById.get(item.correctOptionId)?.label?.length ?? 0;
			return {
				id: item.id,
				beforeText: item.beforeText ?? "",
				afterText: item.afterText ?? "",
				value: String(safeAnswer[item.id] ?? ""),
				accessibleLabel: t.writeToFillMultipleBlankInputLabel(index + 1),
				inputSize: expectedLength >= 16 ? "long" : "normal"
			};
		})
	};
}
