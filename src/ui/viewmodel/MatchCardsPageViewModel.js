// src/ui/viewmodel/MatchCardsPageViewModel.js
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { APP_AUTH_STATUS } from "../../auth/AppAuthState.js";
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

export default function useMatchCardsPageViewModel(props) {
	const [topicAreaKey, setTopicAreaKey] = useState(props.initialTopicAreaKey ?? ALL_TOPIC_AREAS);
	const recordedMatchResultKeysRef = useRef(new Set());

	useEffect(() => {
		setTopicAreaKey(props.initialTopicAreaKey ?? ALL_TOPIC_AREAS);
	}, [props.initialTopicAreaKey, props.subjectId]);

	const executeGlossaryEntryLoad = useCallback(() => {
		if (!props.isActive || !props.subjectId) {
			return Promise.resolve([]);
		}

		return props.getGlossaryEntriesForSubjectUseCase.execute({
			subjectId: props.subjectId,
			topicAreaKey
		});
	}, [props.getGlossaryEntriesForSubjectUseCase, props.isActive, props.subjectId, topicAreaKey]);

	const executeTopicAreaLoad = useCallback(() => {
		if (!props.isActive || !props.subjectId) {
			return Promise.resolve([]);
		}

		return props.getTopicAreasUseCase.execute({
			subjectId: props.subjectId,
			language: props.language
		});
	}, [props.getTopicAreasUseCase, props.isActive, props.subjectId, props.language]);

	const glossaryResourceKey = props.subjectId === null ? "no-subject" : `${props.subjectId}:${topicAreaKey}`;
	const topicAreaResourceKey = props.subjectId === null ? "no-subject" : `${props.subjectId}:${props.language}`;
	const isLoadEnabled = props.isActive && props.subjectId !== null;

	const glossaryEntryLoad = useLoadModel({
		execute: executeGlossaryEntryLoad,
		emptyData: [],
		errorMessage: props.t.matchCardsErrorMessage,
		resourceKey: glossaryResourceKey,
		isEnabled: isLoadEnabled,
		onLoaded: null
	});

	const topicAreaLoad = useLoadModel({
		execute: executeTopicAreaLoad,
		emptyData: [],
		errorMessage: props.t.matchCardsErrorMessage,
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
	], props.t.matchCardsErrorMessage);

	const activeTopicArea = useMemo(() => {
		return topicAreas.find((topicArea) => topicArea.key === topicAreaKey) ?? null;
	}, [topicAreas, topicAreaKey]);

	const labels = useMemo(() => {
		const topicAreaLabel = activeTopicArea?.label ?? null;
		const pageTitle = topicAreaLabel
			? props.t.matchCardsTopicAreaTitle(topicAreaLabel)
			: props.t.matchCardsTitle;
		const pageIntro = topicAreaLabel
			? props.t.matchCardsTopicAreaIntro(topicAreaLabel)
			: props.t.matchCardsIntro;

		return {
			pageTitle,
			pageEyebrow: props.t.matchCardsEyebrow,
			pageIntro,
			selectedSlotLabel: props.t.matchCardsSelectedSlotLabel,
			wrongSlotLabel: props.t.matchCardsWrongSlotLabel,
			successSlotLabel: props.t.matchCardsSuccessSlotLabel,
			emptySlotLabel: props.t.matchCardsEmptySlotLabel,
			progressLabel: props.t.matchCardsProgressLabel,
			progressAriaLabel: props.t.matchCardsProgressAriaLabel,
			progressStartLabel: props.t.matchCardsProgressStartLabel,
			roundCompleteTitle: props.t.matchCardsRoundCompleteTitle,
			roundCompleteBody: props.t.matchCardsRoundCompleteBody,
			restartLabel: props.t.matchCardsRestartLabel,
			cardAriaLabel: props.t.matchCardsCardAriaLabel
		};
	}, [activeTopicArea, props.t]);

	useEffect(() => {
		recordedMatchResultKeysRef.current.clear();
	}, [glossaryEntries]);

	const persistMatchCardResult = useCallback((matchCardResult) => {
		if (props.authState.status !== APP_AUTH_STATUS.SIGNED_IN) {
			return;
		}

		if (!props.subjectId) {
			throw new Error("Signed-in MatchCards persistence requires subjectId");
		}

		if (recordedMatchResultKeysRef.current.has(matchCardResult.glossaryEntryKey)) {
			return;
		}

		recordedMatchResultKeysRef.current.add(matchCardResult.glossaryEntryKey);

		void props.recordMatchCardResultUseCase.execute({
			eventId: createConceptPracticeEventId(),
			subjectId: props.subjectId,
			glossaryEntryKey: matchCardResult.glossaryEntryKey,
			wrongAttemptCount: matchCardResult.wrongAttemptCount
		}).catch(reportMatchCardWriteError);
	}, [props.authState.status, props.recordMatchCardResultUseCase, props.subjectId]);

	const roundModel = useMatchCardsRoundModel({
		glossaryEntries,
		roundPairCount: MATCH_CARDS_ROUND_PAIR_COUNT,
		visiblePairCount: MATCH_CARDS_VISIBLE_PAIR_COUNT,
		language: props.language,
		randomNumber: Math.random,
		onSuccessfulMatch: persistMatchCardResult
	});

	const workspaceState = createWorkspaceState({
		loadStatus: pageStatus,
		isEmpty: roundModel.session === null,
		labels: {
			loading: props.t.matchCardsLoadingTitle,
			errorTitle: props.t.matchCardsErrorTitle,
			errorBody: pageErrorMessage,
			emptyTitle: props.t.matchCardsEmptyTitle,
			emptyBody: props.t.matchCardsEmptyBody
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
		backContract: props.backContract,
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
