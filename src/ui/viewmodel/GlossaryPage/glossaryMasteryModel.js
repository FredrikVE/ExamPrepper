// src/ui/viewmodel/GlossaryPage/glossaryMasteryModel.js
import { CONCEPT_MASTERY_STATUS } from "../../../constants/ConceptMasteryStatus.js";

const CONCEPT_MASTERY_STATUS_LABEL_KEY = Object.freeze({
	[CONCEPT_MASTERY_STATUS.NOT_ASSESSED]: "glossaryPageMasteryNotAssessedLabel",
	[CONCEPT_MASTERY_STATUS.PRACTICE]: "glossaryPageMasteryPracticeLabel",
	[CONCEPT_MASTERY_STATUS.PROGRESS]: "glossaryPageMasteryProgressLabel",
	[CONCEPT_MASTERY_STATUS.UNDERSTOOD]: "glossaryPageMasteryUnderstoodLabel"
});

export function createGlossaryMasteryPresentation(mastery, t) {
	if (mastery === null) {
		return {
			status: CONCEPT_MASTERY_STATUS.NOT_ASSESSED,
			statusLabel: t.glossaryPageMasteryNotAssessedLabel
		};
	}

	return {
		status: mastery.status,
		statusLabel: resolveMasteryStatusLabel(mastery.status, t)
	};
}

function resolveMasteryStatusLabel(status, t) {
	const labelKey = CONCEPT_MASTERY_STATUS_LABEL_KEY[status];

	if (labelKey === undefined) {
		throw new Error(`Unknown mastery status: ${String(status)}`);
	}

	return t[labelKey];
}
