// test/model/datasource/LearningPathDataSource.test.js
import { afterEach, describe, expect, jest, test } from "@jest/globals";
import LearningPathDataSource from "../../../src/model/datasource/LearningPathDataSource.js";

afterEach(() => jest.restoreAllMocks());

describe("LearningPathDataSource", () => {
	test("sends backend-owned targeted start intent and discard flag", async () => {
		const fetchMock = jest.spyOn(globalThis, "fetch").mockResolvedValue({ ok: true, status: 200, text: async () => "{}" });
		const dataSource = new LearningPathDataSource({ baseUrl: "https://example.test/api", getToken: async () => "token" });
		await dataSource.fetchStartLearningSession({ subjectId: "in2120", moduleId: "m1", language: "no", target: { kind: "session", planKey: "plan-2" }, discardActiveSession: true });
		const [, options] = fetchMock.mock.calls[0];
		expect(JSON.parse(options.body)).toEqual({ subjectId: "in2120", moduleId: "m1", lang: "no", target: { kind: "session", planKey: "plan-2" }, discardActiveSession: true });
		expect(options.body).not.toContain("round");
	});

	test("preserves the structured active-session conflict for the ViewModel", async () => {
		jest.spyOn(globalThis, "fetch").mockResolvedValue({
			ok: false,
			status: 409,
			text: async () => JSON.stringify({ error: "learning_session_resume_conflict", message: "Another learning session is already active", activeSessionId: "session-active" })
		});
		const dataSource = new LearningPathDataSource({ baseUrl: "https://example.test/api", getToken: async () => "token" });
		await expect(dataSource.fetchStartLearningSession({ subjectId: "in2120", moduleId: "m1", language: "no", target: { kind: "module" }, discardActiveSession: false })).rejects.toMatchObject({
			status: 409,
			code: "learning_session_resume_conflict",
			payload: { activeSessionId: "session-active" }
		});
	});
});
