// src/ui/viewmodel/LearningSession/LearningSessionPagePresentation.js
import { LEARNING_SESSION_REWARD_KINDS, LEARNING_SESSION_STATES } from "./LearningSessionStates.js";

const NO_EXPANDED_ANSWER_OPTIONS = Object.freeze([]);

function ignoreAnswerOptionExpanded() {
}

export default function createLearningSessionPagePresentation({
	session,
	state,
	currentQuestion,
	currentResult,
	answer,
	isLastQuestion,
	isMatchCardsActive,
	isMatchCardsPhaseComplete,
	answerReady,
	feedbackBody,
	setSingleAnswer,
	toggleMultiAnswer,
	selectObjectAnswer,
	checkAnswer,
	continueSession,
	submitSession,
	backContract,
	t
}) {
	if (session === null) {
		return {
			headerModel: null,
			questionCardModel: null,
			actionPanelModel: null,
			sessionResultModel: null,
			rewardModel: null
		};
	}

	const isSessionComplete =
		state.status === LEARNING_SESSION_STATES.COMPLETED;

	return {
		headerModel: createHeaderModel({
			modulePosition: session.modulePosition,
			moduleTitle: session.moduleTitle,
			submitResult: isSessionComplete ? state.result : null,
			currentIndex: session.currentIndex,
			questionCount: session.questions.length,
			isMatchCardsActive,
			t
		}),
		questionCardModel:
			isMatchCardsPhaseComplete && !isSessionComplete
				? createQuestionCardModel({
					currentQuestion,
					currentResult,
					currentIndex: session.currentIndex,
					answer,
					setSingleAnswer,
					toggleMultiAnswer,
					selectObjectAnswer
				})
				: null,
		actionPanelModel:
			isMatchCardsPhaseComplete && !isSessionComplete
				? createActionPanelModel({
					currentResult,
					isLastQuestion,
					answerReady,
					sessionStatus: state.status,
					feedbackBody,
					checkAnswer,
					continueSession,
					submitSession,
					t
				})
				: null,
		sessionResultModel:
			isSessionComplete
				? createResultModel({
					score: state.result.score,
					moduleTitle: session.moduleTitle,
					t,
					onBack: backContract.onBack
				})
				: null,
		rewardModel:
			isMatchCardsPhaseComplete
				? createRewardModel({
					pendingRewardKind: session.pendingRewardKind,
					combo: session.combo,
					xp: session.xp,
					t,
					onContinue: continueSession
				})
				: null
	};
}

function createHeaderModel({
	modulePosition,
	moduleTitle,
	submitResult,
	currentIndex,
	questionCount,
	isMatchCardsActive,
	t
}) {
	let counterLabel;

	if (submitResult !== null) {
		counterLabel = t.learningSessionResultHeaderLabel;
	}
	else if (isMatchCardsActive) {
		counterLabel = t.learningSessionMatchCardsCounter;
	}
	else {
		counterLabel = t.learningSessionQuestionCounter(
			Math.min(currentIndex + 1, questionCount),
			questionCount
		);
	}

	return {
		title: t.learningSessionModuleTitle(
			modulePosition,
			moduleTitle
		),
		counterLabel
	};
}

function createQuestionCardModel({
	currentQuestion,
	currentResult,
	currentIndex,
	answer,
	setSingleAnswer,
	toggleMultiAnswer,
	selectObjectAnswer
}) {
	if (currentQuestion === null) {
		return null;
	}

	const submitted = currentResult !== null;

	return {
		question: currentQuestion.question,
		questionNumber: currentIndex + 1,
		answer,
		answerOptionOrder: null,
		submitted,
		showAllFeedback: submitted,
		correct: currentResult?.isCorrect ?? false,
		fillMatchType: currentResult?.fillMatchType ?? null,
		expandedAnswerOptionIndexes: NO_EXPANDED_ANSWER_OPTIONS,
		onToggleAnswerOptionExpanded: ignoreAnswerOptionExpanded,
		onSingleAnswer: setSingleAnswer,
		onToggleMultiAnswer: toggleMultiAnswer,
		onDropdownFillAnswer: selectObjectAnswer,
		onRadioButtonGridAnswer: selectObjectAnswer,
		onMultipleBlankAnswer: selectObjectAnswer
	};
}

