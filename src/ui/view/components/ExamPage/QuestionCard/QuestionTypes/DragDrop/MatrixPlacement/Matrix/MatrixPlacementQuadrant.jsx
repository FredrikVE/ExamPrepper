// src/ui/view/components/ExamPage/QuestionCard/QuestionTypes/DragDrop/MatrixPlacement/Matrix/MatrixPlacementQuadrant.jsx
import { getQuadrantDescription } from "../Utils/matrixPlacementAnswerLogic.js";
import MatrixPlacementDropZone from "./MatrixPlacementDropZone.jsx";
import FormattedText from "../../../../../../Shared/FormattedText.jsx";

export default function MatrixPlacementQuadrant(props) {
    const description = getQuadrantDescription(props.quadrant);

    return (
        <section className="matrix-placement-quadrant">
            <header className="matrix-placement-quadrant-header">
                <h4><FormattedText text={props.quadrant.title ?? props.quadrant.label} /></h4>
                {description ? <p><FormattedText text={description} /></p> : null}
            </header>

            <MatrixPlacementDropZone
                question={props.question}
                quadrant={props.quadrant}
                safeAnswer={props.safeAnswer}
                feedbackMode={props.feedbackMode}
                selectedItemId={props.selectedItemId}
                expandedItemId={props.expandedItemId}
                acceptedDragSourceType={props.acceptedDragSourceType}
                quadrantDropTargetIdPrefix={props.quadrantDropTargetIdPrefix}
                onClick={props.onQuadrantClick}
                onItemSelect={props.onItemSelect}
                onItemRemove={props.onItemRemove}
                onToggleExpanded={props.onToggleExpanded}
                t={props.t}
            />
        </section>
    );
}
