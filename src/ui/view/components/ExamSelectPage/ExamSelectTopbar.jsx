//src/ui/view/components/ExamSelectPage/ExamSelectTopbar.jsx
import { ChevronRight, Trophy } from "lucide-react";
import { useLanguage } from "../../../../i18n/LanguageContext.jsx";

export default function ExamSelectTopbar() {
    const { t } = useLanguage();

    return (
        <div className="exam-select-topbar">
            <h1 className="exam-select-title">
                {t.selectIntroTitle}
            </h1>

            <button type="button" className="exam-select-statistics-button">
                <Trophy className="exam-select-statistics-icon" />
                <span>{t.selectStatistics}</span>
                <ChevronRight className="exam-select-statistics-chevron" />
            </button>
        </div>
    );
}