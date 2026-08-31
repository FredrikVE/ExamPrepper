// src/ui/viewmodel/LearningPathPagePresentation.js
import { LEARNING_PATH_ACTIVITY_KIND } from "../../constants/LearningPathActivityKind.js";
import { LEARNING_PATH_ROADMAP_STATUS } from "../../constants/LearningPathRoadmapStatus.js";

export const LEARNING_PATH_ACTION_INTENT = Object.freeze({
	RESUME: "resume",
	START: "start",
	OPEN_CHAPTER_TEST: "open-chapter-test"
});

export default function createLearningPathPagePresentation({ learningPath, expandedModuleId, startingActionKey, canStartLearningSessions, t }) {
	const entries = learningPath.modules.map((module) => createModuleModel({
		module,
		resumableSession: learningPath.resumableSession,
		nextActivity: learningPath.nextActivity,
		expandedModuleId,
		startingActionKey,
		canStartLearningSessions,
		t
	}));

	entries.push(createExamGateModel({
		examGate: learningPath.examGate,
		position: learningPath.modules.length + 1,
		t
	}));

	const activeEntry = entries.find((entry) => (
		entry.kind === "module"
		&& entry.id === learningPath.activeModuleId
	)) ?? null;

	return {
		roadmapModel: {
			accessibleLabel: t.learningPathModulesLabel,
			entries
		},
		continuePanelModel: createContinueLearningModel({
			activeEntry,
			t
		})
	};
}

function createModuleModel({
	module,
	resumableSession,
	nextActivity,
	expandedModuleId,
	startingActionKey,
	canStartLearningSessions,
	t
}) {
	const presentation = createModulePresentation(module);
	const isExpanded =
		expandedModuleId === module.id
		&& module.availability.isUnlocked;

	const progressModel = createProgressModel({
		performancePercent: module.progress.performancePercent,
		performanceBand: module.progress.performanceBand,
		t
	});

	const actionModel = createModuleActionModel({
		module,
		resumableSession,
		nextActivity,
		startingActionKey,
		canStartLearningSessions,
		t
	});

	return {
		kind: "module",
		id: module.id,
		position: module.position,
		title: module.title,
		appearance: presentation.appearance,
		nodeModel: createModuleNodeModel({
			module,
			moduleAppearance: presentation.appearance,
			defaultIconKey: presentation.iconKey,
			t
		}),
		cardModel: {
			id: module.id,
			eyebrow: t.learningPathPartLabel(module.position),
			title: module.title,
			progressSummaryLabel: t.learningPathProgressStatus(
				module.progress.completedSessions,
				module.progress.totalSessions
			),
			appearance: presentation.appearance,
			isCurrentStep: module.availability.isCurrent,
			isExpanded,
			isDisabled: !module.availability.isUnlocked,
			masteryRingModel: progressModel,
			chevronLabel: t.learningPathToggleDetailsLabel(module.title)
		},
		detailModel: isExpanded
			? createModuleDetailModel({
				module,
				resumableSession,
				actionModel,
				progressModel,
				startingActionKey,
				canStartLearningSessions,
				t
			})
			: null,
		actionModel
	};
}

function createModulePresentation(module) {
	if (!module.availability.isUnlocked) {
		return {
			appearance: "locked",
			iconKey: "lock"
		};
	}

	if (module.availability.isCurrent) {
		return {
			appearance: "active",
			iconKey: "play"
		};
	}

	if (module.progress.isComplete) {
		return {
			appearance: "completed",
			iconKey: "check"
		};
	}

	if (module.progress.completedSessions > 0) {
		return {
			appearance: "progress",
			iconKey: "trending"
		};
	}

	return {
		appearance: "not-started",
		iconKey: null
	};
}

