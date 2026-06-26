// src/ui/view/components/FlipcardsPage/FlipcardToolMenu/DesktopFlipcardToolsPanel.jsx
import { useCallback, useEffect, useRef } from "react";
import {
    BarChart3,
    BookOpen,
    Clock3,
    FileText,
    List,
    Menu,
    PanelsTopLeft,
    PieChart,
    Plus,
    Sparkles
} from "lucide-react";

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

function createDesktopToolEntries(labels, desktopToolActions) {
    return [
        {
            key: "exams",
            icon: FileText,
            label: labels.desktopToolsExamsLabel,
            onSelect: desktopToolActions?.onShowExams,
            isFeatured: true
        },
        {
            key: "practice-tests",
            icon: Clock3,
            label: labels.desktopToolsPracticeTestsLabel,
            onSelect: desktopToolActions?.onShowPracticeTests
        },
        {
            key: "flipcards",
            icon: PanelsTopLeft,
            label: labels.desktopToolsFlipcardsLabel,
            onSelect: desktopToolActions?.onShowFlipcards
        },
        {
            key: "create-exam",
            icon: Plus,
            label: labels.desktopToolsCreateExamLabel
        },
        {
            key: "concept-list",
            icon: List,
            label: labels.desktopToolsConceptListLabel
        },
        {
            key: "curriculum-graphs",
            icon: BarChart3,
            label: labels.desktopToolsCurriculumGraphsLabel
        },
        {
            key: "curriculum-figure",
            icon: PieChart,
            label: labels.desktopToolsCurriculumFigureLabel
        },
        {
            key: "ai-exam",
            icon: Sparkles,
            label: labels.desktopToolsAiExamLabel
        }
    ];
}

function DesktopToolsCard({ entry, unavailableLabel, onSelect }) {
    const Icon = entry.icon;
    const isUnavailable = typeof entry.onSelect !== "function";
    const className = [
        "flipcard-desktop-tools-card",
        entry.isFeatured ? "flipcard-desktop-tools-card-featured" : null,
        isUnavailable ? "flipcard-desktop-tools-card-unavailable" : null
    ].filter(Boolean).join(" ");

    const handleClick = () => {
        if (isUnavailable) {
            return;
        }

        onSelect(entry);
    };

    return (
        <button
            type="button"
            className={className}
            aria-disabled={isUnavailable ? "true" : undefined}
            aria-label={isUnavailable ? `${entry.label} · ${unavailableLabel}` : entry.label}
            title={isUnavailable ? unavailableLabel : undefined}
            onClick={handleClick}
        >
            <Icon aria-hidden="true" focusable="false" />
            <span>{entry.label}</span>
            {isUnavailable && <small>{unavailableLabel}</small>}
        </button>
    );
}

export default function DesktopFlipcardToolsPanel({
    isOpen,
    onToggle,
    onClose,
    labels,
    desktopToolActions
}) {
    const toggleRef = useRef(null);
    const panelRef = useRef(null);

    const closeAndRestoreFocus = useCallback(() => {
        onClose();
        window.setTimeout(() => {
            toggleRef.current?.focus();
        }, 0);
    }, [onClose]);

    useEffect(() => {
        if (!isOpen) {
            return undefined;
        }

        window.setTimeout(() => {
            const firstAction = panelRef.current?.querySelector(
                ".flipcard-desktop-tools-card:not(.flipcard-desktop-tools-card-unavailable)"
            );

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

            const focusableElements = Array.from(
                panelRef.current.querySelectorAll(FOCUSABLE_PANEL_SELECTOR)
            ).filter((element) => element.getAttribute("aria-disabled") !== "true");

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
    }, [closeAndRestoreFocus, isOpen]);

    const handleToolSelect = useCallback((entry) => {
        entry.onSelect();
        onClose();

        window.setTimeout(() => {
            toggleRef.current?.focus();
        }, 0);
    }, [onClose]);

    const desktopToolEntries = createDesktopToolEntries(labels, desktopToolActions);

    return (
        <div className="flipcard-desktop-tools-shell" data-open={isOpen ? "true" : "false"}>
            <button
                type="button"
                ref={toggleRef}
                className="flipcard-desktop-tools-toggle"
                aria-controls={DESKTOP_TOOLS_PANEL_ID}
                aria-expanded={isOpen}
                aria-label={isOpen ? labels.closeToolMenuLabel : labels.openToolMenuLabel}
                onClick={onToggle}
            >
                <Menu aria-hidden="true" focusable="false" />
            </button>

            {isOpen && (
                <>
                    <button
                        type="button"
                        className="flipcard-desktop-tools-backdrop"
                        aria-label={labels.closeToolMenuLabel}
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
                            <h2 id={DESKTOP_TOOLS_TITLE_ID}>{labels.desktopToolsTitle}</h2>
                            <p id={DESKTOP_TOOLS_SUBTITLE_ID}>{labels.desktopToolsSubtitle}</p>
                        </header>

                        <div className="flipcard-desktop-tools-grid" aria-label={labels.desktopToolsGridLabel}>
                            {desktopToolEntries.map((entry) => (
                                <DesktopToolsCard
                                    key={entry.key}
                                    entry={entry}
                                    unavailableLabel={labels.desktopToolsUnavailableLabel}
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
