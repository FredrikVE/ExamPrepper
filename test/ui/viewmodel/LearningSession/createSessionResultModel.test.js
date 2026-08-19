// test/ui/viewmodel/LearningSession/createSessionResultModel.test.js
import { describe, expect, jest, test } from "@jest/globals";
import createSessionResultModel from "../../../../src/ui/viewmodel/LearningSession/createSessionResultModel.js";

const t = {
	learningSessionResultEyebrow: "Session completed",
	learningSessionResultPerfectTitle: "All correct!",
	learningSessionResultUnderstoodTitle: "Understood",
	learningSessionResultProgressTitle: "In progress",
	learningSessionResultPracticeTitle: "Practice more",
	learningSessionResultNotAssessedTitle: "Not assessed",
	learningSessionResultPerfectBody: (title) => `perfect:${title}`,
	learningSessionResultUnderstoodBody: (title) => `understood:${title}`,
	learningSessionResultProgressBody: (title) => `progress:${title}`,
	learningSessionResultPracticeBody: (title) => `practice:${title}`,
	learningSessionResultNotAssessedBody: (title) => `not-assessed:${title}`,
	learningSessionResultStatsLabel: "Session result",
	learningSessionResultPointsLabel: "points",
	learningSessionResultScoreLabel: "score",
	learningSessionResultNextStepLabel: "Next",
	learningSessionResultContinuePathBody: "Back to path",
	learningSessionResultContinuePathLabel: "Continue path"
};

function model(score) {
	return createSessionResultModel({ score, moduleTitle: "Protocols", t, onBack: jest.fn() });
}

describe("createSessionResultModel", () => {
	test("uses the backend assessment band instead of local percentage thresholds", () => {
		expect(model({ earnedPoints: 3, availablePoints: 10, percentage: 30, performanceBand: "practice" })).toMatchObject({ appearance: "practice", title: "Practice more", scoreValue: "30 %" });
		expect(model({ earnedPoints: 6, availablePoints: 10, percentage: 60, performanceBand: "progress" })).toMatchObject({ appearance: "progress", title: "In progress", scoreValue: "60 %" });
		expect(model({ earnedPoints: 9, availablePoints: 10, percentage: 90, performanceBand: "understood" })).toMatchObject({ appearance: "understood", title: "Understood", scoreValue: "90 %" });
	});

	test("keeps raw 100 percent as the perfect-result UI policy", () => {
		expect(model({ earnedPoints: 10, availablePoints: 10, percentage: 100, performanceBand: "understood" })).toMatchObject({ appearance: "understood", title: "All correct!", body: "perfect:Protocols" });
	});

	test("renders an explicit not-assessed result without inventing zero percent", () => {
		expect(model({ earnedPoints: 0, availablePoints: 0, percentage: null, performanceBand: "not-assessed" })).toMatchObject({ appearance: "not-assessed", title: "Not assessed", pointsValue: "0 / 0", scoreValue: "—" });
	});
});