function createModuleNodeModel({
	module,
	moduleAppearance,
	defaultIconKey,
	t
}) {
	const baseModel = {
		label: t.learningPathPartLabel(module.position),
		value: module.position,
		isCurrentStep: module.availability.isCurrent
	};

	if (module.availability.isCurrent) {
		return {
			...baseModel,
			appearance: "active",
			iconKey: null
		};
	}

	if (!module.progress.isComplete) {
		return {
			...baseModel,
			appearance: moduleAppearance,
			iconKey: defaultIconKey
		};
	}

	switch (module.progress.performanceBand) {
		case "understood":
			return {
				...baseModel,
				appearance: "understood",
				iconKey: "check"
			};

		case "progress":
			return {
				...baseModel,
				appearance: "progress",
				iconKey: "trending"
			};

		case "practice":
			return {
				...baseModel,
				appearance: "practice",
				iconKey: "repeat"
			};

		case "not-assessed":
			return {
				...baseModel,
				appearance: "completed",
				iconKey: "check"
			};

		default:
			throw new Error(
				`Unknown LearningPath performance band '${String(module.progress.performanceBand)}'`
			);
	}
}

function createModuleDetailModel({
	module,
	resumableSession,
	actionModel,
	progressModel,
	startingActionKey,
	canStartLearningSessions,
	t
}) {
	const moduleMasteryLabel = t.learningPathModuleMasteryLabel(module.title);

	return {
		headingId: `learning-path-module-detail-${module.id}`,
		progressModel: {
			...progressModel,
			label: moduleMasteryLabel,
			accessibleLabel: `${moduleMasteryLabel}: ${progressModel.displayValue}`
		},
		sectionsHeading: t.learningPathDetailHeading,
		description: module.description,
		sections: module.sections.map((section) => createSectionModel({
			section,
			moduleId: module.id,
			resumableSession,
			startingActionKey,
			canStartLearningSessions,
			t
		})),
		actionModel
	};
}

function createSectionModel({
	section,
	moduleId,
	resumableSession,
	startingActionKey,
	canStartLearningSessions,
	t
}) {
	return {
		id: section.id,
		position: section.position,
		label: section.label,
		eyebrow: t.learningPathSectionLabel(section.position),
		progressLabel: t.learningPathSectionProgressLabel(
			section.progress.completedSessions,
			section.progress.totalSessions
		),
		chapterTestsHeading: t.learningPathChapterTestsHeading,
		sessions: section.sessions.map((session) => createSessionModel({
			session,
			moduleId,
			resumableSession,
			startingActionKey,
			canStartLearningSessions,
			t
		})),
		actionModel: createSectionActionModel({
			section,
			moduleId,
			resumableSession,
			startingActionKey,
			canStartLearningSessions,
			t
		}),
		chapterTests: section.chapterTests.map((chapterTest) => createChapterTestModel({
			chapterTest,
			moduleId,
			t
		}))
	};
}

function createChapterTestModel({ chapterTest, moduleId, t }) {
	const scoreModel = chapterTest.performancePercent === null
		? null
		: createProgressModel({
			performancePercent: chapterTest.performancePercent,
			performanceBand: chapterTest.performanceBand,
			t
		});

	return {
		id: chapterTest.id,
		position: chapterTest.position,
		status: chapterTest.status,
		label: t.learningPathChapterTestLabel(chapterTest.position),
		statusLabel: createChapterTestStatusLabel(chapterTest.status, t),
		scoreModel,
		actionModel: {
			intent: LEARNING_PATH_ACTION_INTENT.OPEN_CHAPTER_TEST,
			moduleId,
			examId: chapterTest.id,
			label: t.learningPathChapterTestStartLabel,
			isDisabled: !chapterTest.isStartable,
			isPending: false
		}
	};
}

function createChapterTestStatusLabel(status, t) {
	switch (status) {
		case LEARNING_PATH_ROADMAP_STATUS.COMPLETED:
			return t.learningPathChapterTestCompletedLabel;

		case LEARNING_PATH_ROADMAP_STATUS.CURRENT:
			return t.learningPathChapterTestCurrentLabel;

		case LEARNING_PATH_ROADMAP_STATUS.AVAILABLE:
			return t.learningPathChapterTestAvailableLabel;

		case LEARNING_PATH_ROADMAP_STATUS.LOCKED:
			return t.learningPathStatusLocked;

		default:
			throw new Error(
				`Unknown LearningPath chapter test status '${String(status)}'`
			);
	}
}

