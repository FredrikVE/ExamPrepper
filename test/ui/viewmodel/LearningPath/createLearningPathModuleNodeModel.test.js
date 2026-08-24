// test/ui/viewmodel/LearningPath/createLearningPathModuleNodeModel.test.js
import { describe, expect, test } from "@jest/globals";
import createLearningPathModuleNodeModel from "../../../../src/ui/viewmodel/LearningPath/createLearningPathModuleNodeModel.js";

const t = { learningPathPartLabel: (position) => `Part ${position}` };

function moduleWithBand(performanceBand) {
	return { position: 2, progress: { performanceBand } };
}

describe("createLearningPathModuleNodeModel", () => {
	test("shows the module number for the active roadmap node", () => {
		expect(createLearningPathModuleNodeModel({ module: moduleWithBand("not-assessed"), status: { statusKey: "active", appearance: "active", iconKey: "play" }, t })).toEqual({
			appearance: "active", iconKey: null, label: "Part 2", value: 2, isCurrentStep: true
		});
	});

	test.each([
		["understood", "understood", "check"],
		["progress", "progress", "trending"],
		["practice", "practice", "repeat"],
		["not-assessed", "completed", "check"]
	])("presents completed backend band %s as %s", (performanceBand, appearance, iconKey) => {
		const model = createLearningPathModuleNodeModel({ module: moduleWithBand(performanceBand), status: { statusKey: "completed", appearance: "completed", iconKey: "check" }, t });
		expect(model).toEqual({ appearance, iconKey, label: "Part 2", value: 2, isCurrentStep: false });
	});

	test("fails fast for an unknown completed performance band", () => {
		expect(() => createLearningPathModuleNodeModel({ module: moduleWithBand("unknown"), status: { statusKey: "completed", appearance: "completed", iconKey: "check" }, t })).toThrow("Unknown LearningPath performance band 'unknown'");
	});

	test("preserves lifecycle presentation for non-completed non-active modules", () => {
		expect(createLearningPathModuleNodeModel({ module: moduleWithBand("not-assessed"), status: { statusKey: "locked", appearance: "locked", iconKey: "lock" }, t })).toEqual({
			appearance: "locked", iconKey: "lock", label: "Part 2", value: 2, isCurrentStep: false
		});
	});
});
