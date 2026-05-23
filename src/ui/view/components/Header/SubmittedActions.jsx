//src/ui/view/components/Header/SubmittedActions.jsx
import { Eye, EyeOff, RotateCcw } from "lucide-react";

export default function SubmittedActions({ showAllFeedback, onToggleFeedback, onResetExam }) {
    return (
        <>
            <button
                onClick={onToggleFeedback}
                className="exam-header-button exam-header-button-secondary"
            >
                {showAllFeedback ? (
                    <EyeOff className="exam-header-icon" />
                ) : (
                    <Eye className="exam-header-icon" />
                )}

                {showAllFeedback ? "Skjul fasit" : "Vis fasit"}
            </button>

            <button
                onClick={onResetExam}
                className="exam-header-button exam-header-button-primary"
            >
                <RotateCcw className="exam-header-icon" />
                Ny runde
            </button>
        </>
    );
}