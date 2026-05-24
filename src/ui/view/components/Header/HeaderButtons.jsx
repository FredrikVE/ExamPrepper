//src/ui/view/components/Header/HeaderButtons.jsx
import SubmittedActions from "./SubmittedActions.jsx";
import { useLanguage } from "../../../../i18n/LanguageContext.jsx";

export default function HeaderButtons({ viewModel }) {
	const { t } = useLanguage();

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
			{t.headerSubmitButton}
		</button>
	);
}
