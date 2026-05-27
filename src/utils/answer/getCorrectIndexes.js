// src/utils/answer/getCorrectIndexes.js
export default function getCorrectIndexes(question) {
	if (!question.options) {
		return [];
	}

	const correctIndexes = [];

	question.options.forEach((option, index) => {
		if (option.correct) {
			correctIndexes.push(index);
		}
	});

	return correctIndexes;
}
