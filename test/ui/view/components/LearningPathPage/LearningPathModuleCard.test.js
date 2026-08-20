// test/ui/view/components/LearningPathPage/LearningPathModuleCard.test.js
import fs from "node:fs";
import path from "node:path";
import { describe, expect, test } from "@jest/globals";

const MODULE_CARD_PATH = path.resolve("src/ui/view/components/LearningPathPage/LearningPathModuleCard.jsx");
const MODULE_DETAIL_PATH = path.resolve("src/ui/view/components/LearningPathPage/LearningPathModuleDetail.jsx");

describe("LearningPathModuleCard", () => {
	test("delegates state and accessibility semantics to the ViewModel", () => {
		const source = fs.readFileSync(MODULE_CARD_PATH, "utf8");

		expect(source).toContain("disabled={model.isDisabled}");
		expect(source).toContain("aria-expanded={model.isExpanded}");
		expect(source).toContain('aria-current={model.isCurrentStep ? "step" : undefined}');
		expect(source).toContain("aria-label={model.chevronLabel}");
	});

	test("keeps summary performance compact and moves the progress row into module detail", () => {
		const cardSource = fs.readFileSync(MODULE_CARD_PATH, "utf8");
		const detailSource = fs.readFileSync(MODULE_DETAIL_PATH, "utf8");

		expect(cardSource).toContain('import LearningPathMasteryRing from "./LearningPathMasteryRing.jsx";');
		expect(cardSource).toContain("{model.progressSummaryLabel}");
		expect(cardSource).toContain("<LearningPathMasteryRing model={model.masteryRingModel} />");
		expect(cardSource).not.toContain("LearningPathProgressRow");
		expect(detailSource).toContain('import LearningPathProgressRow from "./LearningPathProgressRow.jsx";');
		expect(detailSource).toContain("<LearningPathProgressRow model={model.progressModel} />");
		expect(detailSource).toContain("{model.sectionsHeading}");
	});
});
