//src/ui/view/components/Instructions/ExamInstructions.jsx
import InstructionsText from "./InstructionsText.jsx";
import InstructionsControls from "./InstructionsControls.jsx";
import ResultPanel from "./ResultPanel.jsx";

export default function ExamInstructions({ viewModel }) {
	return (
		<section className="exam-instructions">
			<div className="exam-instructions-layout">
				<InstructionsText />

				<InstructionsControls viewModel={viewModel} />
			</div>

			{viewModel.submitted && (
				<ResultPanel viewModel={viewModel} />
			)}
		</section>
	);
}