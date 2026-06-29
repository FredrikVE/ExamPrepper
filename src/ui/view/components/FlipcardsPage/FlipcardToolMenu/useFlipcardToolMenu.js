// src/ui/view/components/FlipcardsPage/FlipcardToolMenu/useFlipcardToolMenu.js
import { useCallback, useState } from "react";

export default function useFlipcardToolMenu() {
    const [isDesktopMenuOpen, setIsDesktopMenuOpen] = useState(false);
    const [isMobileSheetOpen, setIsMobileSheetOpen] = useState(false);

    const closeDesktopMenu = useCallback(() => {
        setIsDesktopMenuOpen(false);
    }, []);

    const setDesktopMenuOpen = useCallback((open) => {
        setIsDesktopMenuOpen(open);
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
        setDesktopMenuOpen,
        isMobileSheetOpen,
        openMobileSheet,
        closeMobileSheet,
        setMobileSheetOpen
    };
}
