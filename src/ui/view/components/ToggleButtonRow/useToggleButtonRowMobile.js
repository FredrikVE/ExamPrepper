// src/ui/view/components/ToggleButtonRow/useToggleButtonRowMobile.js
import { useEffect, useRef, useState } from "react";

export default function useToggleButtonRowMobile(params) {
	const [expandedGroupId, setExpandedGroupId] = useState(null);
	const backButtonRef = useRef(null);
	const restoreFocusButtonRef = useRef(null);
	const restoreFocusItemIdRef = useRef(null);
	const expandedItem = findExpandedItem(params.items, expandedGroupId);
	const expandedActiveEntryId = resolveExpandedActiveEntryId(expandedItem, params.activeEntryId);

	useEffect(() => {
		if (expandedGroupId !== null) {
			focusElement(backButtonRef.current);
			return;
		}

		if (restoreFocusItemIdRef.current === null) {
			return;
		}

		focusElement(restoreFocusButtonRef.current);
		restoreFocusItemIdRef.current = null;
	}, [expandedGroupId]);

	const selectItem = (item) => {
		if (item.isDisabled) {
			return;
		}

		if (item.entries.length > 0) {
			restoreFocusItemIdRef.current = item.id;
			setExpandedGroupId(item.id);

			if (!containsEntryId(item.entries, params.activeEntryId)) {
				const firstEnabledEntry = findFirstEnabledEntry(item.entries);

				if (firstEnabledEntry !== null) {
					params.onSelectEntry(firstEnabledEntry.id);
				}
			}

			return;
		}

		if (item.contentTypeId !== null) {
			params.onSelectEntry(item.contentTypeId);
		}
	};

	const selectEntry = (entry) => {
		if (entry.isDisabled) {
			return;
		}

		params.onSelectEntry(entry.id);
	};

	const collapseGroup = () => {
		setExpandedGroupId(null);
	};

	const closeExpandedGroupOnEscape = (event) => {
		if (event.key !== "Escape" || expandedGroupId === null) {
			return;
		}

		event.preventDefault();
		collapseGroup();
	};

	const resolveItemButtonRef = (itemId) => {
		if (itemId === restoreFocusItemIdRef.current) {
			return restoreFocusButtonRef;
		}

		return null;
	};

	return {
		expandedItem,
		expandedActiveEntryId,
		backButtonRef,
		selectItem,
		selectEntry,
		collapseGroup,
		closeExpandedGroupOnEscape,
		resolveItemButtonRef
	};
}

function findExpandedItem(items, itemId) {
	if (itemId === null) {
		return null;
	}

	for (const item of items) {
		if (item.id === itemId) {
			return item;
		}
	}

	throw new Error(`Unknown expanded toggle-button item: ${String(itemId)}`);
}

function resolveExpandedActiveEntryId(expandedItem, activeEntryId) {
	if (expandedItem === null) {
		return null;
	}

	if (containsEntryId(expandedItem.entries, activeEntryId)) {
		return activeEntryId;
	}

	const firstEnabledEntry = findFirstEnabledEntry(expandedItem.entries);

	return firstEnabledEntry === null ? null : firstEnabledEntry.id;
}

function containsEntryId(entries, entryId) {
	for (const entry of entries) {
		if (entry.id === entryId) {
			return true;
		}
	}

	return false;
}

function findFirstEnabledEntry(entries) {
	for (const entry of entries) {
		if (!entry.isDisabled) {
			return entry;
		}
	}

	return null;
}

function focusElement(element) {
	if (element === null) {
		return;
	}

	element.focus();
}
