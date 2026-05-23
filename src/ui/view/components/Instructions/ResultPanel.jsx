//src/ui/view/components/Instructions/ResultPanel.jsx
import ResultSummary from "./ResultSummary.jsx";
import ResultFilters from "./ResultFilters.jsx";

export default function ResultPanel({ viewModel }) {
	return (
		<div className="exam-instructions-result">
			<div className="exam-instructions-result-layout">
				<ResultSummary
					score={viewModel.score}
					totalPoints={viewModel.totalPoints}
					percentage={viewModel.percentage}
				/>

				<ResultFilters
					activeFilter={viewModel.filter}
					onChangeFilter={viewModel.setFilter}
				/>
			</div>
		</div>
	);
}