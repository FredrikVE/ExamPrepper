// src/ui/view/components/FlipcardsPage/FlipcardToolMenu/FlipcardDeckToolButton.jsx
import { getFlipcardDeckToolIcon } from "./flipcardDeckToolIcons.js";

const FLIPCARD_DECK_TOOL_BUTTON_CLASS_NAMES_BY_VARIANT = {
    desktop: {
        root: "flipcard-desktop-tools-card",
        selected: "flipcard-desktop-tools-card-selected",
        disabled: "flipcard-desktop-tools-card-unavailable"
    },
    mobile: {
        root: "mobile-flipcard-tool-card",
        selected: "mobile-flipcard-tool-card-selected",
        disabled: "mobile-flipcard-tool-card-disabled"
    }
};

function createDeckToolButtonClassName(variant, deckToolItem) {
    const classNames = FLIPCARD_DECK_TOOL_BUTTON_CLASS_NAMES_BY_VARIANT[variant];

    return [
        classNames.root,
        deckToolItem.isSelected ? classNames.selected : null,
        deckToolItem.isDisabled ? classNames.disabled : null
    ].filter(Boolean).join(" ");
}

export default function FlipcardDeckToolButton(props) {
    const Icon = getFlipcardDeckToolIcon(props.deckToolItem.iconKey);

    return (
        <button
            type="button"
            className={createDeckToolButtonClassName(props.variant, props.deckToolItem)}
            aria-current={props.deckToolItem.isSelected ? "true" : undefined}
            aria-label={props.deckToolItem.ariaLabel}
            disabled={props.deckToolItem.isDisabled}
            onClick={() => props.onSelect(props.deckToolItem.key)}
        >
            <Icon aria-hidden="true" focusable="false" />
            <span>{props.deckToolItem.label}</span>
            <small>{props.deckToolItem.statusLabel}</small>
        </button>
    );
}
