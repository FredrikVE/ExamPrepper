// src/ui/view/components/MobileBottomSheet/MobileBottomSheet.jsx
import { useRef } from "react";
import { Drawer } from "@base-ui/react/drawer";
import { ChevronUp } from "lucide-react";

export default function MobileBottomSheet({ isOpen, onOpenChange, finalFocusRef, contentId, title, subtitle, openLabel, closeLabel, peekLabel, hasPeek, peekContent, popupClassName, contentClassName, children }) {
    const peekTriggerRef = useRef(null);
    const popupClass = `mobile-bottom-sheet-popup ${popupClassName}`.trim();
    const contentClass = `mobile-bottom-sheet-content ${contentClassName}`.trim();
    const popupFinalFocusRef = hasPeek ? peekTriggerRef : finalFocusRef;

    const openSheet = () => {
        onOpenChange(true);
    };

    const closeSheet = () => {
        onOpenChange(false);
    };

    return (
        <Drawer.Root open={isOpen} onOpenChange={onOpenChange} swipeDirection="down">
            <div className="mobile-bottom-sheet-root" data-open={isOpen ? "true" : "false"} data-has-peek={hasPeek ? "true" : "false"}>
                {hasPeek && (
                    <section className="mobile-bottom-sheet-peek" aria-label={peekLabel} aria-hidden={isOpen}>
                        <button
                            type="button"
                            ref={peekTriggerRef}
                            className="mobile-bottom-sheet-grip-control mobile-bottom-sheet-grip-control-peek"
                            onClick={openSheet}
                            aria-label={openLabel}
                            aria-expanded={isOpen}
                            aria-controls={contentId}
                        >
                            <ChevronUp className="mobile-bottom-sheet-grip-chevron" aria-hidden="true" focusable="false" />
                        </button>

                        <div className="mobile-bottom-sheet-peek-content" onFocusCapture={openSheet} onPointerDownCapture={openSheet}>
                            {peekContent}
                        </div>
                    </section>
                )}

                <Drawer.Portal>
                    <Drawer.Backdrop className="mobile-bottom-sheet-backdrop" />
                    <Drawer.Viewport className="mobile-bottom-sheet-viewport">
                        <Drawer.Popup id={contentId} className={popupClass} finalFocus={popupFinalFocusRef}>
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
