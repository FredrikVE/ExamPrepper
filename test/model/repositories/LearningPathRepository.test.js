//test/model/repositories/LearningPathRepository.test.js
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, test } from "@jest/globals";
import LearningPathRepository from "../../../src/model/repositories/LearningPathRepository.js";
import FakeLearningPathDataSource from "../../fakes/FakeLearningPathDataSource.js";

const fixturesDirectory = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../fixtures/learning-path");
const readFixture = (name) => JSON.parse(fs.readFileSync(path.join(fixturesDirectory, name), "utf8"));

function createRepository() {
	return new LearningPathRepository(new FakeLearningPathDataSource({
		learningPathResponse: readFixture("learning-path-response.json"),
		learningSessionResponse: readFixture("learning-session-response.json"),
		submitSessionResponse: readFixture("submit-session-response.json")
	}));
}

describe("LearningPathRepository", () => {
	test("maps all four transport contracts without selection policy", async () => {
		const repository = createRepository();
		const pathModel = await repository.getLearningPath({ subjectId: "in2120", language: "no" });
		const session = await repository.startLearningSession({ subjectId: "in2120", moduleId: pathModel.modules[0].id, language: "no", round: 2 });
		const reloaded = await repository.getLearningSession(session.sessionId);
		const result = await repository.submitLearningSession({ sessionId: session.sessionId, answers: [] });

		expect(pathModel.modules[0].progress.masteryPercent).toBe(67.5);
		expect(session.questions[0].sessionQuestionId).toBeTruthy();
		expect(reloaded.questions).toEqual(session.questions);
		expect(result.score.earnedPoints).toBe(8.5);
	});

	test("rejects a session question without sessionQuestionId", async () => {
		const response = readFixture("learning-session-response.json");
		delete response.questions[0].sessionQuestionId;
		const repository = new LearningPathRepository(new FakeLearningPathDataSource({ learningPathResponse: readFixture("learning-path-response.json"), learningSessionResponse: response, submitSessionResponse: readFixture("submit-session-response.json") }));

		await expect(repository.getLearningSession(response.sessionId)).rejects.toThrow("Invalid learning session response");
	});

	test("maps backend practice options to the canonical QuestionCard shape", async () => {
		const dataSource = { getLearningSession: async () => ({ sessionId: "s", moduleId: "m", round: 1, questionCount: 1, questions: [{ sessionQuestionId: "sq", position: 1, question: { id: "q", type: "single", points: 1, acceptedAnswers: [], options: [{ id: "a", isCorrect: true, feedback: "Riktig" }] } }] }) };
		const repository = new LearningPathRepository(dataSource);
		const session = await repository.getLearningSession("s");
		expect(session.questions[0].question.options[0]).toMatchObject({ correct: true, why: "Riktig" });
	});
});
