//src/ui/view/components/ExamPage/ResultBadge.jsx
import { CheckCircle2, XCircle } from "lucide-react";
import { useLanguage } from "../../../../i18n/LanguageContext.jsx";

export default function ResultBadge({ correct }) {
    const { t } = useLanguage();

    return (
        <div className={`result-badge ${ correct ? "result-badge-correct" : "result-badge-wrong"}`}
        >
            {correct ? (
                <CheckCircle2 className="result-badge-icon" />
            ) : (
                <XCircle className="result-badge-icon" />
            )}

            {correct ? t.resultCorrect : t.resultWrong}
        </div>
    );
}
