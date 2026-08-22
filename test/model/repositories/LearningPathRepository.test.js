// test/model/repositories/LearningPathRepository.test.js
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

	test("preserves backend-owned startability and current replay progress", async () => {
		const response = readFixture("learning-path-response.json");
		response.modules[0].currentRun = { completedSessions: 1, totalSessions: 4 };
		const pathModel = await createRepository({ learningPathResponse: response }).getLearningPath({ subjectId: "in2120", language: "no" });
		expect(pathModel.modules[0].currentRun).toEqual({ completedSessions: 1, totalSessions: 4 });
		expect(pathModel.modules[0].sections[0].sessions[0].isStartable).toBe(true);
	});

	test("rejects a roadmap session without backend-owned isStartable", async () => {
		const response = readFixture("learning-path-response.json");
		delete response.modules[0].sections[0].sessions[0].isStartable;
		await expect(createRepository({ learningPathResponse: response }).getLearningPath({ subjectId: "in2120", language: "no" })).rejects.toThrow("Invalid learning path response");
	});

	test("accepts the backend-owned submit assessment band", async () => {
		const result = await createRepository().submitLearningSession({ sessionId: "session-1", answers: [] });
		expect(result.score).toMatchObject({ percentage: 65.38, performanceBand: "progress" });
	});

	test("accepts an explicit not-assessed submit result", async () => {
		const response = readFixture("submit-session-response.json");
		response.score.percentage = null;
		response.score.performanceBand = "not-assessed";
		const result = await createRepository({ submitSessionResponse: response }).submitLearningSession({ sessionId: "session-1", answers: [] });
		expect(result.score).toMatchObject({ percentage: null, performanceBand: "not-assessed" });
	});

	test("rejects a partial submit assessment pair", async () => {
		const response = readFixture("submit-session-response.json");
		response.score.percentage = null;
		await expect(createRepository({ submitSessionResponse: response }).submitLearningSession({ sessionId: "session-1", answers: [] })).rejects.toThrow("Invalid learning session result");
	});

	test("normalizes only a completely missing roadmap session performance pair", async () => {
		const response = readFixture("learning-path-response.json");
		delete response.modules[0].sections[0].sessions[1].performancePercent;
		delete response.modules[0].sections[0].sessions[1].performanceBand;
		const pathModel = await createRepository({ learningPathResponse: response }).getLearningPath({ subjectId: "in2120", language: "no" });
		expect(pathModel.modules[0].sections[0].sessions[1]).toMatchObject({ performancePercent: null, performanceBand: "not-assessed" });
	});

	test("rejects a partial roadmap session performance pair", async () => {
		const response = readFixture("learning-path-response.json");
		delete response.modules[0].sections[0].sessions[0].performanceBand;
		await expect(createRepository({ learningPathResponse: response }).getLearningPath({ subjectId: "in2120", language: "no" })).rejects.toThrow("Invalid learning path response");
	});

	test("rejects module performance without its backend-owned band", async () => {
		const response = readFixture("learning-path-response.json");
		delete response.modules[0].progress.performanceBand;
		await expect(createRepository({ learningPathResponse: response }).getLearningPath({ subjectId: "in2120", language: "no" })).rejects.toThrow("Invalid learning path response");
	});

	test("rejects a module without backend-owned sections", async () => {
		const response = readFixture("learning-path-response.json");
		delete response.modules[0].sections;
		await expect(createRepository({ learningPathResponse: response }).getLearningPath({ subjectId: "in2120", language: "no" })).rejects.toThrow("Invalid learning path response");
	});
});

