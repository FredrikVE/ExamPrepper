//src/ui/view/components/ExamPage/ExamHeader.jsx
import { ClipboardList, Eye, EyeOff, RotateCcw } from "lucide-react";

export default function ExamHeader({ viewModel }) {
    return (
        <header className="sticky top-0 z-30 border-b border-neutral-300 bg-white shadow-sm">
            <div className="mx-auto max-w-5xl px-4 py-3">
                <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                    <div>
                        <div className="flex items-center gap-2 text-sm font-medium text-neutral-500">
                            <ClipboardList className="h-4 w-4" />
                            IN5431 mock skoleeksamen
                        </div>

                        <h1 className="text-2xl font-bold tracking-tight">
                            Eksamens-emulator med fasit
                        </h1>

                        <p className="mt-1 text-sm text-neutral-600">
                            Spørsmål {viewModel.currentQuestionIndex + 1} av {viewModel.visibleQuestions.length}
                        </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                        <div className="rounded-2xl bg-neutral-100 px-3 py-2 text-sm shadow-sm">
                            <div className="font-bold">{viewModel.answeredCount}/{viewModel.questions.length}</div>
                            <div className="text-neutral-500">besvart</div>
                        </div>

                        <div className="rounded-2xl bg-neutral-100 px-3 py-2 text-sm shadow-sm">
                            <div className="font-bold">
                                {viewModel.submitted ? `${viewModel.score}/${viewModel.totalPoints}` : "—"}
                            </div>
                            <div className="text-neutral-500">score</div>
                        </div>

                        {!viewModel.submitted ? (
                            <button
                                onClick={viewModel.submitExam}
                                className="rounded-2xl bg-neutral-950 px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-neutral-800"
                            >
                                Lever nå
                            </button>
                        ) : (
                            <>
                                <button
                                    onClick={() => viewModel.setShowAllFeedback((value) => !value)}
                                    className="inline-flex items-center gap-2 rounded-2xl border border-neutral-300 bg-white px-4 py-3 text-sm font-semibold hover:bg-neutral-50"
                                >
                                    {viewModel.showAllFeedback ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                    {viewModel.showAllFeedback ? "Skjul fasit" : "Vis fasit"}
                                </button>

                                <button
                                    onClick={viewModel.resetExam}
                                    className="inline-flex items-center gap-2 rounded-2xl bg-neutral-950 px-4 py-3 text-sm font-semibold text-white hover:bg-neutral-800"
                                >
                                    <RotateCcw className="h-4 w-4" />
                                    Ny runde
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}