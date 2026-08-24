// src/ui/viewmodel/LearningSession/sessionReducer.js
import { LEARNING_SESSION_REWARD_KINDS, LEARNING_SESSION_STATES, LEARNING_SESSION_SUBMIT_STATES } from "./LearningSessionStates.js";

const COMBO_REWARD_INTERVAL = 3;
const XP_PER_POINT = 10;

export const SESSION_ACTIONS = {
	SESSION_LOADED: "sessionLoaded",
	LOAD_FAILED: "loadFailed",
	ANSWER_CHANGED: "answerChanged",
	ANSWER_CHECKED: "answerChecked",
	CONTINUED: "continued",
	SUBMIT_STARTED: "submitStarted",
	SUBMIT_SUCCEEDED: "submitSucceeded",
	SUBMIT_FAILED: "submitFailed"
};

export function createInitialSessionState() {
	return {
		status: LEARNING_SESSION_STATES.LOADING,
		sessionId: null,
		moduleId: null,
		modulePosition: null,
		moduleTitle: "",
		activityKind: null,
		questions: [],
		currentIndex: 0,
		answersBySessionQuestionId: {},
		resultsBySessionQuestionId: {},
		answerOptionOrderBySessionQuestionId: {},
		combo: 0,
		xp: 0,
		pendingRewardKind: null,
		submitStatus: LEARNING_SESSION_SUBMIT_STATES.IDLE,
		submitErrorMessage: null,
		submitResult: null,
		scrollToTopRequestId: 0
	};
}

export default function sessionReducer(state, action) {
	switch (action.type) {
		case SESSION_ACTIONS.SESSION_LOADED:
			return createLoadedSessionState(action.session);

		case SESSION_ACTIONS.LOAD_FAILED:
			return {
				...state,
				status: LEARNING_SESSION_STATES.ERROR,
				submitErrorMessage: action.errorMessage
			};

		case SESSION_ACTIONS.ANSWER_CHANGED:
			return {
				...state,
				answersBySessionQuestionId: action.answersBySessionQuestionId
			};

		case SESSION_ACTIONS.ANSWER_CHECKED:
			return applyAnswerChecked(state, action);

		case SESSION_ACTIONS.CONTINUED:
			return {
				...state,
				status: LEARNING_SESSION_STATES.ANSWERING,
				currentIndex: state.currentIndex + 1,
				pendingRewardKind: null,
				scrollToTopRequestId: state.scrollToTopRequestId + 1
			};

		case SESSION_ACTIONS.SUBMIT_STARTED:
			return {
				...state,
				status: LEARNING_SESSION_STATES.SUBMITTING,
				submitStatus: LEARNING_SESSION_SUBMIT_STATES.SUBMITTING,
				submitErrorMessage: null
			};

		case SESSION_ACTIONS.SUBMIT_SUCCEEDED:
			return {
				...state,
				status: LEARNING_SESSION_STATES.COMPLETED,
				submitStatus: LEARNING_SESSION_SUBMIT_STATES.SUCCEEDED,
				submitErrorMessage: null,
				submitResult: action.result
			};

		case SESSION_ACTIONS.SUBMIT_FAILED:
			return {
				...state,
				status: LEARNING_SESSION_STATES.ERROR,
				submitStatus: LEARNING_SESSION_SUBMIT_STATES.FAILED,
				submitErrorMessage: action.errorMessage
			};

		default:
			throw new Error(`Unknown learning session action: ${String(action.type)}`);
	}
}

function createLoadedSessionState(session) {
	return {
		...createInitialSessionState(),
		status: LEARNING_SESSION_STATES.ANSWERING,
		sessionId: session.sessionId,
		moduleId: session.moduleId,
		modulePosition: session.modulePosition,
		moduleTitle: session.moduleTitle,
		activityKind: session.activityKind,
		questions: session.questions,
		answerOptionOrderBySessionQuestionId: createAnswerOptionOrderMap(session.questions)
	};
}

function applyAnswerChecked(state, action) {
	const resultsBySessionQuestionId = {
		...state.resultsBySessionQuestionId,
		[action.sessionQuestionId]: action.result
	};

	const nextCombo = resolveNextCombo({
		currentCombo: state.combo,
		isCorrect: action.result.isCorrect
	});

	const pendingRewardKind = resolvePendingRewardKind({
		currentIndex: state.currentIndex,
		questionCount: state.questions.length,
		nextCombo
	});

	const earnedXp = action.result.pointsAwarded * XP_PER_POINT;

	return {
		...state,
		status: LEARNING_SESSION_STATES.CHECKED,
		resultsBySessionQuestionId,
		combo: nextCombo,
		xp: state.xp + earnedXp,
		pendingRewardKind
	};
}

function resolveNextCombo({ currentCombo, isCorrect }) {
	if (isCorrect) {
		return currentCombo + 1;
	}

	return 0;
}

function resolvePendingRewardKind({ currentIndex, questionCount, nextCombo }) {
	const hasNextQuestion = currentIndex < questionCount - 1;

	if (!hasNextQuestion) {
		return null;
	}

	if (nextCombo === 0) {
		return null;
	}

	if (nextCombo % COMBO_REWARD_INTERVAL !== 0) {
		return null;
	}

	return LEARNING_SESSION_REWARD_KINDS.COMBO;
}

function createAnswerOptionOrderMap(questions) {
	const orderBySessionQuestionId = {};

	for (const entry of questions) {
		const options = entry.question.options;

		if (!Array.isArray(options) || options.length === 0) {
			orderBySessionQuestionId[entry.sessionQuestionId] = null;
			continue;
		}

		orderBySessionQuestionId[entry.sessionQuestionId] = Array.from(
			{ length: options.length },
			(_value, index) => index
		);
	}

	return orderBySessionQuestionId;
}
