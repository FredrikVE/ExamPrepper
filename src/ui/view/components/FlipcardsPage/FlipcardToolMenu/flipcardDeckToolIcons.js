// src/ui/view/components/FlipcardsPage/FlipcardToolMenu/flipcardDeckToolIcons.js
import { List, Plus, RefreshCw, Shuffle } from "lucide-react";
import { PAGE_TOOL_ICON_KEYS } from "../../../../../navigation/pageTools.js";

const FLIPCARD_DECK_TOOL_ICONS_BY_KEY = {
    [PAGE_TOOL_ICON_KEYS.LIST]: List,
    [PAGE_TOOL_ICON_KEYS.PLUS]: Plus,
    [PAGE_TOOL_ICON_KEYS.REFRESH_CW]: RefreshCw,
    [PAGE_TOOL_ICON_KEYS.SHUFFLE]: Shuffle
};

export function getFlipcardDeckToolIcon(iconKey) {
    return FLIPCARD_DECK_TOOL_ICONS_BY_KEY[iconKey] ?? List;
}
