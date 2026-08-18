import createLearningPathSessionModel from "./createLearningPathSessionModel.js";

export default function createLearningPathSectionModel({ section, t }) {
	return {
		id: section.id,
		sectionKey: section.sectionKey,
		position: section.position,
		label: section.label,
		eyebrow: t.learningPathSectionLabel(section.position),
		progressLabel: t.learningPathSectionProgressLabel(section.progress.completedSessions, section.progress.totalSessions),
		sessions: section.sessions.map((session) => createLearningPathSessionModel({ session, t })),
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
