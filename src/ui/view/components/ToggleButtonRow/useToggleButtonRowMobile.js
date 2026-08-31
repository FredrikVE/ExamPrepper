// src/ui/view/components/ToggleButtonRow/useToggleButtonRowMobile.js
import { useEffect, useRef, useState } from "react";

export default function useToggleButtonRowMobile({ items, activeEntryId, onSelectEntry }) {
	const [expandedGroupId, setExpandedGroupId] = useState(null);
	const backButtonRef = useRef(null);
	const restoreFocusButtonRef = useRef(null);
	const restoreFocusItemIdRef = useRef(null);
	const expandedItem = findExpandedItem(items, expandedGroupId);
	const expandedActiveEntryId = resolveExpandedActiveEntryId(expandedItem, activeEntryId);

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

			if (!containsEntryId(item.entries, activeEntryId)) {
				const firstEnabledEntry = findFirstEnabledEntry(item.entries);

				if (firstEnabledEntry !== null) {
					onSelectEntry(firstEnabledEntry.id);
				}
			}

			return;
		}

		if (item.contentTypeId !== null) {
			onSelectEntry(item.contentTypeId);
		}
	};

	const selectEntry = (entry) => {
		if (!entry.isDisabled) {
			onSelectEntry(entry.id);
		}
	};

	const collapseGroup = () => {
		if (expandedGroupId === null) {
			return;
		}

		restoreFocusItemIdRef.current = expandedGroupId;
		setExpandedGroupId(null);
	};

	const resolveItemButtonRef = (itemId) => {
		return itemId === restoreFocusItemIdRef.current
			? restoreFocusButtonRef
			: null;
	};

	return {
		expandedItem,
		expandedActiveEntryId,
		backButtonRef,
		selectItem,
		selectEntry,
		collapseGroup,
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

	// items kan lovlig erstattes ved språk/config-endring.
	// Lokal disclosure-state betyr da "ingen gruppe er åpen".
	return null;
}

function resolveExpandedActiveEntryId(expandedItem, activeEntryId) {
	if (expandedItem === null) {
		return null;
	}

	if (containsEntryId(expandedItem.entries, activeEntryId)) {
		return activeEntryId;
	}

	const firstEnabledEntry = findFirstEnabledEntry(expandedItem.entries);
	return firstEnabledEntry?.id ?? null;
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
	if (element !== null) {
		element.focus();
	}
}
