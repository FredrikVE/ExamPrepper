// src/ui/viewmodel/FlipcardsPage/flipcardDeckTools.js
import { NAV_SCREENS } from "../../../navigation/navGraph.js";
import { PAGE_TOOL_AVAILABILITY, PAGE_TOOL_ITEM_IDS, getPageToolItems } from "../../../navigation/pageTools.js";

export const FLIPCARD_DECK_TOOL_KEYS = {
    ALL_CARDS: PAGE_TOOL_ITEM_IDS.FLIPCARDS_ALL_CARDS,
    SHUFFLE: PAGE_TOOL_ITEM_IDS.FLIPCARDS_SHUFFLE,
    REPEAT_DIFFICULT: PAGE_TOOL_ITEM_IDS.FLIPCARDS_REPEAT_DIFFICULT,
    ADD_CARD: PAGE_TOOL_ITEM_IDS.FLIPCARDS_ADD_CARD
};

export const FLIPCARD_DECK_TOOLS = getPageToolItems(NAV_SCREENS.FLIPCARDS).map((toolCard) => ({
    key: toolCard.id,
    labelKey: toolCard.viewModelLabelKey,
    iconKey: toolCard.iconKey,
    unavailable: toolCard.availability === PAGE_TOOL_AVAILABILITY.UNAVAILABLE
}));
