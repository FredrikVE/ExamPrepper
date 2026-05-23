// src/ui/view/components/Instructions/InstructionsControls.jsx
import { Eye, EyeOff, RotateCcw } from "lucide-react";

export default function InstructionsControls({ viewModel }) {
	if (viewModel.submitted) {
		return (
			<div className="exam-instructions-actions">
				<ToggleFeedbackButton
					showAllFeedback={viewModel.showAllFeedback}
					label={viewModel.feedbackToggleLabel}
					onToggleFeedback={viewModel.toggleShowAllFeedback}
				/>

				<button
					onClick={viewModel.resetExam}
					className="exam-instructions-button exam-instructions-button-primary"
				>
					<RotateCcw className="exam-instructions-icon" />
					Ny runde
				</button>
			</div>
		);
	}

	return (
		<div className="exam-instructions-actions">
			<button
				onClick={viewModel.submitExam}
				className="exam-instructions-button exam-instructions-button-primary"
			>
				Lever og sjekk
			</button>
		</div>
	);
}

function ToggleFeedbackButton({ showAllFeedback, label, onToggleFeedback }) {
	let icon;

	if (showAllFeedback) {
		icon = <EyeOff className="exam-instructions-icon" />;
	} else {
		icon = <Eye className="exam-instructions-icon" />;
	}

	return (
		<button
			onClick={onToggleFeedback}
			className="exam-instructions-button exam-instructions-button-secondary"
		>
			{icon}
			{label}
		</button>
	);
}