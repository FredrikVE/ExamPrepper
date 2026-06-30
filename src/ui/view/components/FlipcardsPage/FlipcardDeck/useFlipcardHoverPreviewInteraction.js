// src/ui/view/components/FlipcardsPage/FlipcardDeck/useFlipcardHoverPreviewInteraction.js
import { useCallback, useEffect, useRef, useState } from "react";

export const FLIPCARD_HOVER_PREVIEW_DURATION_MS = 5350;

export function useFlipcardHoverPreviewInteraction(params) {
	const timeoutRef = useRef(null);
	const hasRequestedInitialPreviewRef = useRef(false);
	const [isHoverPreviewActive, setIsHoverPreviewActive] = useState(false);
	const [isHoverBorderReady, setIsHoverBorderReady] = useState(false);

	const clearHoverPreviewTimeout = useCallback(() => {
		if (timeoutRef.current === null) {
			return;
		}

		globalThis.clearTimeout(timeoutRef.current);
		timeoutRef.current = null;
	}, []);

	const startInitialHoverPreview = useCallback(() => {
		if (hasRequestedInitialPreviewRef.current) {
			return;
		}

		hasRequestedInitialPreviewRef.current = true;

		if (params.isDisabled) {
			return;
		}

		clearHoverPreviewTimeout();
		setIsHoverPreviewActive(true);
		setIsHoverBorderReady(false);

		timeoutRef.current = globalThis.setTimeout(() => {
			timeoutRef.current = null;
			setIsHoverPreviewActive(false);
			setIsHoverBorderReady(true);
		}, FLIPCARD_HOVER_PREVIEW_DURATION_MS);
	}, [clearHoverPreviewTimeout, params.isDisabled]);

	useEffect(() => {
		startInitialHoverPreview();
	}, [startInitialHoverPreview]);

	useEffect(() => {
		if (!params.isDisabled) {
			return;
		}

		clearHoverPreviewTimeout();
		setIsHoverPreviewActive(false);
	}, [clearHoverPreviewTimeout, params.isDisabled]);

	useEffect(() => {
		return () => {
			clearHoverPreviewTimeout();
		};
	}, [clearHoverPreviewTimeout]);

	return {
		isHoverPreviewActive,
		isHoverBorderReady
	};
}
