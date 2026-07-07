// test/ui/viewmodel/ExamPage/createExamPageCopy.test.js
import { describe, expect, test } from "@jest/globals";
import createExamPageCopy from "../../../../src/ui/viewmodel/ExamPage/createExamPageCopy.js";

describe("createExamPageCopy", () => {
	test("uses ExamPage translations without local fallback strings", () => {
		const copy = createExamPageCopy({
			loadingMessage: "Loading exam",
			errorPrefix: "Error",
			emptyMessage: "No questions",
			examLoadErrorMessage: "Could not load exam",
			examAttemptSavingMessage: "Saving attempt",
			examAttemptSaveErrorMessage: "Could not save attempt",
			examAnsweredLabel: "answered",
			examProgressAriaLabel: "Progress",
			examProgressStartLabel: "Start"
		});

		expect(copy).toEqual({
			loadingMessage: "Loading exam",
			errorPrefix: "Error",
			emptyMessage: "No questions",
			questionsLoadErrorMessage: "Could not load exam",
			attemptSavingMessage: "Saving attempt",
			attemptSaveErrorMessage: "Could not save attempt",
			answeredLabel: "answered",
			examProgressAriaLabel: "Progress",
			examProgressStartLabel: "Start"
		});
	});
});
