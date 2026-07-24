// src/navigation/navigation.js
export const NAV_SCREENS = {
	SUBJECTS: "subjects",
	SELECT: "select",
	EXAM: "exam",
	FLIPCARDS: "flipcards",
	MATCHCARDS: "matchcards",
	GLOSSARY: "glossary",
	OVERVIEW: "overview"
};

export const LEARNING_CONTENT_TYPES = {
	EXAMS: "exams",
	FLIPCARDS: "flipcards",
	MATCHCARDS: "matchcards",
	GLOSSARY: "glossary"
};

export const NAV_ITEMS = {
	sidebarItems: [
		{
			id: "subjects",
			section: "primary",
			screen: NAV_SCREENS.SUBJECTS,
			labelKey: "sidebarSubjects",
			fallbackLabel: "Velg fag fra hjemskjerm",
			iconKey: "home",
			activeScreens: [NAV_SCREENS.SUBJECTS]
		},
		{
			id: "overview",
			section: "secondary",
			screen: NAV_SCREENS.OVERVIEW,
			labelKey: "sidebarStatistics",
			fallbackLabel: "Din statistikk",
			iconKey: "bar-chart-3",
			activeScreens: [NAV_SCREENS.OVERVIEW]
		}
	],

	toggleButtonItems: [
		{
			id: LEARNING_CONTENT_TYPES.EXAMS,
			labelKey: "contentToggleExamsLabel",
			titleKey: "selectExamsTitle",
			subtitleKey: "selectExamsSubtitle",
			subtitleFallbackKey: "selectExamsSubtitleFallback",
			searchPlaceholderKey: "examSearchPlaceholder",
			targetScreen: NAV_SCREENS.SELECT,
			isDisabled: false
		},
		{
			id: LEARNING_CONTENT_TYPES.FLIPCARDS,
			labelKey: "contentToggleFlipcardsLabel",
			titleKey: "selectFlipcardsTitle",
			subtitleKey: "selectFlipcardsSubtitle",
			subtitleFallbackKey: "selectFlipcardsSubtitleFallback",
			searchPlaceholderKey: "flipcardsSearchPlaceholder",
			targetScreen: NAV_SCREENS.SELECT,
			isDisabled: false
		},
		{
			id: LEARNING_CONTENT_TYPES.MATCHCARDS,
			labelKey: "contentToggleMatchCardsLabel",
			titleKey: "selectMatchCardsTitle",
			subtitleKey: "selectMatchCardsSubtitle",
			subtitleFallbackKey: "selectMatchCardsSubtitleFallback",
			searchPlaceholderKey: "matchCardsSearchPlaceholder",
			targetScreen: NAV_SCREENS.SELECT,
			isDisabled: false
		},
		{
			id: LEARNING_CONTENT_TYPES.GLOSSARY,
			labelKey: "contentToggleGlossaryLabel",
			titleKey: "selectGlossaryTitle",
			subtitleKey: "selectGlossariesSubtitle",
			subtitleFallbackKey: "selectGlossariesSubtitleFallback",
			searchPlaceholderKey: "glossarySearchPlaceholder",
			targetScreen: NAV_SCREENS.GLOSSARY,
			isDisabled: false
		}
	],

	popOutMenuItems: {
		[NAV_SCREENS.SUBJECTS]: {
			id: "subject-select",
			titleKey: "pageToolsSubjectWorkspaceTitle",
			subtitleKey: "pageToolsWorkspaceSubtitle",
			actionsLabelKey: "pageToolsWorkspaceActionsLabel",
			items: [
				{
					id: "app-create-subject",
					labelKey: "pageToolsCreateSubjectLabel",
					iconKey: "plus",
					isDisabled: true,
					onSelect: null
				},
				{
					id: "app-import-subject-materials",
					labelKey: "pageToolsImportSubjectMaterialsLabel",
					iconKey: "file-text",
					isDisabled: true,
					onSelect: null
				}
			]
		},

		[NAV_SCREENS.SELECT]: {
			id: "learning-content-select",
			titleKey: "pageToolsWorkspaceTitle",
			subtitleKey: "pageToolsWorkspaceSubtitle",
			actionsLabelKey: "pageToolsWorkspaceActionsLabel",
			items: [
				{
					id: "app-import-subject-materials",
					labelKey: "pageToolsImportSubjectMaterialsLabel",
					iconKey: "file-text",
					isDisabled: true,
					onSelect: null
				}
			]
		},

		[NAV_SCREENS.FLIPCARDS]: {
			id: "flipcards",
			titleKey: "flipcardsToolMenuTitle",
			subtitleKey: "flipcardsToolMenuSubtitle",
			actionsLabelKey: "flipcardsToolMenuActionsLabel",
			items: [
				{
					id: "all-cards",
					labelKey: "flipcardsToolMenuAllCardsLabel",
					iconKey: "list",
					isDisabled: false,
					onSelect: null
				},
				{
					id: "shuffle",
					labelKey: "flipcardsToolMenuShuffleLabel",
					iconKey: "shuffle",
					isDisabled: false,
					onSelect: null
				},
				{
					id: "repeat-difficult",
					labelKey: "flipcardsToolMenuRepeatDifficultLabel",
					iconKey: "refresh-cw",
					isDisabled: false,
					onSelect: null
				},
				{
					id: "add-card",
					labelKey: "flipcardsToolMenuAddCardLabel",
					iconKey: "plus",
					isDisabled: true,
					onSelect: null
				}
			]
		}
	}
};
