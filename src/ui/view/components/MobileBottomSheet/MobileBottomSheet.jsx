// src/ui/view/components/MobileBottomSheet/MobileBottomSheet.jsx
import { useRef } from "react";
import { Drawer } from "@base-ui/react/drawer";
import { ChevronUp } from "lucide-react";

export default function MobileBottomSheet({ isOpen, onOpenChange, finalFocusRef, contentId, title, subtitle, openLabel, closeLabel, peekLabel, hasPeek, popupClassName, contentClassName, children }) {
    const peekTriggerRef = useRef(null);
    const popupClass = `mobile-bottom-sheet-popup ${popupClassName}`.trim();
    const contentClass = `mobile-bottom-sheet-content ${contentClassName}`.trim();
    const closeSheet = () => {
        onOpenChange(false);
    };

    const toggleSheet = () => {
        onOpenChange(!isOpen);
    };

    if (hasPeek) {
        return (
            <div className="mobile-bottom-sheet-root" data-open={isOpen ? "true" : "false"} data-has-peek="true">
                <section id={contentId} className={popupClass} aria-label={peekLabel} role="region">
                    <div className={contentClass}>
                        <h2 className="sr-only">
                            {title}
                        </h2>
                        <p className="sr-only">
                            {subtitle}
                        </p>

                        <button
                            type="button"
                            ref={peekTriggerRef}
                            className="mobile-bottom-sheet-grip-control mobile-bottom-sheet-grip-control-docked"
                            onClick={toggleSheet}
                            aria-label={isOpen ? closeLabel : openLabel}
                            aria-expanded={isOpen}
                            aria-controls={contentId}
                        >
                            <ChevronUp className="mobile-bottom-sheet-grip-chevron" aria-hidden="true" focusable="false" />
                        </button>

                        {children}
                    </div>
                </section>
            </div>
        );
    }

    return (
        <Drawer.Root open={isOpen} onOpenChange={onOpenChange} swipeDirection="down">
            <div className="mobile-bottom-sheet-root" data-open={isOpen ? "true" : "false"} data-has-peek="false">
                <Drawer.Portal>
                    <Drawer.Backdrop className="mobile-bottom-sheet-backdrop" />
                    <Drawer.Viewport className="mobile-bottom-sheet-viewport">
                        <Drawer.Popup id={contentId} className={popupClass} finalFocus={finalFocusRef}>
                            <Drawer.Content className={contentClass}>
                                <Drawer.Title className="sr-only">
                                    {title}
                                </Drawer.Title>
                                <Drawer.Description className="sr-only">
                                    {subtitle}
                                </Drawer.Description>

                                <button
                                    type="button"
                                    className="mobile-bottom-sheet-grip-control mobile-bottom-sheet-grip-control-expanded"
                                    onClick={closeSheet}
                                    aria-label={closeLabel}
                                    aria-expanded={isOpen}
                                >
                                    <ChevronUp className="mobile-bottom-sheet-grip-chevron" aria-hidden="true" focusable="false" />
                                </button>

                                {children}
                            </Drawer.Content>
                        </Drawer.Popup>
                    </Drawer.Viewport>
                </Drawer.Portal>
            </div>
        </Drawer.Root>
    );
}
