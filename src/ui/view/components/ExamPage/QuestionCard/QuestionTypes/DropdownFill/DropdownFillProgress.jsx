// src/ui/view/components/ExamPage/QuestionCard/QuestionTypes/DropdownFill/DropdownFillProgress.jsx
import { getDropdownFillStats } from "./dropdownFillUtils.js";

export default function DropdownFillProgress({ question, answer, submitted, showAllFeedback, t }) {
	if (!submitted || !showAllFeedback) {
		return null;
	}

	const stats = getDropdownFillStats(question, answer);

	return (
		<div className="dropdown-fill-progress" aria-label={t.dropdownFillProgressLabel}>
			<span>{t.dropdownFillCorrectShort}: {stats.correct}</span>
			<span>{t.dropdownFillWrongShort}: {stats.wrong}</span>
			<span>{t.dropdownFillUnansweredShort}: {stats.unanswered}</span>
		</div>
	);
}
