import { describe, expect, test } from "@jest/globals";
import {
	RADIO_GRID_OPTION_STATES,
	createRadioButtonGridViewState
} from "../../../../../../../../src/ui/view/components/ExamPage/QuestionCard/QuestionTypes/RadioButtonGrid/radioButtonGridViewState.js";

const t = {
	radioButtonGridTableLabel: "Radio grid",
	radioButtonGridStatementHeader: "Utsagn",
	radioButtonGridCorrectAnswer: "Riktig svar"
};

const question = {
	id: "q13",
	columns: [
		{ id: "symmetric", label: "Symmetrisk", position: 1 },
		{ id: "hash", label: "Hash", position: 2 }
	],
	rows: [
		{
			id: "shared-secret",
			text: "Bruker samme hemmelige nøkkel.",
			correctColumnId: "symmetric",
			position: 1
		}
	]
};

describe("createRadioButtonGridViewState", () => {
	test("creates a semantic selected state before feedback", () => {
		const viewState = createRadioButtonGridViewState({
			question,
			answer: { "shared-secret": "hash" },
			answerOptionOrder: null,
			submitted: false,
			showAllFeedback: false,
			t
		});

		const [row] = viewState.rows;
		const selectedOption = row.options.find((option) => option.id === "hash");

		expect(row.result).toBe("answered");
		expect(row.showCorrectAnswer).toBe(false);
		expect(selectedOption.visualState).toBe(RADIO_GRID_OPTION_STATES.SELECTED);
	});

	test("marks selected wrong and correct answer hint in feedback mode", () => {
		const viewState = createRadioButtonGridViewState({
			question,
			answer: { "shared-secret": "hash" },
			answerOptionOrder: null,
			submitted: true,
			showAllFeedback: true,
			t
		});

		const [row] = viewState.rows;
		const wrongSelectedOption = row.options.find((option) => option.id === "hash");
		const correctHintOption = row.options.find((option) => option.id === "symmetric");

		expect(row.result).toBe("wrong");
		expect(row.showCorrectAnswer).toBe(true);
		expect(row.correctAnswerText).toBe("Riktig svar: Symmetrisk");
		expect(wrongSelectedOption.visualState).toBe(RADIO_GRID_OPTION_STATES.SELECTED_WRONG);
		expect(correctHintOption.visualState).toBe(RADIO_GRID_OPTION_STATES.CORRECT_ANSWER_HINT);
	});

	test("marks selected correct in feedback mode", () => {
		const viewState = createRadioButtonGridViewState({
			question,
			answer: { "shared-secret": "symmetric" },
			answerOptionOrder: null,
			submitted: true,
			showAllFeedback: true,
			t
		});

		const [row] = viewState.rows;
		const selectedOption = row.options.find((option) => option.id === "symmetric");

		expect(row.result).toBe("correct");
		expect(row.showCorrectAnswer).toBe(false);
		expect(selectedOption.visualState).toBe(RADIO_GRID_OPTION_STATES.SELECTED_CORRECT);
	});
});
