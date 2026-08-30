// src/ui/viewmodel/MatchCards/useMatchCardsRoundModel.js
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { MATCH_CARD_COLUMN, MATCH_SLOT_STATUS } from "./matchCardsConstants.js";
import { createSuccessfulMatchResult } from "./matchCardsResultModel.js";
import { advanceMatchedPair, markSuccessfulSlotsForFadeOut, resetWrongSlots, settleFadingInSlots } from "./matchCardsRoundTransitions.js";
import { selectMatchSlot } from "./matchCardsSelectionTransitions.js";
import { canStartMatchCardsSession, createMatchCardsSession } from "./matchCardsSession.js";

const WRONG_RESET_DELAY_MS = 700;
const SUCCESS_FADE_OUT_DELAY_MS = 220;
const SUCCESS_ADVANCE_DELAY_MS = 480;
const FADING_IN_SETTLE_DELAY_MS = 720;

export default function useMatchCardsRoundModel({ glossaryEntries, roundPairCount, visiblePairCount, language, randomNumber, onSuccessfulMatch }) {
	const [session, setSession] = useState(null);
	const timersRef = useRef([]);

	const clearTimers = useCallback(() => {
		for (const timerId of timersRef.current) {
			clearTimeout(timerId);
		}

		timersRef.current = [];
	}, []);

	const createSession = useCallback(() => {
		if (!canStartMatchCardsSession(glossaryEntries)) {
			setSession(null);
			return;
		}

		setSession(createMatchCardsSession({
			glossaryEntries,
			roundPairCount,
			visiblePairCount,
			randomNumber
		}));
	}, [glossaryEntries, randomNumber, roundPairCount, visiblePairCount]);

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
				if (currentSession === null) {
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
				if (currentSession === null) {
					return currentSession;
				}

				return markSuccessfulSlotsForFadeOut(currentSession);
			});
		}, SUCCESS_FADE_OUT_DELAY_MS);

		registerTimer(() => {
			setSession((currentSession) => {
				if (currentSession === null) {
					return currentSession;
				}

				return advanceMatchedPair(currentSession);
			});
		}, SUCCESS_ADVANCE_DELAY_MS);

		registerTimer(() => {
			setSession((currentSession) => {
				if (currentSession === null) {
					return currentSession;
				}

				return settleFadingInSlots(currentSession);
			});
		}, FADING_IN_SETTLE_DELAY_MS);
	}, [clearTimers, registerTimer]);

	const selectSlot = useCallback((slotId) => {
		if (session === null || isSessionFeedbackLocked(session)) {
			return;
		}

		const nextSession = selectMatchSlot(session, slotId);
		setSession(nextSession);

		if (hasSlotStatus(nextSession.slots, MATCH_SLOT_STATUS.WRONG)) {
			scheduleWrongReset();
			return;
		}

		if (hasSlotStatus(nextSession.slots, MATCH_SLOT_STATUS.SUCCESS)) {
			const matchResult = createSuccessfulMatchResult(nextSession);

			if (matchResult !== null) {
				onSuccessfulMatch(matchResult);
			}

			scheduleMatchedPairAdvance();
		}
	}, [onSuccessfulMatch, scheduleMatchedPairAdvance, scheduleWrongReset, session]);

	const restart = useCallback(() => {
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

	const activeVisiblePairCount = session?.visiblePairCount ?? visiblePairCount;
	const boardStyle = useMemo(() => {
		return {
			"--matchcards-visible-pair-count": activeVisiblePairCount
		};
	}, [activeVisiblePairCount]);

	return {
		session,
		termSlots,
		explanationSlots,
		boardStyle,
		isInteractionLocked: session === null ? false : isSessionFeedbackLocked(session),
		matchedPairCount: session?.matchedPairCount ?? 0,
		totalPairCount: session?.roundPairCount ?? 0,
		isRoundComplete: session?.isRoundComplete ?? false,
		selectSlot,
		restart
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
