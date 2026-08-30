// src/ui/viewmodel/MatchCardsPageViewModel.js
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ALL_TOPIC_AREAS } from "../../constants/TopicAreas.js";
import combineLoadStatuses from "./LoadState/combineLoadStatuses.js";
import useLoadModel from "./LoadState/useLoadModel.js";
import useMatchCardsRoundModel from "./MatchCards/useMatchCardsRoundModel.js";
import { buildProgressBarModel } from "./Shared/ProgressBar/buildProgressBarModel.js";
import createConceptPracticeEventId from "./Shared/createConceptPracticeEventId.js";
import resolveFirstLoadError from "./Utils/resolveFirstLoadError.js";
import { createWorkspaceState } from "./WorkspaceState/createWorkspaceState.js";
import { WORKSPACE_STATE_KINDS } from "./WorkspaceState/workspaceStateKinds.js";

const MATCH_CARDS_ROUND_PAIR_COUNT = 6;
const MATCH_CARDS_VISIBLE_PAIR_COUNT = 4;

export default function useMatchCardsPageViewModel({
	getGlossaryEntriesForSubjectUseCase,
	getTopicAreasUseCase,
	recordMatchCardResultUseCase,
	subjectId,
	initialTopicAreaKey,
	language,
	t,
	isActive,
	backContract,
	authState
}) {
	const [topicAreaKey, setTopicAreaKey] = useState(initialTopicAreaKey ?? ALL_TOPIC_AREAS);
	const recordedMatchResultKeysRef = useRef(new Set());

	useEffect(() => {
		setTopicAreaKey(initialTopicAreaKey ?? ALL_TOPIC_AREAS);
	}, [initialTopicAreaKey, subjectId]);

	const executeGlossaryEntryLoad = useCallback(() => {
		if (!isActive || !subjectId) {
			return Promise.resolve([]);
		}

		return getGlossaryEntriesForSubjectUseCase.execute({
			subjectId,
			topicAreaKey
		});
	}, [getGlossaryEntriesForSubjectUseCase, isActive, subjectId, topicAreaKey]);

	const executeTopicAreaLoad = useCallback(() => {
		if (!isActive || !subjectId) {
			return Promise.resolve([]);
		}

		return getTopicAreasUseCase.execute({
			subjectId,
			language
		});
	}, [getTopicAreasUseCase, isActive, subjectId, language]);

	const glossaryResourceKey = subjectId === null ? "no-subject" : `${subjectId}:${topicAreaKey}`;
	const topicAreaResourceKey = subjectId === null ? "no-subject" : `${subjectId}:${language}`;
	const isLoadEnabled = isActive && subjectId !== null;

	const glossaryEntryLoad = useLoadModel({
		execute: executeGlossaryEntryLoad,
		emptyData: [],
		errorMessage: t.matchCardsErrorMessage,
		resourceKey: glossaryResourceKey,
		isEnabled: isLoadEnabled,
		onLoaded: null
	});

	const topicAreaLoad = useLoadModel({
		execute: executeTopicAreaLoad,
		emptyData: [],
		errorMessage: t.matchCardsErrorMessage,
		resourceKey: topicAreaResourceKey,
		isEnabled: isLoadEnabled,
		onLoaded: null
	});

	const glossaryEntries = glossaryEntryLoad.data;
	const topicAreas = topicAreaLoad.data;
	const pageStatus = combineLoadStatuses([
		glossaryEntryLoad.status,
		topicAreaLoad.status
	]);
	const pageErrorMessage = resolveFirstLoadError([
		glossaryEntryLoad,
		topicAreaLoad
	], t.matchCardsErrorMessage);

	const activeTopicArea = useMemo(() => {
		return topicAreas.find((topicArea) => topicArea.key === topicAreaKey) ?? null;
	}, [topicAreas, topicAreaKey]);

	const labels = useMemo(() => {
		const topicAreaLabel = activeTopicArea?.label ?? null;
		const pageTitle = topicAreaLabel
			? t.matchCardsTopicAreaTitle(topicAreaLabel)
			: t.matchCardsTitle;
		const pageIntro = topicAreaLabel
			? t.matchCardsTopicAreaIntro(topicAreaLabel)
			: t.matchCardsIntro;

		return {
			pageTitle,
			pageEyebrow: t.matchCardsEyebrow,
			pageIntro,
			selectedSlotLabel: t.matchCardsSelectedSlotLabel,
			wrongSlotLabel: t.matchCardsWrongSlotLabel,
			successSlotLabel: t.matchCardsSuccessSlotLabel,
			emptySlotLabel: t.matchCardsEmptySlotLabel,
			progressLabel: t.matchCardsProgressLabel,
			progressAriaLabel: t.matchCardsProgressAriaLabel,
			progressStartLabel: t.matchCardsProgressStartLabel,
			roundCompleteTitle: t.matchCardsRoundCompleteTitle,
			roundCompleteBody: t.matchCardsRoundCompleteBody,
			restartLabel: t.matchCardsRestartLabel,
			cardAriaLabel: t.matchCardsCardAriaLabel
		};
	}, [activeTopicArea, t]);

	useEffect(() => {
		recordedMatchResultKeysRef.current.clear();
	}, [glossaryEntries]);

	const persistMatchCardResult = useCallback((matchCardResult) => {
		if (!authState.isLoaded || !authState.isSignedIn) {
			return;
		}

		if (!subjectId) {
			throw new Error("Signed-in MatchCards persistence requires subjectId");
		}

		if (recordedMatchResultKeysRef.current.has(matchCardResult.glossaryEntryKey)) {
			return;
		}

		recordedMatchResultKeysRef.current.add(matchCardResult.glossaryEntryKey);

		void recordMatchCardResultUseCase.execute({
			eventId: createConceptPracticeEventId(),
			subjectId,
			glossaryEntryKey: matchCardResult.glossaryEntryKey,
			wrongAttemptCount: matchCardResult.wrongAttemptCount
		}).catch(reportMatchCardWriteError);
	}, [authState.isLoaded, authState.isSignedIn, recordMatchCardResultUseCase, subjectId]);

	const roundModel = useMatchCardsRoundModel({
		glossaryEntries,
		roundPairCount: MATCH_CARDS_ROUND_PAIR_COUNT,
		visiblePairCount: MATCH_CARDS_VISIBLE_PAIR_COUNT,
		language,
		randomNumber: Math.random,
		onSuccessfulMatch: persistMatchCardResult
	});

	const workspaceState = createWorkspaceState({
		loadStatus: pageStatus,
		isEmpty: roundModel.session === null,
		labels: {
			loading: t.matchCardsLoadingTitle,
			errorTitle: t.matchCardsErrorTitle,
			errorBody: pageErrorMessage,
			emptyTitle: t.matchCardsEmptyTitle,
			emptyBody: t.matchCardsEmptyBody
		},
		errorAction: null
	});

	const progressLabel = labels.progressLabel(roundModel.matchedPairCount, roundModel.totalPairCount);
	const progressBarModel = useMemo(() => {
		return buildProgressBarModel({
			totalSteps: roundModel.totalPairCount,
			currentStep: Math.max(roundModel.matchedPairCount, 1),
			ariaLabel: labels.progressAriaLabel,
			startLabel: labels.progressStartLabel,
			formatStepLabel: labels.progressLabel,
			onActivateStep: null
		});
	}, [labels, roundModel.matchedPairCount, roundModel.totalPairCount]);
	const headerProgressBarModel = workspaceState.kind === WORKSPACE_STATE_KINDS.CONTENT
		? progressBarModel
		: null;

	const restartSession = useCallback(() => {
		recordedMatchResultKeysRef.current.clear();
		roundModel.restart();
	}, [roundModel.restart]);

	return {
		labels,
		glossaryEntries,
		topicAreas,
		topicAreaKey,
		workspaceState,
		backContract,
		session: roundModel.session,
		termSlots: roundModel.termSlots,
		explanationSlots: roundModel.explanationSlots,
		matchedPairCount: roundModel.matchedPairCount,
		totalPairCount: roundModel.totalPairCount,
		progressLabel,
		headerProgressBarModel,
		boardStyle: roundModel.boardStyle,
		isInteractionLocked: roundModel.isInteractionLocked,
		isRoundComplete: roundModel.isRoundComplete,
		handleSelectSlot: roundModel.selectSlot,
		restartSession
	};
}

function reportMatchCardWriteError(error) {
	if (import.meta.env?.DEV === true) {
		console.error("[MatchCards] Could not persist concept result", error);
	}
}
