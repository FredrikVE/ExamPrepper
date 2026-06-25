// src/ui/view/components/FlipcardsPage/FlipcardToolMenu/DesktopFlipcardPopOutMenu.jsx
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

function createDesktopToolEntries(labels) {
    return [
        {
            key: "exams",
            icon: FileText,
            label: labels.desktopToolsExamsLabel,
            isFeatured: true
        },
        {
            key: "practice-tests",
            icon: Clock3,
            label: labels.desktopToolsPracticeTestsLabel
        },
        {
            key: "flipcards",
            icon: PanelsTopLeft,
            label: labels.desktopToolsFlipcardsLabel
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

function DesktopToolsCard({ entry }) {
    const Icon = entry.icon;
    const className = entry.isFeatured
        ? "flipcard-desktop-tools-card flipcard-desktop-tools-card-featured"
        : "flipcard-desktop-tools-card";

    return (
        <button type="button" className={className}>
            <Icon aria-hidden="true" focusable="false" />
            <span>{entry.label}</span>
        </button>
    );
}

export default function DesktopFlipcardPopOutMenu({
    isOpen,
    onToggle,
    onClose,
    labels
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

        const handleKeyDown = (event) => {
            if (event.key === "Escape") {
                event.preventDefault();
                closeAndRestoreFocus();
            }
        };

        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [closeAndRestoreFocus, isOpen]);

    const desktopToolEntries = createDesktopToolEntries(labels);

    return (
        <div className="flipcard-popout-shell" data-open={isOpen ? "true" : "false"}>
            <button
                type="button"
                ref={toggleRef}
                className="flipcard-popout-toggle"
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
                        aria-label={labels.desktopToolsPanelLabel}
                    >
                        <header className="flipcard-desktop-tools-header">
                            <h2>{labels.desktopToolsTitle}</h2>
                            <p>{labels.desktopToolsSubtitle}</p>
                        </header>

                        <div className="flipcard-desktop-tools-grid" aria-label={labels.desktopToolsGridLabel}>
                            {desktopToolEntries.map((entry) => (
                                <DesktopToolsCard key={entry.key} entry={entry} />
                            ))}
                        </div>
                    </aside>
                </>
            )}
        </div>
    );
}
