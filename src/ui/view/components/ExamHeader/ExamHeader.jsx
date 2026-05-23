//src/ui/view/components/ExamHeader/ExamHeader.jsx
import ExamHeaderInfo from "./ExamHeaderInfo.jsx";
import ExamHeaderActions from "./ExamHeaderActions.jsx";

export default function ExamHeader({ viewModel }) {
	return (
		<header className="exam-header">
			<div className="exam-header-container">
				<div className="exam-header-layout">
					<ExamHeaderInfo
						currentQuestionIndex={viewModel.currentQuestionIndex}
						questionCount={viewModel.visibleQuestions.length}
					/>

					<ExamHeaderActions viewModel={viewModel} />
				</div>
			</div>
		</header>
	);
}