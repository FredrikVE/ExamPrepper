// src/ui/viewmodel/FlipcardsPage/flipcardDeckTools.js
import { FLIPCARDS_PAGE_TOOLS, PAGE_TOOL_ITEM_IDS } from "../../pageTools/pageTools.js";

export const FLIPCARD_DECK_TOOL_KEYS = {
    ALL_CARDS: PAGE_TOOL_ITEM_IDS.FLIPCARDS_ALL_CARDS,
    SHUFFLE: PAGE_TOOL_ITEM_IDS.FLIPCARDS_SHUFFLE,
    REPEAT_DIFFICULT: PAGE_TOOL_ITEM_IDS.FLIPCARDS_REPEAT_DIFFICULT,
    ADD_CARD: PAGE_TOOL_ITEM_IDS.FLIPCARDS_ADD_CARD
};

export const FLIPCARD_DECK_TOOLS = FLIPCARDS_PAGE_TOOLS.items.map((toolCard) => ({
    key: toolCard.id,
    labelKey: toolCard.viewModelLabelKey,
    iconKey: toolCard.iconKey,
    unavailable: toolCard.isDisabled
}));
