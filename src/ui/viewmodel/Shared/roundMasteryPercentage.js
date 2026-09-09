// src/ui/viewmodel/Shared/roundMasteryPercentage.js
export default function roundMasteryPercentage(performancePercent) {
	if (performancePercent === null) {
		return null;
	}

	if (typeof performancePercent !== "number" || !Number.isFinite(performancePercent)) {
		throw new Error("Invalid mastery percentage");
	}

	return Math.round(performancePercent);
}
