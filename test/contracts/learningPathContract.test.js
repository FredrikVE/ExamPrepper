import fs from "node:fs";
import path from "node:path";
import { describe, expect, test } from "@jest/globals";

const FIXTURE_DIRECTORY = path.resolve("test/fixtures/learning-path");
const readJson = (name) => JSON.parse(fs.readFileSync(path.join(FIXTURE_DIRECTORY, name), "utf8"));

describe("LearningPath authored roadmap transport contract", () => {
	test("keeps progression backend-owned and exposes Module Section Session ChapterTest", () => {
		const pathResponse = readJson("learning-path-response.json");
		const startCommand = readJson("start-session-command.json");
		const session = readJson("learning-session-response.json");
		const submit = readJson("submit-session-response.json");

		expect(pathResponse.nextActivity).toMatchObject({ kind: "start-authored-session", planKey: expect.any(String), sectionId: expect.any(String) });
		expect(pathResponse.modules[0].sections[0]).toMatchObject({ sectionKey: "chapter-1", sessions: expect.any(Array), chapterTests: expect.any(Array) });
		expect(pathResponse.modules[0].sections[0].chapterTests).toHaveLength(2);
		expect(startCommand).toEqual({ subjectId: "in2120", moduleId: "11111111-1111-4111-8111-111111111111", lang: "no" });
		expect(startCommand).not.toHaveProperty("round");
		expect(session).toMatchObject({ activityKind: "authored", planKey: expect.any(String), sectionId: "section-1" });
		expect(session).not.toHaveProperty("round");
		expect(submit).toEqual({ sessionId: "22222222-2222-4222-8222-222222222222", status: "completed", score: { earnedPoints: 8.5, availablePoints: 13, percentage: 65.38 } });
	});

	test("keeps answer identity on sessionQuestionId", () => {
		const session = readJson("learning-session-response.json");
		const ids = session.questions.map((entry) => entry.sessionQuestionId);
		expect(new Set(ids).size).toBe(ids.length);
		for (const entry of session.questions) expect(Object.keys(entry).sort()).toEqual(["position", "question", "sessionQuestionId"]);
	});
});
