import { describe, expect, test } from "@jest/globals";
import {
	FLIPCARDS_PAGE_TOOLS,
	LEARNING_CONTENT_SELECT_PAGE_TOOLS,
	PAGE_TOOL_ICON_KEYS,
	PAGE_TOOL_ITEM_IDS,
	SUBJECT_SELECT_PAGE_TOOLS
} from "../../src/ui/pageTools/pageTools.js";
import { FLIPCARD_DECK_TOOL_KEYS, FLIPCARD_DECK_TOOLS } from "../../src/ui/viewmodel/FlipcardsPage/flipcardDeckTools.js";

describe("pageTools", () => {
	test("exports the two workspace definitions directly", () => {
		expect(SUBJECT_SELECT_PAGE_TOOLS.items.map((item) => item.id)).toEqual([
			PAGE_TOOL_ITEM_IDS.APP_CREATE_SUBJECT,
			PAGE_TOOL_ITEM_IDS.APP_IMPORT_SUBJECT_MATERIALS
		]);
		expect(LEARNING_CONTENT_SELECT_PAGE_TOOLS.items.map((item) => item.id)).toEqual([
			PAGE_TOOL_ITEM_IDS.APP_IMPORT_SUBJECT_MATERIALS
		]);
	});

	test("marks unavailable workspace actions with a boolean", () => {
		expect(SUBJECT_SELECT_PAGE_TOOLS.items.every((item) => item.isDisabled)).toBe(true);
		expect(LEARNING_CONTENT_SELECT_PAGE_TOOLS.items.every((item) => item.isDisabled)).toBe(true);
	});

	test("keeps the Flipcards adapter stable", () => {
		expect(FLIPCARD_DECK_TOOL_KEYS).toEqual({
			ALL_CARDS: PAGE_TOOL_ITEM_IDS.FLIPCARDS_ALL_CARDS,
			SHUFFLE: PAGE_TOOL_ITEM_IDS.FLIPCARDS_SHUFFLE,
			REPEAT_DIFFICULT: PAGE_TOOL_ITEM_IDS.FLIPCARDS_REPEAT_DIFFICULT,
			ADD_CARD: PAGE_TOOL_ITEM_IDS.FLIPCARDS_ADD_CARD
		});

		expect(FLIPCARD_DECK_TOOLS.map((tool) => tool.key)).toEqual(
		FLIPCARDS_PAGE_TOOLS.items.map((tool) => tool.id)
	);
	expect(FLIPCARD_DECK_TOOLS.map((tool) => tool.iconKey)).toEqual([
		PAGE_TOOL_ICON_KEYS.LIST,
		PAGE_TOOL_ICON_KEYS.SHUFFLE,
		PAGE_TOOL_ICON_KEYS.REFRESH_CW,
		PAGE_TOOL_ICON_KEYS.PLUS
	]);
		expect(FLIPCARD_DECK_TOOLS.at(-1).unavailable).toBe(true);
	});

	test("does not keep unused screen-routing metadata", () => {
		for (const definition of [SUBJECT_SELECT_PAGE_TOOLS, LEARNING_CONTENT_SELECT_PAGE_TOOLS, FLIPCARDS_PAGE_TOOLS]) {
			expect(definition).not.toHaveProperty("screen");
			expect(definition).not.toHaveProperty("desktopSurface");
			expect(definition).not.toHaveProperty("mobileSurface");
			expect(definition).not.toHaveProperty("mobilePrimarySlot");
		}
	});
});
