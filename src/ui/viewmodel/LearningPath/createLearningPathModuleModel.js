// src/ui/viewmodel/LearningPath/createLearningPathModuleModel.js
import createLearningPathActionModel from "./createLearningPathActionModel.js";
import createLearningPathModuleNodeModel from "./createLearningPathModuleNodeModel.js";
import createLearningPathProgressModel from "./createLearningPathProgressModel.js";
import createLearningPathSectionModel from "./createLearningPathSectionModel.js";
import createModuleStatus from "./createModuleStatus.js";

export default function createLearningPathModuleModel({ module, resumableSession, nextActivity, expandedModuleId, startingActionKey, canStartLearningSessions, t }) {
	const status = createModuleStatus({
		isComplete: module.progress.isComplete,
		completedSessions: module.progress.completedSessions,
		isCurrent: module.availability.isCurrent,
		isUnlocked: module.availability.isUnlocked
	});

	const isExpanded = expandedModuleId === module.id && module.availability.isUnlocked;

	const actionModel = createLearningPathActionModel({
		module,
		resumableSession,
		nextActivity,
		startingActionKey,
		canStartLearningSessions,
		t
	});

	const progressModel = createLearningPathProgressModel({
		performancePercent: module.progress.performancePercent,
		performanceBand: module.progress.performanceBand,
		t
	});

	let detailModel = null;

	if (isExpanded) {
		detailModel = createModuleDetailModel({
			module,
			actionModel,
			progressModel,
			startingActionKey,
			canStartLearningSessions,
			t
		});
	}

	return {
		kind: "module",
		id: module.id,
		position: module.position,
		title: module.title,
		appearance: status.appearance,

		nodeModel: createLearningPathModuleNodeModel({
			module,
			status,
			t
		}),

		cardModel: {
			id: module.id,
			eyebrow: t.learningPathPartLabel(module.position),
			title: module.title,
			progressSummaryLabel: t.learningPathProgressStatus(module.progress.completedSessions, module.progress.totalSessions),
			appearance: status.appearance,
			isCurrentStep: module.availability.isCurrent,
			isExpanded,
			isDisabled: !module.availability.isUnlocked,
			masteryRingModel: progressModel,
			chevronLabel: t.learningPathToggleDetailsLabel(module.title)
		},

		detailModel,
		actionModel
	};
}

function createModuleDetailModel({ module, actionModel, progressModel, startingActionKey, canStartLearningSessions, t }) {
	const sections = module.sections.map((section) => {
		return createLearningPathSectionModel({
			section,
			moduleId: module.id,
			startingActionKey,
			canStartLearningSessions,
			t
		});
	});

	return {
		headingId: `learning-path-module-detail-${module.id}`,
		heading: t.learningPathProgressHistoryHeading,
		progressModel,
		sectionsHeading: t.learningPathDetailHeading,
		description: module.description,
		sections,
		actionModel
	};
}
