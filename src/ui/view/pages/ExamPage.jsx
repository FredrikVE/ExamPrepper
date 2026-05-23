// src/ui/view/pages/ExamPage.jsx
import Header from "../components/Header/Header.jsx";
import ExamInstructions from "../components/Instructions/ExamInstructions.jsx";
import QuestionCard from "../components/ExamPage/QuestionCard.jsx";
import Footer from "../components/Footer/Footer.jsx";

export default function ExamPage({ viewModel }) {
	if (viewModel.loading) {
		return (
			<div className="exam-page-state">
				<p className="exam-page-loading-message">
					Laster eksamen...
				</p>
			</div>
		);
	}

	if (viewModel.error) {
		return (
			<div className="exam-page-state">
				<p className="exam-page-error-message">
					Feil: {viewModel.error}
				</p>
			</div>
		);
	}

	return (
		<div className="exam-page">
			<Header viewModel={viewModel} />

			<main className="exam-page-main">
				<div className="exam-page-content">
					<ExamInstructions viewModel={viewModel} />

					{viewModel.currentQuestion ? (
						<QuestionCard
							question={viewModel.currentQuestion}
							answer={viewModel.answers[viewModel.currentQuestion.id]}
							submitted={viewModel.submitted}
							showAllFeedback={viewModel.showAllFeedback}
							correct={
								viewModel.submitted
									? viewModel.isAnswerCorrect(viewModel.currentQuestion)
									: false
							}
							onSingleAnswer={viewModel.setSingleAnswer}
							onToggleMultiAnswer={viewModel.toggleMultiAnswer}
						/>
					) : (
						<div className="exam-page-empty">
							Ingen spørsmål i dette filteret.
						</div>
					)}
				</div>
			</main>

			<Footer viewModel={viewModel} />
		</div>
	);
}