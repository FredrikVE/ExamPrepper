import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, test } from "@jest/globals";
import LearningPathRepository from "../../../src/model/repositories/LearningPathRepository.js";
import FakeLearningPathDataSource from "../../fakes/FakeLearningPathDataSource.js";

const fixturesDirectory = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../fixtures/learning-path");
const readFixture = (name) => JSON.parse(fs.readFileSync(path.join(fixturesDirectory, name), "utf8"));
function createRepository(overrides = {}) {
	return new LearningPathRepository(new FakeLearningPathDataSource({ learningPathResponse: readFixture("learning-path-response.json"), learningSessionResponse: readFixture("learning-session-response.json"), submitSessionResponse: readFixture("submit-session-response.json"), ...overrides }));
}

describe("LearningPathRepository", () => {
	test("maps the backend-owned roadmap without recreating progression", async () => {
		const repository = createRepository();
		const pathModel = await repository.getLearningPath({ subjectId: "in2120", language: "no" });
		const session = await repository.startLearningSession({ subjectId: "in2120", moduleId: pathModel.modules[0].id, language: "no" });
		const result = await repository.submitLearningSession({ sessionId: session.sessionId, answers: [] });
		expect(pathModel.nextActivity.kind).toBe("start-authored-session");
		expect(pathModel.modules[0].progress).toMatchObject({ completedSessions: 1, totalSessions: 4, completionPercent: 25 });
		expect(pathModel.modules[0].sections[0].sessions[1].status).toBe("current");
		expect(pathModel.modules[0].sections[0].chapterTests).toHaveLength(2);
		expect(pathModel.examGate).toEqual({ isUnlocked: false });
		expect(session).toMatchObject({ activityKind: "authored", planKey: expect.any(String), sectionId: "section-1" });
		expect(result).not.toHaveProperty("moduleProgress");
	});

	test("rejects a module without backend-owned sections", async () => {
		const response = readFixture("learning-path-response.json");
		delete response.modules[0].sections;
		await expect(createRepository({ learningPathResponse: response }).getLearningPath({ subjectId: "in2120", language: "no" })).rejects.toThrow("Invalid learning path response");
	});
});
