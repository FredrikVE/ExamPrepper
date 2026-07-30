//test/model/datasource/ApiLearningPathDataSource.test.js
import { afterEach, describe, expect, jest, test } from "@jest/globals";
import ApiLearningPathDataSource from "../../../src/model/datasource/ApiLearningPathDataSource.js";

afterEach(() => {
	jest.restoreAllMocks();
});

describe("ApiLearningPathDataSource", () => {
	test("uses the four P04 endpoints", async () => {
		const fetchMock = jest.spyOn(globalThis, "fetch").mockResolvedValue({ ok: true, status: 200, text: async () => "{}" });
		const dataSource = new ApiLearningPathDataSource({ baseUrl: "https://example.test/api", getToken: null });

		await dataSource.getLearningPath({ subjectId: "in2120", language: "no" });
		await dataSource.startLearningSession({ subjectId: "in2120", moduleId: "m1", language: "no", round: 1 });
		await dataSource.getLearningSession("s1");
		await dataSource.submitLearningSession({ sessionId: "s1", answers: [] });

		expect(fetchMock.mock.calls.map((call) => call[0])).toEqual([
			"https://example.test/api/subjects/in2120/learning-path?lang=no",
			"https://example.test/api/learning-sessions",
			"https://example.test/api/learning-sessions/s1",
			"https://example.test/api/learning-sessions/s1/submit"
		]);
	});
});
