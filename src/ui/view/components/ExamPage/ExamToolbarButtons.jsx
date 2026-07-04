// src/ui/view/components/ExamPage/ExamToolbarButtons.jsx
import { CheckCircle2 } from "lucide-react";
import ExamToolbarSubmittedActions from "./ExamToolbarSubmittedActions.jsx";
import { useLanguage } from "../../../../i18n/LanguageContext.jsx";

export default function ExamToolbarButtons({ submitted, onSubmit, onReset }) {
    const { t } = useLanguage();

    if (submitted) {
        return (
            <ExamToolbarSubmittedActions
                onResetExam={onReset}
            />
        );
    }

    return (
        <button
            type="button"
            onClick={onSubmit}
            className="exam-toolbar-button exam-toolbar-button-primary"
        >
            <CheckCircle2 className="exam-toolbar-icon" />
            {t.headerSubmitButton}
        </button>
    );
}
