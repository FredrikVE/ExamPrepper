// src/ui/view/components/ExamPage/ExamFooterSubmitButton.jsx
import { Send } from "lucide-react";

export default function ExamFooterSubmitButton({ submitLabel, onSubmit }) {
    return (
        <>
            <button
                type="button"
                onClick={onSubmit}
                className="progress-pager-button exam-footer-submit-button exam-footer-submit-button-desktop"
            >
                {submitLabel}
                <Send className="exam-footer-submit-icon" aria-hidden="true" focusable="false" />
            </button>

            <button
                type="button"
                onClick={onSubmit}
                className="progress-pager-button exam-footer-submit-button exam-footer-submit-button-mobile"
            >
                {submitLabel}
                <Send className="exam-footer-submit-icon" aria-hidden="true" focusable="false" />
            </button>
        </>
    );
}
