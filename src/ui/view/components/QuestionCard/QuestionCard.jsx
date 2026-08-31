// src/ui/view/components/QuestionCard/QuestionCard.jsx
import { useLanguage } from "../../../../i18n/LanguageContext.jsx";
import { getQuestionViewState } from "../../../viewmodel/Utils/questionCardViewState.js";
import FeedbackPanel from "./Shared/Feedback/FeedbackPanel/FeedbackPanel.jsx";
import PromptSection from "./Shared/Prompt/PromptSection.jsx";
import QuestionFeedback from "./Shared/Feedback/QuestionFeedback.jsx";
import QuestionHeader from "./Shared/QuestionHeader/QuestionHeader.jsx";
import QuestionCardContent from "./QuestionCardContent.jsx";

export default function QuestionCard(props) {
	const { question, questionNumber, answer, answerOptionOrder, submitted, showAllFeedback, correct, fillMatchType, expandedAnswerOptionIndexes, onToggleAnswerOptionExpanded, onSingleAnswer, onToggleMultiAnswer, onDropdownFillAnswer, onRadioButtonGridAnswer, onMultipleBlankAnswer } = props;
	const { t } = useLanguage();
	const answerText = String(answer ?? "");

	const viewState = getQuestionViewState({
		question,
		submitted,
		showAllFeedback,
		correct
	});

	const cardClassName = createQuestionCardClassName(viewState.feedbackMode);

	return (
		<section className={cardClassName}>
			<QuestionHeader
				question={question}
				questionNumber={questionNumber}
				submitted={submitted}
				correct={correct}
				t={t}
			/>

			<div className="question-card-body">
				<div className="question-card-divider" />

				{viewState.shouldShowPrompt && (
					<PromptSection
						question={question}
						answerText={answerText}
						submitted={submitted}
						correct={correct}
						hasInlineFillBlank={viewState.hasInlineFillBlank}
						onSingleAnswer={onSingleAnswer}
						t={t}
					/>
				)}

				<QuestionCardContent
					question={question}
					answer={answer}
					answerText={answerText}
					answerOptionOrder={answerOptionOrder}
					submitted={submitted}
					showAllFeedback={showAllFeedback}
					correct={correct}
					hasInlineFillBlank={viewState.hasInlineFillBlank}
					expandedAnswerOptionIndexes={expandedAnswerOptionIndexes}
					onToggleAnswerOptionExpanded={onToggleAnswerOptionExpanded}
					onSingleAnswer={onSingleAnswer}
					onToggleMultiAnswer={onToggleMultiAnswer}
					onDropdownFillAnswer={onDropdownFillAnswer}
					onRadioButtonGridAnswer={onRadioButtonGridAnswer}
					onMultipleBlankAnswer={onMultipleBlankAnswer}
					t={t}
				/>

				<QuestionFeedback
					question={question}
					t={t}
					shouldShowWarning={viewState.shouldShowWarning}
					shouldShowSource={viewState.shouldShowSource}
				/>

				{viewState.shouldShowFillFeedback && (
					<FeedbackPanel
						question={question}
						selected={answer}
						correct={correct}
						fillMatchType={fillMatchType}
					/>
				)}
			</div>
		</section>
	);
}

function createQuestionCardClassName(feedbackMode) {
	if (feedbackMode) {
		return "workspace-card question-card question-card-feedback-mode";
	}

	return "workspace-card question-card";
}
