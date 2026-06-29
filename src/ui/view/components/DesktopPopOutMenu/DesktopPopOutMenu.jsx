// src/ui/view/components/DesktopPopOutMenu/DesktopPopOutMenu.jsx
import { Dialog } from "@base-ui/react/dialog";
import { Menu } from "lucide-react";

export const DESKTOP_POP_OUT_MENU_VARIANTS = {
    PAGE_TOOLS: "page-tools",
    FLIPCARDS: "flipcards"
};

function createClassName(element, variant, modifiers = []) {
    return [
        `desktop-pop-out-menu__${element}`,
        variant ? `desktop-pop-out-menu__${element}--${variant}` : null,
        ...modifiers
    ].filter(Boolean).join(" ");
}

export default function DesktopPopOutMenu(props) {
    const hasHeader = Boolean(props.title) || Boolean(props.subtitle);

    return (
        <Dialog.Root open={props.isOpen} onOpenChange={props.onOpenChange}>
            <Dialog.Trigger
                className={createClassName("trigger", props.variant)}
                aria-label={props.isOpen ? props.closeLabel : props.openLabel}
            >
                <Menu aria-hidden="true" focusable="false" />
            </Dialog.Trigger>

            <Dialog.Portal>
                <Dialog.Backdrop className={createClassName("backdrop", props.variant)} />

                <Dialog.Popup
                    className={createClassName("panel", props.variant, [!hasHeader ? "desktop-pop-out-menu__panel--without-header" : null])}
                    aria-label={props.title ? undefined : props.actionsLabel}
                >
                    {hasHeader && (
                        <header className={createClassName("header", props.variant)}>
                            {props.title && <Dialog.Title>{props.title}</Dialog.Title>}
                            {props.subtitle && <Dialog.Description>{props.subtitle}</Dialog.Description>}
                        </header>
                    )}

                    {props.children}
                </Dialog.Popup>
            </Dialog.Portal>
        </Dialog.Root>
    );
}
