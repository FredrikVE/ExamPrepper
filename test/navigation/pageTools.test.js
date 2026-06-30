import { describe, expect, test } from "@jest/globals";
import { NAV_SCREENS } from "../../src/navigation/navGraph.js";
import { PAGE_TOOL_ACTION_IDS, PAGE_TOOL_AVAILABILITY, PAGE_TOOL_GROUP_IDS, PAGE_TOOL_ICON_KEYS, PAGE_TOOL_ITEM_IDS, PAGE_TOOL_PRIMARY_SLOTS, PAGE_TOOL_SURFACES, getExamSelectWorkspaceActionToolItems, getPageToolGroup, getPageToolItems, getSubjectSelectWorkspaceActionToolItems, getWorkspaceActionToolItems } from "../../src/navigation/pageTools.js";
import { FLIPCARD_DECK_TOOL_KEYS, FLIPCARD_DECK_TOOLS } from "../../src/ui/viewmodel/FlipcardsPage/flipcardDeckTools.js";

const workspaceActionToolIds = [
    PAGE_TOOL_ITEM_IDS.APP_CREATE_EXAM,
    PAGE_TOOL_ITEM_IDS.APP_CONCEPT_LIST,
    PAGE_TOOL_ITEM_IDS.APP_CURRICULUM_GRAPHS,
    PAGE_TOOL_ITEM_IDS.APP_CURRICULUM_FIGURE,
    PAGE_TOOL_ITEM_IDS.APP_AI_EXAM
];

