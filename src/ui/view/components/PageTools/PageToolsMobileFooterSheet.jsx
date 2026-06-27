// src/ui/view/components/PageTools/PageToolsMobileFooterSheet.jsx
import { useCallback, useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import PageToolsCard from "./PageToolsCard.jsx";

export default function PageToolsMobileFooterSheet(props) {
    const [isOpen, setIsOpen] = useState(false);

    const closeSheet = useCallback(() => {
        setIsOpen(false);
    }, []);

    const toggleSheet = useCallback(() => {
        setIsOpen((wasOpen) => !wasOpen);
    }, []);

    const selectTool = useCallback((toolItem) => {
        if (!toolItem.onSelect) {
            return;
        }

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
                        <PageToolsCard
                            key={toolItem.id}
                            surface="mobile"
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
