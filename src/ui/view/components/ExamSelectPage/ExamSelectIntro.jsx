//src/ui/view/components/ExamSelectPage/ExamSelectIntro.jsx
export default function ExamSelectIntro({ selectedSubject }) {
    if (!selectedSubject) {
        return null;
    }

    return (
        <section className="exam-select-intro">
            <p className="exam-select-subject-line">
                {selectedSubject.code} — {selectedSubject.name}
            </p>
        </section>
    );
}