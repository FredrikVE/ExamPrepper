//test/contracts/learningPathContract.test.js
import fs from "node:fs";
import path from "node:path";
import { describe, expect, test } from "@jest/globals";

const FIXTURE_DIRECTORY = path.resolve("test/fixtures/learning-path");
const LEARNING_PATH_RESPONSE_PATH = path.join(FIXTURE_DIRECTORY, "learning-path-response.json");
const START_SESSION_COMMAND_PATH = path.join(FIXTURE_DIRECTORY, "start-session-command.json");
const LEARNING_SESSION_RESPONSE_PATH = path.join(FIXTURE_DIRECTORY, "learning-session-response.json");
const SUBMIT_SESSION_RESPONSE_PATH = path.join(FIXTURE_DIRECTORY, "submit-session-response.json");
const FIXTURE_README_PATH = path.join(FIXTURE_DIRECTORY, "README.md");

function readJson(filePath) {
	return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function findQuestionsByQuestionKey(sessionResponse, questionKey) {
	const matchingQuestions = [];

	for (const sessionQuestion of sessionResponse.questions) {
		if (sessionQuestion.question.id === questionKey) {
			matchingQuestions.push(sessionQuestion);
		}
	}

	return matchingQuestions;
}

describe("LearningPath P04 transport contract", () => {
	test("checks in the four representative transport fixtures", () => {
		const learningPathResponse = readJson(LEARNING_PATH_RESPONSE_PATH);
		const startSessionCommand = readJson(START_SESSION_COMMAND_PATH);
		const learningSessionResponse = readJson(LEARNING_SESSION_RESPONSE_PATH);
		const submitSessionResponse = readJson(SUBMIT_SESSION_RESPONSE_PATH);

		expect(learningPathResponse.subjectId).toBe("in2120");
		expect(learningPathResponse.modules).toHaveLength(1);
		expect(startSessionCommand).toEqual({
			subjectId: "in2120",
			moduleId: "11111111-1111-4111-8111-111111111111",
			lang: "no",
			round: 2
		});
		expect(learningSessionResponse.questionCount).toBe(learningSessionResponse.questions.length);
		expect(submitSessionResponse.status).toBe("completed");
		expect(submitSessionResponse.score).toEqual({
			earnedPoints: 8.5,
			availablePoints: 13,
			percentage: 65.38
		});
	});

	test("locks the four P04 endpoint shapes", () => {
		const contractReadme = fs.readFileSync(FIXTURE_README_PATH, "utf8");

		expect(contractReadme).toContain("GET  /api/subjects/:subjectId/learning-path?lang=:language");
		expect(contractReadme).toContain("POST /api/learning-sessions");
		expect(contractReadme).toContain("GET  /api/learning-sessions/:sessionId");
		expect(contractReadme).toContain("POST /api/learning-sessions/:sessionId/submit");
	});

	test("uses distinct sessionQuestionId values for the same questionKey from different exams", () => {
		const sessionResponse = readJson(LEARNING_SESSION_RESPONSE_PATH);
		const sharedQuestionEntries = findQuestionsByQuestionKey(sessionResponse, "shared-question");

		expect(sharedQuestionEntries).toHaveLength(2);
		expect(sharedQuestionEntries[0].question.examId).not.toBe(sharedQuestionEntries[1].question.examId);
		expect(sharedQuestionEntries[0].sessionQuestionId).not.toBe(sharedQuestionEntries[1].sessionQuestionId);
	});

	test("keeps frontend session state keyed only by sessionQuestionId", () => {
		const sessionResponse = readJson(LEARNING_SESSION_RESPONSE_PATH);
		const answersBySessionQuestionId = {};
		const resultsBySessionQuestionId = {};
		const answerOptionOrderBySessionQuestionId = {};

		for (const sessionQuestion of sessionResponse.questions) {
			const sessionQuestionId = sessionQuestion.sessionQuestionId;
			answersBySessionQuestionId[sessionQuestionId] = null;
			resultsBySessionQuestionId[sessionQuestionId] = null;
			answerOptionOrderBySessionQuestionId[sessionQuestionId] = null;

			expect(Object.keys(sessionQuestion).sort()).toEqual(["position", "question", "sessionQuestionId"]);
			expect(sessionQuestion).not.toHaveProperty("examId");
			expect(sessionQuestion).not.toHaveProperty("questionKey");
		}

		const expectedIds = [];

		for (const sessionQuestion of sessionResponse.questions) {
			expectedIds.push(sessionQuestion.sessionQuestionId);
		}

		expect(Object.keys(answersBySessionQuestionId)).toEqual(expectedIds);
		expect(Object.keys(resultsBySessionQuestionId)).toEqual(expectedIds);
		expect(Object.keys(answerOptionOrderBySessionQuestionId)).toEqual(expectedIds);
	});
});
