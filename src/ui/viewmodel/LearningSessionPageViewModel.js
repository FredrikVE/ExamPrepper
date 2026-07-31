//src/ui/viewmodel/LearningSessionPageViewModel.js
import { useCallback, useEffect, useReducer } from "react";
import isQuestionAnswered from "./Utils/isQuestionAnswered.js";
import { createWorkspaceState } from "./WorkspaceState/createWorkspaceState.js";
import { LOAD_STATUS } from "./LoadState/loadStatus.js";
import { updateObjectAnswerSelection, updateSingleAnswerSelection, toggleMultiAnswerSelection } from "./QuestionSession/updateAnswers.js";
import createRewardModel from "./LearningSession/createRewardModel.js";
import createSessionResultModel from "./LearningSession/createSessionResultModel.js";
import sessionReducer, { createInitialSessionState, SESSION_ACTIONS } from "./LearningSession/sessionReducer.js";
import { buildProgressBarModel } from "./Shared/ProgressBar/buildProgressBarModel.js";
import transformLearningSessionAnswersForApi from "./QuestionSession/transformLearningSessionAnswersForApi.js";

export default function useLearningSessionPageViewModel({ getLearningSessionUseCase, submitLearningSessionUseCase, gradeAnswerUseCase, sessionId, t, isActive, backContract }) {
	const [state, dispatch] = useReducer(sessionReducer, undefined, createInitialSessionState);

	useEffect(() => {
		if (!isActive || sessionId === null) {
			return undefined;
		}

		let isCurrent = true;
		getLearningSessionUseCase.execute(sessionId).then((session) => {
			if (isCurrent) {
				dispatch({ type: SESSION_ACTIONS.SESSION_LOADED, session });
			}
		}).catch(() => {
			if (isCurrent) {
				dispatch({ type: SESSION_ACTIONS.LOAD_FAILED, errorMessage: t.learningSessionLoadErrorMessage });
			}
		});

		return () => { isCurrent = false; };
	}, [getLearningSessionUseCase, isActive, sessionId, t.learningSessionLoadErrorMessage]);

	const currentQuestion = state.questions[state.currentIndex] ?? null;
	const currentQuestionRenderKey = currentQuestion === null ? null : currentQuestion.sessionQuestionId;
	const currentResult = currentQuestion === null ? null : state.resultsBySessionQuestionId[currentQuestion.sessionQuestionId] ?? null;
	const isSessionComplete = state.currentIndex >= state.questions.length && state.questions.length > 0;

	const changeAnswers = useCallback((updater) => {
		dispatch({ type: SESSION_ACTIONS.ANSWER_CHANGED, answersBySessionQuestionId: updater(state.answersBySessionQuestionId) });
	}, [state.answersBySessionQuestionId]);

	const setSingleAnswer = useCallback((_questionId, selectedValue) => {
		if (currentQuestion === null || currentResult !== null) return;
		changeAnswers((answers) => updateSingleAnswerSelection(answers, currentQuestion.sessionQuestionId, selectedValue));
	}, [changeAnswers, currentQuestion, currentResult]);
	const toggleMultiAnswer = useCallback((_questionId, selectedValue) => {
		if (currentQuestion === null || currentResult !== null) return;
		changeAnswers((answers) => toggleMultiAnswerSelection(answers, currentQuestion.sessionQuestionId, selectedValue));
	}, [changeAnswers, currentQuestion, currentResult]);
	const selectObjectAnswer = useCallback((_questionId, itemId, selectedValue) => {
		if (currentQuestion === null || currentResult !== null) return;
		changeAnswers((answers) => updateObjectAnswerSelection(answers, currentQuestion.sessionQuestionId, itemId, selectedValue));
	}, [changeAnswers, currentQuestion, currentResult]);

	const checkAnswer = useCallback(() => {
		if (currentQuestion === null || currentResult !== null) return;
		const id = currentQuestion.sessionQuestionId;
		const question = currentQuestion.question;
		const answer = state.answersBySessionQuestionId[id] ?? null;
		dispatch({ type: SESSION_ACTIONS.ANSWER_CHECKED, sessionQuestionId: id, result: { isCorrect: gradeAnswerUseCase.execute(question, answer), pointsAwarded: gradeAnswerUseCase.getQuestionScore(question, answer), maxPoints: question.points } });
	}, [currentQuestion, currentResult, gradeAnswerUseCase, state.answersBySessionQuestionId]);

	const submitSession = useCallback(async () => {
		if (state.sessionId === null || state.submitStatus === "submitting" || state.submitStatus === "succeeded") return;
		dispatch({ type: SESSION_ACTIONS.SUBMIT_STARTED });
		const answers = transformLearningSessionAnswersForApi(state.questions, state.answersBySessionQuestionId);
		try {
			const result = await submitLearningSessionUseCase.execute({ sessionId: state.sessionId, answers });
			dispatch({ type: SESSION_ACTIONS.SUBMIT_SUCCEEDED, result });
		} catch (error) {
			dispatch({ type: SESSION_ACTIONS.SUBMIT_FAILED, errorMessage: t.learningSessionSubmitErrorMessage });
		}
	}, [state.answersBySessionQuestionId, state.sessionId, state.submitStatus, submitLearningSessionUseCase, t.learningSessionSubmitErrorMessage]);

	const continueSession = useCallback(() => {
		if (currentResult === null) return;
		if (state.currentIndex >= state.questions.length - 1) {
			dispatch({ type: SESSION_ACTIONS.CONTINUED });
			submitSession();
			return;
		}
		dispatch({ type: SESSION_ACTIONS.CONTINUED });
	}, [currentResult, state.currentIndex, state.questions.length, submitSession]);

	const answer = currentQuestion === null ? null : state.answersBySessionQuestionId[currentQuestion.sessionQuestionId] ?? null;
	const questionCardModel = currentQuestion === null ? null : { question: currentQuestion.question, questionNumber: state.currentIndex + 1, answer, answerOptionOrder: state.answerOptionOrderBySessionQuestionId[currentQuestion.sessionQuestionId] ?? null, submitted: currentResult !== null, showAllFeedback: currentResult !== null, correct: currentResult?.isCorrect ?? false, fillMatchType: currentResult?.fillMatchType ?? null, expandedAnswerOptionIndexes: [], onToggleAnswerOptionExpanded: () => {}, onSingleAnswer: setSingleAnswer, onToggleMultiAnswer: toggleMultiAnswer, onDropdownFillAnswer: selectObjectAnswer, onRadioButtonGridAnswer: selectObjectAnswer, onMultipleBlankAnswer: selectObjectAnswer };
	const answerReady = currentQuestion !== null && isQuestionAnswered(currentQuestion.question, answer);
	const primaryAction = isSessionComplete ? submitSession : currentResult === null ? checkAnswer : continueSession;
	const primaryLabel = isSessionComplete && state.submitStatus === "failed" ? t.learningSessionRetryLabel : currentResult === null ? t.learningSessionCheckLabel : state.currentIndex >= state.questions.length - 1 ? t.learningSessionFinishLabel : t.learningSessionContinueLabel;
	const actionPanelModel = state.submitResult === null ? { feedbackAppearance: currentResult === null ? "neutral" : currentResult.isCorrect ? "correct" : "incorrect", feedbackTitle: currentResult === null ? null : currentResult.isCorrect ? t.learningSessionCorrectTitle : t.learningSessionIncorrectTitle, feedbackBody: state.submitErrorMessage, primaryLabel, primaryAppearance: currentResult !== null && currentResult.isCorrect ? "success" : "primary", isPrimaryDisabled: isSessionComplete ? state.submitStatus === "submitting" : currentResult === null ? !answerReady : state.submitStatus === "submitting", onPrimaryPressed: primaryAction } : null;
	const loadStatus = state.sessionId !== null ? LOAD_STATUS.READY : state.submitErrorMessage === null ? LOAD_STATUS.LOADING : LOAD_STATUS.ERROR;
	const workspaceState = createWorkspaceState({ loadStatus, isEmpty: false, labels: { loading: t.learningSessionLoadingMessage, errorTitle: t.errorPrefix, errorBody: state.submitErrorMessage ?? t.learningSessionLoadErrorMessage, emptyTitle: "", emptyBody: "" }, errorAction: null });
	const progressBarModel = state.questions.length === 0 ? null : buildProgressBarModel({ totalSteps: state.questions.length, currentStep: Math.min(state.currentIndex + 1, state.questions.length), ariaLabel: t.learningSessionProgressAriaLabel, startLabel: t.learningSessionProgressStartLabel, formatStepLabel: t.learningSessionProgressStepLabel, onActivateStep: null });
	const sessionResultModel = state.submitResult === null ? null : createSessionResultModel({ score: state.submitResult.score, moduleProgress: state.submitResult.moduleProgress, round: state.round, moduleTitle: state.moduleTitle, t, onBack: backContract.onBack });
	const headerModel = state.modulePosition === null ? null : { title: t.learningSessionModuleTitle(state.modulePosition, state.moduleTitle), counterLabel: state.submitResult === null ? t.learningSessionQuestionCounter(Math.min(state.currentIndex + 1, state.questions.length), state.questions.length) : t.learningSessionResultHeaderLabel, roundLabel: t.learningSessionRoundLabel(state.round) };

	return { workspaceState, backContract, headerModel, progressBarModel, questionCardModel, currentQuestionRenderKey, questionFocusLabel: t.learningSessionQuestionFocusLabel, actionPanelModel, sessionResultModel, rewardModel: createRewardModel({ pendingRewardKind: state.pendingRewardKind, combo: state.combo, xp: state.xp, t, onContinue: continueSession }), scrollToTopRequestId: state.scrollToTopRequestId, isSessionComplete };
}
