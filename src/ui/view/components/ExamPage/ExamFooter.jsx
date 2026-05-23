//src/ui/view/components/ExamPage/ExamFooter.jsx
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function ExamFooter({ viewModel }) {
    return (
        <footer className="sticky bottom-0 z-30 border-t border-neutral-300 bg-white shadow-[0_-4px_16px_rgba(0,0,0,0.06)]">
            <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
                <button
                    onClick={viewModel.previousQuestion}
                    disabled={!viewModel.canGoPrevious}
                    className="inline-flex items-center gap-2 rounded-2xl border border-neutral-300 bg-white px-4 py-3 text-sm font-semibold hover:bg-neutral-50 disabled:cursor-not-allowed disabled:opacity-40"
                >
                    <ChevronLeft className="h-4 w-4" />
                    Previous
                </button>

                <div className="text-sm font-medium text-neutral-600">
                    {viewModel.currentQuestionIndex + 1} / {viewModel.visibleQuestions.length}
                </div>

                <button
                    onClick={viewModel.nextQuestion}
                    disabled={!viewModel.canGoNext}
                    className="inline-flex items-center gap-2 rounded-2xl bg-neutral-950 px-4 py-3 text-sm font-semibold text-white hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-40"
                >
                    Next
                    <ChevronRight className="h-4 w-4" />
                </button>
            </div>
        </footer>
    );
}