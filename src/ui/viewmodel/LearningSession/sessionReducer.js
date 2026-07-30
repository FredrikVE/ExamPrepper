//src/ui/viewmodel/LearningSession/sessionReducer.js
import { LEARNING_SESSION_STATES } from "./LearningSessionStates.js";

export const SESSION_ACTIONS = {
	SESSION_LOADED: "sessionLoaded",
	LOAD_FAILED: "loadFailed",
	ANSWER_CHANGED: "answerChanged",
	ANSWER_CHECKED: "answerChecked",
	CONTINUED: "continued",
	SUBMIT_STARTED: "submitStarted",
	SUBMIT_SUCCEEDED: "submitSucceeded",
	SUBMIT_FAILED: "submitFailed",
	SESSION_RESTARTED: "sessionRestarted"
};

export function createInitialSessionState() {
	return { status: LEARNING_SESSION_STATES.LOADING, sessionId: null, moduleId: null, modulePosition: null, moduleTitle: "", round: null, questions: [], currentIndex: 0, answersBySessionQuestionId: {}, resultsBySessionQuestionId: {}, answerOptionOrderBySessionQuestionId: {}, combo: 0, xp: 0, pendingRewardKind: null, submitStatus: "idle", submitErrorMessage: null, submitResult: null, scrollToTopRequestId: 0 };
}

export default function sessionReducer(state, action) {
	switch (action.type) {
		case SESSION_ACTIONS.SESSION_LOADED:
			return { ...createInitialSessionState(), status: LEARNING_SESSION_STATES.ANSWERING, sessionId: action.session.sessionId, moduleId: action.session.moduleId, modulePosition: action.session.modulePosition, moduleTitle: action.session.moduleTitle, round: action.session.round, questions: action.session.questions, answerOptionOrderBySessionQuestionId: createAnswerOptionOrderMap(action.session.questions) };
		case SESSION_ACTIONS.LOAD_FAILED:
			return { ...state, status: LEARNING_SESSION_STATES.ERROR, submitErrorMessage: action.errorMessage };
		case SESSION_ACTIONS.ANSWER_CHANGED:
			return { ...state, answersBySessionQuestionId: action.answersBySessionQuestionId };
		case SESSION_ACTIONS.ANSWER_CHECKED:
			return applyAnswerChecked(state, action);
		case SESSION_ACTIONS.CONTINUED:
			return { ...state, status: LEARNING_SESSION_STATES.ANSWERING, currentIndex: state.currentIndex + 1, pendingRewardKind: null, scrollToTopRequestId: state.scrollToTopRequestId + 1 };
		case SESSION_ACTIONS.SUBMIT_STARTED:
			return { ...state, status: LEARNING_SESSION_STATES.SUBMITTING, submitStatus: "submitting", submitErrorMessage: null };
		case SESSION_ACTIONS.SUBMIT_SUCCEEDED:
			return { ...state, status: LEARNING_SESSION_STATES.COMPLETED, submitStatus: "succeeded", submitErrorMessage: null, submitResult: action.result };
		case SESSION_ACTIONS.SUBMIT_FAILED:
			return { ...state, status: LEARNING_SESSION_STATES.ERROR, submitStatus: "failed", submitErrorMessage: action.errorMessage };
		case SESSION_ACTIONS.SESSION_RESTARTED:
			return createInitialSessionState();
		default:
			throw new Error(`Unknown learning session action: ${String(action.type)}`);
	}
}

function applyAnswerChecked(state, action) {
	const results = { ...state.resultsBySessionQuestionId, [action.sessionQuestionId]: action.result };
	const nextCombo = action.result.isCorrect ? state.combo + 1 : 0;
	const hasNextQuestion = state.currentIndex < state.questions.length - 1;
	const rewardKind = hasNextQuestion && nextCombo > 0 && nextCombo % 3 === 0 ? "combo" : null;
	return { ...state, status: LEARNING_SESSION_STATES.CHECKED, resultsBySessionQuestionId: results, combo: nextCombo, xp: state.xp + action.result.pointsAwarded * 10, pendingRewardKind: rewardKind };
}

function createAnswerOptionOrderMap(questions) {
	const orderById = {};
	for (const entry of questions) {
		const count = Array.isArray(entry.question.options) ? entry.question.options.length : 0;
		orderById[entry.sessionQuestionId] = count === 0 ? null : Array.from({ length: count }, (_value, index) => index);
	}
	return orderById;
}
