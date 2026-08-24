// test/model/datasource/ConceptImageDataSource.test.js
import { afterEach, describe, expect, jest, test } from "@jest/globals";
import ConceptImageDataSource from "../../../src/model/datasource/ConceptImageDataSource.js";

afterEach(() => jest.restoreAllMocks());

describe("ConceptImageDataSource", () => {
	test("keeps public concept-image requests anonymous", async () => {
		jest.spyOn(globalThis, "fetch").mockResolvedValue({
			ok: true,
			status: 200,
			text: async () => "[]"
		});

		const dataSource = new ConceptImageDataSource({ baseUrl: "https://example.test/api", imageBaseUrl: "https://example.test", getToken: null });

		await dataSource.fetchConceptImageById("image-1", {
			subjectId: "subject-1",
			language: "no"
		});

		expect(globalThis.fetch).toHaveBeenCalledWith(
			"https://example.test/api/subjects/subject-1/concept-images",
			{
				method: "GET",
				headers: {
					Accept: "application/json"
				}
			}
		);
	});
});
