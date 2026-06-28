// src/ui/view/components/SubjectSelectPage/SubjectSelectPlaceholderCard.jsx
import { ChevronRight, Info, Plus } from "lucide-react";

export default function SubjectSelectPlaceholderCard({ t }) {
    return (
        <article className="subject-card subject-card-add-placeholder" aria-label={t.subjectAddPlaceholderTitle}>
            <span className="subject-card-icon-wrap" aria-hidden="true">
                <Plus className="subject-card-icon" />
            </span>

            <span className="subject-card-code">
                {t.subjectAddPlaceholderCode}
            </span>

            <span className="subject-card-title">
                {t.subjectAddPlaceholderTitle}
            </span>

            <span className="subject-card-description">
                {t.subjectAddPlaceholderDescription}
            </span>

            <span className="subject-card-footer">
                <span className="subject-card-placeholder-note">
                    <Info className="subject-card-placeholder-note-icon" aria-hidden="true" />
                    <span>{t.subjectAddPlaceholderNote}</span>
                </span>

                <span className="subject-card-arrow subject-card-placeholder-arrow" aria-hidden="true">
                    <ChevronRight className="subject-card-arrow-icon" />
                </span>
            </span>
        </article>
    );
}
