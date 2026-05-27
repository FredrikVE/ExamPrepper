//src/ui/view/components/ExamPage/QuestionCard/DragDrop/Feedback/DragDropFeedbackExpandButton.jsx
import { ChevronDown } from "lucide-react";

export default function DragDropFeedbackExpandButton(props) {
    const className = getChevronClassName(props.isExpanded);

    let ariaLabel = props.showLabel;

    if (props.isExpanded) {
        ariaLabel = props.hideLabel;
    }

    return (
        <button
            type="button"
            className="drag-drop-feedback-expand"
            onClick={props.onToggleExpanded}
            aria-expanded={props.isExpanded}
            aria-label={ariaLabel}
        >
            <ChevronDown
                className={className}
                aria-hidden="true"
            />
        </button>
    );
}

const getChevronClassName = (isExpanded) => {
    let className = "drag-drop-feedback-chevron";

    if (isExpanded) {
        className += " drag-drop-feedback-chevron-open";
    }

    return className;
};