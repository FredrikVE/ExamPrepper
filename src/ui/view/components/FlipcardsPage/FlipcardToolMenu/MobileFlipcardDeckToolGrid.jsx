// src/ui/view/components/FlipcardsPage/FlipcardToolMenu/MobileFlipcardDeckToolGrid.jsx
import ToolCardGrid from "../../Shared/ToolCard/ToolCardGrid.jsx";
import { TOOL_CARD_SURFACES } from "../../Shared/ToolCard/toolCardSurfaces.js";

export default function MobileFlipcardDeckToolGrid(props) {
    return (
        <ToolCardGrid
            surface={TOOL_CARD_SURFACES.FLIPCARDS_MOBILE}
            items={props.deckToolItems}
            ariaLabel={props.labels.toolMenuActionsLabel}
            onSelectItem={(deckToolItem) => props.onDeckToolSelect(deckToolItem.key)}
        />
    );
}
