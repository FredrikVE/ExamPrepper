//test/ui/viewmodel/LearningSession/createSessionResultModel.test.js
import { describe, expect, jest, test } from "@jest/globals";
import createSessionResultModel from "../../../../src/ui/viewmodel/LearningSession/createSessionResultModel.js";

const t = {
	learningSessionResultEyebrow: (round) => `Round ${round} completed`,
	learningSessionResultPerfectTitle: "All correct!",
	learningSessionResultStrongTitle: "Great work!",
	learningSessionResultMediumTitle: "Round completed",
	learningSessionResultWeakTitle: "Almost there",
	learningSessionResultPerfectBody: (round, moduleTitle) => `Perfect ${round} ${moduleTitle}`,
	learningSessionResultStrongBody: (round, moduleTitle) => `Strong ${round} ${moduleTitle}`,
	learningSessionResultMediumBody: (round, moduleTitle) => `Medium ${round} ${moduleTitle}`,
	learningSessionResultWeakBody: (round, moduleTitle) => `Weak ${round} ${moduleTitle}`,
	learningSessionResultStatsLabel: "Round result",
	learningSessionResultPointsLabel: "points this round",
	learningSessionResultRoundScoreLabel: "round score",
	learningSessionResultModuleMasteryLabel: "module mastery",
	learningSessionResultNextStepLabel: "Next step",
	learningSessionResultAllRoundsCompleteBody: "All rounds complete",
	learningSessionResultNextRoundBody: (nextRound) => `Next round ${nextRound}`,
	learningSessionResultContinueRoundLabel: (nextRound) => `Continue to round ${nextRound}`,
	learningSessionResultStartingRoundLabel: (nextRound) => `Starting round ${nextRound}`,
	learningSessionResultEndSessionLabel: "End session",
	learningSessionResultContinuePathLabel: "Continue path"
};

function createModel(percentage, round, completedRounds, nextRound, isStartingNextRound, nextRoundErrorMessage) {
	return createSessionResultModel({
		score: { earnedPoints: 9, availablePoints: 12, percentage },
		moduleProgress: { masteryPercent: 88.1, completedRounds, nextRound },
		round,
		moduleTitle: "Protocols",
		t,
		onBack: jest.fn(),
		onContinueToNextRound: jest.fn(),
		isStartingNextRound,
		nextRoundErrorMessage
	});
}

describe("createSessionResultModel", () => {
	test.each([
		[100, "strong", "All correct!"],
		[80, "strong", "Great work!"],
		[75, "medium", "Round completed"],
		[54.99, "weak", "Almost there"]
	])("maps %s percent to %s presentation", (percentage, appearance, title) => {
		const model = createModel(percentage, 2, 2, 3, false, null);
		expect(model.appearance).toBe(appearance);
		expect(model.title).toBe(title);
	});

	test("labels score, module mastery and the next round explicitly", () => {
		const model = createModel(75, 2, 2, 3, false, null);
		expect(model.pointsValue).toBe("9 / 12");
		expect(model.pointsLabel).toBe("points this round");
		expect(model.roundScoreValue).toBe("75 %");
		expect(model.roundScoreLabel).toBe("round score");
		expect(model.moduleMasteryValue).toBe("88.1 %");
		expect(model.moduleMasteryLabel).toBe("module mastery");
		expect(model.nextStepLabel).toBe("Next step");
		expect(model.nextStepBody).toBe("Next round 3");
	});

	test("offers an explicit pause choice between ending and continuing to the next round", () => {
		const onBack = jest.fn();
		const onContinueToNextRound = jest.fn();
		const model = createSessionResultModel({
			score: { earnedPoints: 12, availablePoints: 12, percentage: 100 },
			moduleProgress: { masteryPercent: 66.67, completedRounds: 2, nextRound: 3 },
			round: 2,
			moduleTitle: "Protocols",
			t,
			onBack,
			onContinueToNextRound
		});

		expect(model.primaryLabel).toBe("Continue to round 3");
		expect(model.secondaryLabel).toBe("End session");
		expect(model.onPrimary).toBe(onContinueToNextRound);
		expect(model.onSecondary).toBe(onBack);
	});

	test("uses a pending label and exposes start failures without leaving the pause screen", () => {
		const model = createModel(75, 2, 2, 3, true, "temporary");
		expect(model.primaryLabel).toBe("Starting round 3");
		expect(model.isPrimaryDisabled).toBe(true);
		expect(model.isSecondaryDisabled).toBe(true);
		expect(model.actionErrorMessage).toBe("temporary");
	});

	test("returns to the learning path after round three", () => {
		const model = createModel(75, 3, 3, 1, false, null);
		expect(model.nextStepBody).toBe("All rounds complete");
		expect(model.primaryLabel).toBe("Continue path");
		expect(model.secondaryLabel).toBeNull();
	});
});
