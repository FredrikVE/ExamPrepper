// src/ui/view/components/FlipcardsPage/FlipcardDeck/useFlipcardFeedbackToast.js
import { useCallback, useEffect, useRef, useState } from "react";

const FEEDBACK_TOAST_DURATION_MS = 950;

export function useFlipcardFeedbackToast(params) {
	const hideToastTimeoutRef = useRef(null);
	const [message, setMessage] = useState("");
	const [isVisible, setIsVisible] = useState(false);

	const clearHideToastTimeout = useCallback(() => {
		if (!hideToastTimeoutRef.current) {
			return;
		}

		globalThis.clearTimeout(hideToastTimeoutRef.current);
		hideToastTimeoutRef.current = null;
	}, []);

	const hideFeedbackToast = useCallback(() => {
		clearHideToastTimeout();
		setIsVisible(false);
	}, [clearHideToastTimeout]);

	const showFeedbackToast = useCallback((nextMessage) => {
		clearHideToastTimeout();
		setMessage(nextMessage);
		setIsVisible(true);

		hideToastTimeoutRef.current = globalThis.setTimeout(() => {
			hideToastTimeoutRef.current = null;
			setIsVisible(false);
		}, FEEDBACK_TOAST_DURATION_MS);
	}, [clearHideToastTimeout]);

	useEffect(() => {
		clearHideToastTimeout();
		setMessage("");
		setIsVisible(false);
	}, [clearHideToastTimeout, params.resetKey]);

	useEffect(() => {
		return () => {
			clearHideToastTimeout();
		};
	}, [clearHideToastTimeout]);

	return {
		message,
		isVisible,
		showFeedbackToast,
		hideFeedbackToast
	};
}
