// src/ui/viewmodel/LearningPath/createLearningPathProgressModel.js
export default function createLearningPathProgressModel({ performancePercent, performanceBand, t }) {
	let percentage = 0;
	let displayPercentage = null;
	let displayValue = t.learningPathPerformanceNotAssessedLabel;
	let compactDisplayValue = "–";

	if (performancePercent !== null) {
		percentage = performancePercent;
		displayPercentage = Math.round(performancePercent);
		displayValue = `${displayPercentage}%`;
		compactDisplayValue = `${displayPercentage}%`;
	}

	return {
		percentage,
		displayPercentage,
		displayValue,
		compactDisplayValue,
		appearance: performanceBand,
		label: t.learningPathPerformanceTitle,
		accessibleLabel: `${t.learningPathPerformanceTitle}: ${displayValue}`
	};
}
