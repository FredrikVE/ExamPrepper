//src/ui/view/components/Header/SubmittedActions.jsx
import { Eye, EyeOff, RotateCcw } from "lucide-react";
import { useLanguage } from "../../../../i18n/LanguageContext.jsx";

export default function SubmittedActions({ showAllFeedback, onToggleFeedback, onResetExam }) {
    const { t } = useLanguage();

    return (
        <>
            <button
                type="button"
                onClick={onToggleFeedback}
                className="exam-header-button exam-header-button-secondary"
            >
                {showAllFeedback ? (
                    <EyeOff className="exam-header-icon" />
                ) : (
                    <Eye className="exam-header-icon" />
                )}

                {showAllFeedback ? t.headerHideFeedback : t.headerShowFeedback}
            </button>

            <button
                type="button"
                onClick={onResetExam}
                className="exam-header-button exam-header-button-primary"
            >
                <RotateCcw className="exam-header-icon" />
                {t.headerResetButton}
            </button>
        </>
    );
}
