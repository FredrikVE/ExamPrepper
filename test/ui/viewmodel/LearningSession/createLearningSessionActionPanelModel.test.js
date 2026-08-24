// test/ui/viewmodel/LearningSession/createLearningSessionActionPanelModel.test.js
import { describe, expect, jest, test } from "@jest/globals";
import createLearningSessionActionPanelModel from "../../../../src/ui/viewmodel/LearningSession/createLearningSessionActionPanelModel.js";
import { LEARNING_SESSION_SUBMIT_STATES } from "../../../../src/ui/viewmodel/LearningSession/LearningSessionStates.js";

const t = {
	learningSessionCorrectTitle: "Correct",
	learningSessionIncorrectTitle: "Incorrect",
	learningSessionRetryLabel: "Retry",
	learningSessionCheckLabel: "Check",
	learningSessionFinishLabel: "Finish",
	learningSessionContinueLabel: "Continue"
};

function createModel(overrides = {}) {
	return createLearningSessionActionPanelModel({
		currentResult: null,
		isSessionComplete: false,
		isLastQuestion: false,
		answerReady: true,
		submitStatus: LEARNING_SESSION_SUBMIT_STATES.IDLE,
		submitResult: null,
		submitErrorMessage: null,
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

	test("hides the action panel while a completed session is submitting", () => {
		expect(createModel({
			isSessionComplete: true,
			submitStatus: LEARNING_SESSION_SUBMIT_STATES.SUBMITTING
		})).toBeNull();
	});

	test("creates only the retry action after submit failure", () => {
		const submitSession = jest.fn();

		const model = createModel({
			isSessionComplete: true,
			submitStatus: LEARNING_SESSION_SUBMIT_STATES.FAILED,
			submitErrorMessage: "Submit failed",
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
			isSessionComplete: true,
			submitStatus: LEARNING_SESSION_SUBMIT_STATES.SUCCEEDED,
			submitResult: {
				score: {}
			}
		})).toBeNull();
	});
});
