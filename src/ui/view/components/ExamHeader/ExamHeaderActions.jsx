//src/ui/view/components/ExamHeader/ExamHeaderActions.jsx
import ExamHeaderStatCard from "./ExamHeaderStatCard.jsx";
import ExamHeaderButtons from "./ExamHeaderButtons.jsx";

export default function ExamHeaderActions({ viewModel }) {
	return (
		<div className="exam-header-actions">
			<ExamHeaderStatCard
				value={viewModel.answeredCountLabel}
				label="besvart"
			/>

			<ExamHeaderStatCard
				value={viewModel.scoreLabel}
				label="score"
			/>

			<ExamHeaderButtons viewModel={viewModel} />
		</div>
	);
}