// src/ui/viewmodel/GlossaryPage/glossaryMasteryModel.js
export function createGlossaryMasteryPresentation(mastery, formatDate, t) {
	if (mastery === null) {
		return {
			status: "not-assessed",
			statusLabel: t.glossaryPageMasteryNotAssessedLabel,
			scoreLabel: t.glossaryPageMasteryNoScoreLabel,
			correctIncorrectLabel: t.glossaryPageMasteryCorrectIncorrectLabel(0, 0),
			difficultyItems: createDifficultyItems(null, t),
			lastPracticedLabel: t.glossaryPageMasteryNeverPracticedLabel
		};
	}

	const formattedLastPracticedDate = mastery.lastEvidenceAt === null
		? null
		: formatDate(mastery.lastEvidenceAt);

	return {
		status: mastery.status,
		statusLabel: resolveMasteryStatusLabel(mastery.status, t),
		scoreLabel: mastery.score === null
			? t.glossaryPageMasteryNoScoreLabel
			: t.glossaryPageMasteryScoreLabel(Math.round(mastery.score * 100)),
		correctIncorrectLabel: t.glossaryPageMasteryCorrectIncorrectLabel(
			mastery.correctCount,
			mastery.incorrectCount
		),
		difficultyItems: createDifficultyItems(mastery, t),
		lastPracticedLabel: formattedLastPracticedDate === null
			? t.glossaryPageMasteryNeverPracticedLabel
			: t.glossaryPageMasteryLastPracticedLabel(formattedLastPracticedDate)
	};
}

function resolveMasteryStatusLabel(status, t) {
	if (status === "practice") {
		return t.glossaryPageMasteryPracticeLabel;
	}
	if (status === "progress") {
		return t.glossaryPageMasteryProgressLabel;
	}
	if (status === "understood") {
		return t.glossaryPageMasteryUnderstoodLabel;
	}
	return t.glossaryPageMasteryNotAssessedLabel;
}

function createDifficultyItems(mastery, t) {
	return [
		createDifficultyItem(
			t.glossaryPageDifficultyEasyLabel,
			mastery?.easyCorrect ?? 0,
			mastery?.easyIncorrect ?? 0
		),
		createDifficultyItem(
			t.glossaryPageDifficultyMediumLabel,
			mastery?.mediumCorrect ?? 0,
			mastery?.mediumIncorrect ?? 0
		),
		createDifficultyItem(
			t.glossaryPageDifficultyHardLabel,
			mastery?.hardCorrect ?? 0,
			mastery?.hardIncorrect ?? 0
		)
	];
}

function createDifficultyItem(label, correctCount, incorrectCount) {
	return {
		label,
		correctCount,
		incorrectCount,
		totalCount: correctCount + incorrectCount
	};
}
