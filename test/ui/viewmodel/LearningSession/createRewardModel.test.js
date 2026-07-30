//test/ui/viewmodel/LearningSession/createRewardModel.test.js
import { describe, expect, test } from "@jest/globals";
import createRewardModel from "../../../../src/ui/viewmodel/LearningSession/createRewardModel.js";

const t = {
	learningSessionRewardTitle: "Three in a row!",
	learningSessionRewardBody: "You are in the flow right now.",
	learningSessionRewardCloseLabel: "Close reward",
	learningSessionRewardStatsLabel: "Reward statistics",
	learningSessionRewardComboLabel: "in a row",
	learningSessionRewardXpLabel: "total XP",
	learningSessionRewardDismissLabel: "Continue"
};

describe("createRewardModel", () => {
	test("returns null without a pending reward", () => {
		expect(createRewardModel({ pendingRewardKind: null, combo: 0, xp: 0, t, onContinue: () => {} })).toBeNull();
	});

	test("presents the current combo and earned XP", () => {
		const onContinue = () => {};
		const model = createRewardModel({ pendingRewardKind: "combo", combo: 3, xp: 40, t, onContinue });

		expect(model).toEqual({
			title: "Three in a row!",
			body: "You are in the flow right now.",
			closeLabel: "Close reward",
			statsLabel: "Reward statistics",
			comboValue: "3",
			comboLabel: "in a row",
			xpValue: "40 XP",
			xpLabel: "total XP",
			dismissLabel: "Continue",
			onContinue
		});
	});
});
