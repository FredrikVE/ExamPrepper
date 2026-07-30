//test/ui/architecture/learningSessionRewardPresentation.test.js
import fs from "node:fs";
import path from "node:path";
import { describe, expect, test } from "@jest/globals";

function read(relativePath) {
	return fs.readFileSync(path.resolve(relativePath), "utf8");
}

function readCssRuleBody(css, selector) {
	const escapedSelector = selector.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
	const match = css.match(new RegExp(`${escapedSelector}\\s*\\{([^}]*)\\}`));
	return match?.[1] ?? null;
}

describe("LearningSession reward presentation", () => {
	test("renders a dedicated reward scene with real session statistics", () => {
		const source = read("src/ui/view/components/LearningSessionPage/SessionRewardCard.jsx");
		expect(source).toContain('className="learning-session-reward__burst"');
		expect(source).toContain('className="learning-session-reward__stats"');
		expect(source).toContain('className="learning-session-reward__continue"');
		expect(source).toContain("comboValue");
		expect(source).toContain("xpValue");
		expect(source).toContain("onClick={onContinue}");
		expect(source).toContain("<ArrowRight aria-hidden=\"true\" />");
	});

	test("owns the workspace overlay and a full-width prototype CTA", () => {
		const css = read("src/ui/style/LearningSessionPage/learning-session.css");
		const overlayRule = readCssRuleBody(css, ".learning-session-reward");
		const actionRule = readCssRuleBody(css, ".learning-session-reward__continue");

		expect(overlayRule).not.toBeNull();
		expect(overlayRule).toMatch(/position:\s*absolute/);
		expect(overlayRule).toMatch(/inset:\s*0/);
		expect(overlayRule).toMatch(/place-items:\s*center/);
		expect(actionRule).not.toBeNull();
		expect(actionRule).toMatch(/width:\s*min\(100%,\s*420px\)/);
		expect(actionRule).toMatch(/linear-gradient/);
	});
});
