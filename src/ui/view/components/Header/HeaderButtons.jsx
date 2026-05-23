//src/ui/view/components/Header/SubmittedActions.jsx
import SubmittedActions from "./SubmittedActions.jsx";

export default function HeaderButtons({ viewModel }) {
	if (viewModel.submitted) {
		return (
			<SubmittedActions
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