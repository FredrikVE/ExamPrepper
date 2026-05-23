//src/ui/view/components/ExamPage/ExamInstructions.jsx
import { Award, Eye, EyeOff, RotateCcw } from "lucide-react";

const FILTERS = [
    ["all", "Alle"],
    ["wrong", "Kun feil"],
    ["right", "Kun riktige"]
];

export default function ExamInstructions({ viewModel }) {
    return (
        <section className="exam-instructions">
            <div className="exam-instructions-layout">
                <div>
                    <h2 className="exam-instructions-title">Instruksjoner</h2>

                    <p className="exam-instructions-text">
                        Flere riktige svar kan forekomme i flervalg. Etter levering får du
                        en eksplisitt vurdering av svaret ditt og en forklaring på hvert
                        alternativ.
                    </p>
                </div>

                <div className="exam-instructions-actions">
                    {!viewModel.submitted ? (
                        <button
                            onClick={viewModel.submitExam}
                            className="exam-instructions-button exam-instructions-button-primary"
                        >
                            Lever og sjekk
                        </button>
                    ) : (
                        <>
                            <button
                                onClick={() =>
                                    viewModel.setShowAllFeedback((value) => !value)
                                }
                                className="exam-instructions-button exam-instructions-button-secondary"
                            >
                                {viewModel.showAllFeedback ? (
                                    <EyeOff className="exam-instructions-icon" />
                                ) : (
                                    <Eye className="exam-instructions-icon" />
                                )}

                                {viewModel.showAllFeedback ? "Skjul fasit" : "Vis fasit"}
                            </button>

                            <button
                                onClick={viewModel.resetExam}
                                className="exam-instructions-button exam-instructions-button-primary"
                            >
                                <RotateCcw className="exam-instructions-icon" />
                                Ny runde
                            </button>
                        </>
                    )}
                </div>
            </div>

            {viewModel.submitted && (
                <div className="exam-instructions-result">
                    <div className="exam-instructions-result-layout">
                        <div className="exam-instructions-result-summary">
                            <Award className="exam-instructions-result-icon" />

                            <div>
                                <div className="exam-instructions-result-title">
                                    Resultat: {viewModel.score} av{" "}
                                    {viewModel.totalPoints} poeng
                                </div>

                                <div className="exam-instructions-result-subtitle">
                                    {viewModel.percentage}% riktig
                                </div>
                            </div>
                        </div>

                        <div className="exam-instructions-filter-list">
                            {FILTERS.map(([key, label]) => (
                                <button
                                    key={key}
                                    onClick={() => viewModel.setFilter(key)}
                                    className={`exam-instructions-filter-button ${
                                        viewModel.filter === key
                                            ? "exam-instructions-filter-button-active"
                                            : "exam-instructions-filter-button-inactive"
                                    }`}
                                >
                                    {label}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}