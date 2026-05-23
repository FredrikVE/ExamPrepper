//src/ui/view/components/ExamPage/ExamHeader.jsx
import { ClipboardList, Eye, EyeOff, RotateCcw } from "lucide-react";

export default function ExamHeader({ viewModel }) {
    return (
        <header className="exam-header">
            <div className="exam-header-container">
                <div className="exam-header-layout">
                    <div>
                        <div className="exam-header-label">
                            <ClipboardList className="exam-header-icon" />
                            IN5431 mock skoleeksamen
                        </div>

                        <h1 className="exam-header-title">
                            Eksamens-emulator med fasit
                        </h1>

                        <p className="exam-header-subtitle">
                            Spørsmål {viewModel.currentQuestionIndex + 1} av{" "}
                            {viewModel.visibleQuestions.length}
                        </p>
                    </div>

                    <div className="exam-header-actions">
                        <div className="exam-header-stat-card">
                            <div className="exam-header-stat-value">
                                {viewModel.answeredCount}/{viewModel.questions.length}
                            </div>
                            <div className="exam-header-stat-label">besvart</div>
                        </div>

                        <div className="exam-header-stat-card">
                            <div className="exam-header-stat-value">
                                {viewModel.submitted
                                    ? `${viewModel.score}/${viewModel.totalPoints}`
                                    : "—"}
                            </div>
                            <div className="exam-header-stat-label">score</div>
                        </div>

                        {!viewModel.submitted ? (
                            <button
                                onClick={viewModel.submitExam}
                                className="exam-header-button exam-header-button-primary"
                            >
                                Lever nå
                            </button>
                        ) : (
                            <>
                                <button
                                    onClick={() =>
                                        viewModel.setShowAllFeedback((value) => !value)
                                    }
                                    className="exam-header-button exam-header-button-secondary"
                                >
                                    {viewModel.showAllFeedback ? (
                                        <EyeOff className="exam-header-icon" />
                                    ) : (
                                        <Eye className="exam-header-icon" />
                                    )}
                                    {viewModel.showAllFeedback ? "Skjul fasit" : "Vis fasit"}
                                </button>

                                <button
                                    onClick={viewModel.resetExam}
                                    className="exam-header-button exam-header-button-primary"
                                >
                                    <RotateCcw className="exam-header-icon" />
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