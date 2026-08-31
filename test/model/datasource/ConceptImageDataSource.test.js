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

		const dataSource = new ConceptImageDataSource({
			baseUrl: "https://example.test/api",
			imageBaseUrl: "https://example.test"
		});

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

	test("requires an explicit image base URL", () => {
		const createDataSource = () => {
			return new ConceptImageDataSource({
				baseUrl: "https://example.test/api"
			});
		};

		expect(createDataSource).toThrow("ConceptImageDataSource requires imageBaseUrl");
	});

	test("uses scoped image identity and explicit localization fallback order", async () => {
		jest.spyOn(globalThis, "fetch").mockResolvedValue({
			ok: true,
			status: 200,
			text: async () => JSON.stringify([
				{
					imageId: "image-1",
					moduleId: "module-a",
					groupId: "group-a",
					src: "images/scoped.png",
					alt: {
						no: "Norsk alt",
						en: "English alt"
					},
					title: {
						en: "English title"
					},
					caption: {}
				}
			])
		});

		const dataSource = new ConceptImageDataSource({
			baseUrl: "https://example.test/api",
			imageBaseUrl: "https://images.example.test/"
		});

		const image = await dataSource.fetchConceptImage({
			subjectId: "subject-1",
			moduleId: "module-a",
			groupId: "group-a",
			imageId: "image-1",
			language: "sv"
		});

		expect(image).toEqual({
			id: "image-1",
			src: "https://images.example.test/images/scoped.png",
			alt: "Norsk alt",
			title: "English title",
			caption: undefined
		});
	});
});
