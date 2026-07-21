import getAnsweredCountLabel from "../Utils/getAnsweredCountLabel.js";
import getFeedbackToggleLabel from "../Utils/getFeedbackToggleLabel.js";
import getQuestionProgressLabel from "../Utils/getQuestionProgressLabel.js";
import getScoreLabel from "../Utils/getScoreLabel.js";
import isQuestionAnswered from "../Utils/isQuestionAnswered.js";

export default function createExamStatusModel({
	questions,
	visibleQuestions,
	currentQuestionIndex,
	answers,
	submitted,
	showAllFeedback,
	elapsedTimeLabel,
	calculateExamScoreUseCase,
	answeredLabel
}) {
	const examScore = calculateExamScoreUseCase.execute(questions, answers);
	const answeredCount = questions.filter((question) => {
		return isQuestionAnswered(question, answers[question.id]);
	}).length;
	const questionCount = questions.length;
	const answeredPercent = Math.round((answeredCount / Math.max(visibleQuestions.length, 1)) * 100);
	const answeredPercentLabel = `${answeredPercent}%`;

	return {
		examScore,
		answeredCount,
		answeredCountLabel: getAnsweredCountLabel(answeredCount, questionCount),
		answeredPercentLabel,
		scoreLabel: getScoreLabel(
			submitted,
			examScore.score,
			examScore.totalPoints
		),
		questionProgressLabel: getQuestionProgressLabel(
			currentQuestionIndex,
			visibleQuestions.length
		),
		feedbackToggleLabel: getFeedbackToggleLabel(showAllFeedback),
		mobileWorkStatusLabel: `${elapsedTimeLabel} · ${answeredPercentLabel} ${answeredLabel}`,
		canSubmitExam: !submitted && questions.length > 0
	};
}
