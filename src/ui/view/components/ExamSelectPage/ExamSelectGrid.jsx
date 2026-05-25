//src/ui/view/components/ExamSelectPage/ExamSelectGrid.jsx
import ExamSelectCard from "./ExamSelectCard.jsx";

export default function ExamSelectGrid({ exams, t, onSelectExam }) {
    return (
        <section className="exam-select-grid" aria-label={t.selectTitle}>
            {exams.map((exam, index) => (
                <ExamSelectCard
                    key={exam.id}
                    exam={exam}
                    index={index}
                    t={t}
                    onSelectExam={onSelectExam}
                />
            ))}
        </section>
    );
}