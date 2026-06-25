// src/ui/view/components/FlipcardsPage/FlipcardToolMenu/MobileFlipcardDeckToolGrid.jsx
import { Heart, List, RefreshCw, Shuffle } from "lucide-react";

const TOOL_CARDS = [
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

export default function MobileFlipcardDeckToolGrid({ labels }) {
    return (
        <div className="mobile-flipcard-tool-grid" aria-label={labels.toolMenuActionsLabel}>
            {TOOL_CARDS.map((toolCard) => {
                const Icon = toolCard.icon;
                const className = toolCard.selected
                    ? "mobile-flipcard-tool-card mobile-flipcard-tool-card-selected"
                    : "mobile-flipcard-tool-card";

                return (
                    <button
                        key={toolCard.key}
                        type="button"
                        className={className}
                    >
                        <Icon aria-hidden="true" focusable="false" />
                        <span>{labels[toolCard.labelKey]}</span>
                    </button>
                );
            })}
        </div>
    );
}
