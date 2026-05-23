// src/ui/view/pages/ExamPage.jsx
import Header from "../components/Header/Header.jsx";
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

	const pageContent = getPageContent(viewModel);

	return (
		<div className="exam-page">
			<Header viewModel={viewModel} />

			<main className="exam-page-main">
				<div className="exam-page-content">
					{pageContent}
				</div>
			</main>

			<Footer viewModel={viewModel} />
		</div>
	);
}

function getPageContent(viewModel) {
	if (!viewModel.currentQuestion) {
		return (
			<div className="exam-page-empty">
				Ingen spørsmål funnet...
			</div>
		);
	}

	return (
		<QuestionCard
			question={viewModel.currentQuestion}
			answer={viewModel.answers[viewModel.currentQuestion.id]}
			submitted={viewModel.submitted}
			showAllFeedback={viewModel.showAllFeedback}
			correct={viewModel.currentQuestionIsCorrect}
			onSingleAnswer={viewModel.setSingleAnswer}
			onToggleMultiAnswer={viewModel.toggleMultiAnswer}
		/>
	);
}