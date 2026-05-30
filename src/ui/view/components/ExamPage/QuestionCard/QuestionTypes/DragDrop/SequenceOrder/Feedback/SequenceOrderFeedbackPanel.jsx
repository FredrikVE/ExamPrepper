// src/ui/view/components/ExamPage/QuestionCard/QuestionTypes/DragDrop/SequenceOrder/Feedback/SequenceOrderFeedbackPanel.jsx
import { ArrowRight } from "lucide-react";
import DragDropFeedbackExpandButton from "../../Shared/Feedback/DragDropFeedbackExpandButton.jsx";
import DragDropFeedbackExplanation from "../../Shared/Feedback/DragDropFeedbackExplanation.jsx";
import { getSequenceItemLabel } from "../Utils/sequenceOrderAnswerLogic.js";
import SequenceOrderFeedbackSlot from "./SequenceOrderFeedbackSlot.jsx";
import FormattedText from "../../../../../../Shared/FormattedText.jsx";

export default function SequenceOrderFeedbackPanel(props) {
    const questionExplanation = getQuestionExplanation(props.question);
    const hasQuestionExplanation = Boolean(questionExplanation.reason)
        || questionExplanation.extendedPoints.length > 0
        || questionExplanation.images.length > 0;

    return (
        <div className="sequence-order-feedback-panel">
            <SequenceOrderReadOnlyRow
                title={props.t.sequenceOrderCorrectOrderTitle}
                order={props.correctOrder}
                sequenceItemsById={props.sequenceItemsById}
            />

            <section className="sequence-order-feedback-row" aria-label={props.t.sequenceOrderSubmittedSequenceTitle}>
                <h4 className="sequence-order-section-title">
                    {props.t.sequenceOrderSubmittedSequenceTitle}
                </h4>

                <div className="sequence-order-feedback-slots">
                    {props.correctOrder.map((_, index) => (
                        <SequenceOrderFeedbackSlotGroup
                            key={index}
                            index={index}
                            isLastSlot={index === props.correctOrder.length - 1}
                            question={props.question}
                            correctOrder={props.correctOrder}
                            safeAnswer={props.safeAnswer}
                            sequenceItemsById={props.sequenceItemsById}
                            isExpanded={props.expandedSlotIndex === index}
                            onToggleExpanded={() => props.onToggleSlotExpanded(index)}
                            t={props.t}
                        />
                    ))}
                </div>
            </section>

            {hasQuestionExplanation ? (
                <section className="sequence-order-extended-panel">
                    <div className="sequence-order-extended-panel-main">
                        <h4 className="sequence-order-extended-panel-title">
                            {props.t.feedbackExtendedLabel}
                        </h4>

                        <DragDropFeedbackExpandButton
                            isExpanded={props.questionExplanationExpanded}
                            onToggleExpanded={props.onToggleQuestionExplanation}
                            showLabel={props.t.dragDropShowExplanation}
                            hideLabel={props.t.dragDropHideExplanation}
                        />
                    </div>

                    {props.questionExplanationExpanded ? (
                        <DragDropFeedbackExplanation
                            reason={questionExplanation.reason}
                            extendedPoints={questionExplanation.extendedPoints}
                            images={questionExplanation.images}
                            showCorrectAnswer={false}
                            correctAnswerLabel=""
                            correctAnswerPrefix={props.t.feedbackCorrectAnswerLabel}
                        />
                    ) : null}
                </section>
            ) : null}
        </div>
    );
}

function SequenceOrderReadOnlyRow(props) {
    return (
        <section className="sequence-order-readonly-row">
            <h4 className="sequence-order-section-title">
                {props.title}
            </h4>

            <div className="sequence-order-readonly-slots">
                {props.order.map((sequenceItemId, index) => (
                    <SequenceOrderReadOnlySlotGroup
                        key={sequenceItemId ?? index}
                        sequenceItem={props.sequenceItemsById[sequenceItemId]}
                        fallbackLabel={sequenceItemId}
                        isLastSlot={index === props.order.length - 1}
                    />
                ))}
            </div>
        </section>
    );
}

function SequenceOrderReadOnlySlotGroup(props) {
    return (
        <>
            <div className="sequence-order-readonly-slot">
                <FormattedText text={props.sequenceItem ? getSequenceItemLabel(props.sequenceItem) : props.fallbackLabel} />
            </div>

            {!props.isLastSlot ? (
                <ArrowRight className="sequence-order-arrow" aria-hidden="true" />
            ) : null}
        </>
    );
}

function SequenceOrderFeedbackSlotGroup(props) {
    return (
        <>
            <SequenceOrderFeedbackSlot
                question={props.question}
                index={props.index}
                correctOrder={props.correctOrder}
                safeAnswer={props.safeAnswer}
                sequenceItemsById={props.sequenceItemsById}
                isExpanded={props.isExpanded}
                onToggleExpanded={props.onToggleExpanded}
                t={props.t}
            />

            {!props.isLastSlot ? (
                <ArrowRight className="sequence-order-arrow" aria-hidden="true" />
            ) : null}
        </>
    );
}

function getQuestionExplanation(question) {
    return {
        reason: question?.whyCorrect ?? question?.why ?? "",
        extendedPoints: Array.isArray(question?.whyExtended) ? question.whyExtended : [],
        images: Array.isArray(question?.whyExtendedImages) ? question.whyExtendedImages : []
    };
}
