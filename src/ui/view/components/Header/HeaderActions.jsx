//src/ui/view/components/Header/HeaderActions.jsx
import StatCard from "./StatCard.jsx";
import HeaderButtons from "./HeaderButtons.jsx";

export default function ExamHeaderActions({ viewModel }) {
	return (
		<div className="exam-header-actions">
			<StatCard
				value={viewModel.answeredCountLabel}
				label="besvart"
			/>

			<StatCard
				value={viewModel.scoreLabel}
				label="score"
			/>

			<HeaderButtons viewModel={viewModel} />
		</div>
	);
}