// src/ui/view/components/LearningContentSelectPage/LearningContentIntro.jsx
export default function LearningContentIntro({ selectedSubject, subtitle }) {
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