function createSessionModel({
	session,
	moduleId,
	resumableSession,
	startingActionKey,
	canStartLearningSessions,
	t
}) {
	const actionModel = createSessionActionModel({
		session,
		moduleId,
		resumableSession,
		startingActionKey,
		canStartLearningSessions,
		t
	});

	return {
		planKey: session.planKey,
		position: session.position,
		questionCount: session.questionCount,
		appearance: assertAndReturnRoadmapStatus(session.status, "session"),
		iconKey: createSessionIconKey(session.status),
		scoreModel: createSessionScoreModel({ session, t }),
		replayHoverLabel:
			session.status === LEARNING_PATH_ROADMAP_STATUS.COMPLETED
			&& session.isStartable
				? t.learningPathSessionReplayLabel
				: null,
		isSelectable: session.isStartable,
		actionModel,
		label: t.learningPathSessionLabel(session.position),
		metaLabel: t.learningPathSessionQuestionCount(session.questionCount),
		statusLabel: createSessionStatusLabel(session.status, t)
	};
}

function assertAndReturnRoadmapStatus(status, kind) {
	switch (status) {
		case LEARNING_PATH_ROADMAP_STATUS.COMPLETED:
		case LEARNING_PATH_ROADMAP_STATUS.CURRENT:
		case LEARNING_PATH_ROADMAP_STATUS.AVAILABLE:
		case LEARNING_PATH_ROADMAP_STATUS.LOCKED:
			return status;

		default:
			throw new Error(
				`Unknown LearningPath ${kind} status '${String(status)}'`
			);
	}
}

function createSessionIconKey(status) {
	switch (status) {
		case LEARNING_PATH_ROADMAP_STATUS.COMPLETED:
			return "score";

		case LEARNING_PATH_ROADMAP_STATUS.LOCKED:
			return "lock";

		case LEARNING_PATH_ROADMAP_STATUS.CURRENT:
		case LEARNING_PATH_ROADMAP_STATUS.AVAILABLE:
			return "play";

		default:
			throw new Error(
				`Unknown LearningPath session status '${String(status)}'`
			);
	}
}

function createSessionScoreModel({ session, t }) {
	if (session.status !== LEARNING_PATH_ROADMAP_STATUS.COMPLETED) {
		return null;
	}

	if (session.performancePercent === null) {
		return {
			percentage: 0,
			displayValue: "–",
			appearance: session.performanceBand,
			accessibleLabel: t.learningPathSessionNotAssessedScoreLabel(
				session.position
			)
		};
	}

	const roundedPercentage = Math.round(session.performancePercent);

	return {
		percentage: session.performancePercent,
		displayValue: `${roundedPercentage}%`,
		appearance: session.performanceBand,
		accessibleLabel: t.learningPathSessionScoreLabel(
			session.position,
			roundedPercentage
		)
	};
}

function createSessionActionModel({
	session,
	moduleId,
	resumableSession,
	startingActionKey,
	canStartLearningSessions,
	t
}) {
	if (!session.isStartable) {
		return null;
	}

	if (
		resumableSession !== null
		&& resumableSession.moduleId === moduleId
		&& resumableSession.planKey === session.planKey
	) {
		return {
			intent: LEARNING_PATH_ACTION_INTENT.RESUME,
			moduleId,
			sessionId: resumableSession.sessionId,
			target: null,
			label: t.learningPathResumeLabel,
			isDisabled: false,
			isPending: false
		};
	}

	const target = {
		kind: "session",
		planKey: session.planKey
	};
	const actionKey = createActionKey(moduleId, target);

	return {
		intent: LEARNING_PATH_ACTION_INTENT.START,
		actionKey,
		moduleId,
		sessionId: null,
		target,
		label: session.status === LEARNING_PATH_ROADMAP_STATUS.COMPLETED
			? t.learningPathSessionReplayLabel
			: t.learningPathSessionOpenLabel(session.position),
		isDisabled:
			!canStartLearningSessions
			|| resumableSession !== null
			|| startingActionKey !== null,
		isPending: startingActionKey === actionKey
	};
}

