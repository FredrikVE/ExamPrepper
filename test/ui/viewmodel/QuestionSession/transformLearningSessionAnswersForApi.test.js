//test/ui/viewmodel/QuestionSession/transformLearningSessionAnswersForApi.test.js
import { describe, expect, test } from "@jest/globals";
import transformLearningSessionAnswersForApi from "../../../../src/ui/viewmodel/QuestionSession/transformLearningSessionAnswersForApi.js";

function createSessionQuestion(sessionQuestionId, question) {
	return { sessionQuestionId, position: 1, question };
}

describe("transformLearningSessionAnswersForApi", () => {
	test("converts single and multi choice indices to backend option IDs", () => {
		const questions = [
			createSessionQuestion("session-single", {
				id: "question-single",
				type: "single",
				options: [{ id: "single-a" }, { id: "single-b" }]
			}),
			createSessionQuestion("session-multi", {
				id: "question-multi",
				type: "multi",
				options: [{ id: "multi-a" }, { id: "multi-b" }, { id: "multi-c" }]
			})
		];

		const result = transformLearningSessionAnswersForApi(questions, {
			"session-single": 1,
			"session-multi": [0, 2]
		});

		expect(result).toEqual([
			{ sessionQuestionId: "session-single", answer: "single-b" },
			{ sessionQuestionId: "session-multi", answer: ["multi-a", "multi-c"] }
		]);
	});

	test("uses sessionQuestionId even when source question IDs are duplicated", () => {
		const questions = [
			createSessionQuestion("session-a", {
				id: "repeated-question",
				type: "single",
				options: [{ id: "first-a" }, { id: "first-b" }]
			}),
			createSessionQuestion("session-b", {
				id: "repeated-question",
				type: "single",
				options: [{ id: "second-a" }, { id: "second-b" }]
			})
		];

		const result = transformLearningSessionAnswersForApi(questions, {
			"session-a": 0,
			"session-b": 1
		});

		expect(result).toEqual([
			{ sessionQuestionId: "session-a", answer: "first-a" },
			{ sessionQuestionId: "session-b", answer: "second-b" }
		]);
	});

	test("passes non-choice answers and unknown session questions through unchanged", () => {
		const answer = { blankA: "sårbarhet" };
		const questions = [
			createSessionQuestion("session-fill", {
				id: "question-fill",
				type: "writeToFillMultipleBlank",
				options: null
			})
		];

		const result = transformLearningSessionAnswersForApi(questions, {
			"session-fill": answer,
			"unknown-session": "unchanged"
		});

		expect(result).toEqual([
			{ sessionQuestionId: "session-fill", answer },
			{ sessionQuestionId: "unknown-session", answer: "unchanged" }
		]);
	});
});
