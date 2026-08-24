// test/model/datasource/DataSource.test.js
import { afterEach, describe, expect, jest, test } from "@jest/globals";
import DataSource from "../../../src/model/datasource/DataSource.js";

afterEach(() => jest.restoreAllMocks());

describe("DataSource auth capability", () => {
	test("keeps public requests anonymous when no auth dependency is provided", async () => {
		const fetchMock = jest.spyOn(globalThis, "fetch").mockResolvedValue({
			ok: true,
			status: 200,
			text: async () => "{}"
		});

		const dataSource = new DataSource({ baseUrl: "https://example.test" });

		await dataSource.get("/public");

		expect(fetchMock).toHaveBeenCalledWith("https://example.test/public", {
			method: "GET",
			headers: {
				Accept: "application/json"
			}
		});
	});

	test("rejects null as an auth dependency", () => {
		const createDataSource = () => {
			return new DataSource({
				baseUrl: "https://example.test",
				getToken: null
			});
		};

		expect(createDataSource).toThrow("DataSource getToken must be a function");
	});

	test("adds authorization when an auth dependency returns a token", async () => {
		const fetchMock = jest.spyOn(globalThis, "fetch").mockResolvedValue({
			ok: true,
			status: 200,
			text: async () => "{}"
		});

		const getToken = jest.fn().mockResolvedValue("session-token");
		const dataSource = new DataSource({ baseUrl: "https://example.test", getToken });

		await dataSource.get("/private");

		expect(fetchMock).toHaveBeenCalledWith("https://example.test/private", {
			method: "GET",
			headers: {
				Accept: "application/json",
				Authorization: "Bearer session-token"
			}
		});
	});

	test("keeps an auth-aware request anonymous when no active token exists", async () => {
		const fetchMock = jest.spyOn(globalThis, "fetch").mockResolvedValue({
			ok: true,
			status: 200,
			text: async () => "{}"
		});

		const getToken = jest.fn().mockResolvedValue(undefined);
		const dataSource = new DataSource({ baseUrl: "https://example.test", getToken });

		await dataSource.get("/optional-auth");

		expect(fetchMock).toHaveBeenCalledWith("https://example.test/optional-auth", {
			method: "GET",
			headers: {
				Accept: "application/json"
			}
		});
	});
});

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
			code: undefined,
			payload: undefined
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
