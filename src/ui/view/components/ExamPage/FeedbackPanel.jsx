//src/ui/view/components/ExamPage/FeedbackPanel.jsx
import { BookOpen, CheckCircle2, XCircle } from "lucide-react";
import { getAnswerLabel } from "../../../../utils/exam/answerUtils.js";

export default function FeedbackPanel({ question, selected, correct }) {
    return (
        <div className="mt-5 space-y-3">
            <div className={`rounded-2xl border p-4 ${correct ? "border-emerald-200 bg-emerald-50" : "border-red-200 bg-red-50"}`}>
                <div className="flex items-center gap-2 font-bold">{correct ? <CheckCircle2 className="h-5 w-5" /> : <XCircle className="h-5 w-5" />} Din besvarelse er {correct ? "riktig" : "feil"}</div>
                <p className="mt-2 text-sm leading-6"><span className="font-semibold">Fasit:</span> {getAnswerLabel(question)}</p>
            </div>
            {question.type === "fill" ? <FillFeedback question={question} correct={correct} /> : <OptionFeedback question={question} selected={selected} />}
            <div className="rounded-2xl border border-blue-200 bg-blue-50 p-4 text-sm leading-6 text-blue-950"><div className="flex items-center gap-2 font-semibold"><BookOpen className="h-4 w-4" /> Henvisning til fasit/pensum</div><p className="mt-1">{question.source}</p></div>
        </div>
    );
}

function FillFeedback({ question, correct }) {
    return <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-4 text-sm leading-6"><div className="font-semibold">Hvorfor er fasit riktig?</div><p>{question.whyCorrect}</p>{!correct && <><div className="mt-3 font-semibold">Hvorfor ble ditt svar vurdert som galt?</div><p>{question.whyWrong}</p></>}</div>;
}

function OptionFeedback({ question, selected }) {
    return (
        <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-4 text-sm leading-6">
            <div className="mb-2 font-semibold">Hvorfor er alternativene riktige/gale?</div>
            <div className="space-y-2">
                {question.options.map((option, index) => {
                    const wasSelected = question.type === "single" ? selected === index : Array.isArray(selected) && selected.includes(index);
                    return <div key={index} className="rounded-xl bg-white p-3"><div className="flex flex-wrap items-center gap-2 font-semibold"><span>{String.fromCharCode(65 + index)}.</span><span className={option.correct ? "text-emerald-700" : "text-red-700"}>{option.correct ? "Riktig alternativ" : "Galt alternativ"}</span>{wasSelected && <span className="rounded-full bg-neutral-100 px-2 py-0.5 text-xs text-neutral-600">du valgte denne</span>}</div><p className="mt-1 text-neutral-700">{option.why}</p></div>;
                })}
            </div>
        </div>
    );
}
