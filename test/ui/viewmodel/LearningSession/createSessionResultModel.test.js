//test/ui/viewmodel/LearningSession/createSessionResultModel.test.js
import { describe, expect, test } from "@jest/globals";
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
	learningSessionResultAllRoundsCompleteBody: "All rounds complete",
	learningSessionResultNextRoundBody: (nextRound) => `Next round ${nextRound}`,
	learningSessionResultContinuePathLabel: "Continue path"
};

function createModel({ percentage, completedRounds = 2, nextRound = 3 }) {
	return createSessionResultModel({
		score: { earnedPoints: 9, availablePoints: 12, percentage },
		moduleProgress: { masteryPercent: 88.1, completedRounds, nextRound },
		round: 2,
		moduleTitle: "Protocols",
		t,
		onBack: () => {}
	});
}

describe("createSessionResultModel", () => {
	test.each([
		[100, "strong", "All correct!"],
		[80, "strong", "Great work!"],
		[75, "medium", "Round completed"],
		[54.99, "weak", "Almost there"]
	])("maps %s percent to %s presentation", (percentage, appearance, title) => {
		const model = createModel({ percentage });
		expect(model.appearance).toBe(appearance);
		expect(model.title).toBe(title);
	});

	test("labels score, module mastery and the next round explicitly", () => {
		const model = createModel({ percentage: 75 });
		expect(model.pointsValue).toBe("9 / 12");
		expect(model.pointsLabel).toBe("points this round");
		expect(model.roundScoreValue).toBe("75 %");
		expect(model.roundScoreLabel).toBe("round score");
		expect(model.moduleMasteryValue).toBe("88.1 %");
		expect(model.moduleMasteryLabel).toBe("module mastery");
		expect(model.nextStepBody).toBe("Next round 3");
	});

	test("explains when all three rounds are complete", () => {
		const model = createModel({ percentage: 75, completedRounds: 3, nextRound: 1 });
		expect(model.nextStepBody).toBe("All rounds complete");
	});
});
