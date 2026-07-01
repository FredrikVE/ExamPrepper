// src/ui/view/components/ExamPage/ExamToolbarActions.jsx
import { CheckCircle2, Clock3, Star } from "lucide-react";
import ExamToolbarStatCard from "./ExamToolbarStatCard.jsx";
import ExamToolbarButtons from "./ExamToolbarButtons.jsx";
import { useLanguage } from "../../../../i18n/LanguageContext.jsx";

export default function ExamToolbarActions({ viewModel }) {
    const { t } = useLanguage();

    return (
        <div className="exam-header-actions">
            <ExamToolbarStatCard
                value={viewModel.answeredPercentLabel}
                label={t.headerStatAnswered}
                icon={<CheckCircle2 />}
            />

            <ExamToolbarStatCard
                value={viewModel.scoreLabel}
                label={t.headerStatScore}
                icon={<Star />}
            />

            <ExamToolbarStatCard
                value={viewModel.elapsedTimeLabel}
                label={t.headerStatTime}
                icon={<Clock3 />}
            />

            <ExamToolbarButtons viewModel={viewModel} />
        </div>
    );
}
