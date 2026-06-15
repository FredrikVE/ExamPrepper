// src/ui/view/pages/ExamSelectPage.jsx
import ExamSelectTopbar from "../components/ExamSelectPage/ExamSelectTopbar.jsx";
import ExamSelectIntro from "../components/ExamSelectPage/ExamSelectIntro.jsx";
import ExamSelectGrid from "../components/ExamSelectPage/ExamSelectGrid.jsx";

export default function ExamSelectPage({ viewModel }) {
    if (viewModel.examsLoading) {
        return (
            <main className="exam-select-workspace">
                <div className="exam-select-ambient-light" aria-hidden="true" />

                <section className="exam-select-state">
                    <p>{viewModel.loadingMessage}</p>
                </section>
            </main>
        );
    }

    if (viewModel.examsLoadError) {
        return (
            <main className="exam-select-workspace">
                <div className="exam-select-ambient-light" aria-hidden="true" />

                <section className="exam-select-state">
                    <p>{viewModel.examsLoadError}</p>
                </section>
            </main>
        );
    }

    return (
        <main className="exam-select-workspace">
            <div className="exam-select-ambient-light" aria-hidden="true" />

            <ExamSelectTopbar
                title={viewModel.title}
                statisticsLabel={viewModel.statisticsLabel}
                onShowStatistics={viewModel.showStatistics}
            />

            <ExamSelectIntro
                selectedSubject={viewModel.selectedSubject}
                subtitle={viewModel.subtitle}
            />

            <ExamSelectGrid
                exams={viewModel.exams}
                emptyTitle={viewModel.emptyTitle}
                emptyMessage={viewModel.emptyMessage}
                practiceExamLabel={viewModel.practiceExamLabel}
                questionLabel={viewModel.questionLabel}
                minuteLabel={viewModel.minuteLabel}
                onSelectExam={viewModel.selectExam}
            />
        </main>
    );
}
