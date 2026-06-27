// src/ui/view/components/FlipcardsPage/FlipcardToolMenu/MobileFlipcardDeckToolGrid.jsx
import FlipcardDeckToolButton from "./FlipcardDeckToolButton.jsx";

export default function MobileFlipcardDeckToolGrid(props) {
    return (
        <div className="mobile-flipcard-tool-grid" aria-label={props.labels.toolMenuActionsLabel}>
            {props.deckToolItems.map((deckToolItem) => (
                <FlipcardDeckToolButton
                    key={deckToolItem.key}
                    variant="mobile"
                    deckToolItem={deckToolItem}
                    onSelect={props.onDeckToolSelect}
                />
            ))}
        </div>
    );
}
