// src/ui/viewmodel/LearningSessionPageViewModel.js
import { useCallback, useEffect, useReducer } from "react";
import isQuestionAnswered from "./Utils/isQuestionAnswered.js";
import { createWorkspaceState } from "./WorkspaceState/createWorkspaceState.js";
import { LOAD_STATUS } from "./LoadState/loadStatus.js";
import { updateObjectAnswerSelection, updateSingleAnswerSelection, toggleMultiAnswerSelection } from "./QuestionSession/updateAnswers.js";
import createRewardModel from "./LearningSession/createRewardModel.js";
import createSessionResultModel from "./LearningSession/createSessionResultModel.js";
import createCheckedAnswerResult from "./LearningSession/createCheckedAnswerResult.js";
import createLearningSessionQuestionCardModel from "./LearningSession/createLearningSessionQuestionCardModel.js";
import createLearningSessionActionPanelModel from "./LearningSession/createLearningSessionActionPanelModel.js";
import createLearningSessionHeaderModel from "./LearningSession/createLearningSessionHeaderModel.js";
import sessionReducer, { createInitialSessionState, SESSION_ACTIONS } from "./LearningSession/sessionReducer.js";
import { LEARNING_SESSION_STATES } from "./LearningSession/LearningSessionStates.js";
import { buildProgressBarModel } from "./Shared/ProgressBar/buildProgressBarModel.js";
import transformLearningSessionAnswersForApi from "./QuestionSession/transformLearningSessionAnswersForApi.js";

