// src/ui/view/components/QuestionCard/QuestionCardContent.jsx
import { QUESTION_TYPES } from "../../../../constants/QuestionTypes.js";
import FillBlankInputFieldQuestion from "./QuestionTypes/FillBlankInputField/FillBlankInputFieldQuestion.jsx";
import DropdownFillQuestion from "./QuestionTypes/DropdownFill/DropdownFillQuestion.jsx";
import RadioButtonGridQuestion from "./QuestionTypes/RadioButtonGrid/RadioButtonGridQuestion.jsx";
import TapToFillMultipleBlankQuestion from "./QuestionTypes/TapToFillMultipleBlank/TapToFillMultipleBlankQuestion.jsx";
import WriteToFillMultipleBlankQuestion from "./QuestionTypes/WriteToFillMultipleBlank/WriteToFillMultipleBlankQuestion.jsx";
import CategorySortQuestion from "./QuestionTypes/DragDrop/CategorySort/Question/CategorySortQuestion.jsx";
import TableMatchQuestion from "./QuestionTypes/DragDrop/TableMatch/Question/TableMatchQuestion.jsx";
import MatrixPlacementQuestion from "./QuestionTypes/DragDrop/MatrixPlacement/Question/MatrixPlacementQuestion.jsx";
import SequenceOrderQuestion from "./QuestionTypes/DragDrop/SequenceOrder/Question/SequenceOrderQuestion.jsx";
import MultiCheckboxSelectQuestion from "./QuestionTypes/MultiCheckboxSelect/MultiCheckboxSelectQuestion.jsx";
import SingleRadioButtonChoiceQuestion from "./QuestionTypes/SingleRadioButtonChoice/SingleRadioButtonChoiceQuestion.jsx";

export default function QuestionCardContent(props) {
	const { question, answer, answerText, answerOptionOrder, submitted, showAllFeedback, correct, hasInlineFillBlank, expandedAnswerOptionIndexes, onToggleAnswerOptionExpanded, onSingleAnswer, onToggleMultiAnswer, onDropdownFillAnswer, onRadioButtonGridAnswer, onMultipleBlankAnswer, t } = props;

	switch (question.type) {
		case QUESTION_TYPES.SINGLE:
			return (
				<SingleRadioButtonChoiceQuestion
					question={question}
					answer={answer}
					answerOptionOrder={answerOptionOrder}
					submitted={submitted}
					showAllFeedback={showAllFeedback}
					expandedAnswerOptionIndexes={expandedAnswerOptionIndexes}
					onToggleAnswerOptionExpanded={onToggleAnswerOptionExpanded}
					onSingleAnswer={onSingleAnswer}
					onToggleMultiAnswer={onToggleMultiAnswer}
					inputType="radio"
					t={t}
				/>
			);

		case QUESTION_TYPES.MULTI:
			return (
				<MultiCheckboxSelectQuestion
					question={question}
					answer={answer}
					answerOptionOrder={answerOptionOrder}
					submitted={submitted}
					showAllFeedback={showAllFeedback}
					expandedAnswerOptionIndexes={expandedAnswerOptionIndexes}
					onToggleAnswerOptionExpanded={onToggleAnswerOptionExpanded}
					onSingleAnswer={onSingleAnswer}
					onToggleMultiAnswer={onToggleMultiAnswer}
					inputType="checkbox"
					t={t}
				/>
			);

		case QUESTION_TYPES.FILL:
			if (hasInlineFillBlank) {
				return null;
			}

			return (
				<FillBlankInputFieldQuestion
					question={question}
					answerText={answerText}
					submitted={submitted}
					correct={correct}
					onSingleAnswer={onSingleAnswer}
					t={t}
				/>
			);

		case QUESTION_TYPES.DRAG_DROP:
			return (
				<TableMatchQuestion
					question={question}
					answer={answer}
					answerOptionOrder={answerOptionOrder}
					submitted={submitted}
					showAllFeedback={showAllFeedback}
					onSingleAnswer={onSingleAnswer}
					t={t}
				/>
			);

		case QUESTION_TYPES.DRAG_CATEGORIZE:
			return (
				<CategorySortQuestion
					question={question}
					answer={answer}
					answerOptionOrder={answerOptionOrder}
					submitted={submitted}
					showAllFeedback={showAllFeedback}
					onSingleAnswer={onSingleAnswer}
					t={t}
				/>
			);

		case QUESTION_TYPES.MATRIX_PLACEMENT:
			return (
				<MatrixPlacementQuestion
					question={question}
					answer={answer}
					answerOptionOrder={answerOptionOrder}
					submitted={submitted}
					showAllFeedback={showAllFeedback}
					onSingleAnswer={onSingleAnswer}
					t={t}
				/>
			);

		case QUESTION_TYPES.SEQUENCE_ORDER:
			return (
				<SequenceOrderQuestion
					question={question}
					answer={answer}
					answerOptionOrder={answerOptionOrder}
					submitted={submitted}
					showAllFeedback={showAllFeedback}
					onSingleAnswer={onSingleAnswer}
					t={t}
				/>
			);

		case QUESTION_TYPES.DROPDOWN_FILL:
			return (
				<DropdownFillQuestion
					question={question}
					answer={answer}
					answerOptionOrder={answerOptionOrder}
					submitted={submitted}
					showAllFeedback={showAllFeedback}
					onDropdownFillAnswer={onDropdownFillAnswer}
					t={t}
				/>
			);

		case QUESTION_TYPES.RADIO_BUTTON_GRID:
			return (
				<RadioButtonGridQuestion
					question={question}
					answer={answer}
					answerOptionOrder={answerOptionOrder}
					submitted={submitted}
					showAllFeedback={showAllFeedback}
					onRadioButtonGridAnswer={onRadioButtonGridAnswer}
					t={t}
				/>
			);

		case QUESTION_TYPES.TAP_TO_FILL_MULTIPLE_BLANK:
			return (
				<TapToFillMultipleBlankQuestion
					question={question}
					answer={answer}
					submitted={submitted}
					showAllFeedback={showAllFeedback}
					onMultipleBlankAnswer={onMultipleBlankAnswer}
					t={t}
				/>
			);

		case QUESTION_TYPES.WRITE_TO_FILL_MULTIPLE_BLANK:
			return (
				<WriteToFillMultipleBlankQuestion
					question={question}
					answer={answer}
					submitted={submitted}
					onMultipleBlankAnswer={onMultipleBlankAnswer}
					t={t}
				/>
			);

		default:
			return null;
	}
}
