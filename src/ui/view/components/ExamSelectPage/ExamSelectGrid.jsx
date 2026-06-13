// src/ui/view/components/ExamSelectPage/ExamSelectGrid.jsx
import ExamSelectCard from "./ExamSelectCard.jsx";

export default function ExamSelectGrid({
    exams,
    emptyTitle,
    emptyMessage,
    practiceExamLabel,
    questionLabel,
    minuteLabel,
    onSelectExam
}) {
    if (exams.length === 0) {
        return (
            <section className="exam-select-empty">
                <h2>{emptyTitle}</h2>
                <p>{emptyMessage}</p>
            </section>
        );
    }

    return (
        <section className="exam-select-grid">
            {exams.map((exam, index) => (
                <ExamSelectCard
                    key={exam.id}
                    exam={exam}
                    index={index}
                    practiceExamLabel={practiceExamLabel}
                    questionLabel={questionLabel}
                    minuteLabel={minuteLabel}
                    onSelectExam={onSelectExam}
                />
            ))}
        </section>
    );
}
