// src/ui/view/components/Settings/useCloseSettingsOnMobileBreakpointExit.js
import { useEffect } from "react";

const MOBILE_SETTINGS_QUERY = "(max-width: 767px)";

export default function useCloseSettingsOnMobileBreakpointExit(isOpen, onClose) {
    useEffect(() => {
        if (!isOpen) {
            return undefined;
        }

        if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
            return undefined;
        }

        const mediaQuery = window.matchMedia(MOBILE_SETTINGS_QUERY);

        const handleChange = () => {
            onClose();
        };

        mediaQuery.addEventListener("change", handleChange);

        return () => {
            mediaQuery.removeEventListener("change", handleChange);
        };
    }, [isOpen, onClose]);
}
