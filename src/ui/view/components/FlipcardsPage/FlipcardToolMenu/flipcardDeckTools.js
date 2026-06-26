// src/ui/view/components/FlipcardsPage/FlipcardToolMenu/flipcardDeckTools.js
import { Heart, List, RefreshCw, Shuffle } from "lucide-react";

export const FLIPCARD_DECK_TOOL_KEYS = {
    ALL_CARDS: "all-cards",
    SHUFFLE: "shuffle",
    FAVORITES: "favorites",
    REPEAT_DIFFICULT: "repeat-difficult"
};

export const FLIPCARD_DECK_TOOLS = [
    {
        key: FLIPCARD_DECK_TOOL_KEYS.ALL_CARDS,
        labelKey: "toolMenuAllCardsLabel",
        icon: List
    },
    {
        key: FLIPCARD_DECK_TOOL_KEYS.SHUFFLE,
        labelKey: "toolMenuShuffleLabel",
        icon: Shuffle
    },
    {
        key: FLIPCARD_DECK_TOOL_KEYS.FAVORITES,
        labelKey: "toolMenuFavoritesLabel",
        icon: Heart,
        unavailable: true
    },
    {
        key: FLIPCARD_DECK_TOOL_KEYS.REPEAT_DIFFICULT,
        labelKey: "toolMenuRepeatDifficultLabel",
        icon: RefreshCw
    }
];
