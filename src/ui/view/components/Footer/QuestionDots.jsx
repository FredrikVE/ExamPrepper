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
    const questionCount = visibleQuestions.length;

    if (questionCount <= FILLED_COMPACT_VISIBLE_DOT_COUNT) {
        return visibleQuestions.map((question, questionIndex) => (
            createQuestionDotEntry(`visible-${questionIndex}`, questionIndex, question)
        ));
    }

    const firstQuestionIndex = 0;
    const lastQuestionIndex = questionCount - 1;
    const visibleDotSlotsBetweenEdges = FILLED_COMPACT_VISIBLE_DOT_COUNT - 2;
    const firstWindowStartIndex = firstQuestionIndex + 1;
    const lastWindowEndIndex = lastQuestionIndex - 1;
    const centeredWindowStartIndex = currentQuestionIndex - Math.floor(visibleDotSlotsBetweenEdges / 2);
    const maxWindowStartIndex = lastWindowEndIndex - visibleDotSlotsBetweenEdges + 1;
    const windowStartIndex = clampNumber(centeredWindowStartIndex, firstWindowStartIndex, maxWindowStartIndex);
    const windowEndIndex = windowStartIndex + visibleDotSlotsBetweenEdges - 1;
    const questionDotEntries = [createQuestionDotEntry("first", firstQuestionIndex, visibleQuestions[firstQuestionIndex])];

    if (windowStartIndex > firstWindowStartIndex) {
        questionDotEntries.push(createQuestionEllipsisEntry("hidden-before-window"));
    }

    for (let questionIndex = windowStartIndex; questionIndex <= windowEndIndex; questionIndex += 1) {
        questionDotEntries.push(createQuestionDotEntry("window", questionIndex, visibleQuestions[questionIndex]));
    }

    if (windowEndIndex < lastWindowEndIndex) {
        questionDotEntries.push(createQuestionEllipsisEntry("hidden-after-window"));
    }

    questionDotEntries.push(createQuestionDotEntry("last", lastQuestionIndex, visibleQuestions[lastQuestionIndex]));

    return questionDotEntries;
}

function getMinimalCompactQuestionDotEntries(visibleQuestions, currentQuestionIndex) {
    const questionCount = visibleQuestions.length;

    if (questionCount === 0) {
        return [];
    }

    if (questionCount === 1) {
        return [createQuestionDotEntry("current", 0, visibleQuestions[0])];
    }

    const firstQuestionIndex = 0;
    const lastQuestionIndex = questionCount - 1;

    if (currentQuestionIndex <= firstQuestionIndex) {
        return [
            createQuestionDotEntry("current", firstQuestionIndex, visibleQuestions[firstQuestionIndex]),
            createQuestionEllipsisEntry("hidden-after-current"),
            createQuestionDotEntry("last", lastQuestionIndex, visibleQuestions[lastQuestionIndex])
        ];
    }

    if (currentQuestionIndex >= lastQuestionIndex) {
        return [
            createQuestionDotEntry("first", firstQuestionIndex, visibleQuestions[firstQuestionIndex]),
            createQuestionEllipsisEntry("hidden-before-current"),
            createQuestionDotEntry("current", lastQuestionIndex, visibleQuestions[lastQuestionIndex])
        ];
    }

    return [
        createQuestionDotEntry("first", firstQuestionIndex, visibleQuestions[firstQuestionIndex]),
        createQuestionEllipsisEntry("hidden-before-current"),
        createQuestionDotEntry("current", currentQuestionIndex, visibleQuestions[currentQuestionIndex]),
        createQuestionEllipsisEntry("hidden-after-current"),
        createQuestionDotEntry("last", lastQuestionIndex, visibleQuestions[lastQuestionIndex])
    ];
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
