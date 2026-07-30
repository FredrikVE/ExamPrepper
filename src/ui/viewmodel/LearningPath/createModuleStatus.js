//src/ui/viewmodel/LearningPath/createModuleStatus.js
import createMasteryAppearance from "./createMasteryAppearance.js";

export default function createModuleStatus({ masteryPercent, isCurrent, isCompleted, isUnlocked }) {
	if (!isUnlocked) return { statusKey: "locked", appearance: "locked", iconKey: "lock" };
	if (isCurrent) return { statusKey: "active", appearance: "active", iconKey: "play" };
	if (isCompleted) return { statusKey: "strong", appearance: "strong", iconKey: "check" };

	const masteryAppearance = createMasteryAppearance(masteryPercent);
	if (masteryAppearance === "strong") return { statusKey: "strong", appearance: "strong", iconKey: "check" };
	if (masteryAppearance === "medium") return { statusKey: "medium", appearance: "medium", iconKey: "trending" };
	if (masteryAppearance === "weak") return { statusKey: "weak", appearance: "weak", iconKey: "repeat" };
	return { statusKey: "notStarted", appearance: "not-started", iconKey: null };
}
