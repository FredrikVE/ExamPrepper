// src/ui/viewmodel/LearningPath/createModuleStatus.js
export default function createModuleStatus({ isComplete, completedSessions, isCurrent, isUnlocked }) {
	if (!isUnlocked) {

		return { statusKey: "locked", appearance: "locked", iconKey: "lock" };

	}

	if (isCurrent) {

		return { statusKey: "active", appearance: "active", iconKey: "play" };

	}

	if (isComplete) {

		return { statusKey: "completed", appearance: "completed", iconKey: "check" };

	}

	if (completedSessions > 0) {

		return { statusKey: "progress", appearance: "progress", iconKey: "trending" };

	}

	return { statusKey: "notStarted", appearance: "not-started", iconKey: null };
}
