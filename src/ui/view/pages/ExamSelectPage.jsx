// src/ui/view/pages/ExamSelectPage.jsx
import ExamSelectTopbar from "../components/ExamSelectPage/ExamSelectTopbar.jsx";
import ExamSelectIntro from "../components/ExamSelectPage/ExamSelectIntro.jsx";
import ExamSelectGrid from "../components/ExamSelectPage/ExamSelectGrid.jsx";

export default function ExamSelectPage({ viewModel }) {
    if (viewModel.loading) {
        return (
            <main className="exam-select-workspace">
                <div className="exam-select-ambient-light" aria-hidden="true" />

                <section className="exam-select-state">
                    <p>
                        {viewModel.t.selectLoadingMessage ?? "Laster eksamener..."}
                    </p>
                </section>
            </main>
        );
    }

    if (viewModel.error) {
        return (
            <main className="exam-select-workspace">
                <div className="exam-select-ambient-light" aria-hidden="true" />

                <section className="exam-select-state">
                    <p>{viewModel.error}</p>
                </section>
            </main>
        );
    }

    return (
        <main className="exam-select-workspace">
            <div className="exam-select-ambient-light" aria-hidden="true" />

            <ExamSelectTopbar
                title={viewModel.title}
                selectedSubject={viewModel.selectedSubject}
            />

            <ExamSelectIntro
                selectedSubject={viewModel.selectedSubject}
            />

            <ExamSelectGrid
                exams={viewModel.exams}
                t={viewModel.t}
                onSelectExam={viewModel.selectExam}
            />
        </main>
    );
}