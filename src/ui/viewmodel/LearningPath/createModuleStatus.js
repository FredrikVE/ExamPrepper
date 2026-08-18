export default function createModuleStatus({ completionPercent, completedSessions, isCurrent, isUnlocked }) {
	if (!isUnlocked) return { statusKey: "locked", appearance: "locked", iconKey: "lock" };
	if (isCurrent) return { statusKey: "active", appearance: "active", iconKey: "play" };
	if (completionPercent >= 100) return { statusKey: "completed", appearance: "strong", iconKey: "check" };
	if (completedSessions > 0) return { statusKey: "progress", appearance: "medium", iconKey: "trending" };
	return { statusKey: "notStarted", appearance: "not-started", iconKey: null };
}