function createRewardModel({
	pendingRewardKind,
	combo,
	xp,
	t,
	onContinue
}) {
	if (pendingRewardKind === null) {
		return null;
	}

	if (pendingRewardKind !== LEARNING_SESSION_REWARD_KINDS.COMBO) {
		throw new Error(
			`Unknown learning session reward kind: ${String(pendingRewardKind)}`
		);
	}

	return {
		title: t.learningSessionRewardTitle,
		body: t.learningSessionRewardBody,
		closeLabel: t.learningSessionRewardCloseLabel,
		statsLabel: t.learningSessionRewardStatsLabel,
		comboValue: String(combo),
		comboLabel: t.learningSessionRewardComboLabel,
		xpValue: `${xp} XP`,
		xpLabel: t.learningSessionRewardXpLabel,
		dismissLabel: t.learningSessionRewardDismissLabel,
		onContinue
	};
}

function createActionPanelModel({
	currentResult,
	isLastQuestion,
	answerReady,
	sessionStatus,
	feedbackBody,
	checkAnswer,
	continueSession,
	submitSession,
	t
}) {
	if (sessionStatus === LEARNING_SESSION_STATES.COMPLETED) {
		return null;
	}

	const feedback = createFeedbackModel({ currentResult, t });
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

function createPrimaryActionModel({
	currentResult,
	isLastQuestion,
	answerReady,
	sessionStatus,
	checkAnswer,
	continueSession,
	submitSession,
	t
}) {
	switch (sessionStatus) {
		case LEARNING_SESSION_STATES.SUBMITTING:
			return {
				label: t.learningSessionSubmittingLabel,
				isDisabled: true,
				onPressed: continueSession
			};

		case LEARNING_SESSION_STATES.SUBMIT_FAILED:
			return {
				label: t.learningSessionRetryLabel,
				isDisabled: false,
				onPressed: submitSession
			};

		case LEARNING_SESSION_STATES.ANSWERING:
		case LEARNING_SESSION_STATES.CHECKED:
			break;

		default:
			throw new Error(
				`Unknown learning session interaction state: ${String(sessionStatus)}`
			);
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

function normalizePercentage(value) {
	if (value === null) {
		return null;
	}

	if (!Number.isFinite(value)) {
		throw new Error(
			`Invalid learning session percentage: ${String(value)}`
		);
	}

	return Math.round(value * 100) / 100;
}

function createResultModel({
	score,
	moduleTitle,
	t,
	onBack
}) {
	const percentage = normalizePercentage(score.percentage);
	const copy = createResultCopy({
		percentage,
		performanceBand: score.performanceBand,
		moduleTitle,
		t
	});

	return {
		appearance: score.performanceBand,
		eyebrow: t.learningSessionResultEyebrow,
		title: copy.title,
		body: copy.body,
		statsLabel: t.learningSessionResultStatsLabel,
		pointsValue: `${score.earnedPoints} / ${score.availablePoints}`,
		pointsLabel: t.learningSessionResultPointsLabel,
		scoreValue: percentage === null ? "—" : `${percentage} %`,
		scoreLabel: t.learningSessionResultScoreLabel,
		nextStepLabel: t.learningSessionResultNextStepLabel,
		nextStepBody: t.learningSessionResultContinuePathBody,
		primaryLabel: t.learningSessionResultContinuePathLabel,
		isPrimaryDisabled: false,
		actionErrorMessage: null,
		onPrimary: onBack
	};
}

function createResultCopy({
	percentage,
	performanceBand,
	moduleTitle,
	t
}) {
	if (percentage === 100) {
		return {
			title: t.learningSessionResultPerfectTitle,
			body: t.learningSessionResultPerfectBody(moduleTitle)
		};
	}

	switch (performanceBand) {
		case "understood":
			return {
				title: t.learningSessionResultUnderstoodTitle,
				body: t.learningSessionResultUnderstoodBody(moduleTitle)
			};

		case "progress":
			return {
				title: t.learningSessionResultProgressTitle,
				body: t.learningSessionResultProgressBody(moduleTitle)
			};

		case "practice":
			return {
				title: t.learningSessionResultPracticeTitle,
				body: t.learningSessionResultPracticeBody(moduleTitle)
			};

		case "not-assessed":
			return {
				title: t.learningSessionResultNotAssessedTitle,
				body: t.learningSessionResultNotAssessedBody(moduleTitle)
			};

		default:
			throw new Error(
				`Unknown learning session performance band: ${String(performanceBand)}`
			);
	}
}
