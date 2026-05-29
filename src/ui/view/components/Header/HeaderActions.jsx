// src/ui/view/components/Header/HeaderActions.jsx
import { CheckCircle2, Clock3, Star } from "lucide-react";
import StatCard from "./StatCard.jsx";
import HeaderButtons from "./HeaderButtons.jsx";
import { useLanguage } from "../../../../i18n/LanguageContext.jsx";

export default function ExamHeaderActions({ viewModel }) {
    const { t } = useLanguage();
    const total = Math.max(viewModel.visibleQuestions.length, 1);
    const answeredPercent = Math.round((viewModel.answeredCount / total) * 100);

    return (
        <div className="exam-header-actions">
            <StatCard
                value={`${answeredPercent}%`}
                label={t.headerStatAnswered}
                icon={<CheckCircle2 />}
            />

            <StatCard
                value={viewModel.scoreLabel}
                label={t.headerStatScore}
                icon={<Star />}
            />

            <StatCard
                value={viewModel.elapsedTimeLabel}
                label={t.headerStatTime}
                icon={<Clock3 />}
            />

            <HeaderButtons viewModel={viewModel} />
        </div>
    );
}
