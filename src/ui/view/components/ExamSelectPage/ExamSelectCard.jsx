// src/ui/view/components/ExamSelectPage/ExamSelectCard.jsx
import { BookOpen, ChevronRight, CircleHelp, Clock3 } from "lucide-react";
import FormattedText from "../Shared/FormattedText.jsx";

const DEFAULT_ESTIMATED_MINUTES = "45–60";

export default function ExamSelectCard({ exam, index, practiceExamLabel, questionLabel, minuteLabel, onSelectExam }) {
    const modeLabel = exam.modeLabel ?? practiceExamLabel(index + 1);
    const estimatedMinutes = exam.estimatedMinutes ?? DEFAULT_ESTIMATED_MINUTES;
    const accentIndex = index % 6 + 1;

    return (
        <button
            type="button"
            onClick={() => onSelectExam(exam.id)}
            className={`exam-select-card exam-select-card-${accentIndex}`}
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
                        <span>{questionLabel}</span>
                    </div>
                </div>

                <div className="exam-select-card-footer-divider" aria-hidden="true" />

                <div className="exam-select-card-meta">
                    <Clock3 className="exam-select-card-meta-icon" />
                    <div>
                        <strong>{estimatedMinutes}</strong>
                        <span>{minuteLabel}</span>
                    </div>
                </div>

                <span className="exam-select-card-arrow" aria-hidden="true">
                    <ChevronRight className="exam-select-card-arrow-icon" />
                </span>
            </div>
        </button>
    );
}
