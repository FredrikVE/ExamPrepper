// src/ui/view/components/ToolCard/ToolCard.jsx
import { getToolIcon } from "./toolIcons.js";
import { TOOL_CARD_SURFACES } from "./toolCardSurfaces.js";

const TOOL_CARD_CLASS_NAMES_BY_SURFACE = {
    [TOOL_CARD_SURFACES.PAGE_TOOLS_DESKTOP]: {
        root: "page-tools-desktop-card"
    },
    [TOOL_CARD_SURFACES.PAGE_TOOLS_MOBILE]: {
        root: "page-tools-mobile-card"
    },
    [TOOL_CARD_SURFACES.FLIPCARDS_DESKTOP]: {
        root: "flipcard-desktop-tools-card",
        selected: "flipcard-desktop-tools-card-selected",
        disabled: "flipcard-desktop-tools-card-unavailable"
    },
    [TOOL_CARD_SURFACES.FLIPCARDS_MOBILE]: {
        root: "mobile-flipcard-tool-card",
        selected: "mobile-flipcard-tool-card-selected",
        disabled: "mobile-flipcard-tool-card-disabled"
    }
};

function createToolCardClassName(surface, toolItem) {
    const classNames = TOOL_CARD_CLASS_NAMES_BY_SURFACE[surface];

    return [
        classNames.root,
        toolItem.isSelected ? classNames.selected : null,
        toolItem.isDisabled ? classNames.disabled : null
    ].filter(Boolean).join(" ");
}

export default function ToolCard({ surface, toolItem, onSelect }) {
    const Icon = getToolIcon(toolItem.iconKey);

    const selectTool = () => {
        if (toolItem.isDisabled) {
            return;
        }

        onSelect(toolItem);
    };

    return (
        <button
            type="button"
            className={createToolCardClassName(surface, toolItem)}
            aria-current={toolItem.isSelected ? "true" : undefined}
            aria-label={toolItem.ariaLabel}
            disabled={toolItem.isDisabled}
            onClick={selectTool}
        >
            <Icon aria-hidden="true" focusable="false" />
            <span>{toolItem.label}</span>
            {toolItem.statusLabel && <small>{toolItem.statusLabel}</small>}
        </button>
    );
}
