// src/ui/view/components/Footer/QuestionDots.jsx
import QuestionDot from "./QuestionDot.jsx";

const COMPACT_DOT_QUESTION_THRESHOLD = 25;
const RESPONSIVE_COMPACT_DOT_QUESTION_THRESHOLD = 12;
const FILLED_COMPACT_VISIBLE_DOT_COUNT = 15;

export default function QuestionDots({ viewModel, t }) {
    const questionCount = viewModel.visibleQuestions.length;
    const shouldUseCompactDotsByQuestionCount = questionCount > COMPACT_DOT_QUESTION_THRESHOLD;
    const shouldAllowResponsiveCompactDots = questionCount > RESPONSIVE_COMPACT_DOT_QUESTION_THRESHOLD;
    const questionDotsClassName = getQuestionDotsClassName(
        shouldUseCompactDotsByQuestionCount,
        shouldAllowResponsiveCompactDots
    );
    const filledCompactQuestionDotEntries = getFilledCompactQuestionDotEntries(
        viewModel.visibleQuestions,
        viewModel.currentQuestionIndex
    );
    const minimalCompactQuestionDotEntries = getMinimalCompactQuestionDotEntries(
        viewModel.visibleQuestions,
        viewModel.currentQuestionIndex
    );

    return (
        <div className={questionDotsClassName} role="navigation" aria-label={t.footerQuestionNavigationLabel}>
            <div className="exam-footer-dot-list exam-footer-dot-list-normal">
                {viewModel.visibleQuestions.map((question, questionIndex) => (
                    <QuestionDot
                        key={question.id}
                        questionNumber={questionIndex + 1}
                        isActive={questionIndex === viewModel.currentQuestionIndex}
                        submitted={viewModel.submitted}
                        isCorrect={viewModel.submitted ? viewModel.isAnswerCorrect(question) : false}
                        onClick={() => viewModel.goToQuestion(questionIndex)}
                        t={t}
                    />
                ))}
            </div>

            <div className="exam-footer-dot-list exam-footer-dot-list-filled-compact">
                {filledCompactQuestionDotEntries.map((questionDotEntry) => renderQuestionDotEntry(
                    questionDotEntry,
                    viewModel,
                    t,
                    "filled-compact"
                ))}
            </div>

            <div className="exam-footer-dot-list exam-footer-dot-list-compact">
                {minimalCompactQuestionDotEntries.map((questionDotEntry) => renderQuestionDotEntry(
                    questionDotEntry,
                    viewModel,
                    t,
                    "compact"
                ))}
            </div>
        </div>
    );
}

function renderQuestionDotEntry(questionDotEntry, viewModel, t, dotVariant) {
    if (questionDotEntry.type === "ellipsis") {
        return (
            <span
                key={questionDotEntry.key}
                className={`exam-footer-dot-ellipsis exam-footer-dot-ellipsis-${dotVariant}`}
                aria-hidden="true"
            >
                …
            </span>
        );
    }

    return (
        <QuestionDot
            key={questionDotEntry.key}
            questionNumber={questionDotEntry.questionIndex + 1}
            isActive={questionDotEntry.questionIndex === viewModel.currentQuestionIndex}
            submitted={false}
            isCorrect={false}
            onClick={() => viewModel.goToQuestion(questionDotEntry.questionIndex)}
            t={t}
            variant={dotVariant}
        />
    );
}

function getQuestionDotsClassName(shouldUseCompactDotsByQuestionCount, shouldAllowResponsiveCompactDots) {
    const classNames = ["exam-footer-dots"];

    if (shouldUseCompactDotsByQuestionCount) {
        classNames.push("exam-footer-dots-compact-by-count");
    }

    if (shouldAllowResponsiveCompactDots) {
        classNames.push("exam-footer-dots-responsive-compact");
    }

    return classNames.join(" ");
}

function getFilledCompactQuestionDotEntries(visibleQuestions, currentQuestionIndex) {
    const questionIndexes = getAnchoredCompactQuestionIndexes(
        visibleQuestions.length,
        currentQuestionIndex,
        FILLED_COMPACT_VISIBLE_DOT_COUNT
    );

    return createQuestionDotEntriesFromAnchoredIndexes(visibleQuestions, questionIndexes);
}

function getMinimalCompactQuestionDotEntries(visibleQuestions, currentQuestionIndex) {
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