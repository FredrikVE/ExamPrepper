// src/ui/viewmodel/GlossaryPage/useGlossaryDetailModel.js
import { useCallback, useEffect, useRef, useState } from "react";
import { PRESENTATION_MODE } from "../../presentation/presentationMode.js";

export default function useGlossaryDetailModel({ presentationMode, resetKey }) {
	const [expandedGlossaryEntryKey, setExpandedGlossaryEntryKey] = useState(null);
	const [glossaryDetailTrailKeys, setGlossaryDetailTrailKeys] = useState([]);
	const [glossaryDetailRenderSnapshot, setGlossaryDetailRenderSnapshot] = useState(null);
	const [areGlossaryDetailRelationsExpanded, setAreGlossaryDetailRelationsExpanded] = useState(false);
	const glossaryRowElementByKey = useRef(new Map());
	const glossaryDisclosureElementByKey = useRef(new Map());
	const glossaryDetailOriginEntryKeyRef = useRef(null);
	const glossaryDetailTitleFocusRequestKeyRef = useRef(null);
	const previousPresentationModeRef = useRef(presentationMode);
	const glossaryDetailTitleElementRef = useRef(null);
	const glossaryDetailTriggerElementByKey = useRef(new Map());
	const glossaryRefCallbackByKind = useRef({ row: new Map(), disclosure: new Map(), detailTrigger: new Map() });

	useEffect(() => {
		setExpandedGlossaryEntryKey(null);
		setGlossaryDetailTrailKeys([]);
		setGlossaryDetailRenderSnapshot(null);
		setAreGlossaryDetailRelationsExpanded(false);
		glossaryDetailOriginEntryKeyRef.current = null;
		glossaryDetailTitleFocusRequestKeyRef.current = null;
		glossaryRowElementByKey.current.clear();
		glossaryDisclosureElementByKey.current.clear();
		glossaryDetailTriggerElementByKey.current.clear();
		glossaryRefCallbackByKind.current.row.clear();
		glossaryRefCallbackByKind.current.disclosure.clear();
		glossaryRefCallbackByKind.current.detailTrigger.clear();
	}, [resetKey]);

	useEffect(() => {
		if (presentationMode !== PRESENTATION_MODE.MOBILE) {
			return;
		}

		if (expandedGlossaryEntryKey === null) {
			return;
		}

		const disclosureElement = glossaryDisclosureElementByKey.current.get(expandedGlossaryEntryKey);
		const rowElement = glossaryRowElementByKey.current.get(expandedGlossaryEntryKey);
		disclosureElement?.focus({ preventScroll: true });
		rowElement?.scrollIntoView({ behavior: "smooth", block: "nearest" });
	}, [expandedGlossaryEntryKey, presentationMode]);

	useEffect(() => {
		if (presentationMode !== PRESENTATION_MODE.DESKTOP) {
			return;
		}

		if (expandedGlossaryEntryKey === null) {
			return;
		}

		if (glossaryDetailTitleFocusRequestKeyRef.current !== expandedGlossaryEntryKey) {
			return;
		}

		glossaryDetailTitleElementRef.current?.focus({ preventScroll: true });
		glossaryDetailTitleFocusRequestKeyRef.current = null;
	}, [expandedGlossaryEntryKey, presentationMode]);

	const resolveGlossaryRowRef = useCallback((glossaryEntryKey) => {
		return resolveCachedElementRef(glossaryRefCallbackByKind.current.row, glossaryRowElementByKey.current, glossaryEntryKey);
	}, []);

	const resolveGlossaryDisclosureRef = useCallback((glossaryEntryKey) => {
		return resolveCachedElementRef(glossaryRefCallbackByKind.current.disclosure, glossaryDisclosureElementByKey.current, glossaryEntryKey);
	}, []);

	const resolveGlossaryDetailTriggerRef = useCallback((glossaryEntryKey) => {
		return resolveCachedElementRef(glossaryRefCallbackByKind.current.detailTrigger, glossaryDetailTriggerElementByKey.current, glossaryEntryKey);
	}, []);

	return {
		expandedGlossaryEntryKey,
		setExpandedGlossaryEntryKey,
		glossaryDetailTrailKeys,
		setGlossaryDetailTrailKeys,
		glossaryDetailRenderSnapshot,
		setGlossaryDetailRenderSnapshot,
		areGlossaryDetailRelationsExpanded,
		setAreGlossaryDetailRelationsExpanded,
		glossaryDetailOriginEntryKeyRef,
		glossaryDetailTitleFocusRequestKeyRef,
		previousPresentationModeRef,
		glossaryDetailTitleElementRef,
		glossaryDetailTriggerElementByKey,
		resolveGlossaryRowRef,
		resolveGlossaryDisclosureRef,
		resolveGlossaryDetailTriggerRef
	};
}

