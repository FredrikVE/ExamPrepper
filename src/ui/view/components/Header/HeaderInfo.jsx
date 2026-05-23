//src/ui/view/components/Header/HeaderInfo.jsx
import { ClipboardList, ArrowLeft } from "lucide-react";

export default function HeaderInfo({ currentQuestionIndex, questionCount, onBack }) {
    return (
        <div>
            <div className="exam-header-label">
                {onBack && (
                    <button
                        onClick={onBack}
                        className="exam-header-back-button"
                        title="Tilbake til eksamenslisten"
                    >
                        <ArrowLeft className="exam-header-icon" />
                    </button>
                )}

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
