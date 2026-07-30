//src/navigation/navigation.js
export const NAV_SCREENS = {
	SUBJECTS: "subjects",
	SELECT: "select",
	EXAM: "exam",
	FLIPCARDS: "flipcards",
	MATCHCARDS: "matchcards",
	GLOSSARY: "glossary",
	OVERVIEW: "overview",
	LEARNING_PATH: "learningPath",
	LEARNING_SESSION: "learningSession"
};

export const SCREEN_CONFIG = {
	[NAV_SCREENS.SUBJECTS]: {
		requiresSubject: false,
		requiresExam: false,
		backTo: null,
		showsSubjectSwitcher: false,
		pageClassName: "exam-select-page",
		shellClassName: "exam-select-shell"
	},
	[NAV_SCREENS.SELECT]: {
		requiresSubject: true,
		requiresExam: false,
		backTo: NAV_SCREENS.SUBJECTS,
		showsSubjectSwitcher: true,
		pageClassName: "exam-select-page",
		shellClassName: "exam-select-shell"
	},
	[NAV_SCREENS.EXAM]: {
		requiresSubject: true,
		requiresExam: true,
		backTo: NAV_SCREENS.SELECT,
		showsSubjectSwitcher: true,
		pageClassName: "exam-page",
		shellClassName: "exam-shell"
	},
	[NAV_SCREENS.FLIPCARDS]: {
		requiresSubject: true,
		requiresExam: false,
		backTo: NAV_SCREENS.SELECT,
		showsSubjectSwitcher: true,
		pageClassName: "exam-page flipcards-theme-scope",
		shellClassName: "exam-shell"
	},
	[NAV_SCREENS.MATCHCARDS]: {
		requiresSubject: true,
		requiresExam: false,
		backTo: NAV_SCREENS.SELECT,
		showsSubjectSwitcher: true,
		pageClassName: "exam-page flipcards-theme-scope",
		shellClassName: "exam-shell"
	},
	[NAV_SCREENS.GLOSSARY]: {
		requiresSubject: true,
		requiresExam: false,
		backTo: NAV_SCREENS.SUBJECTS,
		showsSubjectSwitcher: true,
		pageClassName: "exam-select-page",
		shellClassName: "exam-select-shell"
	},
	[NAV_SCREENS.LEARNING_PATH]: {
		requiresSubject: true,
		requiresExam: false,
		backTo: NAV_SCREENS.SELECT,
		showsSubjectSwitcher: true,
		pageClassName: "exam-select-page",
		shellClassName: "exam-select-shell"
	},
	[NAV_SCREENS.LEARNING_SESSION]: {
		requiresSubject: true,
		requiresExam: false,
		backTo: NAV_SCREENS.LEARNING_PATH,
		showsSubjectSwitcher: false,
		pageClassName: "exam-page",
		shellClassName: "exam-shell"
	},
	[NAV_SCREENS.OVERVIEW]: {
		requiresSubject: false,
		requiresExam: false,
		backTo: NAV_SCREENS.SELECT,
		showsSubjectSwitcher: false,
		pageClassName: "exam-select-page",
		shellClassName: "exam-select-shell"
	}
};

export function getScreenConfig(screen) {
	const screenConfig = SCREEN_CONFIG[screen];

	if (screenConfig === undefined) {
		throw new Error(`Unknown navigation screen: ${String(screen)}`);
	}

	return screenConfig;
}

export const LEARNING_CONTENT_TYPES = {
	EXAMS: "exams",
	FLIPCARDS: "flipcards",
	MATCHCARDS: "matchcards",
	GLOSSARY: "glossary",
	LEARNING_PATH: "learning-path"
};

export const TEST_TYPES = {
	CHAPTER_TEST: "chapter-test",
	EXAM: "exam"
};

