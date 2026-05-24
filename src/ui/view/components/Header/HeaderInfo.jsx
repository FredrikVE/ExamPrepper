//src/ui/view/components/Header/HeaderInfo.jsx
import { ClipboardList, ArrowLeft } from "lucide-react";
import { useLanguage } from "../../../../i18n/LanguageContext.jsx";

export default function HeaderInfo({ currentQuestionIndex, questionCount, onBack }) {
    const { t } = useLanguage();

    return (
        <div>
            <div className="exam-header-label">
                {onBack && (
                    <button
                        onClick={onBack}
                        className="exam-header-back-button"
                        title={t.headerBackTitle}
                    >
                        <ArrowLeft className="exam-header-icon" />
                    </button>
                )}

                <ClipboardList className="exam-header-icon" />
                {t.headerLabel}
            </div>

            <h1 className="exam-header-title">
                {t.headerTitle}
            </h1>

            <p className="exam-header-subtitle">
                {t.headerQuestionProgress(currentQuestionIndex + 1, questionCount)}
            </p>
        </div>
    );
}
