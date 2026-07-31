//test/ui/viewmodel/QuestionSession/transformLearningSessionAnswersForApi.test.js
import { describe, expect, test } from "@jest/globals";
import transformLearningSessionAnswersForApi from "../../../../src/ui/viewmodel/QuestionSession/transformLearningSessionAnswersForApi.js";

function createSessionQuestion(sessionQuestionId, question) {
	return { sessionQuestionId, position: 1, question };
}

describe("transformLearningSessionAnswersForApi", () => {
	test("converts frontend answer shapes to the backend grading contract", () => {
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
			}),
			createSessionQuestion("session-drag", {
				id: "question-drag",
				type: "dragDrop",
				targets: [{ id: "target-a" }, { id: "target-b" }],
				cards: [{ id: "card-a" }, { id: "card-b" }]
			}),
			createSessionQuestion("session-category", {
				id: "question-category",
				type: "drag-categorize"
			})
		];

		const result = transformLearningSessionAnswersForApi(questions, {
			"session-single": 1,
			"session-multi": [0, 2],
			"session-drag": { "target-a": "card-a", "target-b": "card-b" },
			"session-category": { "category-a": ["item-a", "item-b"], "category-b": ["item-c"] }
		});

		expect(result).toEqual([
			{ sessionQuestionId: "session-single", answer: "single-b" },
			{ sessionQuestionId: "session-multi", answer: ["multi-a", "multi-c"] },
			{ sessionQuestionId: "session-drag", answer: { "card-a": "target-a", "card-b": "target-b" } },
			{ sessionQuestionId: "session-category", answer: { "item-a": "category-a", "item-b": "category-a", "item-c": "category-b" } }
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

	test("passes API-compatible and unknown answers through unchanged", () => {
		const answer = { blankA: "sårbarhet" };
		const questions = [
			createSessionQuestion("session-fill", {
				id: "question-fill",
				type: "writeToFillMultipleBlank",
				options: null
			}),
			createSessionQuestion("session-drag", {
				id: "question-drag",
				type: "dragDrop",
				targets: [{ id: "target-a" }],
				cards: [{ id: "card-a" }]
			})
		];

		const result = transformLearningSessionAnswersForApi(questions, {
			"session-fill": answer,
			"session-drag": { "card-a": "target-a" },
			"unknown-session": "unchanged"
		});

		expect(result).toEqual([
			{ sessionQuestionId: "session-fill", answer },
			{ sessionQuestionId: "session-drag", answer: { "card-a": "target-a" } },
			{ sessionQuestionId: "unknown-session", answer: "unchanged" }
		]);
	});
});
