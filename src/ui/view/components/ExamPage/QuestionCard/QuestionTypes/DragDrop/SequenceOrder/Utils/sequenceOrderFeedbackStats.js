// src/ui/view/components/ExamPage/QuestionCard/QuestionTypes/DragDrop/SequenceOrder/Utils/sequenceOrderFeedbackStats.js
import { getCorrectSequenceOrder, normalizeSequenceOrderAnswer } from "./sequenceOrderAnswerLogic.js";

export function getSequenceOrderStats(question, answer) {
    const correctOrder = getCorrectSequenceOrder(question);
    const safeAnswer = normalizeSequenceOrderAnswer(question, answer);

    return correctOrder.reduce((sequenceOrderStats, correctSequenceItemId, index) => {
        const selectedSequenceItemId = safeAnswer[index];

        if (!selectedSequenceItemId) {
            sequenceOrderStats.unanswered += 1;
            return sequenceOrderStats;
        }

        if (selectedSequenceItemId === correctSequenceItemId) {
            sequenceOrderStats.correct += 1;
            return sequenceOrderStats;
        }

        sequenceOrderStats.wrong += 1;
        return sequenceOrderStats;
    }, { correct: 0, wrong: 0, unanswered: 0 });
}
