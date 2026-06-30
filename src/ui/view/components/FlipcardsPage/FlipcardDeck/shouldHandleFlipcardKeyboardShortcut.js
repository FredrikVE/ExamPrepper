// src/ui/view/components/FlipcardsPage/FlipcardDeck/shouldHandleFlipcardKeyboardShortcut.js
const FLIPCARD_KEYBOARD_SHORTCUT_KEYS = ["Enter", "ArrowLeft", "ArrowRight"];

export default function shouldHandleFlipcardKeyboardShortcut(event) {
    if (!FLIPCARD_KEYBOARD_SHORTCUT_KEYS.includes(event.key)) {
        return false;
    }

    if (event.repeat || event.altKey || event.ctrlKey || event.metaKey || event.shiftKey || event.isComposing) {
        return false;
    }

    return !isShortcutHandledByFocusedElement(event.target);
}

function isShortcutHandledByFocusedElement(target) {
    if (typeof Element === "undefined" || !(target instanceof Element)) {
        return false;
    }

    return Boolean(
        target.closest(
            "button, a, input, select, textarea, [role='button'], [role='textbox'], [role='combobox'], [role='listbox'], [role='slider'], [role='spinbutton'], [contenteditable='true']"
        )
    );
}
