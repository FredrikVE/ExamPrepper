//test/ui/LearningPathPage/learningPathScrollAdapter.test.js
import { describe, expect, test } from "@jest/globals";
import { resolveScrollContainer } from "../../../src/ui/view/components/LearningPathPage/useLearningPathScrollAdapter.js";

describe("LearningPath scroll adapter", () => {
	test("resolves the canonical scaffold body", () => {
		const body = { className: "workspace-scaffold-body" };
		const moduleElement = {
			closest: (selector) => selector === ".workspace-scaffold-body" ? body : null
		};

		expect(resolveScrollContainer(moduleElement)).toBe(body);
	});

	test("throws outside the scaffold body", () => {
		const moduleElement = { closest: () => null };

		expect(() => resolveScrollContainer(moduleElement)).toThrow("LearningPath scroll target is not inside WorkspaceScaffold body");
	});
});
