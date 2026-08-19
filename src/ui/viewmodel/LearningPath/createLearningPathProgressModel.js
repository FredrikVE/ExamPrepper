// src/ui/viewmodel/LearningPath/createLearningPathProgressModel.js
export default function createLearningPathProgressModel({ performancePercent, performanceBand, t }) {
	const displayPercentage = performancePercent === null ? null : Math.round(performancePercent);
	const displayValue = displayPercentage === null ? t.learningPathPerformanceNotAssessedLabel : `${displayPercentage}%`;
	return {
		percentage: performancePercent ?? 0,
		displayPercentage,
		displayValue,
		appearance: performanceBand,
		label: t.learningPathPerformanceTitle,
		accessibleLabel: `${t.learningPathPerformanceTitle}: ${displayValue}`
	};
}
