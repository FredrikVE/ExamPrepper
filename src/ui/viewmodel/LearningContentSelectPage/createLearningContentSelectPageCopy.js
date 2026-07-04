// src/ui/viewmodel/LearningContentSelectPage/createLearningContentSelectPageCopy.js
import { LEARNING_CONTENT_ENTRIES, LEARNING_CONTENT_TYPES } from "../../../navigation/learningContent.js";

function createLearningContentSelectSubtitle(t, selectedSubject, activeContentType) {
    const activeEntry = findLearningContentEntry(activeContentType);

    if (!selectedSubject?.code) {
        return getSubtitleFallback(t, activeEntry);
    }

    const subtitleFactory = t[activeEntry?.subtitleKey];

    if (typeof subtitleFactory === "function") {
        return subtitleFactory(selectedSubject.code);
    }

    return t.selectSubtitle(selectedSubject.code);
}

function getSubtitleFallback(t, activeEntry) {
    const fallback = t[activeEntry?.subtitleFallbackKey];

    if (fallback) {
        return fallback;
    }

    return t.selectSubtitleFallback;
}

function findLearningContentEntry(activeContentType) {
    for (const entry of LEARNING_CONTENT_ENTRIES) {
        if (entry.id === activeContentType) {
            return entry;
        }
    }

    for (const entry of LEARNING_CONTENT_ENTRIES) {
        if (entry.id === LEARNING_CONTENT_TYPES.EXAMS) {
            return entry;
        }
    }

    return null;
}

export default function createLearningContentSelectPageCopy(
    t,
    selectedSubject,
    activeContentType = LEARNING_CONTENT_TYPES.EXAMS
) {
    return {
        title: t.selectIntroTitle,
        subtitle: createLearningContentSelectSubtitle(t, selectedSubject, activeContentType),
        loadingMessage: t.selectLoadingMessage,
        emptyTitle: t.selectEmptyTitle,
        emptyMessage: t.selectEmptyMessage,
        practiceExamLabel: t.selectPracticeExamLabel,
        questionLabel: t.selectQuestionLabel,
        minuteLabel: t.selectMinuteLabel
    };
}
