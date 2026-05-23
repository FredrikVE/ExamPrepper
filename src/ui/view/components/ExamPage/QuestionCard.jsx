//src/ui/view/components/ExamPage/QuestionCard.jsx
import { AlertTriangle } from "lucide-react";
import ResultBadge from "./ResultBadge.jsx";
import FeedbackPanel from "./FeedbackPanel.jsx";

export default function QuestionCard({ question, answer, submitted, showAllFeedback, correct, onSingleAnswer, onToggleMultiAnswer }) {
    return (
        <section className="overflow-hidden rounded-2xl border border-neutral-300 bg-white shadow-sm">
            <div className="flex items-start justify-between gap-3 border-b border-neutral-200 bg-neutral-50 px-5 py-4">
                <div>
                    <div className="text-xs font-semibold uppercase tracking-wide text-neutral-500">Oppgave {question.id} · {question.points}p · {getQuestionTypeLabel(question.type)}</div>
                    <h3 className="mt-1 text-xl font-bold">{question.title}</h3>
                </div>
                {submitted && <ResultBadge correct={correct} />}
            </div>
            <div className="px-5 py-5">
                <p className="mb-4 text-base leading-7">{question.prompt}</p>
                {question.type === "fill" && <input disabled={submitted} value={answer || ""} onChange={(event) => onSingleAnswer(question.id, event.target.value)} placeholder="Skriv begrep her" className="w-full rounded-xl border border-neutral-300 px-4 py-3 outline-none focus:border-neutral-950 disabled:bg-neutral-100" />}
                {question.type === "single" && <OptionList question={question} answer={answer} submitted={submitted} onSingleAnswer={onSingleAnswer} />}
                {question.type === "multi" && <OptionList question={question} answer={answer} submitted={submitted} onToggleMultiAnswer={onToggleMultiAnswer} />}
                {submitted && !showAllFeedback && !correct && <div className="mt-5 flex items-start gap-2 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-950"><AlertTriangle className="mt-0.5 h-4 w-4" /><div><div className="font-semibold">Feil svar</div><p>Trykk «Vis fasit» øverst for forklaring og pensumhenvisning.</p></div></div>}
                {submitted && showAllFeedback && <FeedbackPanel question={question} selected={answer} correct={correct} />}
            </div>
        </section>
    );
}

function OptionList({ question, answer, submitted, onSingleAnswer, onToggleMultiAnswer }) {
    return (
        <div className="space-y-2">
            {question.options.map((option, index) => {
                const isSelected = question.type === "single" ? answer === index : Array.isArray(answer) && answer.includes(index);
                const showRight = submitted && option.correct;
                const showWrongSelection = submitted && isSelected && !option.correct;
                return (
                    <label key={index} className={`flex cursor-pointer gap-3 rounded-xl border px-4 py-3 ${getOptionClassName({ showRight, showWrongSelection, isSelected })}`}>
                        <input type={question.type === "single" ? "radio" : "checkbox"} disabled={submitted} checked={isSelected} onChange={() => question.type === "single" ? onSingleAnswer(question.id, index) : onToggleMultiAnswer(question.id, index)} className="mt-1" />
                        <span><span className="font-semibold">{String.fromCharCode(65 + index)}.</span> {option.text}</span>
                    </label>
                );
            })}
        </div>
    );
}

function getQuestionTypeLabel(type) {
    if (type === "fill") return "Fyll inn";
    if (type === "multi") return "Flervalg";
    return "Ett riktig svar";
}

function getOptionClassName({ showRight, showWrongSelection, isSelected }) {
    if (showRight) return "border-emerald-300 bg-emerald-50";
    if (showWrongSelection) return "border-red-300 bg-red-50";
    if (isSelected) return "border-neutral-950 bg-neutral-50";
    return "border-neutral-200 hover:bg-neutral-50";
}
