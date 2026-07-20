import { buildProgressBarModel } from "./Shared/ProgressBar/buildProgressBarModel.js";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ALL_TOPIC_AREAS, findTopicAreaByKey } from "../../model/domain/utils/topicAreaFilters.js";
import useLoadModel from "./LoadState/useLoadModel.js";
import combineLoadStatuses from "./LoadState/combineLoadStatuses.js";
import resolveFirstLoadError from "./Utils/resolveFirstLoadError.js";
import { MATCH_CARD_COLUMN, MATCH_SLOT_STATUS } from "./MatchCardsPage/matchCardsConstants.js";
import { canStartMatchCardsSession, createMatchCardsSession } from "./MatchCardsPage/matchCardsSession.js";
import { selectMatchSlot } from "./MatchCardsPage/matchCardsSelectionTransitions.js";
import { advanceMatchedPair, markSuccessfulSlotsForFadeOut, resetWrongSlots, settleFadingInSlots } from "./MatchCardsPage/matchCardsRoundTransitions.js";

const MATCH_CARDS_ROUND_PAIR_COUNT = 6;
const MATCH_CARDS_VISIBLE_PAIR_COUNT = 4;
const WRONG_RESET_DELAY_MS = 700;
const SUCCESS_FADE_OUT_DELAY_MS = 220;
const SUCCESS_ADVANCE_DELAY_MS = 480;
const FADING_IN_SETTLE_DELAY_MS = 720;

export default function useMatchCardsPageViewModel({
	getGlossaryEntriesForSubjectUseCase,
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

	const glossaryEntryLoad = useLoadModel({
		execute: executeGlossaryEntryLoad,
		emptyData: [],
		errorMessage: t.matchCardsErrorMessage,
		onLoaded: null
	});

	const topicAreaLoad = useLoadModel({
		execute: executeTopicAreaLoad,
		emptyData: [],
		errorMessage: t.matchCardsErrorMessage,
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
		return findTopicAreaByKey(topicAreas, topicAreaKey);
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
			progressAriaLabel: t.matchCardsProgressAriaLabel,
			progressStartLabel: t.matchCardsProgressStartLabel,
			roundCompleteTitle: t.matchCardsRoundCompleteTitle,
			roundCompleteBody: t.matchCardsRoundCompleteBody,
			restartLabel: t.matchCardsRestartLabel,
			cardAriaLabel: t.matchCardsCardAriaLabel
		};
	}, [activeTopicArea, t]);

	const createSession = useCallback(() => {
		if (!canStartMatchCardsSession(glossaryEntries)) {
			setSession(null);
			return;
		}

		setSession(createMatchCardsSession({
			glossaryEntries,
			roundPairCount: MATCH_CARDS_ROUND_PAIR_COUNT,
			visiblePairCount: MATCH_CARDS_VISIBLE_PAIR_COUNT,
			randomNumber: Math.random
		}));
	}, [glossaryEntries]);

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

				return resetWrongSlots(currentSession);
			});
		}, WRONG_RESET_DELAY_MS);
	}, [clearTimers, registerTimer]);

	const scheduleMatchedPairAdvance = useCallback(() => {
		clearTimers();
		// Timer order is one transition: fade out, advance one queued pair, settle new slots.
		registerTimer(() => {
			setSession((currentSession) => {
				if (!currentSession) {
					return currentSession;
				}

				return markSuccessfulSlotsForFadeOut(currentSession);
			});
		}, SUCCESS_FADE_OUT_DELAY_MS);

		registerTimer(() => {
			setSession((currentSession) => {
				if (!currentSession) {
					return currentSession;
				}

				return advanceMatchedPair(currentSession);
			});
		}, SUCCESS_ADVANCE_DELAY_MS);

		registerTimer(() => {
			setSession((currentSession) => {
				if (!currentSession) {
					return currentSession;
				}

				return settleFadingInSlots(currentSession);
			});
		}, FADING_IN_SETTLE_DELAY_MS);
	}, [clearTimers, registerTimer]);

	const handleSelectSlot = useCallback((slotId) => {
		if (!session || isSessionFeedbackLocked(session)) {
			return;
		}

		const nextSession = selectMatchSlot(session, slotId);

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
		return selectPresentedSlotsByColumn({
			slots: session?.slots ?? [],
			column: MATCH_CARD_COLUMN.TERM,
			language
		});
	}, [language, session]);

	const explanationSlots = useMemo(() => {
		return selectPresentedSlotsByColumn({
			slots: session?.slots ?? [],
			column: MATCH_CARD_COLUMN.EXPLANATION,
			language
		});
	}, [language, session]);

	const isInteractionLocked = session ? isSessionFeedbackLocked(session) : false;
	const visiblePairCount = session?.visiblePairCount ?? MATCH_CARDS_VISIBLE_PAIR_COUNT;
	const boardStyle = useMemo(() => {
		return {
			"--matchcards-visible-pair-count": visiblePairCount
		};
	}, [visiblePairCount]);
	const matchedPairCount = session?.matchedPairCount ?? 0;
	const totalPairCount = session?.roundPairCount ?? 0;
	const progressLabel = labels.progressLabel(matchedPairCount, totalPairCount);
	const progressBarModel = useMemo(() => {
		return buildProgressBarModel({
			totalSteps: totalPairCount,
			currentStep: Math.max(matchedPairCount, 1),
			ariaLabel: labels.progressAriaLabel,
			startLabel: labels.progressStartLabel,
			formatStepLabel: labels.progressLabel,
			onActivateStep: null
		});
	}, [labels, matchedPairCount, totalPairCount]);

	return {
		labels,
		glossaryEntries,
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
		progressBarModel,
		boardStyle,
		isInteractionLocked,
		isRoundComplete: Boolean(session?.isRoundComplete),
		handleSelectSlot,
		restartSession
	};
}

function selectPresentedSlotsByColumn({ slots, column, language }) {
	const selectedSlots = [];

	for (const slot of slots) {
		if (slot.column === column) {
			selectedSlots.push(createPresentedSlot({
				slot,
				language
			}));
		}
	}

	return selectedSlots;
}

function createPresentedSlot({ slot, language }) {
	return {
		...slot,
		text: getLocalizedSlotText({
			textByLanguage: slot.textByLanguage,
			language
		})
	};
}

function getLocalizedSlotText({ textByLanguage, language }) {
	if (textByLanguage === null) {
		return null;
	}

	const languageText = textByLanguage[language];

	if (languageText) {
		return languageText;
	}

	if (textByLanguage.no) {
		return textByLanguage.no;
	}

	return textByLanguage.en;
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
