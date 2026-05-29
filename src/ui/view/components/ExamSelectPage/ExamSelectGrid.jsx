// src/ui/view/components/ExamSelectPage/ExamSelectGrid.jsx
import ExamSelectCard from "./ExamSelectCard.jsx";

export default function ExamSelectGrid({ exams, t, onSelectExam }) {
    if (!Array.isArray(exams) || exams.length === 0) {
        return (
            <section className="exam-select-empty">
                <h2>{t.selectEmptyTitle ?? "Ingen eksamener tilgjengelig"}</h2>
                <p>{t.selectEmptyMessage ?? "Dette faget har ingen mock-eksamener ennå."}</p>
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
                    t={t}
                    onSelectExam={onSelectExam}
                />
            ))}
        </section>
    );
}