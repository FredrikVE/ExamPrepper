// src/ui/view/components/PageTools/PageToolsDesktopPanel.jsx
import { useCallback, useEffect, useRef, useState } from "react";
import { BarChart3, BookOpen, ChevronLeft, ChevronRight, Clock3, FileText, List, Menu, PanelsTopLeft, PieChart, Plus, RefreshCw, RotateCcw, Send, Shuffle, Sparkles } from "lucide-react";
import { PAGE_TOOL_ICON_KEYS } from "../../../../navigation/pageTools.js";

const FOCUSABLE_PANEL_SELECTOR = [
    "button:not([disabled])",
    "[href]",
    "input:not([disabled])",
    "select:not([disabled])",
    "textarea:not([disabled])",
    "[tabindex]:not([tabindex='-1'])"
].join(",");

const PAGE_TOOL_ICONS = {
    [PAGE_TOOL_ICON_KEYS.BAR_CHART_3]: BarChart3,
    [PAGE_TOOL_ICON_KEYS.BOOK_OPEN]: BookOpen,
    [PAGE_TOOL_ICON_KEYS.CHEVRON_LEFT]: ChevronLeft,
    [PAGE_TOOL_ICON_KEYS.CHEVRON_RIGHT]: ChevronRight,
    [PAGE_TOOL_ICON_KEYS.CLOCK_3]: Clock3,
    [PAGE_TOOL_ICON_KEYS.FILE_TEXT]: FileText,
    [PAGE_TOOL_ICON_KEYS.LIST]: List,
    [PAGE_TOOL_ICON_KEYS.PANELS_TOP_LEFT]: PanelsTopLeft,
    [PAGE_TOOL_ICON_KEYS.PIE_CHART]: PieChart,
    [PAGE_TOOL_ICON_KEYS.PLUS]: Plus,
    [PAGE_TOOL_ICON_KEYS.REFRESH_CW]: RefreshCw,
    [PAGE_TOOL_ICON_KEYS.ROTATE_CCW]: RotateCcw,
    [PAGE_TOOL_ICON_KEYS.SEND]: Send,
    [PAGE_TOOL_ICON_KEYS.SHUFFLE]: Shuffle,
    [PAGE_TOOL_ICON_KEYS.SPARKLES]: Sparkles
};

function getPanelId(tools) {
    return `page-tools-desktop-panel-${tools.id}`;
}

function getTitleId(tools) {
    return `page-tools-desktop-title-${tools.id}`;
}

function getSubtitleId(tools) {
    return `page-tools-desktop-subtitle-${tools.id}`;
}

function PageToolsDesktopCard(props) {
    const Icon = PAGE_TOOL_ICONS[props.toolItem.iconKey] ?? List;

    const handleClick = () => {
        if (props.toolItem.isDisabled) {
            return;
        }

        props.onSelect(props.toolItem);
    };

    return (
        <button
            type="button"
            className="page-tools-desktop-card"
            aria-label={props.toolItem.ariaLabel}
            disabled={props.toolItem.isDisabled}
            onClick={handleClick}
        >
            <Icon aria-hidden="true" focusable="false" />
            <span>{props.toolItem.label}</span>
            {props.toolItem.statusLabel && <small>{props.toolItem.statusLabel}</small>}
        </button>
    );
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

            {isOpen && (
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
                        className="page-tools-desktop-panel"
                        aria-labelledby={titleId}
                        aria-describedby={subtitleId}
                        tabIndex={-1}
                    >
                        <header className="page-tools-desktop-header">
                            <h2 id={titleId}>{props.tools.title}</h2>
                            <p id={subtitleId}>{props.tools.subtitle}</p>
                        </header>

                        <div className="page-tools-desktop-grid" aria-label={props.tools.actionsLabel}>
                            {props.tools.items.map((toolItem) => (
                                <PageToolsDesktopCard
                                    key={toolItem.id}
                                    toolItem={toolItem}
                                    onSelect={handleToolSelect}
                                />
                            ))}
                        </div>
                    </aside>
                </>
            )}
        </div>
    );
}
