//src/ui/view/components/SubjectSelectPage/SubjectSelectCard.jsx
import { ChevronRight, FileText } from "lucide-react";
import SubjectIcon from "../SubjectIcon.jsx";

export default function SubjectSelectCard({ t, subject, index, isSelected, onSelectSubject }) {
    return (
        <button
            type="button"
            className={`subject-card subject-card-${index + 1} ${isSelected ? "subject-card-selected" : ""}`}
            onClick={() => onSelectSubject(subject.id)}
        >
            {subject.recommended ? (
                <span className="subject-card-badge">
                    {t.subjectRecommended}
                </span>
            ) : null}

            <span className="subject-card-icon-wrap" aria-hidden="true">
                <SubjectIcon subject={subject} className="subject-card-icon" />
            </span>

            <span className="subject-card-code">
                {subject.code}
            </span>

            <span className="subject-card-title">
                {subject.name}
            </span>

            <span className="subject-card-description">
                {subject.description}
            </span>

            <span className="subject-card-footer">
                <span className="subject-card-meta">
                    <FileText className="subject-card-meta-icon" />
                    <span>{t.subjectMockExamCount(subject.examCount)}</span>
                </span>

                <span className="subject-card-arrow" aria-hidden="true">
                    <ChevronRight className="subject-card-arrow-icon" />
                </span>
            </span>
        </button>
    );
}
