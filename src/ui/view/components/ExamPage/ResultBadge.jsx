//src/ui/view/components/ExamPage/ResultBadge.jsx
import { CheckCircle2, XCircle } from "lucide-react";

export default function ResultBadge({ correct }) {
    return (
        <div className={`result-badge ${ correct ? "result-badge-correct" : "result-badge-wrong"}`}
        >
            {correct ? (
                <CheckCircle2 className="result-badge-icon" />
            ) : (
                <XCircle className="result-badge-icon" />
            )}

            {correct ? "Riktig" : "Feil"}
        </div>
    );
}