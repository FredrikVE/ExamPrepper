//src/ui/viewmodel/LearningPath/createMasteryAppearance.js
export const MASTERY_APPEARANCES = Object.freeze({
	STRONG: "strong",
	MEDIUM: "medium",
	WEAK: "weak",
	EMPTY: "empty"
});

export default function createMasteryAppearance(masteryPercentage) {
	if (masteryPercentage >= 80) return MASTERY_APPEARANCES.STRONG;
	if (masteryPercentage >= 55) return MASTERY_APPEARANCES.MEDIUM;
	if (masteryPercentage > 0) return MASTERY_APPEARANCES.WEAK;
	return MASTERY_APPEARANCES.EMPTY;
}
