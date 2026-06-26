// src/ui/view/components/FlipcardsPage/FlipcardToolMenu/MobileFlipcardDeckToolGrid.jsx
import { FLIPCARD_DECK_TOOLS } from "./flipcardDeckTools.js";

export default function MobileFlipcardDeckToolGrid(props) {
    return (
        <div className="mobile-flipcard-tool-grid" aria-label={props.labels.toolMenuActionsLabel}>
            {FLIPCARD_DECK_TOOLS.map((toolCard) => {
                const Icon = toolCard.icon;
                const isSelected = props.activeDeckToolKey === toolCard.key;
                const isDisabled = toolCard.unavailable || props.disabledDeckToolKeys.includes(toolCard.key);
                const className = [
                    "mobile-flipcard-tool-card",
                    isSelected ? "mobile-flipcard-tool-card-selected" : null,
                    isDisabled ? "mobile-flipcard-tool-card-disabled" : null
                ].filter(Boolean).join(" ");

                return (
                    <button
                        key={toolCard.key}
                        type="button"
                        className={className}
                        aria-current={isSelected ? "true" : undefined}
                        aria-label={isDisabled
                            ? `${props.labels[toolCard.labelKey]} · ${props.labels.toolMenuUnavailableLabel}`
                            : props.labels[toolCard.labelKey]}
                        disabled={isDisabled}
                        onClick={() => props.onDeckToolSelect(toolCard.key)}
                    >
                        <Icon aria-hidden="true" focusable="false" />
                        <span>{props.labels[toolCard.labelKey]}</span>
                        {isDisabled && <small>{props.labels.toolMenuUnavailableLabel}</small>}
                    </button>
                );
            })}
        </div>
    );
}
