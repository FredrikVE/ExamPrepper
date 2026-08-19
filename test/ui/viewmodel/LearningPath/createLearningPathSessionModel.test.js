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
	learningPathSessionNotAssessedScoreLabel: (position) => `Session ${position}: not assessed`,
	learningPathSessionOpenLabel: (position) => `Start session ${position}`
};

function session(overrides = {}) {
	return { planKey: "plan-1", position: 1, questionCount: 6, status: "completed", performancePercent: 65.38, performanceBand: "progress", isStartable: true, ...overrides };
}

const options = (overrides = {}) => ({ session: session(), moduleId: "module-1", startingModuleId: null, t, ...overrides });

describe("createLearningPathSessionModel", () => {
	test("uses a score donut model for a completed assessed session", () => {
		expect(createLearningPathSessionModel(options())).toMatchObject({ iconKey: "score", scoreModel: { percentage: 65.38, displayValue: "65%", appearance: "progress" } });
	});

	test("uses a check only for an exact raw 100 percent", () => {
		expect(createLearningPathSessionModel(options({ session: session({ performancePercent: 100, performanceBand: "understood" }) })).iconKey).toBe("check");
		const rounded = createLearningPathSessionModel(options({ session: session({ performancePercent: 99.6, performanceBand: "understood" }) }));
		expect(rounded).toMatchObject({ iconKey: "score", scoreModel: { displayValue: "100%" } });
	});

	test("takes selectability directly from backend isStartable", () => {
		const selectable = createLearningPathSessionModel(options());
		expect(selectable).toMatchObject({ isSelectable: true, actionModel: { target: { kind: "session", planKey: "plan-1" } } });
		const locked = createLearningPathSessionModel(options({ session: session({ status: "locked", performancePercent: null, performanceBand: "not-assessed", isStartable: false }) }));
		expect(locked).toMatchObject({ iconKey: "lock", isSelectable: false, actionModel: null });
	});
});
