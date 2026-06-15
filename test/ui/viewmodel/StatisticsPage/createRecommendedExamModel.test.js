// test/ui/viewmodel/StatisticsPage/createRecommendedExamModel.test.js
import { describe, expect, test } from "@jest/globals";
import { createRecommendedExamModel } from "../../../../src/ui/viewmodel/StatisticsPage/createRecommendedExamModel.js";

const text = {
	recommendedTitle: "Mest å hente nå",
	recommendedBody: "Denne eksamenen hadde lavest score sist.",
	recommendedBadge: "Anbefalt",
	createAttemptFallbackTitle(examId) {
		return `Eksamen ${examId}`;
	}
};

describe("createRecommendedExamModel", () => {
	test("returns null when recentAttempts is missing", () => {
		expect(createRecommendedExamModel(undefined, text)).toBeNull();
	});

	test("returns null when recentAttempts is empty", () => {
		expect(createRecommendedExamModel([], text)).toBeNull();
	});

	test("ignores attempts without percentage", () => {
		const result = createRecommendedExamModel([
			{ id: "a1", examId: "exam-1", examTitle: "Eksamen 1", percentage: null },
			{ id: "a2", examId: "exam-2", examTitle: "Eksamen 2", percentage: undefined }
		], text);

		expect(result).toBeNull();
	});

	test("selects the lowest scoring attempt", () => {
		const result = createRecommendedExamModel([
			{ id: "a1", examId: "exam-1", examTitle: "Eksamen 1", percentage: 82 },
			{ id: "a2", examId: "exam-2", examTitle: "Eksamen 2", percentage: 64 },
			{ id: "a3", examId: "exam-3", examTitle: "Eksamen 3", percentage: 91 }
		], text);

		expect(result).toEqual({
			examId: "exam-2",
			title: "Eksamen 2",
			body: "Denne eksamenen hadde lavest score sist.",
			badgeLabel: "Anbefalt"
		});
	});

	test("uses fallback title when examTitle is missing", () => {
		const result = createRecommendedExamModel([
			{ id: "a1", examId: "exam-1", percentage: 72 }
		], text);

		expect(result.title).toBe("Eksamen exam-1");
	});
});
