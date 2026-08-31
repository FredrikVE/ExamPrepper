// test/di/dependenciesComposition.test.js
import { afterAll, beforeAll, describe, expect, test } from "@jest/globals";

const PREVIOUS_API_BASE_URL = process.env.VITE_API_BASE_URL;
const PREVIOUS_IMAGE_BASE_URL = process.env.VITE_IMAGE_BASE_URL;

beforeAll(() => {
	process.env.VITE_API_BASE_URL = "https://api.example.test";
	process.env.VITE_IMAGE_BASE_URL = "https://images.example.test";
});

afterAll(() => {
	restoreEnvironmentVariable("VITE_API_BASE_URL", PREVIOUS_API_BASE_URL);
	restoreEnvironmentVariable("VITE_IMAGE_BASE_URL", PREVIOUS_IMAGE_BASE_URL);
});

describe("dependency composition", () => {
	test("wires the application root without constructor contract errors", async () => {
		const dependencies = await import("../../src/di/dependencies.js");

		expect(dependencies.getAvailableSubjectsUseCase).toBeDefined();
		expect(dependencies.getGlossaryOverviewUseCase).toBeDefined();
		expect(dependencies.getLearningPathUseCase).toBeDefined();
		expect(dependencies.submitExamAttemptUseCase).toBeDefined();
		expect(dependencies.recordFlipcardAssessmentUseCase).toBeDefined();
		expect(dependencies.recordMatchCardResultUseCase).toBeDefined();
	});
});

function restoreEnvironmentVariable(name, value) {
	if (value === undefined) {
		delete process.env[name];
		return;
	}

	process.env[name] = value;
}
