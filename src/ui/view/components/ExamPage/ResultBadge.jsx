//src/ui/view/components/ExamPage/ResultBadge.jsx
import { CheckCircle2, XCircle } from "lucide-react";

export default function ResultBadge({ correct }) {
    return (
        <div className={`flex shrink-0 items-center gap-1 rounded-full px-3 py-1 text-sm font-semibold ${correct ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-700"}`}>
            {correct ? <CheckCircle2 className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
            {correct ? "Riktig" : "Feil"}
        </div>
    );
}