describe("pageTools", () => {
    test("defines search-first tools metadata for subject and exam select pages", () => {
        const subjectTools = getPageToolGroup(NAV_SCREENS.SUBJECTS);
        const examSelectTools = getPageToolGroup(NAV_SCREENS.SELECT);

        expect(subjectTools).toEqual(expect.objectContaining({
            id: PAGE_TOOL_GROUP_IDS.SUBJECT_SELECT,
            desktopSurface: PAGE_TOOL_SURFACES.DESKTOP_POPOUT,
            mobileSurface: PAGE_TOOL_SURFACES.MOBILE_BOTTOM_SHEET,
            mobilePrimarySlot: PAGE_TOOL_PRIMARY_SLOTS.SEARCH
        }));

        expect(examSelectTools).toEqual(expect.objectContaining({
            id: PAGE_TOOL_GROUP_IDS.EXAM_SELECT,
            desktopSurface: PAGE_TOOL_SURFACES.DESKTOP_POPOUT,
            mobileSurface: PAGE_TOOL_SURFACES.MOBILE_BOTTOM_SHEET,
            mobilePrimarySlot: PAGE_TOOL_PRIMARY_SLOTS.SEARCH
        }));

        expect(subjectTools.items.map((toolCard) => toolCard.id)).toEqual([
            PAGE_TOOL_ITEM_IDS.APP_CREATE_SUBJECT,
            PAGE_TOOL_ITEM_IDS.APP_IMPORT_SUBJECT_MATERIALS
        ]);
        expect(examSelectTools.items.map((toolCard) => toolCard.id)).toEqual([
            PAGE_TOOL_ITEM_IDS.APP_CREATE_EXAM,
            PAGE_TOOL_ITEM_IDS.APP_CONCEPT_LIST,
            PAGE_TOOL_ITEM_IDS.APP_CURRICULUM_GRAPHS,
            PAGE_TOOL_ITEM_IDS.APP_AI_EXAM
        ]);
        expect(getWorkspaceActionToolItems().map((toolCard) => toolCard.id)).toEqual(workspaceActionToolIds);
    });


    test("returns page-specific workspace actions for select pages", () => {
        expect(getSubjectSelectWorkspaceActionToolItems().map((toolCard) => toolCard.id)).toEqual([
            PAGE_TOOL_ITEM_IDS.APP_CREATE_SUBJECT,
            PAGE_TOOL_ITEM_IDS.APP_IMPORT_SUBJECT_MATERIALS
        ]);
        expect(getExamSelectWorkspaceActionToolItems().map((toolCard) => toolCard.id)).toEqual([
            PAGE_TOOL_ITEM_IDS.APP_CREATE_EXAM,
            PAGE_TOOL_ITEM_IDS.APP_CONCEPT_LIST,
            PAGE_TOOL_ITEM_IDS.APP_CURRICULUM_GRAPHS,
            PAGE_TOOL_ITEM_IDS.APP_AI_EXAM
        ]);
    });

    test("keeps exam tools modeled for later work-mode tools", () => {
        const examTools = getPageToolGroup(NAV_SCREENS.EXAM);

        expect(examTools).toEqual(expect.objectContaining({
            id: PAGE_TOOL_GROUP_IDS.EXAM,
            desktopSurface: PAGE_TOOL_SURFACES.DESKTOP_POPOUT,
            mobileSurface: PAGE_TOOL_SURFACES.MOBILE_BOTTOM_SHEET,
            mobilePrimarySlot: PAGE_TOOL_PRIMARY_SLOTS.FOOTER_PAGER
        }));

        expect(examTools.items.map((toolCard) => toolCard.id)).toEqual([
            PAGE_TOOL_ITEM_IDS.EXAM_PREVIOUS_QUESTION,
            PAGE_TOOL_ITEM_IDS.EXAM_NEXT_QUESTION,
            PAGE_TOOL_ITEM_IDS.EXAM_SUBMIT,
            PAGE_TOOL_ITEM_IDS.EXAM_RESET
        ]);

        expect(examTools.items.map((toolCard) => toolCard.actionId)).toEqual([
            PAGE_TOOL_ACTION_IDS.EXAM_PREVIOUS_QUESTION,
            PAGE_TOOL_ACTION_IDS.EXAM_NEXT_QUESTION,
            PAGE_TOOL_ACTION_IDS.EXAM_SUBMIT,
            PAGE_TOOL_ACTION_IDS.EXAM_RESET
        ]);
    });

    test("keeps flipcards tools in the shared page tools model", () => {
        const flipcardsTools = getPageToolGroup(NAV_SCREENS.FLIPCARDS);

        expect(flipcardsTools).toEqual(expect.objectContaining({
            id: PAGE_TOOL_GROUP_IDS.FLIPCARDS,
            titleKey: "flipcardsToolMenuTitle",
            subtitleKey: "flipcardsToolMenuSubtitle",
            actionsLabelKey: "flipcardsToolMenuActionsLabel",
            mobilePrimarySlot: PAGE_TOOL_PRIMARY_SLOTS.FOOTER_PAGER
        }));

        expect(flipcardsTools.items.map((toolCard) => toolCard.id)).toEqual([
            PAGE_TOOL_ITEM_IDS.FLIPCARDS_ALL_CARDS,
            PAGE_TOOL_ITEM_IDS.FLIPCARDS_SHUFFLE,
            PAGE_TOOL_ITEM_IDS.FLIPCARDS_REPEAT_DIFFICULT,
            PAGE_TOOL_ITEM_IDS.FLIPCARDS_ADD_CARD
        ]);

        expect(flipcardsTools.items.find((toolCard) => toolCard.id === PAGE_TOOL_ITEM_IDS.FLIPCARDS_ADD_CARD)).toEqual(expect.objectContaining({
            actionId: PAGE_TOOL_ACTION_IDS.FLIPCARDS_ADD_CARD,
            availability: PAGE_TOOL_AVAILABILITY.UNAVAILABLE
        }));
    });

    test("keeps the existing Flipcards deck tool adapter stable", () => {
        expect(FLIPCARD_DECK_TOOL_KEYS).toEqual({
            ALL_CARDS: PAGE_TOOL_ITEM_IDS.FLIPCARDS_ALL_CARDS,
            SHUFFLE: PAGE_TOOL_ITEM_IDS.FLIPCARDS_SHUFFLE,
            REPEAT_DIFFICULT: PAGE_TOOL_ITEM_IDS.FLIPCARDS_REPEAT_DIFFICULT,
            ADD_CARD: PAGE_TOOL_ITEM_IDS.FLIPCARDS_ADD_CARD
        });

        expect(FLIPCARD_DECK_TOOLS.map((toolCard) => toolCard.key)).toEqual([
            FLIPCARD_DECK_TOOL_KEYS.ALL_CARDS,
            FLIPCARD_DECK_TOOL_KEYS.SHUFFLE,
            FLIPCARD_DECK_TOOL_KEYS.REPEAT_DIFFICULT,
            FLIPCARD_DECK_TOOL_KEYS.ADD_CARD
        ]);

        expect(FLIPCARD_DECK_TOOLS.map((toolCard) => toolCard.iconKey)).toEqual([
            PAGE_TOOL_ICON_KEYS.LIST,
            PAGE_TOOL_ICON_KEYS.SHUFFLE,
            PAGE_TOOL_ICON_KEYS.REFRESH_CW,
            PAGE_TOOL_ICON_KEYS.PLUS
        ]);
    });

    test("returns an empty item list for screens without a page tools group", () => {
        expect(getPageToolGroup(NAV_SCREENS.NOTES)).toBeNull();
        expect(getPageToolItems(NAV_SCREENS.NOTES)).toEqual([]);
    });
});
