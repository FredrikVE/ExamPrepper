// src/ui/viewmodel/LearningPath/createLearningPathSectionModel.js
import createLearningPathSessionModel from "./createLearningPathSessionModel.js";

export default function createLearningPathSectionModel({ section, moduleId, startingModuleId, t }) {
	const sessions = section.sessions.map((session) => createLearningPathSessionModel({ session, moduleId, startingModuleId, t }));
	const hasSelectableSession = section.sessions.some((session) => session.isStartable);
	const isComplete = section.progress.isComplete;

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
			moduleId,
			sessionId: null,
			target: { kind: "section", sectionId: section.id },
			activityKind: "authored",
			label: isComplete ? t.learningPathPracticeSectionLabel : t.learningPathJumpToSectionLabel,
			isDisabled: startingModuleId !== null,
			isPending: startingModuleId === moduleId
		} : null,
		chapterTests: section.chapterTests.map((test) => ({
			baseId: test.baseId,
			position: test.position,
			status: test.status,
			label: t.learningPathChapterTestLabel(test.position),
			statusLabel: test.status === "available" ? t.learningPathChapterTestAvailableLabel : t.learningPathStatusLocked,
			isDisabled: test.status !== "available"
		}))
	};
}
