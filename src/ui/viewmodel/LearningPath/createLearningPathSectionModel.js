// src/ui/viewmodel/LearningPath/createLearningPathSectionModel.js
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
		intent: "start",
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
	let statusLabel;

	if (chapterTest.status === "available") {
		statusLabel = t.learningPathChapterTestAvailableLabel;
	}

	else if (chapterTest.status === "locked") {
		statusLabel = t.learningPathStatusLocked;
	}

	else {
		throw new Error(`Unknown LearningPath chapter test status '${chapterTest.status}'`);
	}

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
		statusLabel,
		isDisabled: chapterTest.status !== "available",
		scoreModel
	};
}
