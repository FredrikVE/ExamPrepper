// src/ui/view/components/ExamPage/QuestionCard/QuestionTypes/DropdownFill/DropdownFillQuestion.jsx
import DropdownFillItem from "./DropdownFillItem.jsx";
import DropdownFillProgress from "./DropdownFillProgress.jsx";
import { getDropdownFillItems, getDropdownFillOptions } from "./dropdownFillUtils.js";

export default function DropdownFillQuestion({ question, answer, answerOptionOrder, submitted, showAllFeedback, onDropdownFillAnswer, t }) {
	const options = getDropdownFillOptions(question);
	const items = getDropdownFillItems(question, answerOptionOrder);

	return (
		<div className="dropdown-fill-question">
			<div className="dropdown-fill-item-list">
				{items.map((item) => (
					<DropdownFillItem
						key={item.id}
						question={question}
						item={item}
						options={options}
						answer={answer}
						submitted={submitted}
						showAllFeedback={showAllFeedback}
						onDropdownFillAnswer={onDropdownFillAnswer}
						t={t}
					/>
				))}
			</div>

			<DropdownFillProgress
				question={question}
				answer={answer}
				submitted={submitted}
				showAllFeedback={showAllFeedback}
				t={t}
			/>
		</div>
	);
}
