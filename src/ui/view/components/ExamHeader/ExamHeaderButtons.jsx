// src/ui/view/components/ExamHeader/ExamHeaderButtons.jsx
import SubmittedExamActions from "./SubmittedExamActions.jsx";

export default function ExamHeaderButtons({ viewModel }) {
	if (viewModel.submitted) {
		return (
			<SubmittedExamActions
				showAllFeedback={viewModel.showAllFeedback}
				onToggleFeedback={viewModel.toggleShowAllFeedback}
				onResetExam={viewModel.resetExam}
			/>
		);
	}

	return (
		<button
			onClick={viewModel.submitExam}
			className="exam-header-button exam-header-button-primary"
		>
			Lever nå
		</button>
	);
}