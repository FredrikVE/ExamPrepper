// src/ui/view/components/PageTools/PageToolsDesktopPanel.jsx
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Menu } from "lucide-react";
import PageToolsCard from "./PageToolsCard.jsx";

const FOCUSABLE_PANEL_SELECTOR = [
    "button:not([disabled])",
    "[href]",
    "input:not([disabled])",
    "select:not([disabled])",
    "textarea:not([disabled])",
    "[tabindex]:not([tabindex='-1'])"
].join(",");

function getPanelId(tools) {
    return `page-tools-desktop-panel-${tools.id}`;
}

function getTitleId(tools) {
    return `page-tools-desktop-title-${tools.id}`;
}

function getSubtitleId(tools) {
    return `page-tools-desktop-subtitle-${tools.id}`;
}

export default function PageToolsDesktopPanel(props) {
    const [isOpen, setIsOpen] = useState(false);
    const toggleRef = useRef(null);
    const panelRef = useRef(null);

    const closeAndRestoreFocus = useCallback(() => {
        setIsOpen(false);
        window.setTimeout(() => {
            toggleRef.current?.focus();
        }, 0);
    }, []);

    const togglePanel = useCallback(() => {
        setIsOpen((wasOpen) => !wasOpen);
    }, []);

    const handleToolSelect = useCallback((toolItem) => {
        if (!toolItem.onSelect) {
            return;
        }

        toolItem.onSelect();
        setIsOpen(false);

        window.setTimeout(() => {
            toggleRef.current?.focus();
        }, 0);
    }, []);

    useEffect(() => {
        if (!isOpen) {
            return undefined;
        }

        window.setTimeout(() => {
            const firstAction = panelRef.current?.querySelector(".page-tools-desktop-card:not(:disabled)");
            firstAction?.focus();
        }, 0);

        function handleKeyDown(event) {
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

            if (event.shiftKey && document.activeElement === firstElement) {
                event.preventDefault();
                lastElement.focus();
                return;
            }

            if (!event.shiftKey && document.activeElement === lastElement) {
                event.preventDefault();
                firstElement.focus();
            }
        }

        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [closeAndRestoreFocus, isOpen]);

    if (!props.tools) {
        return null;
    }

    const panelId = getPanelId(props.tools);
    const titleId = getTitleId(props.tools);
    const subtitleId = getSubtitleId(props.tools);
    const hasTitle = Boolean(props.tools.title);
    const hasSubtitle = Boolean(props.tools.subtitle);
    const hasHeader = hasTitle || hasSubtitle;
    const panelClassName = [
        "page-tools-desktop-panel",
        hasHeader ? null : "page-tools-desktop-panel-no-header"
    ].filter(Boolean).join(" ");

    return (
        <div className="page-tools-desktop-shell" data-open={isOpen ? "true" : "false"}>
            <button
                type="button"
                ref={toggleRef}
                className="page-tools-desktop-toggle"
                aria-controls={panelId}
                aria-expanded={isOpen}
                aria-label={isOpen ? props.tools.closeLabel : props.tools.openLabel}
                onClick={togglePanel}
            >
                <Menu aria-hidden="true" focusable="false" />
            </button>

            {isOpen && createPortal(
                <>
                    <button
                        type="button"
                        className="page-tools-desktop-backdrop"
                        aria-label={props.tools.closeLabel}
                        onClick={closeAndRestoreFocus}
                    />

                    <aside
                        id={panelId}
                        ref={panelRef}
                        className={panelClassName}
                        aria-labelledby={hasTitle ? titleId : undefined}
                        aria-describedby={hasSubtitle ? subtitleId : undefined}
                        aria-label={hasTitle ? undefined : props.tools.actionsLabel}
                        tabIndex={-1}
                    >
                        {hasHeader && (
                            <header className="page-tools-desktop-header">
                                {hasTitle && <h2 id={titleId}>{props.tools.title}</h2>}
                                {hasSubtitle && <p id={subtitleId}>{props.tools.subtitle}</p>}
                            </header>
                        )}

                        <div className="page-tools-desktop-grid" aria-label={props.tools.actionsLabel}>
                            {props.tools.items.map((toolItem) => (
                                <PageToolsCard
                                    key={toolItem.id}
                                    surface="desktop"
                                    toolItem={toolItem}
                                    onSelect={handleToolSelect}
                                />
                            ))}
                        </div>
                    </aside>
                </>,
                document.body
            )}
        </div>
    );
}
