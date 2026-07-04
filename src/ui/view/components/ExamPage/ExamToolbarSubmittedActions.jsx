// src/ui/view/components/ExamPage/ExamToolbarSubmittedActions.jsx
import { RotateCcw } from "lucide-react";
import { useLanguage } from "../../../../i18n/LanguageContext.jsx";

export default function ExamToolbarSubmittedActions({ onResetExam }) {
    const { t } = useLanguage();

    return (
        <button
            type="button"
            onClick={onResetExam}
            className="exam-toolbar-button exam-toolbar-button-primary"
        >
            <RotateCcw className="exam-toolbar-icon" />
            {t.headerResetButton}
        </button>
    );
}