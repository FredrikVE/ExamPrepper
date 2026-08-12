// src/ui/viewmodel/Shared/contentToggleModel.js
import { NAV_ITEMS } from "../../../navigation/navigation.js";

export function createContentToggleEntries(t) {
	const entries = [];
	for (const entry of NAV_ITEMS.toggleButtonItems) {
		entries.push({ id: entry.id, label: t[entry.labelKey], isDisabled: entry.isDisabled });
	}
	return entries;
}

export function createMobileToggleButtonItems({ contentToggleEntries, activeContentType, selectedTestType, t }) {
	const mobileToggleButtonItems = [];
	for (const item of NAV_ITEMS.mobileToggleButtonItems) {
		const entries = [];
		for (const entryId of item.entryIds) {
			entries.push(findMobileToggleEntry(contentToggleEntries, entryId, t));
		}

		mobileToggleButtonItems.push({
			id: item.id,
			label: t[item.labelKey],
			contentTypeId: item.contentTypeId,
			isDisabled: item.isDisabled,
			isActive: isMobileToggleButtonItemActive(item, activeContentType, selectedTestType),
			entries
		});
	}
	return mobileToggleButtonItems;
}

export function findToggleEntryConfig(entryId) {
	for (const entry of NAV_ITEMS.toggleButtonItems) {
		if (entry.id === entryId) {
			return entry;
		}
	}
	for (const entry of NAV_ITEMS.mobileToggleEntryItems) {
		if (entry.id === entryId) {
			return entry;
		}
	}
	return null;
}

function findMobileToggleEntry(entries, entryId, t) {
	for (const entry of entries) {
		if (entry.id === entryId) {
			return entry;
		}
	}
	for (const entry of NAV_ITEMS.mobileToggleEntryItems) {
		if (entry.id === entryId) {
			return { id: entry.id, label: t[entry.labelKey], isDisabled: entry.isDisabled };
		}
	}
	throw new Error(`Unknown mobile toggle entry: ${String(entryId)}`);
}

function isMobileToggleButtonItemActive(item, activeContentType, selectedTestType) {
	if (item.contentTypeId !== null) {
		return item.contentTypeId === activeContentType;
	}

	for (const entryId of item.entryIds) {
		if (entryId === activeContentType || entryId === selectedTestType) {
			return true;
		}
		const toggleEntry = findToggleEntryConfig(entryId);
		if (toggleEntry !== null && toggleEntry.contentTypeId === activeContentType) {
			return true;
		}
	}
	return false;
}