function createSessionStatusLabel(status, t) {
	switch (status) {
		case LEARNING_PATH_ROADMAP_STATUS.COMPLETED:
			return t.learningPathSessionCompletedLabel;

		case LEARNING_PATH_ROADMAP_STATUS.CURRENT:
			return t.learningPathSessionCurrentLabel;

		case LEARNING_PATH_ROADMAP_STATUS.AVAILABLE:
			return t.learningPathSessionAvailableLabel;

		case LEARNING_PATH_ROADMAP_STATUS.LOCKED:
			return t.learningPathStatusLocked;

		default:
			throw new Error(
				`Unknown LearningPath session status '${String(status)}'`
			);
	}
}

function createSectionActionModel({
	section,
	moduleId,
	resumableSession,
	startingActionKey,
	canStartLearningSessions,
	t
}) {
	if (!section.sessions.some((session) => session.isStartable)) {
		return null;
	}

	const target = {
		kind: "section",
		sectionId: section.id
	};
	const actionKey = createActionKey(moduleId, target);

	return {
		intent: LEARNING_PATH_ACTION_INTENT.START,
		actionKey,
		moduleId,
		sessionId: null,
		target,
		label: section.progress.isComplete
			? t.learningPathPracticeSectionLabel
			: t.learningPathJumpToSectionLabel,
		isDisabled:
			!canStartLearningSessions
			|| resumableSession !== null
			|| startingActionKey !== null,
		isPending: startingActionKey === actionKey
	};
}

function createModuleActionModel({
	module,
	resumableSession,
	nextActivity,
	startingActionKey,
	canStartLearningSessions,
	t
}) {
	if (resumableSession !== null && resumableSession.moduleId === module.id) {
		return {
			intent: LEARNING_PATH_ACTION_INTENT.RESUME,
			moduleId: module.id,
			sessionId: resumableSession.sessionId,
			target: null,
			label: module.currentRun === null
				? t.learningPathResumeLabel
				: t.learningPathContinueReplayLabel(
					module.currentRun.completedSessions,
					module.currentRun.totalSessions
				),
			isDisabled: false,
			isPending: false
		};
	}

	if (
		nextActivity !== null
		&& nextActivity.moduleId === module.id
		&& nextActivity.kind === LEARNING_PATH_ACTIVITY_KIND.START_AUTHORED_SESSION
	) {
		return createStartActionModel({
			module,
			target: { kind: "module" },
			label: t.learningPathContinueLabel,
			resumableSession,
			startingActionKey,
			canStartLearningSessions
		});
	}

	if (
		nextActivity !== null
		&& nextActivity.moduleId === module.id
		&& nextActivity.kind === LEARNING_PATH_ACTIVITY_KIND.CHAPTER_TEST
	) {
		return {
			intent: LEARNING_PATH_ACTION_INTENT.OPEN_CHAPTER_TEST,
			moduleId: module.id,
			examId: nextActivity.examId,
			label: t.learningPathChapterTestStartLabel,
			isDisabled: false,
			isPending: false
		};
	}

	if (!module.isReplayAvailable) {
		return null;
	}

	const label = module.currentRun === null
		? t.learningPathReplayModuleLabel
		: t.learningPathContinueReplayLabel(
			module.currentRun.completedSessions,
			module.currentRun.totalSessions
		);

	return createStartActionModel({
		module,
		target: { kind: "module-replay" },
		label,
		resumableSession,
		startingActionKey,
		canStartLearningSessions
	});
}

