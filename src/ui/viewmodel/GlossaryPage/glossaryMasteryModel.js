// src/ui/viewmodel/GlossaryPage/glossaryMasteryModel.js
import { MASTERY_STATUS } from "../../../constants/GlossaryContracts.js";

const MASTERY_STATUS_LABEL_KEY = Object.freeze({
	[MASTERY_STATUS.NOT_ASSESSED]: "glossaryPageMasteryNotAssessedLabel",
	[MASTERY_STATUS.PRACTICE]: "glossaryPageMasteryPracticeLabel",
	[MASTERY_STATUS.PROGRESS]: "glossaryPageMasteryProgressLabel",
	[MASTERY_STATUS.UNDERSTOOD]: "glossaryPageMasteryUnderstoodLabel"
});

export function createGlossaryMasteryPresentation(mastery, t) {
	if (mastery === null) {
		return {
			status: MASTERY_STATUS.NOT_ASSESSED,
			statusLabel: t.glossaryPageMasteryNotAssessedLabel
		};
	}

	return {
		status: mastery.status,
		statusLabel: resolveMasteryStatusLabel(mastery.status, t)
	};
}

function resolveMasteryStatusLabel(status, t) {
	const labelKey = MASTERY_STATUS_LABEL_KEY[status];

	if (labelKey === undefined) {
		throw new Error(`Unknown mastery status: ${String(status)}`);
	}

	return t[labelKey];
}
