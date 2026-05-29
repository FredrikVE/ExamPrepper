// src/ui/view/components/Header/SubmittedActions.jsx
import { RotateCcw } from "lucide-react";
import { useLanguage } from "../../../../i18n/LanguageContext.jsx";

export default function SubmittedActions({ onResetExam }) {
    const { t } = useLanguage();

    return (
        <button
            type="button"
            onClick={onResetExam}
            className="exam-header-button exam-header-button-primary"
        >
            <RotateCcw className="exam-header-icon" />
            {t.headerResetButton}
        </button>
    );
}