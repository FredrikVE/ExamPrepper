//src/ui/view/components/ExamPage/QuestionCard/QuestionTypes/DragDrop/MatrixPlacement/Matrix/MatrixPlacementGrid.jsx
import { getMatrixAxis, getMatrixQuadrantsForDisplay } from "../Utils/matrixPlacementAnswerLogic.js";
import MatrixPlacementQuadrant from "./MatrixPlacementQuadrant.jsx";

export default function MatrixPlacementGrid(props) {
    const xAxis = getMatrixAxis(props.question, "xAxis");
    const yAxis = getMatrixAxis(props.question, "yAxis");
    const quadrants = getMatrixQuadrantsForDisplay(props.question);

    return (
        <section className="matrix-placement-board" aria-label={props.question?.matrix?.label ?? props.question?.title}>
            <div className="matrix-placement-y-high" aria-hidden="true">
                {yAxis.topLabel ?? yAxis.highLabel ?? "High"}
            </div>
            <div className="matrix-placement-y-low" aria-hidden="true">
                {yAxis.bottomLabel ?? yAxis.lowLabel ?? "Low"}
            </div>
            <div className="matrix-placement-y-axis-label">
                {yAxis.label ?? "Y-axis"}
            </div>
            <div className="matrix-placement-y-axis-line" aria-hidden="true" />

            <div className="matrix-placement-grid">
                {quadrants.map((quadrant) => (
                    <MatrixPlacementQuadrant
                        key={quadrant.id}
                        question={props.question}
                        quadrant={quadrant}
                        safeAnswer={props.safeAnswer}
                        feedbackMode={props.feedbackMode}
                        isDragOver={props.dragOverQuadrantId === quadrant.id}
                        selectedItemId={props.selectedItemId}
                        expandedItemId={props.expandedItemId}
                        onQuadrantClick={() => props.onQuadrantClick(quadrant.id)}
                        onQuadrantDragOver={(event) => props.onQuadrantDragOver(event, quadrant.id)}
                        onQuadrantDragLeave={props.onQuadrantDragLeave}
                        onQuadrantDrop={(event) => props.onQuadrantDrop(event, quadrant.id)}
                        onItemSelect={props.onItemSelect}
                        onItemDragStart={props.onItemDragStart}
                        onItemRemove={props.onItemRemove}
                        onToggleExpanded={props.onToggleExpanded}
                        t={props.t}
                    />
                ))}
            </div>

            <div className="matrix-placement-x-axis" aria-hidden="true">
                <span>{xAxis.leftLabel ?? xAxis.lowLabel ?? "Low"}</span>
                <strong>{xAxis.label ?? "X-axis"}</strong>
                <span>{xAxis.rightLabel ?? xAxis.highLabel ?? "High"}</span>
            </div>
        </section>
    );
}
