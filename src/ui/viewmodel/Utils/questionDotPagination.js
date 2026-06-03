// src/ui/viewmodel/Utils/questionDotPagination.js
const COMPACT_DOT_QUESTION_THRESHOLD = 25;
const RESPONSIVE_COMPACT_DOT_QUESTION_THRESHOLD = 12;
const FILLED_COMPACT_VISIBLE_DOT_COUNT = 15;

export function shouldUseCompactDotsByQuestionCount(questionCount) {
    return questionCount > COMPACT_DOT_QUESTION_THRESHOLD;
}

export function shouldAllowResponsiveCompactDots(questionCount) {
    return questionCount > RESPONSIVE_COMPACT_DOT_QUESTION_THRESHOLD;
}

export function getFilledCompactQuestionDotEntries(visibleQuestions, currentQuestionIndex) {
    const questionIndexes = getAnchoredCompactQuestionIndexes(
        visibleQuestions.length,
        currentQuestionIndex,
        FILLED_COMPACT_VISIBLE_DOT_COUNT
    );

    return createQuestionDotEntriesFromAnchoredIndexes(visibleQuestions, questionIndexes);
}

export function getMinimalCompactQuestionDotEntries(visibleQuestions, currentQuestionIndex) {
    const questionCount = visibleQuestions.length;

    if (questionCount === 0) {
        return [];
    }

    if (questionCount === 1) {
        return [createQuestionDotEntry("only-question", 0, visibleQuestions[0])];
    }

    const firstQuestionIndex = 0;
    const lastQuestionIndex = questionCount - 1;
    const questionIndexes = currentQuestionIndex <= firstQuestionIndex || currentQuestionIndex >= lastQuestionIndex
        ? [firstQuestionIndex, lastQuestionIndex]
        : [firstQuestionIndex, currentQuestionIndex, lastQuestionIndex];

    return createQuestionDotEntriesFromAnchoredIndexes(visibleQuestions, questionIndexes);
}

function getAnchoredCompactQuestionIndexes(questionCount, currentQuestionIndex, visibleDotCount) {
    if (questionCount <= visibleDotCount) {
        return createQuestionIndexRange(0, questionCount - 1);
    }

    const firstQuestionIndex = 0;
    const lastQuestionIndex = questionCount - 1;
    const middleVisibleDotCount = visibleDotCount - 2;
    const firstMiddleQuestionIndex = firstQuestionIndex + 1;
    const lastMiddleQuestionIndex = lastQuestionIndex - 1;
    const centeredMiddleStartIndex = currentQuestionIndex - Math.floor(middleVisibleDotCount / 2);
    const latestMiddleStartIndex = lastMiddleQuestionIndex - middleVisibleDotCount + 1;
    const middleStartIndex = clampNumber(
        centeredMiddleStartIndex,
        firstMiddleQuestionIndex,
        latestMiddleStartIndex
    );
    const middleEndIndex = middleStartIndex + middleVisibleDotCount - 1;

    return [
        firstQuestionIndex,
        ...createQuestionIndexRange(middleStartIndex, middleEndIndex),
        lastQuestionIndex
    ];
}

function createQuestionDotEntriesFromAnchoredIndexes(visibleQuestions, questionIndexes) {
    const questionDotEntries = [];

    questionIndexes.forEach((questionIndex, visibleIndex) => {
        const previousQuestionIndex = questionIndexes[visibleIndex - 1];

        if (previousQuestionIndex !== undefined && questionIndex - previousQuestionIndex > 1) {
            questionDotEntries.push(createQuestionEllipsisEntry(
                `hidden-${previousQuestionIndex + 1}-to-${questionIndex - 1}`
            ));
        }

        questionDotEntries.push(createQuestionDotEntry(
            getQuestionDotKeyPrefix(questionIndex, visibleQuestions.length),
            questionIndex,
            visibleQuestions[questionIndex]
        ));
    });

    return questionDotEntries;
}

function getQuestionDotKeyPrefix(questionIndex, questionCount) {
    if (questionIndex === 0) {
        return "first-question";
    }

    if (questionIndex === questionCount - 1) {
        return "last-question";
    }

    return "visible-question";
}

function createQuestionIndexRange(startIndex, endIndex) {
    const questionIndexes = [];

    for (let questionIndex = startIndex; questionIndex <= endIndex; questionIndex += 1) {
        questionIndexes.push(questionIndex);
    }

    return questionIndexes;
}

function createQuestionDotEntry(keyPrefix, questionIndex, question) {
    return {
        type: "dot",
        key: `${keyPrefix}-${question?.id ?? questionIndex}`,
        questionIndex
    };
}

function createQuestionEllipsisEntry(key) {
    return {
        type: "ellipsis",
        key
    };
}

function clampNumber(number, minimum, maximum) {
    return Math.min(Math.max(number, minimum), maximum);
}