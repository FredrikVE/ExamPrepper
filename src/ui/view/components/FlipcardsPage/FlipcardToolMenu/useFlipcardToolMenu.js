// src/ui/view/components/FlipcardsPage/FlipcardToolMenu/useFlipcardToolMenu.js
import { useCallback, useState } from "react";

export default function useFlipcardToolMenu() {
    const [isDesktopMenuOpen, setIsDesktopMenuOpen] = useState(false);
    const [isMobileSheetOpen, setIsMobileSheetOpen] = useState(false);

    const closeDesktopMenu = useCallback(() => {
        setIsDesktopMenuOpen(false);
    }, []);

    const toggleDesktopMenu = useCallback(() => {
        setIsDesktopMenuOpen((currentValue) => !currentValue);
    }, []);

    const openMobileSheet = useCallback(() => {
        setIsMobileSheetOpen(true);
    }, []);

    const closeMobileSheet = useCallback(() => {
        setIsMobileSheetOpen(false);
    }, []);

    const setMobileSheetOpen = useCallback((open) => {
        setIsMobileSheetOpen(open);
    }, []);

    return {
        isDesktopMenuOpen,
        closeDesktopMenu,
        toggleDesktopMenu,
        isMobileSheetOpen,
        openMobileSheet,
        closeMobileSheet,
        setMobileSheetOpen
    };
}
