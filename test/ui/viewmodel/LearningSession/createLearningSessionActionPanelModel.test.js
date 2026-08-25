// test/ui/viewmodel/LearningSession/createLearningSessionActionPanelModel.test.js
import { describe, expect, jest, test } from "@jest/globals";
import createLearningSessionActionPanelModel from "../../../../src/ui/viewmodel/LearningSession/createLearningSessionActionPanelModel.js";
import { LEARNING_SESSION_STATES } from "../../../../src/ui/viewmodel/LearningSession/LearningSessionStates.js";

const t = {
	learningSessionCorrectTitle: "Correct",
	learningSessionIncorrectTitle: "Incorrect",
	learningSessionRetryLabel: "Retry",
	learningSessionCheckLabel: "Check",
	learningSessionFinishLabel: "Finish",
	learningSessionSubmittingLabel: "Submitting",
	learningSessionContinueLabel: "Continue"
};

function createModel(overrides = {}) {
	return createLearningSessionActionPanelModel({
		currentResult: null,
		isLastQuestion: false,
		answerReady: true,
		sessionStatus: LEARNING_SESSION_STATES.ANSWERING,
		feedbackBody: null,
		checkAnswer: jest.fn(),
		continueSession: jest.fn(),
		submitSession: jest.fn(),
		t,
		...overrides
	});
}

describe("createLearningSessionActionPanelModel", () => {
	test("creates the check action for an active unanswered question", () => {
		const checkAnswer = jest.fn();

		const model = createModel({
			answerReady: false,
			checkAnswer
		});

		expect(model).toMatchObject({
			feedbackAppearance: "neutral",
			feedbackTitle: null,
			primaryLabel: "Check",
			primaryAppearance: "primary",
			isPrimaryDisabled: true,
			onPrimaryPressed: checkAnswer
		});
	});

	test("creates success feedback and finish action for a correct final answer", () => {
		const continueSession = jest.fn();

		const model = createModel({
			currentResult: {
				isCorrect: true
			},
			isLastQuestion: true,
			continueSession
		});

		expect(model).toMatchObject({
			feedbackAppearance: "correct",
			feedbackTitle: "Correct",
			primaryLabel: "Finish",
			primaryAppearance: "success",
			isPrimaryDisabled: false,
			onPrimaryPressed: continueSession
		});
	});

	test("keeps the final action visible and disabled while submit is pending", () => {
		const continueSession = jest.fn();

		const model = createModel({
			currentResult: {
				isCorrect: true
			},
			isLastQuestion: true,
			sessionStatus: LEARNING_SESSION_STATES.SUBMITTING,
			continueSession
		});

		expect(model).toMatchObject({
			feedbackAppearance: "correct",
			primaryLabel: "Submitting",
			isPrimaryDisabled: true,
			onPrimaryPressed: continueSession
		});
	});

	test("creates only the retry action after submit failure", () => {
		const submitSession = jest.fn();

		const model = createModel({
			sessionStatus: LEARNING_SESSION_STATES.SUBMIT_FAILED,
			feedbackBody: "Submit failed",
			submitSession
		});

		expect(model).toMatchObject({
			feedbackAppearance: "neutral",
			feedbackTitle: null,
			feedbackBody: "Submit failed",
			primaryLabel: "Retry",
			isPrimaryDisabled: false,
			onPrimaryPressed: submitSession
		});
	});

	test("lets the result panel own actions after submit succeeds", () => {
		expect(createModel({
			sessionStatus: LEARNING_SESSION_STATES.COMPLETED
		})).toBeNull();
	});
});
