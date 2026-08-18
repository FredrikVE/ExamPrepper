import { describe, expect, jest, test } from "@jest/globals";
import createSessionResultModel from "../../../../src/ui/viewmodel/LearningSession/createSessionResultModel.js";
const t = {
	learningSessionResultEyebrow: "Session completed",
	learningSessionResultPerfectTitle: "All correct!",
	learningSessionResultStrongTitle: "Great work!",
	learningSessionResultMediumTitle: "Session completed",
	learningSessionResultWeakTitle: "Almost there",
	learningSessionResultPerfectBody: (title) => `perfect:${title}`,
	learningSessionResultStrongBody: (title) => `strong:${title}`,
	learningSessionResultMediumBody: (title) => `medium:${title}`,
	learningSessionResultWeakBody: (title) => `weak:${title}`,
	learningSessionResultStatsLabel: "Session result",
	learningSessionResultPointsLabel: "points",
	learningSessionResultScoreLabel: "score",
	learningSessionResultNextStepLabel: "Next",
	learningSessionResultContinuePathBody: "Back to path",
	learningSessionResultContinuePathLabel: "Continue path"
};

describe("createSessionResultModel", () => {
	test("shows session score and returns to the learning path", () => {
		const onBack = jest.fn();
		const model = createSessionResultModel({ score: { earnedPoints: 9, availablePoints: 12, percentage: 75 }, moduleTitle: "Protocols", t, onBack });
		expect(model).toMatchObject({ appearance: "medium", pointsValue: "9 / 12", scoreValue: "75 %", nextStepBody: "Back to path", primaryLabel: "Continue path", onPrimary: onBack });
		expect(model).not.toHaveProperty("secondaryLabel");
	});
});
