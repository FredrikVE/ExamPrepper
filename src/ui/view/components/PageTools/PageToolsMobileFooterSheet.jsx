// src/ui/view/components/PageTools/PageToolsMobileFooterSheet.jsx
import { useCallback, useState } from "react";
import { BarChart3, BookOpen, ChevronDown, ChevronUp, Clock3, FileText, List, PanelsTopLeft, PieChart, Plus, RefreshCw, Shuffle, Sparkles } from "lucide-react";
import { PAGE_TOOL_ICON_KEYS } from "../../../../navigation/pageTools.js";

const PAGE_TOOL_ICONS = {
    [PAGE_TOOL_ICON_KEYS.BAR_CHART_3]: BarChart3,
    [PAGE_TOOL_ICON_KEYS.BOOK_OPEN]: BookOpen,
    [PAGE_TOOL_ICON_KEYS.CLOCK_3]: Clock3,
    [PAGE_TOOL_ICON_KEYS.FILE_TEXT]: FileText,
    [PAGE_TOOL_ICON_KEYS.LIST]: List,
    [PAGE_TOOL_ICON_KEYS.PANELS_TOP_LEFT]: PanelsTopLeft,
    [PAGE_TOOL_ICON_KEYS.PIE_CHART]: PieChart,
    [PAGE_TOOL_ICON_KEYS.PLUS]: Plus,
    [PAGE_TOOL_ICON_KEYS.REFRESH_CW]: RefreshCw,
    [PAGE_TOOL_ICON_KEYS.SHUFFLE]: Shuffle,
    [PAGE_TOOL_ICON_KEYS.SPARKLES]: Sparkles
};

function PageToolsMobileCard(props) {
    const Icon = PAGE_TOOL_ICONS[props.toolItem.iconKey] ?? List;

    const selectTool = () => {
        if (props.toolItem.isDisabled) {
            return;
        }

        props.onSelect(props.toolItem);
    };

    return (
        <button
            type="button"
            className="page-tools-mobile-card"
            aria-label={props.toolItem.ariaLabel}
            disabled={props.toolItem.isDisabled}
            onClick={selectTool}
        >
            <Icon aria-hidden="true" focusable="false" />
            <span>{props.toolItem.label}</span>
            {props.toolItem.statusLabel && <small>{props.toolItem.statusLabel}</small>}
        </button>
    );
}

export default function PageToolsMobileFooterSheet(props) {
    const [isOpen, setIsOpen] = useState(false);

    const closeSheet = useCallback(() => {
        setIsOpen(false);
    }, []);

    const toggleSheet = useCallback(() => {
        setIsOpen((wasOpen) => !wasOpen);
    }, []);

    const selectTool = useCallback((toolItem) => {
        toolItem.onSelect();
        setIsOpen(false);
    }, []);

    if (!props.tools) {
        return props.children;
    }

    return (
        <div className="page-tools-mobile-footer-shell" data-open={isOpen ? "true" : "false"}>
            <button
                type="button"
                className="page-tools-mobile-trigger"
                aria-expanded={isOpen}
                aria-controls={`page-tools-mobile-panel-${props.tools.id}`}
                aria-label={isOpen ? props.tools.closeLabel : props.tools.openLabel}
                onClick={toggleSheet}
            >
                {isOpen ? <ChevronDown aria-hidden="true" focusable="false" /> : <ChevronUp aria-hidden="true" focusable="false" />}
                <span>{props.tools.mobileHandleLabel}</span>
            </button>

            <section
                id={`page-tools-mobile-panel-${props.tools.id}`}
                className="page-tools-mobile-panel"
                aria-label={props.tools.actionsLabel}
                hidden={!isOpen}
            >
                <header className="page-tools-mobile-header">
                    <h2>{props.tools.title}</h2>
                    <p>{props.tools.subtitle}</p>
                </header>

                <div className="page-tools-mobile-grid">
                    {props.tools.items.map((toolItem) => (
                        <PageToolsMobileCard
                            key={toolItem.id}
                            toolItem={toolItem}
                            onSelect={selectTool}
                        />
                    ))}
                </div>

                <button
                    type="button"
                    className="page-tools-mobile-close"
                    onClick={closeSheet}
                >
                    {props.tools.closeLabel}
                </button>
            </section>

            {props.children}
        </div>
    );
}
