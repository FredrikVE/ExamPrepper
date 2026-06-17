// src/ui/view/components/Settings/useCloseSettingsOnMobileBreakpointExit.js
import { useEffect, useRef } from "react";

const MOBILE_SETTINGS_QUERY = "(max-width: 767px)";

export default function useCloseSettingsOnMobileBreakpointExit(isOpen, onClose) {
    const wasOpenedInMobileModeRef = useRef(false);

    useEffect(() => {
        if (!isOpen) {
            wasOpenedInMobileModeRef.current = false;
            return undefined;
        }

        if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
            return undefined;
        }

        const mediaQuery = window.matchMedia(MOBILE_SETTINGS_QUERY);
        wasOpenedInMobileModeRef.current = mediaQuery.matches;

        if (!mediaQuery.matches) {
            return undefined;
        }

        const handleChange = (event) => {
            if (!event.matches && wasOpenedInMobileModeRef.current) {
                onClose();
            }
        };

        mediaQuery.addEventListener("change", handleChange);

        return () => {
            mediaQuery.removeEventListener("change", handleChange);
        };
    }, [isOpen, onClose]);
}