export default function useLearningSessionPageViewModel({ getLearningSessionUseCase, submitLearningSessionUseCase, gradeAnswerUseCase, sessionId, t, isActive, backContract }) {
	const [state, dispatch] = useReducer(sessionReducer, undefined, createInitialSessionState);

	useEffect(() => {
		if (!isActive || sessionId === null) {
			return undefined;
		}

		let isCurrent = true;

		async function loadSession() {
			try {
				const session = await getLearningSessionUseCase.execute(sessionId);

				if (!isCurrent) {
					return;
				}

				dispatch({
					type: SESSION_ACTIONS.SESSION_LOADED,
					session
				});
			}

			catch {
				if (!isCurrent) {
					return;
				}

				dispatch({
					type: SESSION_ACTIONS.LOAD_FAILED,
					errorMessage: t.learningSessionLoadErrorMessage
				});
			}
		}

		loadSession();

		return () => {
			isCurrent = false;
		};
	}, [getLearningSessionUseCase, isActive, sessionId, t.learningSessionLoadErrorMessage]);

	const session = state.session ?? null;
	let currentQuestion = null;
	let currentQuestionRenderKey = null;
	let currentResult = null;
	let answer = null;
	let isLastQuestion = false;

	if (session !== null) {
		currentQuestion = session.questions[session.currentIndex] ?? null;

		if (currentQuestion !== null) {
			currentQuestionRenderKey = currentQuestion.sessionQuestionId;
			currentResult = session.resultsBySessionQuestionId[currentQuestion.sessionQuestionId] ?? null;
			answer = session.answersBySessionQuestionId[currentQuestion.sessionQuestionId] ?? null;
			isLastQuestion = session.currentIndex >= session.questions.length - 1;
		}
	}

	const changeAnswers = useCallback((updater) => {
		if (session === null) {
			return;
		}

		const answersBySessionQuestionId = updater(session.answersBySessionQuestionId);

		dispatch({
			type: SESSION_ACTIONS.ANSWER_CHANGED,
			answersBySessionQuestionId
		});
	}, [session]);

	const setSingleAnswer = useCallback((_questionId, selectedValue) => {
		if (currentQuestion === null || currentResult !== null) {
			return;
		}

		changeAnswers((answers) => {
			return updateSingleAnswerSelection(
				answers,
				currentQuestion.sessionQuestionId,
				selectedValue
			);
		});
	}, [changeAnswers, currentQuestion, currentResult]);

	const toggleMultiAnswer = useCallback((_questionId, selectedValue) => {
		if (currentQuestion === null || currentResult !== null) {
			return;
		}

		changeAnswers((answers) => {
			return toggleMultiAnswerSelection(
				answers,
				currentQuestion.sessionQuestionId,
				selectedValue
			);
		});
	}, [changeAnswers, currentQuestion, currentResult]);

	const selectObjectAnswer = useCallback((_questionId, itemId, selectedValue) => {
		if (currentQuestion === null || currentResult !== null) {
			return;
		}

		changeAnswers((answers) => {
			return updateObjectAnswerSelection(
				answers,
				currentQuestion.sessionQuestionId,
				itemId,
				selectedValue
			);
		});
	}, [changeAnswers, currentQuestion, currentResult]);

	const checkAnswer = useCallback(() => {
		if (session === null || currentQuestion === null || currentResult !== null) {
			return;
		}

		const sessionQuestionId = currentQuestion.sessionQuestionId;
		const question = currentQuestion.question;
		const currentAnswer = session.answersBySessionQuestionId[sessionQuestionId] ?? null;

		const result = createCheckedAnswerResult({
			question,
			answer: currentAnswer,
			gradeAnswerUseCase
		});

		dispatch({
			type: SESSION_ACTIONS.ANSWER_CHECKED,
			sessionQuestionId,
			result
		});
	}, [currentQuestion, currentResult, gradeAnswerUseCase, session]);

	const submitSession = useCallback(async () => {
		if (session === null) {
			return;
		}

		if (state.status === LEARNING_SESSION_STATES.SUBMITTING) {
			return;
		}

		if (state.status === LEARNING_SESSION_STATES.COMPLETED) {
			return;
		}

		dispatch({
			type: SESSION_ACTIONS.SUBMIT_STARTED
		});

		try {
			const answers = transformLearningSessionAnswersForApi(
				session.questions,
				session.answersBySessionQuestionId
			);

			const result = await submitLearningSessionUseCase.execute({
				sessionId: session.sessionId,
				answers
			});

			dispatch({
				type: SESSION_ACTIONS.SUBMIT_SUCCEEDED,
				result
			});
		}

		catch {
			dispatch({
				type: SESSION_ACTIONS.SUBMIT_FAILED,
				errorMessage: t.learningSessionSubmitErrorMessage
			});
		}
	}, [session, state.status, submitLearningSessionUseCase, t.learningSessionSubmitErrorMessage]);

	const continueSession = useCallback(() => {
		if (currentResult === null) {
			return;
		}

		if (isLastQuestion) {
			submitSession();
			return;
		}

		dispatch({
			type: SESSION_ACTIONS.CONTINUED
		});
	}, [currentResult, isLastQuestion, submitSession]);

	const workspaceState = createLearningSessionWorkspaceState({ state, t });
	let headerModel = null;
	let progressBarModel = null;
	let questionCardModel = null;
	let actionPanelModel = null;
	let sessionResultModel = null;
	let rewardModel = null;
	let scrollToTopRequestId = 0;

	if (session !== null) {
		const isSessionComplete = state.status === LEARNING_SESSION_STATES.COMPLETED;
		const answerReady = currentQuestion !== null && isQuestionAnswered(currentQuestion.question, answer);
		const submitResult = isSessionComplete ? state.result : null;
		const feedbackBody = state.status === LEARNING_SESSION_STATES.SUBMIT_FAILED
			? state.errorMessage
			: null;

		questionCardModel = createLearningSessionQuestionCardModel({
			currentQuestion,
			currentResult,
			currentIndex: session.currentIndex,
			answer,
			answerOptionOrderBySessionQuestionId: session.answerOptionOrderBySessionQuestionId,
			setSingleAnswer,
			toggleMultiAnswer,
			selectObjectAnswer
		});

		actionPanelModel = createLearningSessionActionPanelModel({
			currentResult,
			isLastQuestion,
			answerReady,
			sessionStatus: state.status,
			feedbackBody,
			checkAnswer,
			continueSession,
			submitSession,
			t
		});

		progressBarModel = createLearningSessionProgressBarModel({
			currentIndex: session.currentIndex,
			questionCount: session.questions.length,
			t
		});

		if (isSessionComplete) {
			sessionResultModel = createSessionResultModel({
				score: state.result.score,
				moduleTitle: session.moduleTitle,
				t,
				onBack: backContract.onBack
			});
		}

		headerModel = createLearningSessionHeaderModel({
			modulePosition: session.modulePosition,
			moduleTitle: session.moduleTitle,
			activityKind: session.activityKind,
			submitResult,
			currentIndex: session.currentIndex,
			questionCount: session.questions.length,
			t
		});

		rewardModel = createRewardModel({
			pendingRewardKind: session.pendingRewardKind,
			combo: session.combo,
			xp: session.xp,
			t,
			onContinue: continueSession
		});

		scrollToTopRequestId = session.scrollToTopRequestId;
	}

	return {
		workspaceState,
		backContract,
		headerModel,
		progressBarModel,
		questionCardModel,
		currentQuestionRenderKey,
		questionFocusLabel: t.learningSessionQuestionFocusLabel,
		actionPanelModel,
		sessionResultModel,
		rewardModel,
		scrollToTopRequestId,
		isSessionComplete: state.status === LEARNING_SESSION_STATES.COMPLETED
	};
}

function createLearningSessionWorkspaceState({ state, t }) {
	let loadStatus = LOAD_STATUS.READY;
	let errorBody = t.learningSessionLoadErrorMessage;

	if (state.status === LEARNING_SESSION_STATES.LOADING) {
		loadStatus = LOAD_STATUS.LOADING;
	}

	if (state.status === LEARNING_SESSION_STATES.LOAD_FAILED) {
		loadStatus = LOAD_STATUS.ERROR;
		errorBody = state.errorMessage;
	}

	return createWorkspaceState({
		loadStatus,
		isEmpty: false,

		labels: {
			loading: t.learningSessionLoadingMessage,
			errorTitle: t.errorPrefix,
			errorBody,
			emptyTitle: "",
			emptyBody: ""
		},

		errorAction: null
	});
}

function createLearningSessionProgressBarModel({ currentIndex, questionCount, t }) {
	if (questionCount === 0) {
		return null;
	}

	return buildProgressBarModel({
		totalSteps: questionCount,
		currentStep: Math.min(currentIndex + 1, questionCount),
		ariaLabel: t.learningSessionProgressAriaLabel,
		startLabel: t.learningSessionProgressStartLabel,
		formatStepLabel: t.learningSessionProgressStepLabel,
		onActivateStep: null
	});
}
