// src/ui/viewmodel/LearningSession/sessionReducer.js
import { LEARNING_SESSION_REWARD_KINDS, LEARNING_SESSION_STATES } from "./LearningSessionStates.js";

const COMBO_REWARD_INTERVAL = 3;
const XP_PER_POINT = 10;

export const SESSION_ACTIONS = Object.freeze({
	SESSION_LOADED: "sessionLoaded",
	MATCH_CARD_RESULT_RECORDED: "matchCardResultRecorded",
	ANSWER_CHANGED: "answerChanged",
	ANSWER_CHECKED: "answerChecked",
	CONTINUED: "continued",
	SUBMIT_STARTED: "submitStarted",
	SUBMIT_SUCCEEDED: "submitSucceeded",
	SUBMIT_FAILED: "submitFailed"
});

export function createInitialSessionState() {
	return {
		status: LEARNING_SESSION_STATES.ANSWERING
	};
}

export default function sessionReducer(state, action) {
	switch (action.type) {
		case SESSION_ACTIONS.SESSION_LOADED:
			return {
				status: LEARNING_SESSION_STATES.ANSWERING,
				session: createLoadedSessionData(action.session)
			};

		case SESSION_ACTIONS.MATCH_CARD_RESULT_RECORDED:
			return applyMatchCardResultRecorded(state, action);

		case SESSION_ACTIONS.ANSWER_CHANGED:
			return {
				...state,
				session: {
					...requireSessionData(state, action.type),
					answersBySessionQuestionId: action.answersBySessionQuestionId
				}
			};

		case SESSION_ACTIONS.ANSWER_CHECKED:
			return applyAnswerChecked(state, action);

		case SESSION_ACTIONS.CONTINUED:
			return applyContinued(state, action.type);

		case SESSION_ACTIONS.SUBMIT_STARTED:
			return {
				status: LEARNING_SESSION_STATES.SUBMITTING,
				session: requireSessionData(state, action.type)
			};

		case SESSION_ACTIONS.SUBMIT_SUCCEEDED:
			return applySubmitSucceeded(state, action);

		case SESSION_ACTIONS.SUBMIT_FAILED:
			return {
				status: LEARNING_SESSION_STATES.SUBMIT_FAILED,
				session: requireSessionData(state, action.type),
				errorMessage: action.errorMessage
			};

		default:
			throw new Error(`Unknown learning session action: ${String(action.type)}`);
	}
}

function createLoadedSessionData(session) {
	return {
		sessionId: session.sessionId,
		moduleId: session.moduleId,
		modulePosition: session.modulePosition,
		moduleTitle: session.moduleTitle,
		matchCardsTask: session.matchCardsTask,
		matchCardResults: [],
		questions: session.questions,
		currentIndex: 0,
		answersBySessionQuestionId: {},
		resultsBySessionQuestionId: {},
		combo: 0,
		xp: 0,
		pendingRewardKind: null
	};
}

function applyMatchCardResultRecorded(state, action) {
	const session = requireSessionData(state, action.type);

	for (const matchCardResult of session.matchCardResults) {
		if (
			matchCardResult.glossaryEntryKey
			=== action.result.glossaryEntryKey
		) {
			return state;
		}
	}

	return {
		...state,
		session: {
			...session,
			matchCardResults: [
				...session.matchCardResults,
				action.result
			]
		}
	};
}

function applyContinued(state, actionType) {
	const session = requireSessionData(state, actionType);

	return {
		status: LEARNING_SESSION_STATES.ANSWERING,
		session: {
			...session,
			currentIndex: session.currentIndex + 1,
			pendingRewardKind: null
		}
	};
}

function applySubmitSucceeded(state, action) {
	const session = requireSessionData(state, action.type);

	return {
		status: LEARNING_SESSION_STATES.COMPLETED,
		session: {
			...session,
			currentIndex: session.questions.length,
			pendingRewardKind: null
		},
		result: action.result
	};
}

function applyAnswerChecked(state, action) {
	const session = requireSessionData(state, action.type);
	const resultsBySessionQuestionId = {
		...session.resultsBySessionQuestionId,
		[action.sessionQuestionId]: action.result
	};

	const nextCombo = resolveNextCombo({
		currentCombo: session.combo,
		isCorrect: action.result.isCorrect
	});

	const pendingRewardKind = resolvePendingRewardKind({
		currentIndex: session.currentIndex,
		questionCount: session.questions.length,
		nextCombo
	});

	const earnedXp = action.result.pointsAwarded * XP_PER_POINT;

	return {
		status: LEARNING_SESSION_STATES.CHECKED,
		session: {
			...session,
			resultsBySessionQuestionId,
			combo: nextCombo,
			xp: session.xp + earnedXp,
			pendingRewardKind
		}
	};
}

function requireSessionData(state, actionType) {
	if (state.session === undefined) {
		throw new Error(`Learning session action requires loaded session: ${String(actionType)}`);
	}

	return state.session;
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
