// test/contracts/learningPathContract.test.js
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
		const submitCommand = readJson("submit-session-command.json");
		const submit = readJson("submit-session-response.json");

		expect(pathResponse.nextActivity).toMatchObject({ kind: "start-authored-session", planKey: expect.any(String), sectionId: expect.any(String) });
		expect(pathResponse.modules[0].sections[0]).toMatchObject({ sectionKey: "chapter-1", sessions: expect.any(Array), chapterTests: expect.any(Array) });
		expect(pathResponse.modules[0].sections[0].chapterTests).toHaveLength(2);
		expect(startCommand).toEqual({ subjectId: "in2120", moduleId: "11111111-1111-4111-8111-111111111111", lang: "no", target: { kind: "module" }, discardActiveSession: false });
		expect(startCommand).not.toHaveProperty("round");
		expect(session).toMatchObject({ planKey: "authored:v1:chapter-1:step-1:1-6", sectionId: "section-1", matchCardsTask: { pairs: expect.any(Array) } });
		expect(session.matchCardsTask.pairs).toEqual([
			{
				glossaryEntryKey: "glossary-a",
				term: { no: "Begrep A", en: "Concept A" },
				explanation: { no: "Forklaring A", en: "Explanation A" }
			},
			{
				glossaryEntryKey: "glossary-b",
				term: { no: "Begrep B", en: "Concept B" },
				explanation: { no: "Forklaring B", en: "Explanation B" }
			}
		]);
		expect(submitCommand).toEqual({
			matchCardResults: [
				{ glossaryEntryKey: "glossary-a", wrongAttemptCount: 0 },
				{ glossaryEntryKey: "glossary-b", wrongAttemptCount: 1 }
			],
			answers: [
				{ sessionQuestionId: "30000000-0000-4000-8000-000000000001", answer: "a" }
			]
		});
		expect(session).not.toHaveProperty("round");
		expect(submit).toEqual({ sessionId: "22222222-2222-4222-8222-222222222222", status: "completed", score: { earnedPoints: 8.5, availablePoints: 13, percentage: 65.38, performanceBand: "progress" } });
	});

	test("keeps answer identity on sessionQuestionId", () => {
		const session = readJson("learning-session-response.json");
		const ids = session.questions.map((entry) => entry.sessionQuestionId);
		expect(new Set(ids).size).toBe(ids.length);
		for (const entry of session.questions) expect(Object.keys(entry).sort()).toEqual(["position", "question", "sessionQuestionId"]);
	});
});
