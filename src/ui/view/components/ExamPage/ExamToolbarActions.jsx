// src/ui/view/components/ExamPage/ExamToolbarActions.jsx
import { CheckCircle2, Clock3, Star } from "lucide-react";
import ExamToolbarStatCard from "./ExamToolbarStatCard.jsx";
import ExamToolbarButtons from "./ExamToolbarButtons.jsx";
import { useLanguage } from "../../../../i18n/LanguageContext.jsx";

export default function ExamToolbarActions(props) {
    const { t } = useLanguage();

    return (
        <div className="exam-toolbar-actions">
            <ExamToolbarStatCard
                value={props.answeredPercentLabel}
                label={t.headerStatAnswered}
                icon={<CheckCircle2 />}
            />

            <ExamToolbarStatCard
                value={props.scoreLabel}
                label={t.headerStatScore}
                icon={<Star />}
            />

            <ExamToolbarStatCard
                value={props.elapsedTimeLabel}
                label={t.headerStatTime}
                icon={<Clock3 />}
            />

            <ExamToolbarButtons
                submitted={props.submitted}
                onSubmit={props.onSubmit}
                onReset={props.onReset}
            />
        </div>
    );
}
