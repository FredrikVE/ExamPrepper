//src/ui/viewmodel/LearningPath/createModuleStatus.js
export default function createModuleStatus({ completedRounds, isCurrent, isUnlocked }) {
	if (!isUnlocked) return { statusKey: "locked", appearance: "locked", iconKey: "lock" };
	if (isCurrent) return { statusKey: "active", appearance: "active", iconKey: "play" };
	if (completedRounds >= 3) return { statusKey: "completed", appearance: "strong", iconKey: "check" };
	if (completedRounds > 0) return { statusKey: "progress", appearance: "medium", iconKey: "trending" };
	return { statusKey: "notStarted", appearance: "not-started", iconKey: null };
}
