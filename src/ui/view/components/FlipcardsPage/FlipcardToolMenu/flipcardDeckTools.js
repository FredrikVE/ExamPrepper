// src/ui/view/components/FlipcardsPage/FlipcardToolMenu/flipcardDeckTools.js
import { Heart, List, RefreshCw, Shuffle } from "lucide-react";

export const FLIPCARD_DECK_TOOLS = [
    {
        key: "all-cards",
        labelKey: "toolMenuAllCardsLabel",
        icon: List,
        selected: true
    },
    {
        key: "shuffle",
        labelKey: "toolMenuShuffleLabel",
        icon: Shuffle
    },
    {
        key: "favorites",
        labelKey: "toolMenuFavoritesLabel",
        icon: Heart
    },
    {
        key: "repeat-difficult",
        labelKey: "toolMenuRepeatDifficultLabel",
        icon: RefreshCw
    }
];
