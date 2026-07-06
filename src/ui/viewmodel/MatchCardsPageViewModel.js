import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ALL_TOPIC_AREAS } from "../../model/domain/utils/topicAreaFilters.js";
import useLoadModel from "./LoadState/useLoadModel.js";
import combineLoadStatuses from "./LoadState/combineLoadStatuses.js";
import {
	advanceMatchedPair,
	canStartMatchCardsSession,
	createMatchCardsSession,
	markSuccessfulSlotsForFadeOut,
	MATCH_CARD_COLUMN,
	MATCH_SLOT_STATUS,
	resetWrongSlots,
	selectMatchSlot,
	settleFadingInSlots
} from "./MatchCardsPage/matchCardsSessionModel.js";

const MATCH_CARDS_ROUND_PAIR_COUNT = 6;
const MATCH_CARDS_VISIBLE_PAIR_COUNT = 4;
const WRONG_RESET_DELAY_MS = 700;
const SUCCESS_FADE_OUT_DELAY_MS = 220;
const SUCCESS_ADVANCE_DELAY_MS = 480;
const FADING_IN_SETTLE_DELAY_MS = 720;

export default function useMatchCardsPageViewModel({
	getConceptsForSubjectUseCase,
	getTopicAreasUseCase,
	subjectId,
	initialTopicAreaKey,
	language,
	t,
	isActive,
	backContract
}) {
	const [topicAreaKey, setTopicAreaKey] = useState(initialTopicAreaKey ?? ALL_TOPIC_AREAS);
	const [session, setSession] = useState(null);
	const timersRef = useRef([]);

	useEffect(() => {
		setTopicAreaKey(initialTopicAreaKey ?? ALL_TOPIC_AREAS);
	}, [initialTopicAreaKey, subjectId]);

	const executeConceptLoad = useCallback(() => {
		if (!isActive || !subjectId) {
			return Promise.resolve([]);
		}

		return getConceptsForSubjectUseCase.execute({
			subjectId,
			topicAreaKey
		});
	}, [getConceptsForSubjectUseCase, isActive, subjectId, topicAreaKey]);

	const executeTopicAreaLoad = useCallback(() => {
		if (!isActive || !subjectId) {
			return Promise.resolve([]);
		}

		return getTopicAreasUseCase.execute({
			subjectId,
			language
		});
	}, [getTopicAreasUseCase, isActive, subjectId, language]);

	const conceptLoad = useLoadModel({
		execute: executeConceptLoad,
		emptyData: [],
		errorMessage: t.matchCardsErrorMessage,
		onLoaded: noteMatchCardsResourceLoaded
	});

	const topicAreaLoad = useLoadModel({
		execute: executeTopicAreaLoad,
		emptyData: [],
		errorMessage: t.matchCardsErrorMessage,
		onLoaded: noteMatchCardsResourceLoaded
	});

	const concepts = conceptLoad.data;
	const topicAreas = topicAreaLoad.data;
	const pageStatus = combineLoadStatuses([
		conceptLoad.status,
		topicAreaLoad.status
	]);
	const pageErrorMessage = resolveMatchCardsPageErrorMessage(
		conceptLoad,
		topicAreaLoad,
		t.matchCardsErrorMessage
	);

	const activeTopicArea = useMemo(() => {
		return findTopicArea(topicAreas, topicAreaKey);
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
			loadingTitle: t.matchCardsLoadingTitle,
			errorTitle: t.matchCardsErrorTitle,
			emptyTitle: t.matchCardsEmptyTitle,
			emptyBody: t.matchCardsEmptyBody,
			selectedSlotLabel: t.matchCardsSelectedSlotLabel,
			wrongSlotLabel: t.matchCardsWrongSlotLabel,
			successSlotLabel: t.matchCardsSuccessSlotLabel,
			emptySlotLabel: t.matchCardsEmptySlotLabel,
			progressLabel: t.matchCardsProgressLabel,
			roundCompleteTitle: t.matchCardsRoundCompleteTitle,
			roundCompleteBody: t.matchCardsRoundCompleteBody,
			restartLabel: t.matchCardsRestartLabel,
			cardAriaLabel: t.matchCardsCardAriaLabel
		};
	}, [activeTopicArea, t]);

	const createSession = useCallback(() => {
		if (!canStartMatchCardsSession({ concepts })) {
			setSession(null);
			return;
		}

		setSession(createMatchCardsSession({
			concepts,
			language,
			roundPairCount: MATCH_CARDS_ROUND_PAIR_COUNT,
			visiblePairCount: MATCH_CARDS_VISIBLE_PAIR_COUNT,
			randomNumber: Math.random
		}));
	}, [concepts, language]);

	const clearTimers = useCallback(() => {
		for (const timerId of timersRef.current) {
			clearTimeout(timerId);
		}

		timersRef.current = [];
	}, []);

	const registerTimer = useCallback((callback, delayMs) => {
		const timerId = setTimeout(callback, delayMs);
		timersRef.current.push(timerId);
	}, []);

	useEffect(() => {
		clearTimers();
		createSession();

		return clearTimers;
	}, [clearTimers, createSession]);

	const scheduleWrongReset = useCallback(() => {
		clearTimers();
		registerTimer(() => {
			setSession((currentSession) => {
				if (!currentSession) {
					return currentSession;
				}

				return resetWrongSlots({
					session: currentSession
				});
			});
		}, WRONG_RESET_DELAY_MS);
	}, [clearTimers, registerTimer]);

	const scheduleMatchedPairAdvance = useCallback(() => {
		clearTimers();
		registerTimer(() => {
			setSession((currentSession) => {
				if (!currentSession) {
					return currentSession;
				}

				return markSuccessfulSlotsForFadeOut({
					session: currentSession
				});
			});
		}, SUCCESS_FADE_OUT_DELAY_MS);

		registerTimer(() => {
			setSession((currentSession) => {
				if (!currentSession) {
					return currentSession;
				}

				return advanceMatchedPair({
					session: currentSession
				});
			});
		}, SUCCESS_ADVANCE_DELAY_MS);

		registerTimer(() => {
			setSession((currentSession) => {
				if (!currentSession) {
					return currentSession;
				}

				return settleFadingInSlots({
					session: currentSession
				});
			});
		}, FADING_IN_SETTLE_DELAY_MS);
	}, [clearTimers, registerTimer]);

	const handleSelectSlot = useCallback((slotId) => {
		if (!session || isSessionFeedbackLocked(session)) {
			return;
		}

		const nextSession = selectMatchSlot({
			session,
			slotId
		});

		setSession(nextSession);

		if (hasSlotStatus(nextSession.slots, MATCH_SLOT_STATUS.WRONG)) {
			scheduleWrongReset();
			return;
		}

		if (hasSlotStatus(nextSession.slots, MATCH_SLOT_STATUS.SUCCESS)) {
			scheduleMatchedPairAdvance();
		}
	}, [scheduleMatchedPairAdvance, scheduleWrongReset, session]);

	const restartSession = useCallback(() => {
		clearTimers();
		createSession();
	}, [clearTimers, createSession]);

	const termSlots = useMemo(() => {
		return selectSlotsByColumn(session?.slots ?? [], MATCH_CARD_COLUMN.TERM);
	}, [session]);

	const explanationSlots = useMemo(() => {
		return selectSlotsByColumn(session?.slots ?? [], MATCH_CARD_COLUMN.EXPLANATION);
	}, [session]);

	const isInteractionLocked = session ? isSessionFeedbackLocked(session) : false;
	const matchedPairCount = session?.matchedPairCount ?? 0;
	const totalPairCount = session?.roundPairCount ?? 0;
	const progressLabel = labels.progressLabel(matchedPairCount, totalPairCount);

	return {
		labels,
		concepts,
		topicAreas,
		topicAreaKey,
		pageStatus,
		pageErrorMessage,
		showBackButton: backContract.showBackButton,
		backLabel: backContract.backLabel,
		navigationLabel: backContract.navigationLabel,
		onBack: backContract.onBack,
		session,
		termSlots,
		explanationSlots,
		matchedPairCount,
		totalPairCount,
		progressLabel,
		isInteractionLocked,
		isRoundComplete: Boolean(session?.isRoundComplete),
		handleSelectSlot,
		restartSession
	};
}

