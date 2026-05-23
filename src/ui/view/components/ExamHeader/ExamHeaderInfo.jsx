//src/ui/view/components/ExamHeader/ExamHeaderInfo.jsx
import { ClipboardList } from "lucide-react";

export default function ExamHeaderInfo({ currentQuestionIndex, questionCount }) {
    return (
        <div>
            <div className="exam-header-label">
                <ClipboardList className="exam-header-icon" />
                IN5431 mock skoleeksamen
            </div>

            <h1 className="exam-header-title">
                Eksamens-emulator med fasit
            </h1>

            <p className="exam-header-subtitle">
                Spørsmål {currentQuestionIndex + 1} av {questionCount}
            </p>
        </div>
    );
}