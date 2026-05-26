//src/ui/view/components/ExamPage/QuestionCard/DragDrop/Logic/dragDropFeedbackStats.js
import { isPlainObject, isTargetCorrect } from "./dragDropAnswerLogic.js";

export function getDragDropStats(question, answer) {
    const safeAnswer = getSafeAnswer(answer);
    const targets = getTargets(question);

    const stats = {
        correct: 0,
        wrong: 0,
        unanswered: 0
    };

    for (const target of targets) {
        const selectedCardId = safeAnswer[target.id];

        if (!selectedCardId) {
            stats.unanswered += 1;
        } else if (isTargetCorrect(target, selectedCardId)) {
            stats.correct += 1;
        } else {
            stats.wrong += 1;
        }
    }

    return stats;
}

function getSafeAnswer(answer) {
    if (isPlainObject(answer)) {
        return answer;
    }

    return {};
}

function getTargets(question) {
    if (!question) {
        return [];
    }

    if (!Array.isArray(question.targets)) {
        return [];
    }

    return question.targets;
}