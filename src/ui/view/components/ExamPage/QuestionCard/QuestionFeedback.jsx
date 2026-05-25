// src/ui/view/components/ExamPage/QuestionCard/QuestionFeedback.jsx
import { AlertTriangle, BookOpen } from "lucide-react";

export default function QuestionFeedback({ question, t, shouldShowWarning, shouldShowSource }) {
    return (
        <>
            {shouldShowWarning ? <QuestionWarning t={t} /> : null}
            {shouldShowSource ? <QuestionSourcePanel source={question.source} t={t} /> : null}
        </>
    );
}

function QuestionWarning({ t }) {
    return (
        <div className="question-card-warning">
            <AlertTriangle className="question-card-warning-icon" />

            <div>
                <div className="question-card-warning-title">
                    {t.questionWrongTitle}
                </div>

                <p>{t.questionWrongHint}</p>
            </div>
        </div>
    );
}

function QuestionSourcePanel({ source, t }) {
    return (
        <div className="feedback-panel question-card-source-panel">
            <div className="feedback-panel-source">
                <div className="feedback-panel-source-title">
                    <BookOpen className="feedback-panel-source-icon" />
                    {t.feedbackSourceTitle}
                </div>

                <p className="feedback-panel-source-text">
                    {source}
                </p>
            </div>
        </div>
    );
}
