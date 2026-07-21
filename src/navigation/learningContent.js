// src/navigation/learningContent.js
import { PAGE_TOOL_AVAILABILITY } from "./pageTools.js";

export const LEARNING_CONTENT_TYPES = {
    EXAMS: "exams",
    FLIPCARDS: "flipcards",
    MATCHCARDS: "matchcards",
    GLOSSARY: "glossary"
};

export const LEARNING_CONTENT_ENTRIES = [
    {
        id: LEARNING_CONTENT_TYPES.EXAMS,
        labelKey: "contentToggleExamsLabel",
        titleKey: "selectExamsTitle",
        searchPlaceholderKey: "examSearchPlaceholder",
        subtitleKey: "selectExamsSubtitle",
        subtitleFallbackKey: "selectExamsSubtitleFallback",
        availability: PAGE_TOOL_AVAILABILITY.AVAILABLE
    },
    {
        id: LEARNING_CONTENT_TYPES.FLIPCARDS,
        labelKey: "contentToggleFlipcardsLabel",
        titleKey: "selectFlipcardsTitle",
        searchPlaceholderKey: "flipcardsSearchPlaceholder",
        subtitleKey: "selectFlipcardsSubtitle",
        subtitleFallbackKey: "selectFlipcardsSubtitleFallback",
        availability: PAGE_TOOL_AVAILABILITY.AVAILABLE
    },
    {
        id: LEARNING_CONTENT_TYPES.MATCHCARDS,
        labelKey: "contentToggleMatchCardsLabel",
        titleKey: "selectMatchCardsTitle",
        searchPlaceholderKey: "matchCardsSearchPlaceholder",
        subtitleKey: "selectMatchCardsSubtitle",
        subtitleFallbackKey: "selectMatchCardsSubtitleFallback",
        availability: PAGE_TOOL_AVAILABILITY.AVAILABLE
    },
    {
        id: LEARNING_CONTENT_TYPES.GLOSSARY,
        labelKey: "contentToggleGlossaryLabel",
        titleKey: "selectGlossaryTitle",
        searchPlaceholderKey: "glossarySearchPlaceholder",
        subtitleKey: "selectGlossariesSubtitle",
        subtitleFallbackKey: "selectGlossariesSubtitleFallback",
        availability: PAGE_TOOL_AVAILABILITY.AVAILABLE
    }
];

export function createLearningContentToggleEntries(t) {
    return LEARNING_CONTENT_ENTRIES.map((entry) => ({
        id: entry.id,
        label: t[entry.labelKey],
        isDisabled: entry.availability === PAGE_TOOL_AVAILABILITY.UNAVAILABLE
    }));
}
