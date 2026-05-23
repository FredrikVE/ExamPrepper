//src/ui/view/components/ExamFooter/ExamFooter.jsx
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function ExamFooter({ viewModel }) {
    return (
        <footer className="exam-footer">
            <div className="exam-footer-container">
                <button
                    onClick={viewModel.previousQuestion}
                    disabled={!viewModel.canGoPrevious}
                    className="exam-footer-button exam-footer-button-previous"
                >
                    <ChevronLeft className="exam-footer-icon" />
                    Previous
                </button>

                <div className="exam-footer-counter">
                    {viewModel.currentQuestionIndex + 1} / {viewModel.visibleQuestions.length}
                </div>

                <button
                    onClick={viewModel.nextQuestion}
                    disabled={!viewModel.canGoNext}
                    className="exam-footer-button exam-footer-button-next"
                >
                    Next
                    <ChevronRight className="exam-footer-icon" />
                </button>
            </div>
        </footer>
    );
}