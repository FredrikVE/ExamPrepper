// test/ui/viewmodel/LearningPathPagePresentation.test.js
import fs from "node:fs";
import path from "node:path";
import { describe, expect, test } from "@jest/globals";
import { LANGUAGES, translations } from "../../../src/i18n/translations.js";
import createLearningPathPagePresentation from "../../../src/ui/viewmodel/LearningPathPagePresentation.js";

const fixture = JSON.parse(fs.readFileSync(path.resolve("test/fixtures/learning-path/learning-path-response.json"), "utf8"));
const t = translations[LANGUAGES.EN];

function createPresentation(learningPath, overrides = {}) {
	return createLearningPathPagePresentation({
		learningPath,
		expandedModuleId: learningPath.modules[0]?.id ?? null,
		startingActionKey: null,
		canStartLearningSessions: true,
		t,
		...overrides
	});
}

function createPath() {
	return structuredClone(fixture);
}

describe("createLearningPathPagePresentation", () => {
	test("uses backend module performance directly", () => {
		const learningPath = createPath();
		const module = learningPath.modules[0];
		module.progress.performancePercent = 73;

		for (const session of module.sections[0].sessions) {
			session.performancePercent = 100;
		}

		const presentation = createPresentation(learningPath);
		const moduleModel = presentation.roadmapModel.entries[0];

		expect(moduleModel.cardModel.masteryRingModel.percentage).toBe(73);
	});

	test("uses backend completion facts directly", () => {
		const learningPath = createPath();
		const module = learningPath.modules[0];
		module.availability.isCurrent = false;
		module.progress.isComplete = true;
		module.progress.completionPercent = 25;
		module.sections[0].progress.isComplete = true;
		module.sections[0].progress.completedSessions = 1;
		module.sections[0].progress.totalSessions = 2;

		const presentation = createPresentation(learningPath);
		const moduleModel = presentation.roadmapModel.entries[0];

		expect(moduleModel).toMatchObject({
			appearance: "completed",
			cardModel: { appearance: "completed" }
		});
		expect(moduleModel.detailModel.sections[0].actionModel.label).toBe(t.learningPathPracticeSectionLabel);
	});

	test("uses backend isStartable directly for session selectability", () => {
		const learningPath = createPath();
		learningPath.modules[0].sections[0].sessions[0].isStartable = false;

		const session = createPresentation(learningPath).roadmapModel.entries[0].detailModel.sections[0].sessions[0];

		expect(session.isSelectable).toBe(false);
		expect(session.actionModel).toBeNull();
	});

	test("preserves authored ChapterTest order and exposes one action contract", () => {
		const learningPath = createPath();
		const chapterTests = [1, 2, 3, 4].map((position) => ({
			id: `chapter-test-${position}`,
			position,
			isStartable: true,
			status: "available",
			performancePercent: null,
			performanceBand: "not-assessed"
		}));
		learningPath.modules[0].sections[0].chapterTests = chapterTests;

		const models = createPresentation(learningPath).roadmapModel.entries[0].detailModel.sections[0].chapterTests;

		expect(models.map((chapterTest) => chapterTest.id)).toEqual(chapterTests.map((chapterTest) => chapterTest.id));
		expect(models.map((chapterTest) => chapterTest.actionModel.intent)).toEqual([
			"open-chapter-test",
			"open-chapter-test",
			"open-chapter-test",
			"open-chapter-test"
		]);
		expect(models.map((chapterTest) => chapterTest.actionModel.examId)).toEqual(chapterTests.map((chapterTest) => chapterTest.id));
	});

	test("lets resumable session win over start and replay", () => {
		const learningPath = createPath();
		const module = learningPath.modules[0];
		module.isReplayAvailable = true;
		learningPath.resumableSession = {
			sessionId: "session-active",
			moduleId: module.id,
			planKey: module.sections[0].sessions[0].planKey
		};

		const action = createPresentation(learningPath).roadmapModel.entries[0].actionModel;

		expect(action).toMatchObject({
			intent: "resume",
			sessionId: "session-active"
		});
	});

	test("creates replay only when backend says replay is available", () => {
		const learningPath = createPath();
		const module = learningPath.modules[0];
		learningPath.nextActivity = null;
		module.isReplayAvailable = false;

		expect(createPresentation(learningPath).roadmapModel.entries[0].actionModel).toBeNull();

		module.isReplayAvailable = true;
		const replayAction = createPresentation(learningPath).roadmapModel.entries[0].actionModel;

		expect(replayAction).toMatchObject({
			intent: "start",
			target: { kind: "module-replay" }
		});
	});

	test("keeps exact session planKey in the start target", () => {
		const learningPath = createPath();
		const session = createPresentation(learningPath).roadmapModel.entries[0].detailModel.sections[0].sessions[0];

		expect(session.actionModel.target).toEqual({
			kind: "session",
			planKey: learningPath.modules[0].sections[0].sessions[0].planKey
		});
	});

	test("keeps exact sectionId in the start target", () => {
		const learningPath = createPath();
		const section = createPresentation(learningPath).roadmapModel.entries[0].detailModel.sections[0];

		expect(section.actionModel.target).toEqual({
			kind: "section",
			sectionId: learningPath.modules[0].sections[0].id
		});
	});

	test("marks pending state only for the exact action key", () => {
		const learningPath = createPath();
		const moduleId = learningPath.modules[0].id;
		const firstPlanKey = learningPath.modules[0].sections[0].sessions[0].planKey;
		const pendingActionKey = `module:${moduleId}:session:${firstPlanKey}`;
		const module = createPresentation(learningPath, { startingActionKey: pendingActionKey }).roadmapModel.entries[0];
		const section = module.detailModel.sections[0];

		expect(section.sessions[0].actionModel).toMatchObject({
			actionKey: pendingActionKey,
			isPending: true
		});
		expect(section.sessions[1].actionModel.isPending).toBe(false);
		expect(module.actionModel.isPending).toBe(false);
		expect(section.actionModel.isPending).toBe(false);
	});

	test("fails fast for unknown session status", () => {
		const learningPath = createPath();
		learningPath.modules[0].sections[0].sessions[0].status = "unknown";

		expect(() => createPresentation(learningPath)).toThrow("Unknown LearningPath session status 'unknown'");
	});

	test("fails fast for unknown ChapterTest status", () => {
		const learningPath = createPath();
		learningPath.modules[0].sections[0].chapterTests[0].status = "unknown";

		expect(() => createPresentation(learningPath)).toThrow("Unknown LearningPath chapter test status 'unknown'");
	});

	test("fails fast for unknown performanceBand", () => {
		const learningPath = createPath();
		const module = learningPath.modules[0];
		module.availability.isCurrent = false;
		module.progress.isComplete = true;
		module.progress.performanceBand = "unknown";

		expect(() => createPresentation(learningPath)).toThrow("Unknown LearningPath performance band 'unknown'");
	});
});
