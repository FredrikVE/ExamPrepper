// src/ui/view/components/Settings/useDialogDismiss.js
import { useCallback, useEffect } from "react";

export default function useDialogDismiss(isOpen, panelRef, onClose) {
    const close = useCallback(() => {
        onClose(false);
    }, [onClose]);

    useEffect(() => {
        if (!isOpen) return;

        const handleKeyDown = (event) => {
            if (event.key === "Escape") {
                close();
            }
        };

        const handleClickOutside = (event) => {
            if (panelRef.current && !panelRef.current.contains(event.target)) {
                close();
            }
        };

        document.addEventListener("keydown", handleKeyDown);
        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen, panelRef, close]);

    return close;
}