function createStartActionModel({
	module,
	target,
	label,
	resumableSession,
	startingActionKey,
	canStartLearningSessions
}) {
	const actionKey = createActionKey(module.id, target);

	return {
		intent: LEARNING_PATH_ACTION_INTENT.START,
		actionKey,
		moduleId: module.id,
		sessionId: null,
		target,
		label,
		isDisabled:
			!canStartLearningSessions
			|| !module.availability.isUnlocked
			|| resumableSession !== null
			|| startingActionKey !== null,
		isPending: startingActionKey === actionKey
	};
}

function createActionKey(moduleId, target) {
	switch (target.kind) {
		case "module":
			return `module:${moduleId}:start`;

		case "module-replay":
			return `module:${moduleId}:replay`;

		case "section":
			return `module:${moduleId}:section:${target.sectionId}`;

		case "session":
			return `module:${moduleId}:session:${target.planKey}`;

		default:
			throw new Error(
				`Unknown LearningPath start target '${String(target.kind)}'`
			);
	}
}

function createProgressModel({
	performancePercent,
	performanceBand,
	t
}) {
	const roundedPercentage = performancePercent === null
		? null
		: Math.round(performancePercent);

	const displayValue = roundedPercentage === null
		? t.learningPathPerformanceNotAssessedLabel
		: `${roundedPercentage}%`;

	return {
		percentage: performancePercent ?? 0,
		displayValue,
		compactDisplayValue: roundedPercentage === null
			? "–"
			: `${roundedPercentage}%`,
		appearance: performanceBand,
		label: t.learningPathPerformanceTitle,
		accessibleLabel: `${t.learningPathPerformanceTitle}: ${displayValue}`
	};
}

function createContinueLearningModel({ activeEntry, t }) {
	if (activeEntry === null || activeEntry.actionModel === null) {
		return {
			isVisible: false,
			title: "",
			description: "",
			buttonLabel: "",
			actionModel: null
		};
	}

	const actionModel = activeEntry.actionModel;

	switch (actionModel.intent) {
		case LEARNING_PATH_ACTION_INTENT.RESUME:
			return createVisibleContinueModel({
				title: t.learningPathResumeTitle,
				description: t.learningPathResumeBody(
					activeEntry.position,
					activeEntry.title
				),
				actionModel,
				t
			});

		case LEARNING_PATH_ACTION_INTENT.OPEN_CHAPTER_TEST:
			return createVisibleContinueModel({
				title: t.learningPathChapterTestContinueTitle,
				description: t.learningPathChapterTestContinueBody(
					activeEntry.position,
					activeEntry.title
				),
				actionModel,
				t
			});

		case LEARNING_PATH_ACTION_INTENT.START:
			return createVisibleContinueModel({
				title: t.learningPathContinueTitle,
				description: t.learningPathContinueBody(
					activeEntry.position,
					activeEntry.title
				),
				actionModel,
				t
			});

		default:
			throw new Error(
				`Unknown LearningPath action intent '${String(actionModel.intent)}'`
			);
	}
}

function createVisibleContinueModel({
	title,
	description,
	actionModel,
	t
}) {
	return {
		isVisible: true,
		title,
		description,
		buttonLabel: t.learningPathContinueNowLabel,
		actionModel
	};
}

function createExamGateModel({ examGate, position, t }) {
	const appearance = examGate.isUnlocked ? "active" : "locked";

	return {
		kind: "examGate",
		id: "learning-path-exam-gate",
		appearance,
		nodeModel: {
			appearance,
			iconKey: examGate.isUnlocked ? "check" : "lock",
			label: t.learningPathExamTitle,
			value: position,
			isCurrentStep: false
		},
		cardModel: {
			eyebrow: t.learningPathPartLabel(position),
			title: t.learningPathExamTitle,
			statusLabel: examGate.isUnlocked
				? t.learningPathExamUnlockedLabel
				: t.learningPathExamLockedLabel,
			isDisabled: !examGate.isUnlocked
		}
	};
}
