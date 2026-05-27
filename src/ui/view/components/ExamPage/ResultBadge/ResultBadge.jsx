//src/ui/view/components/ExamPage/ResultBadge/ResultBadge.jsx
import { CheckCircle2, XCircle } from "lucide-react";
import { useLanguage } from "../../../../../i18n/LanguageContext.jsx";

export default function ResultBadge({ correct }) {
    const { t } = useLanguage();

    let resultIcon;

    if (correct) {
        resultIcon = <CheckCircle2 className="result-badge-icon" />;
    } 
    
    else {
        resultIcon = <XCircle className="result-badge-icon" />;
    }

    return (
        <div className={`result-badge ${correct ? "result-badge-correct" : "result-badge-wrong"}`}>
            {resultIcon}

            {correct ? t.resultCorrect : t.resultWrong}
        </div>
    );
}