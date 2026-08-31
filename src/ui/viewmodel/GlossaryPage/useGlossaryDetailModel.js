// src/ui/viewmodel/GlossaryPage/useGlossaryDetailModel.js
import { useCallback, useEffect, useRef, useState } from "react";

export default function useGlossaryDetailModel() {
	const [expandedGlossaryEntryKey, setExpandedGlossaryEntryKey] = useState(null);
	const [glossaryDetailTrailKeys, setGlossaryDetailTrailKeys] = useState([]);
	const [glossaryDetailRenderSnapshot, setGlossaryDetailRenderSnapshot] = useState(null);
	const [areGlossaryDetailRelationsExpanded, setAreGlossaryDetailRelationsExpanded] = useState(false);
	const glossaryDetailOriginEntryKeyRef = useRef(null);
	const glossaryDetailTitleFocusRequestKeyRef = useRef(null);
	const glossaryDetailTitleElementRef = useRef(null);
	const glossaryDetailTriggerElementByKey = useRef(new Map());
	const glossaryDetailTriggerRefByKey = useRef(new Map());

	useEffect(() => {
		if (expandedGlossaryEntryKey === null) {
			return;
		}

		if (glossaryDetailTitleFocusRequestKeyRef.current !== expandedGlossaryEntryKey) {
			return;
		}

		glossaryDetailTitleElementRef.current?.focus({ preventScroll: true });
		glossaryDetailTitleFocusRequestKeyRef.current = null;
	}, [expandedGlossaryEntryKey]);

	const resolveGlossaryDetailTriggerRef = useCallback((glossaryEntryKey) => {
		return resolveCachedElementRef(glossaryDetailTriggerRefByKey.current, glossaryDetailTriggerElementByKey.current, glossaryEntryKey);
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
		glossaryDetailTitleElementRef,
		glossaryDetailTriggerElementByKey,
		resolveGlossaryDetailTriggerRef
	};
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
