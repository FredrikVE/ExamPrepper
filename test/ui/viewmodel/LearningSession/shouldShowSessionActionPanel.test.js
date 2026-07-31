//test/ui/viewmodel/LearningSession/shouldShowSessionActionPanel.test.js
import { describe, expect, test } from "@jest/globals";
import shouldShowSessionActionPanel from "../../../../src/ui/viewmodel/LearningSession/shouldShowSessionActionPanel.js";

describe("shouldShowSessionActionPanel", () => {
	test("keeps the question action visible while a question is active", () => {
		expect(shouldShowSessionActionPanel({ submitResult: null, isSessionComplete: false, submitStatus: "idle" })).toBe(true);
	});

	test("hides the stale question action while the completed round is submitted", () => {
		expect(shouldShowSessionActionPanel({ submitResult: null, isSessionComplete: true, submitStatus: "submitting" })).toBe(false);
	});

	test("restores only the retry action after a submit failure", () => {
		expect(shouldShowSessionActionPanel({ submitResult: null, isSessionComplete: true, submitStatus: "failed" })).toBe(true);
	});

	test("lets the result panel own actions after submit succeeds", () => {
		expect(shouldShowSessionActionPanel({ submitResult: { score: {} }, isSessionComplete: true, submitStatus: "succeeded" })).toBe(false);
	});
});
