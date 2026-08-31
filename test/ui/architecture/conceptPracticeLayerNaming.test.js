// test/ui/architecture/conceptPracticeLayerNaming.test.js
import { describe, expect, test } from "@jest/globals";
import ConceptPracticeDataSource from "../../../src/model/datasource/ConceptPracticeDataSource.js";
import ConceptPracticeRepository from "../../../src/model/repositories/ConceptPracticeRepository.js";

describe("Concept Practice layer naming", () => {
	test("pairs fetch-prefixed DataSource methods with matching get-prefixed Repository methods", () => {
		const dataSourceMethods = [
			"fetchRecordFlipcardAssessment",
			"fetchRecordMatchCardResult"
		];
		const repositoryMethods = [
			"getRecordFlipcardAssessment",
			"getRecordMatchCardResult"
		];

		for (const dataSourceMethod of dataSourceMethods) {
			expect(typeof ConceptPracticeDataSource.prototype[dataSourceMethod]).toBe("function");
			expect(typeof ConceptPracticeRepository.prototype[`get${dataSourceMethod.slice("fetch".length)}`]).toBe("function");
		}

		expect(repositoryMethods).toEqual(dataSourceMethods.map((methodName) => `get${methodName.slice("fetch".length)}`));
	});
});
