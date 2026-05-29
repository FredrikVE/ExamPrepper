// src/ui/viewmodel/Utils/toggleExpandedAnswerOptionIndexes.js
export default function toggleExpandedAnswerOptionIndexes(expandedAnswerOptionIndexes, optionIndex) {
    const currentExpandedAnswerOptionIndexes = Array.isArray(expandedAnswerOptionIndexes)
        ? expandedAnswerOptionIndexes
        : [];

    if (currentExpandedAnswerOptionIndexes.includes(optionIndex)) {
        return currentExpandedAnswerOptionIndexes.filter((expandedAnswerOptionIndex) => {
            return expandedAnswerOptionIndex !== optionIndex;
        });
    }

    return [
        ...currentExpandedAnswerOptionIndexes,
        optionIndex
    ];
}
