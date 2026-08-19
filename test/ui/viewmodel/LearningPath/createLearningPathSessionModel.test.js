// test/ui/viewmodel/LearningPath/createLearningPathSessionModel.test.js
import { describe, expect, test } from "@jest/globals";
import createLearningPathSessionModel from "../../../../src/ui/viewmodel/LearningPath/createLearningPathSessionModel.js";

const t = {
	learningPathSessionLabel: (position) => `Session ${position}`,
	learningPathSessionQuestionCount: (count) => `${count} questions`,
	learningPathSessionCompletedLabel: "Completed",
	learningPathSessionCurrentLabel: "Next",
	learningPathSessionAvailableLabel: "Ready",
	learningPathStatusLocked: "Locked",
	learningPathSessionScoreLabel: (position, percentage) => `Session ${position}: ${percentage}% result`,
	learningPathSessionNotAssessedScoreLabel: (position) => `Session ${position}: not assessed`
};

function session(overrides = {}) {
	return { planKey: "plan-1", position: 1, questionCount: 6, status: "completed", performancePercent: 65.38, performanceBand: "progress", ...overrides };
}

describe("createLearningPathSessionModel", () => {
	test("uses a score donut model for a completed assessed session", () => {
		expect(createLearningPathSessionModel({ session: session(), t })).toMatchObject({ iconKey: "score", scoreModel: { percentage: 65.38, displayValue: "65%", appearance: "progress" } });
	});

	test("uses a check only for an exact raw 100 percent", () => {
		expect(createLearningPathSessionModel({ session: session({ performancePercent: 100, performanceBand: "understood" }), t }).iconKey).toBe("check");
		const rounded = createLearningPathSessionModel({ session: session({ performancePercent: 99.6, performanceBand: "understood" }), t });
		expect(rounded).toMatchObject({ iconKey: "score", scoreModel: { displayValue: "100%" } });
	});

	test("keeps current and locked sessions as non-interactive roadmap icons", () => {
		expect(createLearningPathSessionModel({ session: session({ status: "current", performancePercent: null, performanceBand: "not-assessed" }), t }).iconKey).toBe("play");
		expect(createLearningPathSessionModel({ session: session({ status: "locked", performancePercent: null, performanceBand: "not-assessed" }), t }).iconKey).toBe("lock");
	});
});