function noteMatchCardsResourceLoaded() {}

function resolveMatchCardsPageErrorMessage(conceptLoad, topicAreaLoad, fallbackMessage) {
	if (conceptLoad.error) {
		return conceptLoad.error;
	}

	if (topicAreaLoad.error) {
		return topicAreaLoad.error;
	}

	return fallbackMessage;
}

function findTopicArea(topicAreas, topicAreaKey) {
	for (const topicArea of topicAreas) {
		if (topicArea.key === topicAreaKey) {
			return topicArea;
		}
	}

	return null;
}

function selectSlotsByColumn(slots, column) {
	const selectedSlots = [];

	for (const slot of slots) {
		if (slot.column === column) {
			selectedSlots.push(slot);
		}
	}

	return selectedSlots;
}

function hasSlotStatus(slots, status) {
	for (const slot of slots) {
		if (slot.status === status) {
			return true;
		}
	}

	return false;
}

function isSessionFeedbackLocked(session) {
	const lockedStatuses = [
		MATCH_SLOT_STATUS.WRONG,
		MATCH_SLOT_STATUS.SUCCESS,
		MATCH_SLOT_STATUS.FADING_OUT,
		MATCH_SLOT_STATUS.FADING_IN
	];

	for (const status of lockedStatuses) {
		if (hasSlotStatus(session.slots, status)) {
			return true;
		}
	}

	return false;
}
