// src/ui/view/components/FlipcardsPage/FlipcardDeck/useFlipcardHoverPreviewInteraction.js
import { useCallback, useEffect, useRef, useState } from "react";

export const FLIPCARD_HOVER_PREVIEW_DURATION_MS = 5350;

export function useFlipcardHoverPreviewInteraction(params) {
	const timeoutRef = useRef(null);
	const hasRequestedInitialPreviewRef = useRef(false);
	const initialCardIdRef = useRef(params.activeCardId);
	const [isHoverPreviewActive, setIsHoverPreviewActive] = useState(false);
	const [isHoverBorderReady, setIsHoverBorderReady] = useState(false);

	const clearHoverPreviewTimeout = useCallback(() => {
		if (timeoutRef.current === null) {
			return;
		}

		globalThis.clearTimeout(timeoutRef.current);
		timeoutRef.current = null;
	}, []);

	const finishInitialHoverPreview = useCallback(() => {
		clearHoverPreviewTimeout();
		setIsHoverPreviewActive(false);
		setIsHoverBorderReady(true);
	}, [clearHoverPreviewTimeout]);

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
			finishInitialHoverPreview();
		}, FLIPCARD_HOVER_PREVIEW_DURATION_MS);
	}, [clearHoverPreviewTimeout, finishInitialHoverPreview, params.isDisabled]);

	useEffect(() => {
		startInitialHoverPreview();
	}, [startInitialHoverPreview]);

	useEffect(() => {
		if (params.activeCardId === initialCardIdRef.current) {
			return;
		}

		finishInitialHoverPreview();
	}, [finishInitialHoverPreview, params.activeCardId]);

	useEffect(() => {
		if (!params.isDisabled) {
			return;
		}

		finishInitialHoverPreview();
	}, [finishInitialHoverPreview, params.isDisabled]);

	useEffect(() => {
		return () => {
			clearHoverPreviewTimeout();
		};
	}, [clearHoverPreviewTimeout]);

	const shouldShowInitialHoverPreview = isHoverPreviewActive && params.activeCardId === initialCardIdRef.current;

	return {
		isHoverPreviewActive: shouldShowInitialHoverPreview,
		isHoverBorderReady
	};
}
