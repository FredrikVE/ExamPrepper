// src/ui/view/components/FlipcardsPage/FlipcardToolMenu/MobileFlipcardDeckToolGrid.jsx
import { FLIPCARD_DECK_TOOLS } from "./flipcardDeckTools.js";

export default function MobileFlipcardDeckToolGrid({ labels }) {
    return (
        <div className="mobile-flipcard-tool-grid" aria-label={labels.toolMenuActionsLabel}>
            {FLIPCARD_DECK_TOOLS.map((toolCard) => {
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
