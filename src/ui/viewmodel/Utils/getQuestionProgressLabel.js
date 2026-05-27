// src/ui/viewmodel/Utils/getQuestionProgressLabel.js
export default function getQuestionProgressLabel(currentQuestionIndex, questionCount) {
	if (questionCount === 0) {
		return "0 / 0";
	}

	return `${currentQuestionIndex + 1} / ${questionCount}`;
}
