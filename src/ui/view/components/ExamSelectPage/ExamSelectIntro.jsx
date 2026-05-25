//src/ui/view/components/ExamSelectPage/ExamSelectIntro.jsx
export default function ExamSelectIntro({ viewModel }) {
    return (
        <section className="exam-select-intro">
            <p className="exam-select-eyebrow">
                {viewModel.selectedSubject?.code ?? "Mock Exam"}
            </p>

            <h1>{viewModel.introTitle}</h1>

            <p>{viewModel.subtitle}</p>
        </section>
    );
}