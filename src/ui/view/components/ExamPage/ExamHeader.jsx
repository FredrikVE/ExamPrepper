//src/ui/view/components/ExamPage/ExamHeader.jsx
import { ClipboardList } from "lucide-react";

export default function ExamHeader({ viewModel }) {
    return (
        <header className="sticky top-0 z-20 border-b border-neutral-300 bg-white/95 backdrop-blur">
            <div className="mx-auto max-w-5xl px-4 py-4">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <div className="flex items-center gap-2 text-sm font-medium text-neutral-500"><ClipboardList className="h-4 w-4" /> IN5431 mock skoleeksamen</div>
                        <h1 className="text-2xl font-bold tracking-tight">Eksamens-emulator med fasit</h1>
                        <p className="mt-1 text-sm text-neutral-600">Multiple choice + fyll inn begrep. Etter levering får du riktig/galt, fasit, forklaring og pensumhenvisning.</p>
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-center text-sm">
                        <div className="rounded-2xl bg-neutral-100 px-3 py-2 shadow-sm"><div className="font-bold">{viewModel.answeredCount}/{viewModel.questions.length}</div><div className="text-neutral-500">besvart</div></div>
                        <div className="rounded-2xl bg-neutral-100 px-3 py-2 shadow-sm"><div className="font-bold">{viewModel.totalPoints}</div><div className="text-neutral-500">poeng</div></div>
                        <div className="rounded-2xl bg-neutral-100 px-3 py-2 shadow-sm"><div className="font-bold">{viewModel.submitted ? `${viewModel.score}/${viewModel.totalPoints}` : "—"}</div><div className="text-neutral-500">score</div></div>
                    </div>
                </div>
            </div>
        </header>
    );
}
