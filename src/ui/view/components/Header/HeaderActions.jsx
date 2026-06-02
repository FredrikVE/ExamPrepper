// src/ui/view/components/Header/HeaderActions.jsx
import { CheckCircle2, Clock3, Star } from "lucide-react";
import StatCard from "./StatCard.jsx";
import HeaderButtons from "./HeaderButtons.jsx";
import { useLanguage } from "../../../../i18n/LanguageContext.jsx";

export default function ExamHeaderActions({ visibleQuestionCount, answeredCount, scoreLabel, elapsedTimeLabel, submitted, onSubmitExam, onResetExam }) {
    const { t } = useLanguage();
    const total = Math.max(visibleQuestionCount, 1);
    const answeredPercent = Math.round((answeredCount / total) * 100);

    return (
        <div className="exam-header-actions">
            <StatCard
                value={`${answeredPercent}%`}
                label={t.headerStatAnswered}
                icon={<CheckCircle2 />}
            />

            <StatCard
                value={scoreLabel}
                label={t.headerStatScore}
                icon={<Star />}
            />

            <StatCard
                value={elapsedTimeLabel}
                label={t.headerStatTime}
                icon={<Clock3 />}
            />

            <HeaderButtons
                submitted={submitted}
                onSubmitExam={onSubmitExam}
                onResetExam={onResetExam}
            />
        </div>
    );
}
