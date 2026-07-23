// src/ui/pageTools/pageTools.js
export const PAGE_TOOL_ICON_KEYS = {
	BAR_CHART_3: "bar-chart-3",
	BOOK_OPEN: "book-open",
	BUG: "bug",
	CHEVRON_LEFT: "chevron-left",
	CHEVRON_RIGHT: "chevron-right",
	CLOCK_3: "clock-3",
	FILE_TEXT: "file-text",
	FINGERPRINT: "fingerprint",
	GALLERY_HORIZONTAL_END: "gallery-horizontal-end",
	KEY: "key",
	LEAF: "leaf",
	LIST: "list",
	NETWORK: "network",
	PANELS_TOP_LEFT: "panels-top-left",
	PIE_CHART: "pie-chart",
	PLUS: "plus",
	REFRESH_CW: "refresh-cw",
	ROTATE_CCW: "rotate-ccw",
	SEND: "send",
	SHIELD_CHECK: "shield-check",
	SHUFFLE: "shuffle",
	SPARKLES: "sparkles",
	TOOLBOX: "toolbox",
	USER_COG: "user-cog"
};

export const PAGE_TOOL_ITEM_IDS = {
	APP_CREATE_SUBJECT: "app-create-subject",
	APP_IMPORT_SUBJECT_MATERIALS: "app-import-subject-materials",
	FLIPCARDS_ALL_CARDS: "all-cards",
	FLIPCARDS_SHUFFLE: "shuffle",
	FLIPCARDS_REPEAT_DIFFICULT: "repeat-difficult",
	FLIPCARDS_ADD_CARD: "add-card"
};

export const SUBJECT_SELECT_PAGE_TOOLS = {
	id: "subject-select",
	titleKey: "pageToolsSubjectWorkspaceTitle",
	subtitleKey: "pageToolsWorkspaceSubtitle",
	actionsLabelKey: "pageToolsWorkspaceActionsLabel",
	items: [
		{
			id: PAGE_TOOL_ITEM_IDS.APP_CREATE_SUBJECT,
			labelKey: "pageToolsCreateSubjectLabel",
			iconKey: PAGE_TOOL_ICON_KEYS.PLUS,
			isDisabled: true
		},
		{
			id: PAGE_TOOL_ITEM_IDS.APP_IMPORT_SUBJECT_MATERIALS,
			labelKey: "pageToolsImportSubjectMaterialsLabel",
			iconKey: PAGE_TOOL_ICON_KEYS.FILE_TEXT,
			isDisabled: true
		}
	]
};

export const LEARNING_CONTENT_SELECT_PAGE_TOOLS = {
	id: "learning-content-select",
	titleKey: "pageToolsWorkspaceTitle",
	subtitleKey: "pageToolsWorkspaceSubtitle",
	actionsLabelKey: "pageToolsWorkspaceActionsLabel",
	items: [
		{
			id: PAGE_TOOL_ITEM_IDS.APP_IMPORT_SUBJECT_MATERIALS,
			labelKey: "pageToolsImportSubjectMaterialsLabel",
			iconKey: PAGE_TOOL_ICON_KEYS.FILE_TEXT,
			isDisabled: true
		}
	]
};

export const FLIPCARDS_PAGE_TOOLS = {
	id: "flipcards",
	titleKey: "flipcardsToolMenuTitle",
	subtitleKey: "flipcardsToolMenuSubtitle",
	actionsLabelKey: "flipcardsToolMenuActionsLabel",
	items: [
		{
			id: PAGE_TOOL_ITEM_IDS.FLIPCARDS_ALL_CARDS,
			labelKey: "flipcardsToolMenuAllCardsLabel",
			viewModelLabelKey: "toolMenuAllCardsLabel",
			iconKey: PAGE_TOOL_ICON_KEYS.LIST,
			isDisabled: false
		},
		{
			id: PAGE_TOOL_ITEM_IDS.FLIPCARDS_SHUFFLE,
			labelKey: "flipcardsToolMenuShuffleLabel",
			viewModelLabelKey: "toolMenuShuffleLabel",
			iconKey: PAGE_TOOL_ICON_KEYS.SHUFFLE,
			isDisabled: false
		},
		{
			id: PAGE_TOOL_ITEM_IDS.FLIPCARDS_REPEAT_DIFFICULT,
			labelKey: "flipcardsToolMenuRepeatDifficultLabel",
			viewModelLabelKey: "toolMenuRepeatDifficultLabel",
			iconKey: PAGE_TOOL_ICON_KEYS.REFRESH_CW,
			isDisabled: false
		},
		{
			id: PAGE_TOOL_ITEM_IDS.FLIPCARDS_ADD_CARD,
			labelKey: "flipcardsToolMenuAddCardLabel",
			viewModelLabelKey: "toolMenuAddCardLabel",
			iconKey: PAGE_TOOL_ICON_KEYS.PLUS,
			isDisabled: true
		}
	]
};
