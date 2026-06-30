// src/ui/view/components/FlipcardsPage/FlipcardToolMenu/useFlipcardToolMenu.js
import { useCallback, useState } from "react";

// Lokal interaksjonsstate for desktop-popouten. Mobil-arket eier sin egen
// åpne-state lokalt i FlipcardsMobileFooterSheet (samme mønster som select-sidene).
export default function useFlipcardToolMenu() {
    const [isDesktopMenuOpen, setIsDesktopMenuOpen] = useState(false);

    const closeDesktopMenu = useCallback(() => {
        setIsDesktopMenuOpen(false);
    }, []);

    const setDesktopMenuOpen = useCallback((open) => {
        setIsDesktopMenuOpen(open);
    }, []);

    return {
        isDesktopMenuOpen,
        closeDesktopMenu,
        setDesktopMenuOpen
    };
}
