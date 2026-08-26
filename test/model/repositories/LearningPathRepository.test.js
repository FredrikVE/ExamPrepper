// test/model/repositories/LearningPathRepository.test.js
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, test } from "@jest/globals";
import LearningPathRepository from "../../../src/model/repositories/LearningPathRepository.js";
import FakeLearningPathDataSource from "../../fakes/FakeLearningPathDataSource.js";

const EXPECTED_TRANSPORT_READ_COUNT = 1;
const fixturesDirectory = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../fixtures/learning-path");
const readFixture = (name) => JSON.parse(fs.readFileSync(path.join(fixturesDirectory, name), "utf8"));
const SESSION_ID = readFixture("learning-session-response.json").sessionId;
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
		expect(pathModel.modules[0]).toMatchObject({ isReplayAvailable: false, progress: { completedSessions: 1, totalSessions: 4, completionPercent: 25, isComplete: false } });
		expect(pathModel.modules[0].sections[0].progress).toMatchObject({ completedSessions: 1, totalSessions: 2, completionPercent: 50, isComplete: false });
		expect(pathModel.modules[0].sections[0].sessions[1].status).toBe("current");
		expect(pathModel.modules[0].sections[0].chapterTests).toHaveLength(2);
		expect(pathModel.modules[0].sections[0].chapterTests[0]).toMatchObject({ performancePercent: 82.5, performanceBand: "understood" });
		expect(pathModel.examGate).toEqual({ isUnlocked: false });
		expect(session).toMatchObject({ planKey: expect.any(String), sectionId: "section-1" });
		expect(result).not.toHaveProperty("moduleProgress");
	});

	test("rejects adaptive nextActivity at the repository boundary", async () => {
		const response = readFixture("learning-path-response.json");
		response.nextActivity = { kind: "start-adaptive-session", moduleId: response.modules[0].id, questionCount: 4 };

		await expect(createRepository({ learningPathResponse: response }).getLearningPath({ subjectId: "in2120", language: "no" })).rejects.toThrow("Invalid learning path response");
	});

	test("rejects a ChapterTest without backend-owned performance", async () => {
		const response = readFixture("learning-path-response.json");
		delete response.modules[0].sections[0].chapterTests[0].performancePercent;

		await expect(createRepository({ learningPathResponse: response }).getLearningPath({ subjectId: "in2120", language: "no" })).rejects.toThrow("Invalid learning path response");
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

	test("rejects an out-of-range submit percentage", async () => {
		const response = readFixture("submit-session-response.json");
		response.score.percentage = 500;

		await expect(createRepository({ submitSessionResponse: response }).submitLearningSession({ sessionId: "session-1", answers: [] })).rejects.toThrow("Invalid learning session result");
	});

	test("rejects a roadmap session with a completely missing performance pair", async () => {
		const response = readFixture("learning-path-response.json");
		delete response.modules[0].sections[0].sessions[1].performancePercent;
		delete response.modules[0].sections[0].sessions[1].performanceBand;

		await expect(createRepository({ learningPathResponse: response }).getLearningPath({ subjectId: "in2120", language: "no" })).rejects.toThrow("Invalid learning path response");
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

	test("rejects missing backend completion or replay authority", async () => {
		const missingModuleCompletion = readFixture("learning-path-response.json");
		delete missingModuleCompletion.modules[0].progress.isComplete;
		await expect(createRepository({ learningPathResponse: missingModuleCompletion }).getLearningPath({ subjectId: "in2120", language: "no" })).rejects.toThrow("Invalid learning path response");

		const missingSectionCompletion = readFixture("learning-path-response.json");
		delete missingSectionCompletion.modules[0].sections[0].progress.isComplete;
		await expect(createRepository({ learningPathResponse: missingSectionCompletion }).getLearningPath({ subjectId: "in2120", language: "no" })).rejects.toThrow("Invalid learning path response");

		const missingReplayAvailability = readFixture("learning-path-response.json");
		delete missingReplayAvailability.modules[0].isReplayAvailable;
		await expect(createRepository({ learningPathResponse: missingReplayAvailability }).getLearningPath({ subjectId: "in2120", language: "no" })).rejects.toThrow("Invalid learning path response");
	});

	test("rejects a module without backend-owned sections", async () => {
		const response = readFixture("learning-path-response.json");
		delete response.modules[0].sections;
		await expect(createRepository({ learningPathResponse: response }).getLearningPath({ subjectId: "in2120", language: "no" })).rejects.toThrow("Invalid learning path response");
	});

	test("does not leak unknown transport fields into the LearningPath model", async () => {
		const response = readFixture("learning-path-response.json");
		response.modules[0].transportOnly = "ignore";
		response.modules[0].availability.transportOnly = "ignore";
		response.modules[0].sections[0].sessions[0].transportOnly = "ignore";

		const pathModel = await createRepository({ learningPathResponse: response }).getLearningPath({ subjectId: "in2120", language: "no" });

		expect(pathModel.modules[0]).not.toHaveProperty("transportOnly");
		expect(pathModel.modules[0].availability).not.toHaveProperty("transportOnly");
		expect(pathModel.modules[0].sections[0].sessions[0]).not.toHaveProperty("transportOnly");
	});

	test("keeps canonical question fields in LearningSession responses", async () => {
		const session = await createRepository().getLearningSession("session-1");
		const choiceQuestion = session.questions[0].question;
		const fillQuestion = session.questions[3].question;

		expect(choiceQuestion.options[0]).toMatchObject({
			isCorrect: true,
			feedback: "Riktig."
		});
		expect(choiceQuestion.options[0]).not.toHaveProperty("correct");
		expect(choiceQuestion.options[0]).not.toHaveProperty("why");
		expect(fillQuestion.acceptedAnswers).toEqual(["konfidensialitet"]);
		expect(fillQuestion).not.toHaveProperty("answers");
	});

	test("rejects missing canonical question correctness in LearningSession responses", async () => {
		const response = readFixture("learning-session-response.json");
		delete response.questions[0].question.options[0].isCorrect;

		await expect(createRepository({ learningSessionResponse: response }).getLearningSession("session-1")).rejects.toThrow("Invalid canonical practice question shared-question: option confidentiality requires isCorrect");
	});
});

describe("LearningPathRepository cache", () => {
	test("reuses the session returned by start without fetching it again", async () => {
		const dataSource = new FakeLearningPathDataSource({ learningPathResponse: readFixture("learning-path-response.json"), learningSessionResponse: readFixture("learning-session-response.json"), submitSessionResponse: readFixture("submit-session-response.json") });
		const repository = new LearningPathRepository(dataSource);
		const startedSession = await repository.startLearningSession({ subjectId: "in2120", moduleId: "module-1", language: "no" });
		const loadedSession = await repository.getLearningSession(SESSION_ID);

		expect(dataSource.calls.filter((call) => call.method === "fetchLearningSession")).toHaveLength(0);
		expect(startedSession).not.toBe(loadedSession);
		expect(loadedSession).toEqual(startedSession);
	});

	test("deduplicates concurrent LearningSession reads", async () => {
		const dataSource = new FakeLearningPathDataSource({ learningPathResponse: readFixture("learning-path-response.json"), learningSessionResponse: readFixture("learning-session-response.json"), submitSessionResponse: readFixture("submit-session-response.json") });
		const repository = new LearningPathRepository(dataSource);

		const firstRead = repository.getLearningSession(SESSION_ID);
		const secondRead = repository.getLearningSession(SESSION_ID);

		await Promise.all([firstRead, secondRead]);

		expect(dataSource.calls.filter((call) => call.method === "fetchLearningSession")).toHaveLength(EXPECTED_TRANSPORT_READ_COUNT);
	});

	test("removes a failed LearningSession read so the next read retries", async () => {
		let fetchLearningSessionCalls = 0;
		const dataSource = {
			async fetchLearningSession() {
				fetchLearningSessionCalls += 1;

				if (fetchLearningSessionCalls === 1) {
					throw new Error("temporary failure");
				}

				return readFixture("learning-session-response.json");
			}
		};
		const repository = new LearningPathRepository(dataSource);

		await expect(repository.getLearningSession(SESSION_ID)).rejects.toThrow("temporary failure");
		await expect(repository.getLearningSession(SESSION_ID)).resolves.toMatchObject({ sessionId: SESSION_ID });
		expect(fetchLearningSessionCalls).toBe(2);
	});

	test("clears cached LearningSession responses after submitting a LearningSession", async () => {
		const dataSource = new FakeLearningPathDataSource({ learningPathResponse: readFixture("learning-path-response.json"), learningSessionResponse: readFixture("learning-session-response.json"), submitSessionResponse: readFixture("submit-session-response.json") });
		const repository = new LearningPathRepository(dataSource);

		await repository.getLearningSession(SESSION_ID);
		await repository.submitLearningSession({ sessionId: SESSION_ID, answers: [] });
		await repository.getLearningSession(SESSION_ID);

		expect(dataSource.calls.filter((call) => call.method === "fetchLearningSession")).toHaveLength(2);
	});

	test("clears cached LearningSession responses when authenticated user state is reset", async () => {
		const dataSource = new FakeLearningPathDataSource({ learningPathResponse: readFixture("learning-path-response.json"), learningSessionResponse: readFixture("learning-session-response.json"), submitSessionResponse: readFixture("submit-session-response.json") });
		const repository = new LearningPathRepository(dataSource);

		await repository.getLearningSession(SESSION_ID);
		repository.clearUserState();
		await repository.getLearningSession(SESSION_ID);

		expect(dataSource.calls.filter((call) => call.method === "fetchLearningSession")).toHaveLength(2);
	});
	test("caches the DataSource response by subject and language while returning fresh mapped objects", async () => {
		const dataSource = new FakeLearningPathDataSource({ learningPathResponse: readFixture("learning-path-response.json"), learningSessionResponse: readFixture("learning-session-response.json"), submitSessionResponse: readFixture("submit-session-response.json") });
		const repository = new LearningPathRepository(dataSource);
		const firstPath = await repository.getLearningPath({ subjectId: "in2120", language: "no" });
		const secondPath = await repository.getLearningPath({ subjectId: "in2120", language: "no" });

		expect(dataSource.calls.filter((call) => call.method === "fetchLearningPath")).toHaveLength(1);
		expect(firstPath).not.toBe(secondPath);
		expect(firstPath.modules[0]).not.toBe(secondPath.modules[0]);
	});

	test("deduplicates concurrent LearningPath reads for the same subject and language", async () => {
		const dataSource = new FakeLearningPathDataSource({ learningPathResponse: readFixture("learning-path-response.json"), learningSessionResponse: readFixture("learning-session-response.json"), submitSessionResponse: readFixture("submit-session-response.json") });
		const repository = new LearningPathRepository(dataSource);

		const firstRead = repository.getLearningPath({ subjectId: "in2120", language: "no" });
		const secondRead = repository.getLearningPath({ subjectId: "in2120", language: "no" });

		await Promise.all([firstRead, secondRead]);

		expect(dataSource.calls.filter((call) => call.method === "fetchLearningPath")).toHaveLength(1);
	});

	test("keeps separate cached responses for different subjects and languages", async () => {
		const dataSource = new FakeLearningPathDataSource({ learningPathResponse: readFixture("learning-path-response.json"), learningSessionResponse: readFixture("learning-session-response.json"), submitSessionResponse: readFixture("submit-session-response.json") });
		const repository = new LearningPathRepository(dataSource);

		await repository.getLearningPath({ subjectId: "in2120", language: "no" });
		await repository.getLearningPath({ subjectId: "in2120", language: "en" });
		await repository.getLearningPath({ subjectId: "in2140", language: "no" });
		await repository.getLearningPath({ subjectId: "in2120", language: "no" });

		expect(dataSource.calls.filter((call) => call.method === "fetchLearningPath")).toHaveLength(3);
	});

	test("removes a failed LearningPath request so the next read retries", async () => {
		let fetchLearningPathCalls = 0;
		const dataSource = {
			async fetchLearningPath() {
				fetchLearningPathCalls += 1;

				if (fetchLearningPathCalls === 1) {
					throw new Error("temporary failure");
				}

				return readFixture("learning-path-response.json");
			}
		};
		const repository = new LearningPathRepository(dataSource);

		await expect(repository.getLearningPath({ subjectId: "in2120", language: "no" })).rejects.toThrow("temporary failure");
		await expect(repository.getLearningPath({ subjectId: "in2120", language: "no" })).resolves.toMatchObject({ subjectId: "in2120" });
		expect(fetchLearningPathCalls).toBe(2);
	});

	test("clears cached LearningPath responses after starting a LearningSession", async () => {
		const dataSource = new FakeLearningPathDataSource({ learningPathResponse: readFixture("learning-path-response.json"), learningSessionResponse: readFixture("learning-session-response.json"), submitSessionResponse: readFixture("submit-session-response.json") });
		const repository = new LearningPathRepository(dataSource);

		await repository.getLearningPath({ subjectId: "in2120", language: "no" });
		await repository.startLearningSession({ subjectId: "in2120", moduleId: "module-1", language: "no" });
		await repository.getLearningPath({ subjectId: "in2120", language: "no" });

		expect(dataSource.calls.filter((call) => call.method === "fetchLearningPath")).toHaveLength(2);
	});

	test("clears cached LearningPath responses after submitting a LearningSession", async () => {
		const dataSource = new FakeLearningPathDataSource({ learningPathResponse: readFixture("learning-path-response.json"), learningSessionResponse: readFixture("learning-session-response.json"), submitSessionResponse: readFixture("submit-session-response.json") });
		const repository = new LearningPathRepository(dataSource);

		await repository.getLearningPath({ subjectId: "in2120", language: "no" });
		await repository.submitLearningSession({ sessionId: "session-1", answers: [] });
		await repository.getLearningPath({ subjectId: "in2120", language: "no" });

		expect(dataSource.calls.filter((call) => call.method === "fetchLearningPath")).toHaveLength(2);
	});

	test("does not clear cached LearningPath responses when only reading a LearningSession", async () => {
		const dataSource = new FakeLearningPathDataSource({ learningPathResponse: readFixture("learning-path-response.json"), learningSessionResponse: readFixture("learning-session-response.json"), submitSessionResponse: readFixture("submit-session-response.json") });
		const repository = new LearningPathRepository(dataSource);

		await repository.getLearningPath({ subjectId: "in2120", language: "no" });
		await repository.getLearningSession("session-1");
		await repository.getLearningPath({ subjectId: "in2120", language: "no" });

		expect(dataSource.calls.filter((call) => call.method === "fetchLearningPath")).toHaveLength(1);
	});

	test("clears cached LearningPath responses when authenticated user state is reset", async () => {
		const dataSource = new FakeLearningPathDataSource({ learningPathResponse: readFixture("learning-path-response.json"), learningSessionResponse: readFixture("learning-session-response.json"), submitSessionResponse: readFixture("submit-session-response.json") });
		const repository = new LearningPathRepository(dataSource);

		await repository.getLearningPath({ subjectId: "in2120", language: "no" });
		repository.clearUserState();
		await repository.getLearningPath({ subjectId: "in2120", language: "no" });

		expect(dataSource.calls.filter((call) => call.method === "fetchLearningPath")).toHaveLength(2);
	});
});
