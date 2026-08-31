// src/ui/viewmodel/LearningSessionPageViewModel.js
import { useCallback, useMemo, useReducer } from "react";
import { LEARNING_SESSION_STATES } from "./LearningSession/LearningSessionStates.js";
import createLearningSessionPagePresentation from "./LearningSession/LearningSessionPagePresentation.js";
import sessionReducer, { createInitialSessionState, SESSION_ACTIONS } from "./LearningSession/sessionReducer.js";
import useLoadModel from "./LoadState/useLoadModel.js";
import useMatchCardsRoundModel from "./MatchCards/useMatchCardsRoundModel.js";
import { toggleMultiAnswerSelection, updateObjectAnswerSelection, updateSingleAnswerSelection } from "./QuestionSession/updateAnswers.js";
import transformLearningSessionAnswersForApi from "./QuestionSession/transformLearningSessionAnswersForApi.js";
import { buildProgressBarModel } from "./Shared/ProgressBar/buildProgressBarModel.js";
import isQuestionAnswered from "./Utils/isQuestionAnswered.js";
import { createWorkspaceState } from "./WorkspaceState/createWorkspaceState.js";

const EMPTY_MATCH_CARD_ENTRIES = Object.freeze([]);
const LEARNING_SESSION_MATCH_CARDS_VISIBLE_PAIR_COUNT = 4;

export default function useLearningSessionPageViewModel({ getLearningSessionUseCase, submitLearningSessionUseCase, gradeAnswerUseCase, sessionId, language, t, backContract, authScopeKey }) {
	const [state, dispatch] = useReducer(sessionReducer, undefined, createInitialSessionState);

	const executeLoad = useCallback(() => {
		if (sessionId === null) {
			throw new Error("LearningSession load requires sessionId");
		}

		return getLearningSessionUseCase.execute(sessionId);
	}, [getLearningSessionUseCase, sessionId]);

	const loadModel = useLoadModel({
		execute: executeLoad,
		emptyData: null,
		errorMessage: t.learningSessionLoadErrorMessage,
		resourceKey: `${sessionId ?? "no-session"}:${authScopeKey}`,
		isEnabled: sessionId !== null,
		onLoaded: ({ loadedData }) => {
			dispatch({
				type: SESSION_ACTIONS.SESSION_LOADED,
				session: loadedData
			});
		}
	});

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

	const isMatchCardsPhaseComplete =
		session !== null
		&& session.matchCardResults.length === session.matchCardsTask.pairs.length;

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
		if (session === null || !isMatchCardsPhaseComplete) {
			return;
		}

		const answersBySessionQuestionId = updater(session.answersBySessionQuestionId);

		dispatch({
			type: SESSION_ACTIONS.ANSWER_CHANGED,
			answersBySessionQuestionId
		});
	}, [isMatchCardsPhaseComplete, session]);

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
		if (!isMatchCardsPhaseComplete || session === null || currentQuestion === null || currentResult !== null) {
			return;
		}

		const currentSessionQuestionId = currentQuestion.sessionQuestionId;
		const question = currentQuestion.question;
		const currentAnswer = session.answersBySessionQuestionId[currentSessionQuestionId] ?? null;
		const checkedAnswerResult = {
			isCorrect: gradeAnswerUseCase.execute(question, currentAnswer),
			pointsAwarded: gradeAnswerUseCase.getQuestionScore(question, currentAnswer),
			maxPoints: question.points,
			fillMatchType: gradeAnswerUseCase.getFillMatchType(question, currentAnswer)
		};

		dispatch({
			type: SESSION_ACTIONS.ANSWER_CHECKED,
			sessionQuestionId: currentSessionQuestionId,
			result: checkedAnswerResult
		});
	}, [currentQuestion, currentResult, gradeAnswerUseCase, isMatchCardsPhaseComplete, session]);

	const submitSession = useCallback(async () => {
		if (session === null || !isMatchCardsPhaseComplete) {
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
	}, [isMatchCardsPhaseComplete, session, state.status, submitLearningSessionUseCase, t.learningSessionSubmitErrorMessage]);

	const continueSession = useCallback(() => {
		if (!isMatchCardsPhaseComplete || currentResult === null) {
			return;
		}

		if (isLastQuestion) {
			submitSession();
			return;
		}

		dispatch({
			type: SESSION_ACTIONS.CONTINUED
		});
	}, [currentResult, isLastQuestion, isMatchCardsPhaseComplete, submitSession]);

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

	const workspaceState = createWorkspaceState({
		loadStatus: loadModel.status,
		isEmpty: false,
		labels: {
			loading: t.learningSessionLoadingMessage,
			errorTitle: t.errorPrefix,
			errorBody: loadModel.error ?? t.learningSessionLoadErrorMessage,
			emptyTitle: "",
			emptyBody: ""
		},
		errorAction: null
	});

	const isSessionComplete = state.status === LEARNING_SESSION_STATES.COMPLETED;
	const isMatchCardsActive =
		session !== null
		&& !isMatchCardsPhaseComplete
		&& !isSessionComplete;
	const answerReady =
		currentQuestion !== null
		&& isQuestionAnswered(currentQuestion.question, answer);
	const feedbackBody = state.status === LEARNING_SESSION_STATES.SUBMIT_FAILED
		? state.errorMessage
		: null;

	let progressBarModel = null;
	let matchCardsModel = null;

	if (session !== null) {
		progressBarModel = createLearningSessionProgressBarModel({
			currentIndex: session.currentIndex,
			questionCount: session.questions.length,
			isMatchCardsComplete: isMatchCardsPhaseComplete,
			t
		});
	}

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

	const presentation = createLearningSessionPagePresentation({
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
	});

	return {
		workspaceState,
		backContract,
		headerModel: presentation.headerModel,
		progressBarModel,
		matchCardsModel,
		questionCardModel: presentation.questionCardModel,
		currentQuestionRenderKey:
			presentation.questionCardModel === null
				? null
				: currentQuestionRenderKey,
		questionFocusLabel: t.learningSessionQuestionFocusLabel,
		actionPanelModel: presentation.actionPanelModel,
		sessionResultModel: presentation.sessionResultModel,
		rewardModel: presentation.rewardModel,
		isSessionComplete:
			state.status === LEARNING_SESSION_STATES.COMPLETED
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
