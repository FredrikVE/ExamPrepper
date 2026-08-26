// src/ui/viewmodel/LearningPath/createLearningPathSectionModel.js
import { LEARNING_PATH_ROADMAP_STATUS } from "../../../constants/LearningPathRoadmapStatus.js";
import { LEARNING_PATH_ACTION_INTENT } from "./LearningPathActionIntent.js";
import createLearningPathActionKey from "./createLearningPathActionKey.js";
import createLearningPathProgressModel from "./createLearningPathProgressModel.js";
import createLearningPathSessionModel from "./createLearningPathSessionModel.js";

export default function createLearningPathSectionModel({ section, moduleId, startingActionKey, canStartLearningSessions, t }) {
	const sessions = section.sessions.map((session) => {
		return createLearningPathSessionModel({
			session,
			moduleId,
			startingActionKey,
			canStartLearningSessions,
			t
		});
	});

	const chapterTests = section.chapterTests.map((chapterTest) => {
		return createChapterTestModel({
			chapterTest,
			t
		});
	});

	return {
		id: section.id,
		sectionKey: section.sectionKey,
		position: section.position,
		label: section.label,
		eyebrow: t.learningPathSectionLabel(section.position),
		progressLabel: t.learningPathSectionProgressLabel(section.progress.completedSessions, section.progress.totalSessions),
		sessions,
		actionModel: createSectionActionModel({
			section,
			moduleId,
			startingActionKey,
			canStartLearningSessions,
			t
		}),
		chapterTests
	};
}

function createSectionActionModel({ section, moduleId, startingActionKey, canStartLearningSessions, t }) {
	const hasStartableSession = section.sessions.some((session) => session.isStartable);

	if (!hasStartableSession) {
		return null;
	}

	const target = {
		kind: "section",
		sectionId: section.id
	};

	const actionKey = createLearningPathActionKey({
		moduleId,
		target
	});

	let label = t.learningPathJumpToSectionLabel;

	if (section.progress.isComplete) {
		label = t.learningPathPracticeSectionLabel;
	}

	return {
		intent: LEARNING_PATH_ACTION_INTENT.START,
		actionKey,
		moduleId,
		sessionId: null,
		target,
		label,
		isDisabled: !canStartLearningSessions || startingActionKey !== null,
		isPending: startingActionKey === actionKey
	};
}

function createChapterTestModel({ chapterTest, t }) {
	let scoreModel = null;

	if (chapterTest.performancePercent !== null) {
		scoreModel = createLearningPathProgressModel({
			performancePercent: chapterTest.performancePercent,
			performanceBand: chapterTest.performanceBand,
			t
		});
	}

	return {
		id: chapterTest.id,
		position: chapterTest.position,
		status: chapterTest.status,
		label: t.learningPathChapterTestLabel(chapterTest.position),
		statusLabel: createChapterTestStatusLabel({ status: chapterTest.status, t }),
		isDisabled: !chapterTest.isStartable,
		scoreModel
	};
}

function createChapterTestStatusLabel({ status, t }) {
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
			throw new Error(`Unknown LearningPath chapter test status '${status}'`);
	}
}
