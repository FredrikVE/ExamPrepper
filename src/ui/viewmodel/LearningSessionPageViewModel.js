// src/ui/viewmodel/LearningSessionPageViewModel.js
import { useCallback, useEffect, useMemo, useReducer } from "react";
import { LOAD_STATUS } from "./LoadState/loadStatus.js";
import { LEARNING_SESSION_STATES } from "./LearningSession/LearningSessionStates.js";
import createCheckedAnswerResult from "./LearningSession/createCheckedAnswerResult.js";
import createLearningSessionActionPanelModel from "./LearningSession/createLearningSessionActionPanelModel.js";
import createLearningSessionHeaderModel from "./LearningSession/createLearningSessionHeaderModel.js";
import createLearningSessionQuestionCardModel from "./LearningSession/createLearningSessionQuestionCardModel.js";
import createRewardModel from "./LearningSession/createRewardModel.js";
import createSessionResultModel from "./LearningSession/createSessionResultModel.js";
import sessionReducer, { createInitialSessionState, SESSION_ACTIONS } from "./LearningSession/sessionReducer.js";
import useMatchCardsRoundModel from "./MatchCards/useMatchCardsRoundModel.js";
import { toggleMultiAnswerSelection, updateObjectAnswerSelection, updateSingleAnswerSelection } from "./QuestionSession/updateAnswers.js";
import transformLearningSessionAnswersForApi from "./QuestionSession/transformLearningSessionAnswersForApi.js";
import { buildProgressBarModel } from "./Shared/ProgressBar/buildProgressBarModel.js";
import isQuestionAnswered from "./Utils/isQuestionAnswered.js";
import { createWorkspaceState } from "./WorkspaceState/createWorkspaceState.js";

const EMPTY_MATCH_CARD_ENTRIES = Object.freeze([]);
const LEARNING_SESSION_MATCH_CARDS_VISIBLE_PAIR_COUNT = 4;

