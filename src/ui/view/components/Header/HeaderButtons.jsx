// src/ui/view/components/Header/HeaderButtons.jsx
import { CheckCircle2 } from "lucide-react";
import SubmittedActions from "./SubmittedActions.jsx";
import { useLanguage } from "../../../../i18n/LanguageContext.jsx";

export default function HeaderButtons({ submitted, onSubmitExam, onResetExam }) {
    const { t } = useLanguage();

    if (submitted) {
        return (
            <SubmittedActions
                onResetExam={onResetExam}
            />
        );
    }

    return (
        <button
            type="button"
            onClick={onSubmitExam}
            className="exam-header-button exam-header-button-primary"
        >
            <CheckCircle2 className="exam-header-icon" />
            {t.headerSubmitButton}
        </button>
    );
}
