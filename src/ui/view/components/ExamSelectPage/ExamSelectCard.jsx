// src/ui/view/components/ExamSelectPage/ExamSelectCard.jsx
import { BookOpen, ChevronRight, CircleHelp, Clock3 } from "lucide-react";
import FormattedText from "../Shared/FormattedText.jsx";

const DEFAULT_ESTIMATED_MINUTES = "45–60";

export default function ExamSelectCard({ exam, index, t, onSelectExam }) {
    const modeLabel = exam.modeLabel ?? t.selectPracticeExamLabel(index + 1);
    const estimatedMinutes = exam.estimatedMinutes ?? DEFAULT_ESTIMATED_MINUTES;

    return (
        <button
            type="button"
            onClick={() => onSelectExam(exam.id)}
            className="exam-select-card"
        >
            <div className="exam-select-card-main-row">
                <div className="exam-select-card-icon-wrapper">
                    <BookOpen className="exam-select-card-icon" />
                </div>

                <div className="exam-select-card-copy">
                    <p className="exam-select-card-eyebrow">
                        {modeLabel}
                    </p>

                    <h2 className="exam-select-card-title">
                        {exam.title}
                    </h2>

                    <p className="exam-select-card-description">
                        <FormattedText text={exam.description} />
                    </p>
                </div>
            </div>

            <div className="exam-select-card-footer">
                <div className="exam-select-card-meta">
                    <CircleHelp className="exam-select-card-meta-icon" />
                    <div>
                        <strong>{exam.questionCount}</strong>
                        <span>{t.selectQuestionLabel}</span>
                    </div>
                </div>

                <div className="exam-select-card-footer-divider" aria-hidden="true" />

                <div className="exam-select-card-meta">
                    <Clock3 className="exam-select-card-meta-icon" />
                    <div>
                        <strong>{estimatedMinutes}</strong>
                        <span>{t.selectMinuteLabel}</span>
                    </div>
                </div>

                <span className="exam-select-card-arrow" aria-hidden="true">
                    <ChevronRight className="exam-select-card-arrow-icon" />
                </span>
            </div>
        </button>
    );
}
