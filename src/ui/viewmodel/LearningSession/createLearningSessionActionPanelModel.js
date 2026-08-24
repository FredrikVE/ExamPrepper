// src/ui/viewmodel/LearningSession/createLearningSessionActionPanelModel.js
import { LEARNING_SESSION_SUBMIT_STATES } from "./LearningSessionStates.js";

export default function createLearningSessionActionPanelModel({ currentResult, isSessionComplete, isLastQuestion, answerReady, submitStatus, submitResult, submitErrorMessage, checkAnswer, continueSession, submitSession, t }) {
	if (submitResult !== null) {
		return null;
	}

	if (isSessionComplete && submitStatus !== LEARNING_SESSION_SUBMIT_STATES.FAILED) {
		return null;
	}

	const feedback = createFeedbackModel({
		currentResult,
		t
	});

	const primaryAction = createPrimaryActionModel({
		currentResult,
		isSessionComplete,
		isLastQuestion,
		answerReady,
		submitStatus,
		checkAnswer,
		continueSession,
		submitSession,
		t
	});

	return {
		feedbackAppearance: feedback.appearance,
		feedbackTitle: feedback.title,
		feedbackBody: submitErrorMessage,
		primaryLabel: primaryAction.label,
		primaryAppearance: feedback.primaryAppearance,
		isPrimaryDisabled: primaryAction.isDisabled,
		onPrimaryPressed: primaryAction.onPressed
	};
}

function createFeedbackModel({ currentResult, t }) {
	if (currentResult === null) {
		return {
			appearance: "neutral",
			title: null,
			primaryAppearance: "primary"
		};
	}

	if (currentResult.isCorrect) {
		return {
			appearance: "correct",
			title: t.learningSessionCorrectTitle,
			primaryAppearance: "success"
		};
	}

	return {
		appearance: "incorrect",
		title: t.learningSessionIncorrectTitle,
		primaryAppearance: "primary"
	};
}

function createPrimaryActionModel({ currentResult, isSessionComplete, isLastQuestion, answerReady, submitStatus, checkAnswer, continueSession, submitSession, t }) {
	if (isSessionComplete) {
		return {
			label: t.learningSessionRetryLabel,
			isDisabled: submitStatus === LEARNING_SESSION_SUBMIT_STATES.SUBMITTING,
			onPressed: submitSession
		};
	}

	if (currentResult === null) {
		return {
			label: t.learningSessionCheckLabel,
			isDisabled: !answerReady,
			onPressed: checkAnswer
		};
	}

	if (isLastQuestion) {
		return {
			label: t.learningSessionFinishLabel,
			isDisabled: submitStatus === LEARNING_SESSION_SUBMIT_STATES.SUBMITTING,
			onPressed: continueSession
		};
	}

	return {
		label: t.learningSessionContinueLabel,
		isDisabled: submitStatus === LEARNING_SESSION_SUBMIT_STATES.SUBMITTING,
		onPressed: continueSession
	};
}
