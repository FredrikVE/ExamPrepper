// src/ui/view/pages/ExamPage.jsx
import Header from "../components/Header/Header.jsx";
import QuestionCard from "../components/ExamPage/QuestionCard.jsx";
import Footer from "../components/Footer/Footer.jsx";
import { useLanguage } from "../../../i18n/LanguageContext.jsx";

export default function ExamPage({ viewModel, onBack }) {
	const { t } = useLanguage();

	if (viewModel.loading) {
		return (
			<div className="exam-page-state">
				<p className="exam-page-loading-message">
					{t.loadingMessage}
				</p>
			</div>
		);
	}

	if (viewModel.error) {
		return (
			<div className="exam-page-state">
				<p className="exam-page-error-message">
					{t.errorPrefix}: {viewModel.error}
				</p>
			</div>
		);
	}

	const pageContent = getPageContent(viewModel, t);

	return (
		<div className="exam-page">
			<Header viewModel={viewModel} onBack={onBack} />

			<main className="exam-page-main">
				<div className="exam-page-content">
					{pageContent}
				</div>
			</main>

			<Footer viewModel={viewModel} />
		</div>
	);
}

function getPageContent(viewModel, t) {
	if (!viewModel.currentQuestion) {
		return (
			<div className="exam-page-empty">
				{t.emptyMessage}
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