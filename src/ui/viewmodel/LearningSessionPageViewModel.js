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
import { LEARNING_SESSION_SUBMIT_STATES } from "./LearningSession/LearningSessionStates.js";
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

	const currentQuestion = state.questions[state.currentIndex] ?? null;

	let currentQuestionRenderKey = null;
	let currentResult = null;
	let answer = null;

	if (currentQuestion !== null) {
		currentQuestionRenderKey = currentQuestion.sessionQuestionId;
		currentResult = state.resultsBySessionQuestionId[currentQuestion.sessionQuestionId] ?? null;
		answer = state.answersBySessionQuestionId[currentQuestion.sessionQuestionId] ?? null;
	}

	const isSessionComplete = state.questions.length > 0 && state.currentIndex >= state.questions.length;
	const isLastQuestion = currentQuestion !== null && state.currentIndex >= state.questions.length - 1;

	const changeAnswers = useCallback((updater) => {
		const answersBySessionQuestionId = updater(state.answersBySessionQuestionId);

		dispatch({
			type: SESSION_ACTIONS.ANSWER_CHANGED,
			answersBySessionQuestionId
		});
	}, [state.answersBySessionQuestionId]);

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
		if (currentQuestion === null || currentResult !== null) {
			return;
		}

		const sessionQuestionId = currentQuestion.sessionQuestionId;
		const question = currentQuestion.question;
		const currentAnswer = state.answersBySessionQuestionId[sessionQuestionId] ?? null;

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
	}, [currentQuestion, currentResult, gradeAnswerUseCase, state.answersBySessionQuestionId]);

	const submitSession = useCallback(async () => {
		if (state.sessionId === null) {
			return;
		}

		if (state.submitStatus === LEARNING_SESSION_SUBMIT_STATES.SUBMITTING) {
			return;
		}

		if (state.submitStatus === LEARNING_SESSION_SUBMIT_STATES.SUCCEEDED) {
			return;
		}

		dispatch({
			type: SESSION_ACTIONS.SUBMIT_STARTED
		});

		try {
			const answers = transformLearningSessionAnswersForApi(
				state.questions,
				state.answersBySessionQuestionId
			);

			const result = await submitLearningSessionUseCase.execute({
				sessionId: state.sessionId,
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
	}, [state.answersBySessionQuestionId, state.questions, state.sessionId, state.submitStatus, submitLearningSessionUseCase, t.learningSessionSubmitErrorMessage]);

	const continueSession = useCallback(() => {
		if (currentResult === null) {
			return;
		}

		dispatch({
			type: SESSION_ACTIONS.CONTINUED
		});

		if (isLastQuestion) {
			submitSession();
		}
	}, [currentResult, isLastQuestion, submitSession]);

	const answerReady = currentQuestion !== null && isQuestionAnswered(currentQuestion.question, answer);

	const questionCardModel = createLearningSessionQuestionCardModel({
		currentQuestion,
		currentResult,
		currentIndex: state.currentIndex,
		answer,
		answerOptionOrderBySessionQuestionId: state.answerOptionOrderBySessionQuestionId,
		setSingleAnswer,
		toggleMultiAnswer,
		selectObjectAnswer
	});

	const actionPanelModel = createLearningSessionActionPanelModel({
		currentResult,
		isSessionComplete,
		isLastQuestion,
		answerReady,
		submitStatus: state.submitStatus,
		submitResult: state.submitResult,
		submitErrorMessage: state.submitErrorMessage,
		checkAnswer,
		continueSession,
		submitSession,
		t
	});

	const workspaceState = createLearningSessionWorkspaceState({
		state,
		t
	});

	const progressBarModel = createLearningSessionProgressBarModel({
		currentIndex: state.currentIndex,
		questionCount: state.questions.length,
		t
	});

	let sessionResultModel = null;

	if (state.submitResult !== null) {
		sessionResultModel = createSessionResultModel({
			score: state.submitResult.score,
			moduleTitle: state.moduleTitle,
			t,
			onBack: backContract.onBack
		});
	}

	const headerModel = createLearningSessionHeaderModel({
		modulePosition: state.modulePosition,
		moduleTitle: state.moduleTitle,
		activityKind: state.activityKind,
		submitResult: state.submitResult,
		currentIndex: state.currentIndex,
		questionCount: state.questions.length,
		t
	});

	const rewardModel = createRewardModel({
		pendingRewardKind: state.pendingRewardKind,
		combo: state.combo,
		xp: state.xp,
		t,
		onContinue: continueSession
	});

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
		scrollToTopRequestId: state.scrollToTopRequestId,
		isSessionComplete
	};
}

function createLearningSessionWorkspaceState({ state, t }) {
	let loadStatus = LOAD_STATUS.LOADING;

	if (state.sessionId !== null) {
		loadStatus = LOAD_STATUS.READY;
	}

	if (state.sessionId === null && state.submitErrorMessage !== null) {
		loadStatus = LOAD_STATUS.ERROR;
	}

	let errorBody = t.learningSessionLoadErrorMessage;

	if (state.submitErrorMessage !== null) {
		errorBody = state.submitErrorMessage;
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
