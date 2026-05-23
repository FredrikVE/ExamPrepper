//src/ui/view/components/ExamPage/ExamInstructions.jsx
import { Award, Eye, EyeOff, RotateCcw } from "lucide-react";

const FILTERS = [["all", "Alle"], ["wrong", "Kun feil"], ["right", "Kun riktige"]];

export default function ExamInstructions({ viewModel }) {
    return (
        <section className="mb-6 rounded-2xl border border-neutral-300 bg-white p-5 shadow-sm">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                    <h2 className="text-lg font-semibold">Instruksjoner</h2>
                    <p className="mt-1 text-sm leading-6 text-neutral-700">Flere riktige svar kan forekomme i flervalg. Etter levering får du en eksplisitt vurdering av svaret ditt og en forklaring på hvert alternativ.</p>
                </div>
                <div className="flex flex-wrap gap-2">
                    {!viewModel.submitted ? (
                        <button onClick={viewModel.submitExam} className="rounded-2xl bg-neutral-950 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-neutral-800">Lever og sjekk</button>
                    ) : (
                        <>
                            <button onClick={() => viewModel.setShowAllFeedback((value) => !value)} className="inline-flex items-center gap-2 rounded-2xl border border-neutral-300 bg-white px-4 py-2 text-sm font-semibold hover:bg-neutral-50">
                                {viewModel.showAllFeedback ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                {viewModel.showAllFeedback ? "Skjul fasit" : "Vis fasit"}
                            </button>
                            <button onClick={viewModel.resetExam} className="inline-flex items-center gap-2 rounded-2xl bg-neutral-950 px-4 py-2 text-sm font-semibold text-white hover:bg-neutral-800"><RotateCcw className="h-4 w-4" /> Ny runde</button>
                        </>
                    )}
                </div>
            </div>
            {viewModel.submitted && (
                <div className="mt-5 rounded-2xl bg-neutral-100 p-4">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex items-center gap-3"><Award className="h-6 w-6" /><div><div className="font-bold">Resultat: {viewModel.score} av {viewModel.totalPoints} poeng</div><div className="text-sm text-neutral-600">{viewModel.percentage}% riktig</div></div></div>
                        <div className="flex gap-2">
                            {FILTERS.map(([key, label]) => (
                                <button key={key} onClick={() => viewModel.setFilter(key)} className={`rounded-xl px-3 py-2 text-sm font-medium ${viewModel.filter === key ? "bg-neutral-950 text-white" : "bg-white hover:bg-neutral-50"}`}>{label}</button>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}
