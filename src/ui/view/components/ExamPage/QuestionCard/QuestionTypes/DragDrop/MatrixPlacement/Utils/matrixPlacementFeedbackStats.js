// src/ui/view/components/ExamPage/QuestionCard/QuestionTypes/DragDrop/MatrixPlacement/Utils/matrixPlacementFeedbackStats.js
import { getSafeArray, getSelectedQuadrantId, isItemCorrectlyPlaced, normalizeMatrixPlacementAnswer } from "./matrixPlacementAnswerLogic.js";

export function getMatrixPlacementStats(question, answer) {
    const safeAnswer = normalizeMatrixPlacementAnswer(question, answer);
    const items = getSafeArray(question?.items);

    const stats = {
        correct: 0,
        wrong: 0,
        unanswered: 0
    };

    for (const item of items) {
        const quadrantId = getSelectedQuadrantId(safeAnswer, item.id);

        if (!quadrantId) {
            stats.unanswered += 1;
        } else if (isItemCorrectlyPlaced(question, quadrantId, item.id)) {
            stats.correct += 1;
        } else {
            stats.wrong += 1;
        }
    }

    return stats;
}
