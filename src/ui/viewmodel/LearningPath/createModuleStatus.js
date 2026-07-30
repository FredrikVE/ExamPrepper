//src/ui/viewmodel/LearningPath/createModuleStatus.js
export default function createModuleStatus({ masteryPercent, isActive, isCompleted, isLocked }) {
	if (isLocked) {
		return { statusKey: "locked", labelKey: "learningPathStatusLocked", appearance: "locked", iconKey: "lock" };
	}

	if (isCompleted) {
		return { statusKey: "completed", labelKey: "learningPathStatusCompleted", appearance: "completed", iconKey: "check" };
	}

	if (isActive) {
		return { statusKey: "active", labelKey: "learningPathStatusActive", appearance: "active", iconKey: "play" };
	}

	if (masteryPercent > 0) {
		return { statusKey: "progress", labelKey: "learningPathStatusProgress", appearance: "progress", iconKey: null };
	}

	return { statusKey: "notStarted", labelKey: "learningPathStatusNotStarted", appearance: "notStarted", iconKey: null };
}
