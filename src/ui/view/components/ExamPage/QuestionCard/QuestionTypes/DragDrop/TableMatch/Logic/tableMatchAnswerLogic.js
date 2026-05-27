//src/ui/view/components/ExamPage/QuestionCard/DragDrop/Logic/dragDropAnswerLogic.js
export function createCardsById(cards) {
    const cardsById = {};

    for (const card of cards) {
        cardsById[card.id] = card;
    }

    return cardsById;
}

export function clearCardFromOtherTargets(props) {
    const nextAnswer = {};

    for (const targetId in props.answer) {
        const currentCardId = props.answer[targetId];

        const isSameTarget = targetId === props.targetId;
        const isSameCard = currentCardId === props.cardId;

        if (!isSameTarget && !isSameCard) {
            nextAnswer[targetId] = currentCardId;
        }
    }

    return nextAnswer;
}

export function isTargetCorrect(target, selectedCardId) {
    if (!selectedCardId) {
        return false;
    }

    return target.correctCardId === selectedCardId;
}

export function getTargetStatus(props) {
    if (!props.targetIsAnswered) {
        return props.t.dragDropUnanswered;
    }

    if (props.targetIsCorrect) {
        return props.t.resultCorrect;
    }

    return props.t.resultWrong;
}

export function isPlainObject(value) {
    if (!value) {
        return false;
    }

    if (typeof value !== "object") {
        return false;
    }

    if (Array.isArray(value)) {
        return false;
    }

    return true;
}