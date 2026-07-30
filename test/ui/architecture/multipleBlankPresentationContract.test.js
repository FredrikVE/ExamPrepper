//test/ui/architecture/multipleBlankPresentationContract.test.js
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

describe("multiple blank presentation contract", () => {
	test("renders TapToFillMultipleBlank as inline blanks with one shared option bank", () => {
		const source = read("src/ui/view/components/QuestionCard/QuestionTypes/TapToFillMultipleBlank/TapToFillMultipleBlankQuestion.jsx");
		expect(source).toContain('className="tap-multiple-blank__sentences"');
		expect(source).toContain('className="tap-multiple-blank__options"');
		expect(source).toContain("handleBlankPressed");
		expect(source).not.toMatch(/<fieldset|multiple-blank-item|question\.options\.map[\s\S]*question\.items\.map/);
	});

	test("renders WriteToFillMultipleBlank inputs inline between sentence text", () => {
		const source = read("src/ui/view/components/QuestionCard/QuestionTypes/WriteToFillMultipleBlank/WriteToFillMultipleBlankQuestion.jsx");
		expect(source).toMatch(/<span>\{line\.beforeText\}<\/span>[\s\S]*<input[\s\S]*<span>\{line\.afterText\}<\/span>/);
		expect(source).toContain("write-multiple-blank__input");
		expect(source).not.toMatch(/multiple-blank-item|<label/);
	});

	test("keeps the prototype underline treatment and full-width session action", () => {
		const blankCss = read("src/ui/style/QuestionCard/QuestionTypes/multiple-blank.css");
		const sessionCss = read("src/ui/style/LearningSessionPage/learning-session.css");
		expect(blankCss).toContain("border-bottom: 2.5px solid var(--accent)");
		expect(blankCss).not.toContain(".multiple-blank-item");
		const primaryRule = readCssRuleBody(sessionCss, ".learning-session-primary");
		const stageRule = readCssRuleBody(sessionCss, ".learning-session-stage");

		expect(primaryRule).not.toBeNull();
		expect(primaryRule).toMatch(/width:\s*100%/);
		expect(stageRule).not.toBeNull();
		expect(stageRule).not.toContain("background:");
	});
});
