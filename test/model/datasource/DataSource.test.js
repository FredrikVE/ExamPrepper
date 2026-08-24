// test/model/datasource/DataSource.test.js
import { afterEach, describe, expect, jest, test } from "@jest/globals";
import DataSource from "../../../src/model/datasource/DataSource.js";

afterEach(() => jest.restoreAllMocks());

describe("DataSource HTTP payload handling", () => {
	test("preserves the HTTP error when an error response is not JSON", async () => {
		jest.spyOn(globalThis, "fetch").mockResolvedValue({
			ok: false,
			status: 502,
			text: async () => "<html>Bad Gateway</html>"
		});

		const dataSource = new DataSource({ baseUrl: "https://example.test" });

		await expect(dataSource.get("/health")).rejects.toMatchObject({
			message: "API request failed: 502",
			status: 502,
			code: null,
			payload: null
		});
	});

	test("still rejects invalid JSON from a successful response", async () => {
		jest.spyOn(globalThis, "fetch").mockResolvedValue({
			ok: true,
			status: 200,
			text: async () => "not-json"
		});

		const dataSource = new DataSource({ baseUrl: "https://example.test" });

		await expect(dataSource.get("/health")).rejects.toBeInstanceOf(SyntaxError);
	});
});
