//test/ui/view/components/LearningSessionPage/LearningSessionHeader.test.js
import fs from "node:fs";
import path from "node:path";
import { describe, expect, test } from "@jest/globals";

const SESSION_HEADER_PATH = path.resolve("src/ui/view/components/LearningSessionPage/LearningSessionHeader.jsx");

describe("LearningSessionHeader", () => {
	test("renders module, activity context and question counter from the ViewModel", () => {
		const source = fs.readFileSync(SESSION_HEADER_PATH, "utf8");

		expect(source).toContain("{model.title}");
		expect(source).toContain("{model.contextLabel}");
		expect(source).toContain("{model.counterLabel}");
	});

	test("does not render before the ViewModel has a header model", () => {
		const source = fs.readFileSync(SESSION_HEADER_PATH, "utf8");

		expect(source).toContain("if (model === null) return null;");
	});
});
