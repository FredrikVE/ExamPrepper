// src/ui/view/components/LearningContentSelectPage/LearningContentPlaceholderCard.jsx
import { ChevronRight, Info, Plus } from "lucide-react";

export default function LearningContentPlaceholderCard(props) {
    return (
        <article className="exam-select-card exam-select-card-add-placeholder" aria-label={props.title}>
            <div className="exam-select-card-main-row">
                <span className="exam-select-card-icon-wrapper" aria-hidden="true">
                    <Plus className="exam-select-card-icon" />
                </span>

                <div className="exam-select-card-copy">
                    <p className="exam-select-card-eyebrow">
                        {props.code}
                    </p>

                    <h2 className="exam-select-card-title">
                        {props.title}
                    </h2>

                    <p className="exam-select-card-description">
                        {props.description}
                    </p>
                </div>
            </div>

            <div className="exam-select-card-footer">
                <span className="exam-select-card-placeholder-note">
                    <Info className="exam-select-card-placeholder-note-icon" aria-hidden="true" />
                    <span>{props.note}</span>
                </span>

                <span className="exam-select-card-arrow exam-select-card-placeholder-arrow" aria-hidden="true">
                    <ChevronRight className="exam-select-card-arrow-icon" />
                </span>
            </div>
        </article>
    );
}
