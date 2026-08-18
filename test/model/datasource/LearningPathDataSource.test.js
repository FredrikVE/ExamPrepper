import { afterEach, describe, expect, jest, test } from "@jest/globals";
import LearningPathDataSource from "../../../src/model/datasource/LearningPathDataSource.js";

afterEach(() => jest.restoreAllMocks());

describe("LearningPathDataSource", () => {
	test("starts a learning session without client-owned progression", async () => {
		const fetchMock = jest.spyOn(globalThis, "fetch").mockResolvedValue({ ok: true, status: 200, text: async () => "{}" });
		const dataSource = new LearningPathDataSource({ baseUrl: "https://example.test/api", getToken: null });
		await dataSource.startLearningSession({ subjectId: "in2120", moduleId: "m1", language: "no" });
		const [, options] = fetchMock.mock.calls[0];
		expect(JSON.parse(options.body)).toEqual({ subjectId: "in2120", moduleId: "m1", lang: "no" });
		expect(options.body).not.toContain("round");
	});
});
