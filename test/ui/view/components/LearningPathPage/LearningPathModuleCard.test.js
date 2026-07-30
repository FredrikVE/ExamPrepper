//test/ui/view/components/LearningPathPage/LearningPathModuleCard.test.js
import fs from "node:fs";
import path from "node:path";
import { describe, expect, test } from "@jest/globals";

const MODULE_CARD_PATH = path.resolve("src/ui/view/components/LearningPathPage/LearningPathModuleCard.jsx");

describe("LearningPathModuleCard", () => {
	test("delegates state and accessibility semantics to the ViewModel", () => {
		const source = fs.readFileSync(MODULE_CARD_PATH, "utf8");

		expect(source).toContain("disabled={model.isDisabled}");
		expect(source).toContain("aria-expanded={model.isExpanded}");
		expect(source).toContain('aria-current={model.isCurrentStep ? "step" : undefined}');
		expect(source).toContain("aria-label={model.chevronLabel}");
	});

	test("renders the canonical LearningPath mastery ring", () => {
		const source = fs.readFileSync(MODULE_CARD_PATH, "utf8");

		expect(source).toContain('import LearningPathMasteryRing from "./LearningPathMasteryRing.jsx";');
		expect(source).toContain("<LearningPathMasteryRing model={model.masteryRingModel} />");
	});
});
