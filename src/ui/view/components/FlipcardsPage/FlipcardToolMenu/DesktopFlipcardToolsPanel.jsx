// src/ui/view/components/FlipcardsPage/FlipcardToolMenu/DesktopFlipcardToolsPanel.jsx
import { useCallback, useEffect, useRef } from "react";
import { Menu } from "lucide-react";
import FlipcardDeckToolButton from "./FlipcardDeckToolButton.jsx";

const DESKTOP_TOOLS_PANEL_ID = "flipcard-desktop-tools-panel";
const DESKTOP_TOOLS_TITLE_ID = "flipcard-desktop-tools-title";
const DESKTOP_TOOLS_SUBTITLE_ID = "flipcard-desktop-tools-subtitle";
const FOCUSABLE_PANEL_SELECTOR = [
    "button:not([disabled])",
    "[href]",
    "input:not([disabled])",
    "select:not([disabled])",
    "textarea:not([disabled])",
    "[tabindex]:not([tabindex='-1'])"
].join(",");

export default function DesktopFlipcardToolsPanel(props) {
    const toggleRef = useRef(null);
    const panelRef = useRef(null);

    const closeAndRestoreFocus = useCallback(() => {
        props.onClose();
        window.setTimeout(() => {
            toggleRef.current?.focus();
        }, 0);
    }, [props.onClose]);

    const selectDeckTool = (deckToolKey) => {
        props.onDeckToolSelect(deckToolKey);
        closeAndRestoreFocus();
    };

    useEffect(() => {
        if (!props.isOpen) {
            return undefined;
        }

        window.setTimeout(() => {
            const firstAction = panelRef.current?.querySelector(".flipcard-desktop-tools-card:not(:disabled)");

            firstAction?.focus();
        }, 0);

        const handleKeyDown = (event) => {
            if (event.key === "Escape") {
                event.preventDefault();
                closeAndRestoreFocus();
                return;
            }

            if (event.key !== "Tab" || !panelRef.current) {
                return;
            }

            const focusableElements = Array.from(panelRef.current.querySelectorAll(FOCUSABLE_PANEL_SELECTOR));

            if (focusableElements.length === 0) {
                event.preventDefault();
                panelRef.current.focus();
                return;
            }

            const firstElement = focusableElements[0];
            const lastElement = focusableElements[focusableElements.length - 1];
            const activeElement = document.activeElement;

            if (event.shiftKey && (!panelRef.current.contains(activeElement) || activeElement === firstElement)) {
                event.preventDefault();
                lastElement.focus();
                return;
            }

            if (!event.shiftKey && activeElement === lastElement) {
                event.preventDefault();
                firstElement.focus();
            }
        };

        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [closeAndRestoreFocus, props.isOpen]);

    return (
        <div className="flipcard-desktop-tools-shell" data-open={props.isOpen ? "true" : "false"}>
            <button
                type="button"
                ref={toggleRef}
                className="flipcard-desktop-tools-toggle"
                aria-controls={DESKTOP_TOOLS_PANEL_ID}
                aria-expanded={props.isOpen}
                aria-label={props.isOpen ? props.labels.closeToolMenuLabel : props.labels.openToolMenuLabel}
                onClick={props.onToggle}
            >
                <Menu aria-hidden="true" focusable="false" />
            </button>

            {props.isOpen && (
                <>
                    <button
                        type="button"
                        className="flipcard-desktop-tools-backdrop"
                        aria-label={props.labels.closeToolMenuLabel}
                        onClick={closeAndRestoreFocus}
                    />

                    <aside
                        id={DESKTOP_TOOLS_PANEL_ID}
                        ref={panelRef}
                        className="flipcard-desktop-tools-panel"
                        aria-labelledby={DESKTOP_TOOLS_TITLE_ID}
                        aria-describedby={DESKTOP_TOOLS_SUBTITLE_ID}
                        tabIndex={-1}
                    >
                        <header className="flipcard-desktop-tools-header">
                            <h2 id={DESKTOP_TOOLS_TITLE_ID}>{props.labels.toolMenuTitle}</h2>
                            <p id={DESKTOP_TOOLS_SUBTITLE_ID}>{props.labels.toolMenuSubtitle}</p>
                        </header>

                        <div className="flipcard-desktop-tools-grid" aria-label={props.labels.toolMenuActionsLabel}>
                            {props.deckToolItems.map((deckToolItem) => (
                                <FlipcardDeckToolButton
                                    key={deckToolItem.key}
                                    variant="desktop"
                                    deckToolItem={deckToolItem}
                                    onSelect={selectDeckTool}
                                />
                            ))}
                        </div>
                    </aside>
                </>
            )}
        </div>
    );
}
