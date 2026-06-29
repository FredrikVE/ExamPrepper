// src/ui/view/components/ToolCard/ToolCardGrid.jsx
import ToolCard from "./ToolCard.jsx";
import { TOOL_CARD_SURFACES } from "./toolCardSurfaces.js";

const TOOL_CARD_GRID_CLASS_NAMES_BY_SURFACE = {
    [TOOL_CARD_SURFACES.PAGE_TOOLS_DESKTOP]: "page-tools-desktop-grid",
    [TOOL_CARD_SURFACES.PAGE_TOOLS_MOBILE]: "page-tools-mobile-grid",
    [TOOL_CARD_SURFACES.FLIPCARDS_DESKTOP]: "flipcard-desktop-tools-grid",
    [TOOL_CARD_SURFACES.FLIPCARDS_MOBILE]: "mobile-flipcard-tool-grid"
};

function getToolCardKey(toolItem) {
    return toolItem.id ?? toolItem.key;
}

export default function ToolCardGrid({ surface, items, ariaLabel, onSelectItem }) {
    return (
        <div className={TOOL_CARD_GRID_CLASS_NAMES_BY_SURFACE[surface]} aria-label={ariaLabel}>
            {items.map((toolItem) => (
                <ToolCard
                    key={getToolCardKey(toolItem)}
                    surface={surface}
                    toolItem={toolItem}
                    onSelect={onSelectItem}
                />
            ))}
        </div>
    );
}
