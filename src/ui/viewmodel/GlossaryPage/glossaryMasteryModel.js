// src/ui/viewmodel/GlossaryPage/glossaryMasteryModel.js
import { CONCEPT_MASTERY_STATUS } from "../../../constants/ConceptMasteryStatus.js";

const CONCEPT_MASTERY_STATUS_LABEL_KEY = Object.freeze({
	[CONCEPT_MASTERY_STATUS.NOT_ASSESSED]: "glossaryPageMasteryNotAssessedLabel",
	[CONCEPT_MASTERY_STATUS.PRACTICE]: "glossaryPageMasteryPracticeLabel",
	[CONCEPT_MASTERY_STATUS.PROGRESS]: "glossaryPageMasteryProgressLabel",
	[CONCEPT_MASTERY_STATUS.UNDERSTOOD]: "glossaryPageMasteryUnderstoodLabel"
});

const GLOSSARY_MASTERY_SCALE_STATUSES = Object.freeze([
	CONCEPT_MASTERY_STATUS.PRACTICE,
	CONCEPT_MASTERY_STATUS.PROGRESS,
	CONCEPT_MASTERY_STATUS.UNDERSTOOD
]);

export function createGlossaryMasteryPresentation(mastery, t) {
	let status;

	if (mastery === null) {
		status = CONCEPT_MASTERY_STATUS.NOT_ASSESSED;
	}

	else {
		status = mastery.status;
	}

	const statusLabel = resolveMasteryStatusLabel(status, t);
	const scaleItems = [];

	for (const scaleStatus of GLOSSARY_MASTERY_SCALE_STATUSES) {
		scaleItems.push({
			status: scaleStatus,
			label: resolveMasteryStatusLabel(scaleStatus, t),
			isActive: scaleStatus === status
		});
	}

	return {
		status,
		statusLabel,
		ariaLabel: t.glossaryPageMasteryAriaLabel(statusLabel),
		isAssessed: status !== CONCEPT_MASTERY_STATUS.NOT_ASSESSED,
		scaleItems
	};
}

function resolveMasteryStatusLabel(status, t) {
	const labelKey = CONCEPT_MASTERY_STATUS_LABEL_KEY[status];

	if (labelKey === undefined) {
		throw new Error(`Unknown mastery status: ${String(status)}`);
	}

	return t[labelKey];
}
