//src/ui/view/pages/ExamSelectPage.jsx
import { BookOpen, ChevronRight, CircleHelp, Clock3, Trophy } from "lucide-react";
import { useLanguage } from "../../../i18n/LanguageContext.jsx";

const CARD_TITLE_FALLBACKS = ["Full Review", "Deep Dive", "Application Focus"];

export default function ExamSelectPage({ exams, onSelectExam }) {
    const { t } = useLanguage();

    return (
        <main className="exam-select-workspace">
            <div className="exam-select-ambient-light" aria-hidden="true" />

            <div className="exam-select-topbar">
                <p className="exam-select-kicker">
                    {t.selectHeroKicker}
                </p>

                <button type="button" className="exam-select-statistics-button">
                    <Trophy className="exam-select-statistics-icon" />
                    <span>{t.selectStatistics}</span>
                    <ChevronRight className="exam-select-statistics-chevron" />
                </button>
            </div>

            <section className="exam-select-hero" aria-labelledby="exam-select-title">
                <h1 id="exam-select-title" className="exam-select-title">
                    {t.selectHeroTitle}
                </h1>

                <p className="exam-select-subtitle">
                    {t.selectSubtitle}
                </p>
            </section>

            <section className="exam-select-grid" aria-label={t.selectTitle}>
                {exams.map((exam, index) => (
                    <ExamSelectCard
                        key={exam.id}
                        exam={exam}
                        index={index}
                        t={t}
                        onSelectExam={onSelectExam}
                    />
                ))}
            </section>
        </main>
    );
}

function ExamSelectCard({ exam, index, t, onSelectExam }) {
    const isRecommended = index === 0;
    const displayTitle = getDisplayTitle(exam, index);

    return (
        <button
            type="button"
            onClick={() => onSelectExam(exam.id)}
            className={`exam-select-card ${isRecommended ? "exam-select-card-recommended" : ""}`}
        >
            {isRecommended ? (
                <span className="exam-select-recommended-badge">
                    {t.selectRecommended}
                </span>
            ) : null}

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