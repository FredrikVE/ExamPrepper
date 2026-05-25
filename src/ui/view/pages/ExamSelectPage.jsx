//src/ui/view/pages/ExamSelectPage.jsx
import ExamSelectTopbar from "../components/ExamSelectPage/ExamSelectTopbar.jsx";
import ExamSelectIntro from "../components/ExamSelectPage/ExamSelectIntro.jsx";
import ExamSelectGrid from "../components/ExamSelectPage/ExamSelectGrid.jsx";

export default function ExamSelectPage({ viewModel }) {
    if (viewModel.loading) {
        return (
            <main className="exam-select-workspace">
                <p>{viewModel.t.selectLoadingMessage ?? "Laster eksamener..."}</p>
            </main>
        );
    }

    if (viewModel.error) {
        return (
            <main className="exam-select-workspace">
                <p>{viewModel.error}</p>
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

            <ExamSelectIntro viewModel={viewModel} />

            <ExamSelectGrid
                exams={viewModel.exams}
                t={viewModel.t}
                onSelectExam={viewModel.selectExam}
            />
        </main>
    );
}