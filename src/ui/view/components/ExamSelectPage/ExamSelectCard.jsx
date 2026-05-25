//src/ui/view/components/ExamSelectPage/ExamSelectCard.jsx
import { BookOpen, ChevronRight, CircleHelp, Clock3 } from "lucide-react";

const CARD_TITLE_FALLBACKS = ["Full Review", "Deep Dive", "Application Focus"];

export default function ExamSelectCard({ exam, index, t, onSelectExam }) {
    const displayTitle = getDisplayTitle(exam, index);

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
                        {t.selectPracticeExamLabel(index + 1)}
                    </p>

                    <h2 className="exam-select-card-title">
                        {displayTitle}
                    </h2>

                    <p className="exam-select-card-description">
                        {exam.description}
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
                        <strong>45-60</strong>
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

function getDisplayTitle(exam, index) {
    if (CARD_TITLE_FALLBACKS[index]) {
        return CARD_TITLE_FALLBACKS[index];
    }

    const parts = exam.title.split(":");
    return parts.length > 1 ? parts.slice(1).join(":").trim() : exam.title;
}