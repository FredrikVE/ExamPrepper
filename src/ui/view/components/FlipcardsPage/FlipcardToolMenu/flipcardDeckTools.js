// src/ui/view/components/FlipcardsPage/FlipcardToolMenu/flipcardDeckTools.js
import { List, Plus, RefreshCw, Shuffle } from "lucide-react";
import { NAV_SCREENS } from "../../../../../navigation/navGraph.js";
import { PAGE_TOOL_AVAILABILITY, PAGE_TOOL_ICON_KEYS, PAGE_TOOL_ITEM_IDS, getPageToolItems } from "../../../../../navigation/pageTools.js";

export const FLIPCARD_DECK_TOOL_KEYS = {
    ALL_CARDS: PAGE_TOOL_ITEM_IDS.FLIPCARDS_ALL_CARDS,
    SHUFFLE: PAGE_TOOL_ITEM_IDS.FLIPCARDS_SHUFFLE,
    REPEAT_DIFFICULT: PAGE_TOOL_ITEM_IDS.FLIPCARDS_REPEAT_DIFFICULT,
    ADD_CARD: PAGE_TOOL_ITEM_IDS.FLIPCARDS_ADD_CARD
};

const FLIPCARD_DECK_TOOL_ICON_BY_KEY = {
    [PAGE_TOOL_ICON_KEYS.LIST]: List,
    [PAGE_TOOL_ICON_KEYS.PLUS]: Plus,
    [PAGE_TOOL_ICON_KEYS.REFRESH_CW]: RefreshCw,
    [PAGE_TOOL_ICON_KEYS.SHUFFLE]: Shuffle
};

export const FLIPCARD_DECK_TOOLS = getPageToolItems(NAV_SCREENS.FLIPCARDS).map((toolCard) => ({
    key: toolCard.id,
    labelKey: toolCard.viewModelLabelKey,
    icon: FLIPCARD_DECK_TOOL_ICON_BY_KEY[toolCard.iconKey],
    unavailable: toolCard.availability === PAGE_TOOL_AVAILABILITY.UNAVAILABLE
}));
