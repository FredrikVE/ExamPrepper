// src/ui/viewmodel/LearningPath/createLearningPathSectionModel.js
import createLearningPathActionKey from "./createLearningPathActionKey.js";
import createLearningPathProgressModel from "./createLearningPathProgressModel.js";
import createLearningPathSessionModel from "./createLearningPathSessionModel.js";

export default function createLearningPathSectionModel({ section, moduleId, startingActionKey, canStartLearningSessions, t }) {
	const sessions = section.sessions.map((session) => createLearningPathSessionModel({ session, moduleId, startingActionKey, canStartLearningSessions, t }));
	const hasSelectableSession = section.sessions.some((session) => session.isStartable);
	const isComplete = section.progress.isComplete;
	const target = { kind: "section", sectionId: section.id };
	const actionKey = createLearningPathActionKey({ moduleId, target });

	return {
		id: section.id,
		sectionKey: section.sectionKey,
		position: section.position,
		label: section.label,
		eyebrow: t.learningPathSectionLabel(section.position),
		progressLabel: t.learningPathSectionProgressLabel(section.progress.completedSessions, section.progress.totalSessions),
		sessions,
		actionModel: hasSelectableSession ? {
			intent: "start",
			actionKey,
			moduleId,
			sessionId: null,
			target,
			label: isComplete ? t.learningPathPracticeSectionLabel : t.learningPathJumpToSectionLabel,
			isDisabled: !canStartLearningSessions || startingActionKey !== null,
			isPending: startingActionKey === actionKey
		} : null,
		chapterTests: section.chapterTests.map((test) => ({
			id: test.id,
			position: test.position,
			status: test.status,
			label: t.learningPathChapterTestLabel(test.position),
			statusLabel: test.status === "available" ? t.learningPathChapterTestAvailableLabel : t.learningPathStatusLocked,
			isDisabled: test.status !== "available",
			scoreModel: test.performancePercent === null ? null : createLearningPathProgressModel({ performancePercent: test.performancePercent, performanceBand: test.performanceBand, t })
		}))
	};
}
