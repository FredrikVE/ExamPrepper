// src/ui/view/components/ExamPage/QuestionCard/QuestionTypes/RadioButtonGrid/RadioButtonGridQuestion.jsx
import RadioGridDesktopTable from "./RadioGridDesktopTable.jsx";
import RadioGridMobileList from "./RadioGridMobileList.jsx";
import { createRadioButtonGridViewState } from "./radioButtonGridViewState.js";

export default function RadioButtonGridQuestion({
	question,
	answer,
	answerOptionOrder,
	submitted,
	showAllFeedback,
	onRadioButtonGridAnswer,
	t
}) {
	const viewState = createRadioButtonGridViewState({
		question,
		answer,
		answerOptionOrder,
		submitted,
		showAllFeedback,
		t
	});

	return (
		<div className="radio-grid-question">
			<RadioGridDesktopTable
				viewState={viewState}
				onRadioButtonGridAnswer={onRadioButtonGridAnswer}
			/>
			<RadioGridMobileList
				viewState={viewState}
				onRadioButtonGridAnswer={onRadioButtonGridAnswer}
			/>
		</div>
	);
}
