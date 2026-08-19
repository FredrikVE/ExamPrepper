// test/ui/viewmodel/LearningPath/createLearningPathProgressModel.test.js
import { describe, expect, test } from "@jest/globals";
import createLearningPathProgressModel from "../../../../src/ui/viewmodel/LearningPath/createLearningPathProgressModel.js";

const t = { learningPathPerformanceTitle: "Result", learningPathPerformanceNotAssessedLabel: "Not assessed" };

describe("createLearningPathProgressModel", () => {
	test("presents backend performance without classifying it locally", () => {
		expect(createLearningPathProgressModel({ performancePercent: 67.5, performanceBand: "progress", t })).toEqual({
			percentage: 67.5, displayPercentage: 68, displayValue: "68%", appearance: "progress", label: "Result", accessibleLabel: "Result: 68%"
		});
	});

	test("presents not-assessed without turning null into zero", () => {
		const model = createLearningPathProgressModel({ performancePercent: null, performanceBand: "not-assessed", t });
		expect(model).toMatchObject({ displayPercentage: null, displayValue: "Not assessed", appearance: "not-assessed" });
	});
});
