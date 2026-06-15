// src/ui/view/components/ExamSelectPage/ExamSelectIntro.jsx
export default function ExamSelectIntro({ selectedSubject, subtitle }) {
    if (!selectedSubject) {
        return null;
    }

    return (
        <section className="exam-select-intro">
            <p className="exam-select-subject-line">
                {subtitle}
            </p>
        </section>
    );
}