describe("LearningPathRepository cache", () => {
	test("caches the DataSource response by subject and language while returning fresh mapped objects", async () => {
		const dataSource = new FakeLearningPathDataSource({ learningPathResponse: readFixture("learning-path-response.json"), learningSessionResponse: readFixture("learning-session-response.json"), submitSessionResponse: readFixture("submit-session-response.json") });
		const repository = new LearningPathRepository(dataSource);
		const firstPath = await repository.getLearningPath({ subjectId: "in2120", language: "no" });
		const secondPath = await repository.getLearningPath({ subjectId: "in2120", language: "no" });

		expect(dataSource.calls.filter((call) => call.method === "getLearningPath")).toHaveLength(1);
		expect(firstPath).not.toBe(secondPath);
		expect(firstPath.modules[0]).not.toBe(secondPath.modules[0]);
	});

	test("deduplicates concurrent LearningPath reads for the same subject and language", async () => {
		const dataSource = new FakeLearningPathDataSource({ learningPathResponse: readFixture("learning-path-response.json"), learningSessionResponse: readFixture("learning-session-response.json"), submitSessionResponse: readFixture("submit-session-response.json") });
		const repository = new LearningPathRepository(dataSource);

		const firstRead = repository.getLearningPath({ subjectId: "in2120", language: "no" });
		const secondRead = repository.getLearningPath({ subjectId: "in2120", language: "no" });

		await Promise.all([firstRead, secondRead]);

		expect(dataSource.calls.filter((call) => call.method === "getLearningPath")).toHaveLength(1);
	});

	test("keeps separate cached responses for different subjects and languages", async () => {
		const dataSource = new FakeLearningPathDataSource({ learningPathResponse: readFixture("learning-path-response.json"), learningSessionResponse: readFixture("learning-session-response.json"), submitSessionResponse: readFixture("submit-session-response.json") });
		const repository = new LearningPathRepository(dataSource);

		await repository.getLearningPath({ subjectId: "in2120", language: "no" });
		await repository.getLearningPath({ subjectId: "in2120", language: "en" });
		await repository.getLearningPath({ subjectId: "in2140", language: "no" });
		await repository.getLearningPath({ subjectId: "in2120", language: "no" });

		expect(dataSource.calls.filter((call) => call.method === "getLearningPath")).toHaveLength(3);
	});

	test("removes a failed LearningPath request so the next read retries", async () => {
		let getLearningPathCalls = 0;
		const dataSource = {
			async getLearningPath() {
				getLearningPathCalls += 1;

				if (getLearningPathCalls === 1) {
					throw new Error("temporary failure");
				}

				return readFixture("learning-path-response.json");
			}
		};
		const repository = new LearningPathRepository(dataSource);

		await expect(repository.getLearningPath({ subjectId: "in2120", language: "no" })).rejects.toThrow("temporary failure");
		await expect(repository.getLearningPath({ subjectId: "in2120", language: "no" })).resolves.toMatchObject({ subjectId: "in2120" });
		expect(getLearningPathCalls).toBe(2);
	});

	test("clears cached LearningPath responses after starting a LearningSession", async () => {
		const dataSource = new FakeLearningPathDataSource({ learningPathResponse: readFixture("learning-path-response.json"), learningSessionResponse: readFixture("learning-session-response.json"), submitSessionResponse: readFixture("submit-session-response.json") });
		const repository = new LearningPathRepository(dataSource);

		await repository.getLearningPath({ subjectId: "in2120", language: "no" });
		await repository.startLearningSession({ subjectId: "in2120", moduleId: "module-1", language: "no" });
		await repository.getLearningPath({ subjectId: "in2120", language: "no" });

		expect(dataSource.calls.filter((call) => call.method === "getLearningPath")).toHaveLength(2);
	});

	test("clears cached LearningPath responses after submitting a LearningSession", async () => {
		const dataSource = new FakeLearningPathDataSource({ learningPathResponse: readFixture("learning-path-response.json"), learningSessionResponse: readFixture("learning-session-response.json"), submitSessionResponse: readFixture("submit-session-response.json") });
		const repository = new LearningPathRepository(dataSource);

		await repository.getLearningPath({ subjectId: "in2120", language: "no" });
		await repository.submitLearningSession({ sessionId: "session-1", answers: [] });
		await repository.getLearningPath({ subjectId: "in2120", language: "no" });

		expect(dataSource.calls.filter((call) => call.method === "getLearningPath")).toHaveLength(2);
	});

	test("does not clear cached LearningPath responses when only reading a LearningSession", async () => {
		const dataSource = new FakeLearningPathDataSource({ learningPathResponse: readFixture("learning-path-response.json"), learningSessionResponse: readFixture("learning-session-response.json"), submitSessionResponse: readFixture("submit-session-response.json") });
		const repository = new LearningPathRepository(dataSource);

		await repository.getLearningPath({ subjectId: "in2120", language: "no" });
		await repository.getLearningSession("session-1");
		await repository.getLearningPath({ subjectId: "in2120", language: "no" });

		expect(dataSource.calls.filter((call) => call.method === "getLearningPath")).toHaveLength(1);
	});

	test("clears cached LearningPath responses when authenticated user state is reset", async () => {
		const dataSource = new FakeLearningPathDataSource({ learningPathResponse: readFixture("learning-path-response.json"), learningSessionResponse: readFixture("learning-session-response.json"), submitSessionResponse: readFixture("submit-session-response.json") });
		const repository = new LearningPathRepository(dataSource);

		await repository.getLearningPath({ subjectId: "in2120", language: "no" });
		repository.clearLearningPathCache();
		await repository.getLearningPath({ subjectId: "in2120", language: "no" });

		expect(dataSource.calls.filter((call) => call.method === "getLearningPath")).toHaveLength(2);
	});
});