export function useGlossaryDetailPresentationModeSync({ areGlossaryDetailRelationsExpanded, expandedGlossaryEntryKey, glossaryDetailOriginEntryKeyRef, glossaryDetailTitleFocusRequestKeyRef, previousPresentationModeRef, presentationMode, setAreGlossaryDetailRelationsExpanded, setExpandedGlossaryEntryKey, setGlossaryDetailTrailKeys, visibleGlossaryEntryKeys }) {
	useEffect(() => {
		const previousPresentationMode = previousPresentationModeRef.current;
		previousPresentationModeRef.current = presentationMode;

		if (previousPresentationMode === presentationMode) {
			return;
		}

		if (areGlossaryDetailRelationsExpanded) {
			setAreGlossaryDetailRelationsExpanded(false);
		}

		if (previousPresentationMode === PRESENTATION_MODE.DESKTOP && presentationMode === PRESENTATION_MODE.MOBILE) {
			const nextGlossaryEntryKey = resolveMobileGlossaryDetailEntryKey({
				activeGlossaryEntryKey: expandedGlossaryEntryKey,
				originGlossaryEntryKey: glossaryDetailOriginEntryKeyRef.current,
				visibleGlossaryEntryKeys
			});

			setGlossaryDetailTrailKeys([]);
			glossaryDetailTitleFocusRequestKeyRef.current = null;
			glossaryDetailOriginEntryKeyRef.current = null;

			if (nextGlossaryEntryKey !== expandedGlossaryEntryKey) {
				setExpandedGlossaryEntryKey(nextGlossaryEntryKey);
			}
			return;
		}

		if (previousPresentationMode === PRESENTATION_MODE.MOBILE && presentationMode === PRESENTATION_MODE.DESKTOP) {
			setGlossaryDetailTrailKeys([]);
			glossaryDetailTitleFocusRequestKeyRef.current = null;
			glossaryDetailOriginEntryKeyRef.current = expandedGlossaryEntryKey;
		}
	}, [areGlossaryDetailRelationsExpanded, expandedGlossaryEntryKey, glossaryDetailOriginEntryKeyRef, glossaryDetailTitleFocusRequestKeyRef, presentationMode, previousPresentationModeRef, setAreGlossaryDetailRelationsExpanded, setExpandedGlossaryEntryKey, setGlossaryDetailTrailKeys, visibleGlossaryEntryKeys]);
}

export function resolveMobileGlossaryDetailEntryKey(params) {
	if (params.activeGlossaryEntryKey !== null && params.visibleGlossaryEntryKeys.includes(params.activeGlossaryEntryKey)) {
		return params.activeGlossaryEntryKey;
	}

	if (params.originGlossaryEntryKey !== null && params.visibleGlossaryEntryKeys.includes(params.originGlossaryEntryKey)) {
		return params.originGlossaryEntryKey;
	}

	return null;
}

function resolveCachedElementRef(refByKey, elementByKey, glossaryEntryKey) {
	const cachedRef = refByKey.get(glossaryEntryKey);

	if (cachedRef !== undefined) {
		return cachedRef;
	}

	const elementRef = (element) => {
		registerElement(elementByKey, glossaryEntryKey, element);
	};
	refByKey.set(glossaryEntryKey, elementRef);
	return elementRef;
}

function registerElement(elementByKey, glossaryEntryKey, element) {
	if (element === null) {
		elementByKey.delete(glossaryEntryKey);
		return;
	}

	elementByKey.set(glossaryEntryKey, element);
}
