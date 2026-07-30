//src/ui/viewmodel/LearningPath/createLearningPathModuleModel.js
import createMasteryAppearance from "./createMasteryAppearance.js";
import createModuleStatus from "./createModuleStatus.js";

export default function createLearningPathModuleModel({ module, expandedModuleId, startingModuleId, t }) {
	const isCompleted = module.progress.completedRounds >= 3;
	const status = createModuleStatus({ masteryPercent: module.progress.masteryPercent, isCurrent: module.availability.isCurrent, isCompleted, isUnlocked: module.availability.isUnlocked });
	const isExpanded = expandedModuleId === module.id && module.availability.isUnlocked;
	const isStartDisabled = !module.availability.isUnlocked || startingModuleId !== null;

	return {
		kind: "module",
		id: module.id,
		appearance: status.appearance,
		nextRound: module.progress.nextRound,
		nodeModel: {
			appearance: status.appearance,
			iconKey: status.iconKey,
			label: t.learningPathPartLabel(module.position),
			value: module.position,
			isCurrentStep: module.availability.isCurrent
		},
		cardModel: {
			id: module.id,
			eyebrow: t.learningPathPartLabel(module.position),
			title: module.title,
			statusLabel: createStatusLabel({ statusKey: status.statusKey, round: module.progress.nextRound, t }),
			appearance: status.appearance,
			isCurrentStep: module.availability.isCurrent,
			isExpanded,
			isDisabled: !module.availability.isUnlocked,
			masteryRingModel: {
				percentage: module.progress.masteryPercent,
				appearance: module.availability.isCurrent ? "active" : createMasteryAppearance(module.progress.masteryPercent),
				accessibleLabel: t.learningPathMasteryLabel(module.progress.masteryPercent)
			},
			chevronLabel: t.learningPathToggleDetailsLabel(module.title)
		},
		detailModel: isExpanded ? {
			headingId: `learning-path-module-detail-${module.id}`,
			heading: t.learningPathDetailHeading,
			description: module.description,
			topics: module.topics.map((topic) => ({
				key: topic.key,
				label: topic.label,
				percentage: topic.masteryPercent,
				percentageLabel: topic.masteryPercent === null ? t.learningPathNoTopicProgressLabel : t.learningPathTopicProgressLabel(topic.masteryPercent),
				appearance: createMasteryAppearance(topic.masteryPercent ?? 0)
			})),
			actionModel: {
				label: isCompleted ? t.learningPathRetryModuleLabel : t.learningPathStartRoundLabel(module.progress.nextRound),
				isDisabled: isStartDisabled,
				isStarting: startingModuleId === module.id
			}
		} : null
	};
}

function createStatusLabel({ statusKey, round, t }) {
	if (statusKey === "active") return t.learningPathStatusActiveRound(round);
	if (statusKey === "strong") return t.learningPathStatusStrongRound(round);
	if (statusKey === "medium") return t.learningPathStatusMediumRound(round);
	if (statusKey === "weak") return t.learningPathStatusWeakRound(round);
	if (statusKey === "locked") return t.learningPathStatusLocked;
	return t.learningPathStatusNotStartedRound(round);
}
