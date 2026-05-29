// src/ui/view/components/ExamPage/QuestionCard/QuestionTypes/DragDrop/Shared/Utils/orderItemsByIndexOrder.js
export default function orderItemsByIndexOrder(items, indexOrder, sourceItems) {
    if (!isValidIndexOrder(indexOrder, sourceItems?.length)) {
        return items;
    }

    const positionByItemId = new Map();

    indexOrder.forEach((sourceIndex, displayIndex) => {
        const item = sourceItems[sourceIndex];

        if (item?.id) {
            positionByItemId.set(item.id, displayIndex);
        }
    });

    return [...items].sort((firstItem, secondItem) => {
        return getItemPosition(firstItem, positionByItemId) - getItemPosition(secondItem, positionByItemId);
    });
}

function isValidIndexOrder(indexOrder, itemCount) {
    if (!Array.isArray(indexOrder) || indexOrder.length !== itemCount) {
        return false;
    }

    const uniqueIndexes = new Set(indexOrder);

    return indexOrder.every((index) => {
        return Number.isInteger(index) && index >= 0 && index < itemCount;
    }) && uniqueIndexes.size === itemCount;
}

function getItemPosition(item, positionByItemId) {
    return positionByItemId.get(item.id) ?? Number.MAX_SAFE_INTEGER;
}
