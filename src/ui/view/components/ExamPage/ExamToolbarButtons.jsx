// src/ui/view/components/ExamPage/ExamToolbarButtons.jsx
import { CheckCircle2 } from "lucide-react";
import ExamToolbarSubmittedActions from "./ExamToolbarSubmittedActions.jsx";
import { useLanguage } from "../../../../i18n/LanguageContext.jsx";

export default function ExamToolbarButtons({ viewModel }) {
    const { t } = useLanguage();

    if (viewModel.submitted) {
        return (
            <ExamToolbarSubmittedActions
                onResetExam={viewModel.resetExam}
            />
        );
    }

    return (
        <button
            type="button"
            onClick={viewModel.openSubmitConfirmation}
            className="exam-header-button exam-header-button-primary"
        >
            <CheckCircle2 className="exam-header-icon" />
            {t.headerSubmitButton}
        </button>
    );
}
