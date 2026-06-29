// src/ui/view/components/MobileBottomSheet/MobileBottomSheet.jsx
import { Drawer } from "@base-ui/react/drawer";
import { ChevronUp } from "lucide-react";

export default function MobileBottomSheet({ isOpen, onOpenChange, finalFocusRef, contentId, title, subtitle, closeLabel, popupClassName, contentClassName, children }) {
    const popupClass = `mobile-bottom-sheet-popup ${popupClassName}`.trim();
    const contentClass = `mobile-bottom-sheet-content ${contentClassName}`.trim();

    const closeSheet = () => {
        onOpenChange(false);
    };

    return (
        <Drawer.Root open={isOpen} onOpenChange={onOpenChange} swipeDirection="down">
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
        </Drawer.Root>
    );
}
