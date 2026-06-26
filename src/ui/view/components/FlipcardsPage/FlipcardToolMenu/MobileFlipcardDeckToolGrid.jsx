// src/ui/view/components/FlipcardsPage/FlipcardToolMenu/MobileFlipcardDeckToolGrid.jsx
export default function MobileFlipcardDeckToolGrid(props) {
    return (
        <div className="mobile-flipcard-tool-grid" aria-label={props.labels.toolMenuActionsLabel}>
            {props.deckToolItems.map((deckToolItem) => {
                const Icon = deckToolItem.icon;
                const className = [
                    "mobile-flipcard-tool-card",
                    deckToolItem.isSelected ? "mobile-flipcard-tool-card-selected" : null,
                    deckToolItem.isDisabled ? "mobile-flipcard-tool-card-disabled" : null
                ].filter(Boolean).join(" ");

                return (
                    <button
                        key={deckToolItem.key}
                        type="button"
                        className={className}
                        aria-current={deckToolItem.isSelected ? "true" : undefined}
                        aria-label={deckToolItem.ariaLabel}
                        disabled={deckToolItem.isDisabled}
                        onClick={() => props.onDeckToolSelect(deckToolItem.key)}
                    >
                        <Icon aria-hidden="true" focusable="false" />
                        <span>{deckToolItem.label}</span>
                        <small>{deckToolItem.statusLabel}</small>
                    </button>
                );
            })}
        </div>
    );
}
