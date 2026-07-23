// src/navigation/learningContent.js
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
		subtitleFallbackKey: "selectExamsSubtitleFallback"
	},
	{
		id: LEARNING_CONTENT_TYPES.FLIPCARDS,
		labelKey: "contentToggleFlipcardsLabel",
		titleKey: "selectFlipcardsTitle",
		searchPlaceholderKey: "flipcardsSearchPlaceholder",
		subtitleKey: "selectFlipcardsSubtitle",
		subtitleFallbackKey: "selectFlipcardsSubtitleFallback"
	},
	{
		id: LEARNING_CONTENT_TYPES.MATCHCARDS,
		labelKey: "contentToggleMatchCardsLabel",
		titleKey: "selectMatchCardsTitle",
		searchPlaceholderKey: "matchCardsSearchPlaceholder",
		subtitleKey: "selectMatchCardsSubtitle",
		subtitleFallbackKey: "selectMatchCardsSubtitleFallback"
	},
	{
		id: LEARNING_CONTENT_TYPES.GLOSSARY,
		labelKey: "contentToggleGlossaryLabel",
		titleKey: "selectGlossaryTitle",
		searchPlaceholderKey: "glossarySearchPlaceholder",
		subtitleKey: "selectGlossariesSubtitle",
		subtitleFallbackKey: "selectGlossariesSubtitleFallback"
	}
];
