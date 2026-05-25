//src/ui/view/components/SubjectSelectPage/SubjectSelectTopbar.jsx
import { ChevronRight, Trophy } from "lucide-react";

export default function SubjectSelectTopbar({ t }) {
    return (
        <div className="subject-select-topbar">
            <div>
                <h1 className="subject-select-title">
                    {t.subjectSelectTitle}
                </h1>

                <p className="subject-select-subtitle">
                    {t.subjectSelectSubtitle}
                </p>
            </div>

            <button type="button" className="subject-select-statistics-button">
                <Trophy className="subject-select-statistics-icon" />
                <span>{t.selectStatistics}</span>
                <ChevronRight className="subject-select-statistics-chevron" />
            </button>
        </div>
    );
}