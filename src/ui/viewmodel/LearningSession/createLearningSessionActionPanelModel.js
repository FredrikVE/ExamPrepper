// src/ui/viewmodel/LearningSession/createLearningSessionActionPanelModel.js
import { LEARNING_SESSION_STATES } from "./LearningSessionStates.js";

export default function createLearningSessionActionPanelModel({ currentResult, isLastQuestion, answerReady, sessionStatus, feedbackBody, checkAnswer, continueSession, submitSession, t }) {
	if (sessionStatus === LEARNING_SESSION_STATES.COMPLETED) {
		return null;
	}

	const feedback = createFeedbackModel({
		currentResult,
		t
	});

	const primaryAction = createPrimaryActionModel({
		currentResult,
		isLastQuestion,
		answerReady,
		sessionStatus,
		checkAnswer,
		continueSession,
		submitSession,
		t
	});

	return {
		feedbackAppearance: feedback.appearance,
		feedbackTitle: feedback.title,
		feedbackBody,
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

function createPrimaryActionModel({ currentResult, isLastQuestion, answerReady, sessionStatus, checkAnswer, continueSession, submitSession, t }) {
	if (sessionStatus === LEARNING_SESSION_STATES.SUBMITTING) {
		return {
			label: t.learningSessionSubmittingLabel,
			isDisabled: true,
			onPressed: continueSession
		};
	}

	if (sessionStatus === LEARNING_SESSION_STATES.SUBMIT_FAILED) {
		return {
			label: t.learningSessionRetryLabel,
			isDisabled: false,
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
			isDisabled: false,
			onPressed: continueSession
		};
	}

	return {
		label: t.learningSessionContinueLabel,
		isDisabled: false,
		onPressed: continueSession
	};
}
