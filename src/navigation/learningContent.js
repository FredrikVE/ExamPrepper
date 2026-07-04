// src/navigation/learningContent.js
import { PAGE_TOOL_AVAILABILITY } from "./pageTools.js";

export const LEARNING_CONTENT_TYPES = {
    EXAMS: "exams",
    FLIPCARDS: "flipcards",
    CONCEPT_LISTS: "concept-lists"
};

export const LEARNING_CONTENT_ENTRIES = [
    {
        id: LEARNING_CONTENT_TYPES.EXAMS,
        labelKey: "contentToggleExamsLabel",
        searchPlaceholderKey: "examSearchPlaceholder",
        subtitleKey: "selectExamsSubtitle",
        subtitleFallbackKey: "selectExamsSubtitleFallback",
        availability: PAGE_TOOL_AVAILABILITY.AVAILABLE
    },
    {
        id: LEARNING_CONTENT_TYPES.FLIPCARDS,
        labelKey: "contentToggleFlipcardsLabel",
        searchPlaceholderKey: "flipcardsSearchPlaceholder",
        subtitleKey: "selectFlipcardsSubtitle",
        subtitleFallbackKey: "selectFlipcardsSubtitleFallback",
        availability: PAGE_TOOL_AVAILABILITY.AVAILABLE
    },
    {
        id: LEARNING_CONTENT_TYPES.CONCEPT_LISTS,
        labelKey: "contentToggleConceptListsLabel",
        searchPlaceholderKey: "conceptListSearchPlaceholder",
        subtitleKey: "selectGlossariesSubtitle",
        subtitleFallbackKey: "selectGlossariesSubtitleFallback",
        availability: PAGE_TOOL_AVAILABILITY.UNAVAILABLE
    }
];
