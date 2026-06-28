// src/ui/view/components/SubjectSelectPage/SubjectSelectGrid.jsx
import SubjectSelectCard from "./SubjectSelectCard.jsx";
import SubjectSelectPlaceholderCard from "./SubjectSelectPlaceholderCard.jsx";

export default function SubjectSelectGrid({ t, subjects, selectedSubject, emptyTitle, emptyDescription, onSelectSubject }) {
    if (subjects.length === 0) {
        return (
            <section className="subject-select-empty" aria-label={emptyTitle}>
                <h2>{emptyTitle}</h2>
                {emptyDescription && <p>{emptyDescription}</p>}
            </section>
        );
    }

    return (
        <section className="subject-select-grid" aria-label={t.subjectSelectIntroTitle}>
            {subjects.map((subject, index) => (
                <SubjectSelectCard
                    key={subject.id}
                    t={t}
                    subject={subject}
                    index={index}
                    isSelected={selectedSubject?.id === subject.id}
                    onSelectSubject={onSelectSubject}
                />
            ))}

            <SubjectSelectPlaceholderCard t={t} />
        </section>
    );
}
