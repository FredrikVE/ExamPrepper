// src/ui/view/components/FlipcardsPage/FlipcardToolMenu/useFlipcardToolMenu.js
import { useCallback, useState } from "react";

export default function useFlipcardToolMenu() {
    const [isDesktopMenuOpen, setIsDesktopMenuOpen] = useState(false);

    const openDesktopMenu = useCallback(() => {
        setIsDesktopMenuOpen(true);
    }, []);

    const closeDesktopMenu = useCallback(() => {
        setIsDesktopMenuOpen(false);
    }, []);

    const toggleDesktopMenu = useCallback(() => {
        setIsDesktopMenuOpen((currentValue) => !currentValue);
    }, []);

    return {
        isDesktopMenuOpen,
        openDesktopMenu,
        closeDesktopMenu,
        toggleDesktopMenu
    };
}
