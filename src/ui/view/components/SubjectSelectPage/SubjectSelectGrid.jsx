//src/ui/view/components/SubjectSelectPage/SubjectSelectGrid.jsx
import SubjectSelectCard from "./SubjectSelectCard.jsx";

export default function SubjectSelectGrid({ t, subjects, selectedSubject, onSelectSubject }) {
    if (subjects.length === 0) {
        return (
            <section className="subject-select-empty" aria-label={t.subjectNoMatchesTitle}>
                <h2>{t.subjectNoMatchesTitle}</h2>
                <p>{t.subjectNoMatchesDescription}</p>
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
        </section>
    );
}