export const NAV_ITEMS = {
	sidebarItems: [
		{
			id: "subjects",
			section: "primary",
			screen: NAV_SCREENS.SUBJECTS,
			labelKey: "sidebarSubjects",
			iconKey: "home",
			activeScreens: [NAV_SCREENS.SUBJECTS],
			hiddenOnScreens: [NAV_SCREENS.SUBJECTS]
		},
		{
			id: "overview",
			section: "secondary",
			screen: NAV_SCREENS.OVERVIEW,
			labelKey: "sidebarStatistics",
			iconKey: "bar-chart-3",
			activeScreens: [NAV_SCREENS.OVERVIEW],
			hiddenOnScreens: []
		}
	],

	toggleButtonItems: [
		{
			id: LEARNING_CONTENT_TYPES.LEARNING_PATH,
			contentTypeId: LEARNING_CONTENT_TYPES.LEARNING_PATH,
			testType: null,
			labelKey: "contentToggleLearningPathDesktopLabel",
			titleKey: null,
			subtitleKey: null,
			subtitleFallbackKey: null,
			searchPlaceholderKey: null,
			targetScreen: NAV_SCREENS.LEARNING_PATH,
			isDisabled: false
		},
		{
			id: LEARNING_CONTENT_TYPES.GLOSSARY,
			contentTypeId: LEARNING_CONTENT_TYPES.GLOSSARY,
			testType: null,
			labelKey: "contentToggleGlossaryLabel",
			titleKey: "selectGlossaryTitle",
			subtitleKey: "selectGlossariesSubtitle",
			subtitleFallbackKey: "selectGlossariesSubtitleFallback",
			searchPlaceholderKey: "glossarySearchPlaceholder",
			targetScreen: NAV_SCREENS.GLOSSARY,
			isDisabled: false
		},
		{
			id: LEARNING_CONTENT_TYPES.FLIPCARDS,
			contentTypeId: LEARNING_CONTENT_TYPES.FLIPCARDS,
			testType: null,
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
			contentTypeId: LEARNING_CONTENT_TYPES.MATCHCARDS,
			testType: null,
			labelKey: "contentToggleMatchCardsLabel",
			titleKey: "selectMatchCardsTitle",
			subtitleKey: "selectMatchCardsSubtitle",
			subtitleFallbackKey: "selectMatchCardsSubtitleFallback",
			searchPlaceholderKey: "matchCardsSearchPlaceholder",
			targetScreen: NAV_SCREENS.SELECT,
			isDisabled: false
		},
		{
			id: TEST_TYPES.CHAPTER_TEST,
			contentTypeId: LEARNING_CONTENT_TYPES.EXAMS,
			testType: TEST_TYPES.CHAPTER_TEST,
			labelKey: "contentToggleChapterTestsLabel",
			titleKey: "selectChapterTestsTitle",
			subtitleKey: "selectChapterTestsSubtitle",
			subtitleFallbackKey: "selectChapterTestsSubtitleFallback",
			searchPlaceholderKey: "examSearchPlaceholder",
			targetScreen: NAV_SCREENS.SELECT,
			isDisabled: false
		},
		{
			id: LEARNING_CONTENT_TYPES.EXAMS,
			contentTypeId: LEARNING_CONTENT_TYPES.EXAMS,
			testType: TEST_TYPES.EXAM,
			labelKey: "contentToggleExamsLabel",
			titleKey: "selectExamsTitle",
			subtitleKey: "selectExamsSubtitle",
			subtitleFallbackKey: "selectExamsSubtitleFallback",
			searchPlaceholderKey: "examSearchPlaceholder",
			targetScreen: NAV_SCREENS.SELECT,
			isDisabled: false
		}
	],

	mobileToggleEntryItems: [],

	mobileToggleButtonItems: [
		{
			id: LEARNING_CONTENT_TYPES.LEARNING_PATH,
			labelKey: "contentToggleLearningPathLabel",
			contentTypeId: LEARNING_CONTENT_TYPES.LEARNING_PATH,
			entryIds: [],
			isDisabled: false
		},
		{
			id: "practice",
			labelKey: "contentTogglePracticeLabel",
			contentTypeId: null,
			entryIds: [
				LEARNING_CONTENT_TYPES.GLOSSARY,
				LEARNING_CONTENT_TYPES.FLIPCARDS,
				LEARNING_CONTENT_TYPES.MATCHCARDS
			],
			isDisabled: false
		},
		{
			id: "tests",
			labelKey: "contentToggleTestsLabel",
			contentTypeId: null,
			entryIds: [
				TEST_TYPES.CHAPTER_TEST,
				LEARNING_CONTENT_TYPES.EXAMS
			],
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
