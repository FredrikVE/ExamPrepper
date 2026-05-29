// src/ui/view/components/Header/HeaderButtons.jsx
import { CheckCircle2 } from "lucide-react";
import SubmittedActions from "./SubmittedActions.jsx";
import { useLanguage } from "../../../../i18n/LanguageContext.jsx";

export default function HeaderButtons({ viewModel }) {
    const { t } = useLanguage();

    if (viewModel.submitted) {
        return (
            <SubmittedActions
                onResetExam={viewModel.resetExam}
            />
        );
    }

    return (
        <button
            type="button"
            onClick={viewModel.submitExam}
            className="exam-header-button exam-header-button-primary"
        >
            <CheckCircle2 className="exam-header-icon" />
            {t.headerSubmitButton}
        </button>
    );
}