export default function useLearningSessionPageViewModel({ getLearningSessionUseCase, submitLearningSessionUseCase, gradeAnswerUseCase, sessionId, language, t, isActive, backContract }) {
	const [state, dispatch] = useReducer(sessionReducer, undefined, createInitialSessionState);

	useEffect(() => {
		if (!isActive || sessionId === null) {
			return undefined;
		}

		let isCurrent = true;

		async function loadSession() {
			try {
				const loadedSession = await getLearningSessionUseCase.execute(sessionId);

				if (!isCurrent) {
					return;
				}

				dispatch({
					type: SESSION_ACTIONS.SESSION_LOADED,
					session: loadedSession
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
	const matchCardEntries = session === null ? EMPTY_MATCH_CARD_ENTRIES : session.matchCardsTask.pairs;

	const recordMatchCardResult = useCallback((matchCardResult) => {
		dispatch({
			type: SESSION_ACTIONS.MATCH_CARD_RESULT_RECORDED,
			result: matchCardResult
		});
	}, []);

	const matchCardsRoundModel = useMatchCardsRoundModel({
		glossaryEntries: matchCardEntries,
		roundPairCount: matchCardEntries.length,
		visiblePairCount: LEARNING_SESSION_MATCH_CARDS_VISIBLE_PAIR_COUNT,
		language,
		randomNumber: Math.random,
		onSuccessfulMatch: recordMatchCardResult
	});

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
		if (session === null || !matchCardsRoundModel.isRoundComplete) {
			return;
		}

		const answersBySessionQuestionId = updater(session.answersBySessionQuestionId);

		dispatch({
			type: SESSION_ACTIONS.ANSWER_CHANGED,
			answersBySessionQuestionId
		});
	}, [matchCardsRoundModel.isRoundComplete, session]);

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
		if (!matchCardsRoundModel.isRoundComplete || session === null || currentQuestion === null || currentResult !== null) {
			return;
		}

		const currentSessionQuestionId = currentQuestion.sessionQuestionId;
		const question = currentQuestion.question;
		const currentAnswer = session.answersBySessionQuestionId[currentSessionQuestionId] ?? null;
		const checkedAnswerResult = createCheckedAnswerResult({
			question,
			answer: currentAnswer,
			gradeAnswerUseCase
		});

		dispatch({
			type: SESSION_ACTIONS.ANSWER_CHECKED,
			sessionQuestionId: currentSessionQuestionId,
			result: checkedAnswerResult
		});
	}, [currentQuestion, currentResult, gradeAnswerUseCase, matchCardsRoundModel.isRoundComplete, session]);

	const submitSession = useCallback(async () => {
		if (session === null || !matchCardsRoundModel.isRoundComplete) {
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
			const matchCardResults = createMatchCardResultsForSubmit(
				session.matchCardsTask,
				session.matchCardResults
			);
			const answers = transformLearningSessionAnswersForApi(
				session.questions,
				session.answersBySessionQuestionId
			);
			const submitResult = await submitLearningSessionUseCase.execute({
				sessionId: session.sessionId,
				matchCardResults,
				answers
			});

			dispatch({
				type: SESSION_ACTIONS.SUBMIT_SUCCEEDED,
				result: submitResult
			});
		}

		catch {
			dispatch({
				type: SESSION_ACTIONS.SUBMIT_FAILED,
				errorMessage: t.learningSessionSubmitErrorMessage
			});
		}
	}, [matchCardsRoundModel.isRoundComplete, session, state.status, submitLearningSessionUseCase, t.learningSessionSubmitErrorMessage]);

	const continueSession = useCallback(() => {
		if (!matchCardsRoundModel.isRoundComplete || currentResult === null) {
			return;
		}

		if (isLastQuestion) {
			submitSession();
			return;
		}

		dispatch({
			type: SESSION_ACTIONS.CONTINUED
		});
	}, [currentResult, isLastQuestion, matchCardsRoundModel.isRoundComplete, submitSession]);

	const matchCardsLabels = useMemo(() => {
		return {
			pageTitle: t.matchCardsTitle,
			selectedSlotLabel: t.matchCardsSelectedSlotLabel,
			wrongSlotLabel: t.matchCardsWrongSlotLabel,
			successSlotLabel: t.matchCardsSuccessSlotLabel,
			emptySlotLabel: t.matchCardsEmptySlotLabel,
			cardAriaLabel: t.matchCardsCardAriaLabel
		};
	}, [t]);

	const workspaceState = createLearningSessionWorkspaceState({ state, t });
	let headerModel = null;
	let progressBarModel = null;
	let matchCardsModel = null;
	let questionCardModel = null;
	let renderedCurrentQuestionRenderKey = null;
	let actionPanelModel = null;
	let sessionResultModel = null;
	let rewardModel = null;
	let scrollToTopRequestId = 0;

	if (session !== null) {
		const isSessionComplete = state.status === LEARNING_SESSION_STATES.COMPLETED;
		const isMatchCardsActive = matchCardsRoundModel.session !== null
			&& !matchCardsRoundModel.isRoundComplete
			&& !isSessionComplete;
		const answerReady = currentQuestion !== null && isQuestionAnswered(currentQuestion.question, answer);
		const submitResult = isSessionComplete ? state.result : null;
		const feedbackBody = state.status === LEARNING_SESSION_STATES.SUBMIT_FAILED
			? state.errorMessage
			: null;

		if (isMatchCardsActive) {
			matchCardsModel = {
				termSlots: matchCardsRoundModel.termSlots,
				explanationSlots: matchCardsRoundModel.explanationSlots,
				labels: matchCardsLabels,
				boardStyle: matchCardsRoundModel.boardStyle,
				isInteractionLocked: matchCardsRoundModel.isInteractionLocked,
				onSelectSlot: matchCardsRoundModel.selectSlot
			};
		}

		if (matchCardsRoundModel.isRoundComplete && !isSessionComplete) {
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
			renderedCurrentQuestionRenderKey = currentQuestionRenderKey;

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
		}

		progressBarModel = createLearningSessionProgressBarModel({
			currentIndex: session.currentIndex,
			questionCount: session.questions.length,
			isMatchCardsComplete: matchCardsRoundModel.isRoundComplete,
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
			submitResult,
			currentIndex: session.currentIndex,
			questionCount: session.questions.length,
			isMatchCardsActive,
			t
		});

		if (matchCardsRoundModel.isRoundComplete) {
			rewardModel = createRewardModel({
				pendingRewardKind: session.pendingRewardKind,
				combo: session.combo,
				xp: session.xp,
				t,
				onContinue: continueSession
			});
		}

		scrollToTopRequestId = session.scrollToTopRequestId;
	}

	return {
		workspaceState,
		backContract,
		headerModel,
		progressBarModel,
		matchCardsModel,
		questionCardModel,
		currentQuestionRenderKey: renderedCurrentQuestionRenderKey,
		questionFocusLabel: t.learningSessionQuestionFocusLabel,
		actionPanelModel,
		sessionResultModel,
		rewardModel,
		scrollToTopRequestId,
		isSessionComplete: state.status === LEARNING_SESSION_STATES.COMPLETED
	};
}

function createMatchCardResultsForSubmit(matchCardsTask, matchCardResults) {
	const resultByGlossaryEntryKey = new Map();

	for (const matchCardResult of matchCardResults) {
		resultByGlossaryEntryKey.set(matchCardResult.glossaryEntryKey, matchCardResult);
	}

	const orderedResults = [];

	for (const pair of matchCardsTask.pairs) {
		const matchCardResult = resultByGlossaryEntryKey.get(pair.glossaryEntryKey);

		if (matchCardResult === undefined) {
			throw new Error(`Missing LearningSession MatchCards result: ${pair.glossaryEntryKey}`);
		}

		orderedResults.push({
			glossaryEntryKey: matchCardResult.glossaryEntryKey,
			wrongAttemptCount: matchCardResult.wrongAttemptCount
		});
	}

	return orderedResults;
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

function createLearningSessionProgressBarModel({ currentIndex, questionCount, isMatchCardsComplete, t }) {
	if (questionCount === 0) {
		return null;
	}

	const totalSteps = questionCount + 1;
	let currentStep = 1;

	if (isMatchCardsComplete) {
		currentStep = Math.min(currentIndex + 2, totalSteps);
	}

	return buildProgressBarModel({
		totalSteps,
		currentStep,
		ariaLabel: t.learningSessionProgressAriaLabel,
		startLabel: t.learningSessionProgressStartLabel,
		formatStepLabel: t.learningSessionProgressStepLabel,
		onActivateStep: null
	});
}
