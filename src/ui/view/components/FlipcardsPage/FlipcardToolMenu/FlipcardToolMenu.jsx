// src/ui/view/components/FlipcardsPage/FlipcardToolMenu/FlipcardToolMenu.jsx
import { useEffect } from "react";
import usePresentationMode from "../../../hooks/usePresentationMode.js";
import DesktopFlipcardToolsPanel from "./DesktopFlipcardToolsPanel.jsx";
import MobileFlipcardToolMenu from "./MobileFlipcardToolMenu.jsx";
import useFlipcardToolMenu from "./useFlipcardToolMenu.js";

export default function FlipcardToolMenu({
    cardCount,
    activeIndex,
    hasPrevious,
    hasNext,
    isComplete,
    isSwipeCommandActive,
    progressModel,
    labels,
    desktopToolActions,
    onPrevious,
    onNext,
    onGoToCard,
    onPractice,
    onFlip,
    onMastered,
    onDesktopToolsOpenChange
}) {
    const presentationMode = usePresentationMode();
    const {
        isDesktopMenuOpen,
        closeDesktopMenu,
        toggleDesktopMenu,
        isMobileSheetOpen,
        openMobileSheet,
        closeMobileSheet,
        setMobileSheetOpen
    } = useFlipcardToolMenu();

    useEffect(() => {
        if (presentationMode !== "desktop") {
            closeDesktopMenu();
        }

        if (presentationMode !== "mobile") {
            closeMobileSheet();
        }
    }, [closeDesktopMenu, closeMobileSheet, presentationMode]);


    useEffect(() => {
        onDesktopToolsOpenChange?.(presentationMode === "desktop" && isDesktopMenuOpen);
    }, [isDesktopMenuOpen, onDesktopToolsOpenChange, presentationMode]);

    if (presentationMode === "desktop") {
        return (
            <DesktopFlipcardToolsPanel
                isOpen={isDesktopMenuOpen}
                onToggle={toggleDesktopMenu}
                onClose={closeDesktopMenu}
                labels={labels}
                desktopToolActions={desktopToolActions}
            />
        );
    }

    return (
        <MobileFlipcardToolMenu
            isExpanded={isMobileSheetOpen}
            onExpandedChange={setMobileSheetOpen}
            onOpenExpandedMenu={openMobileSheet}
            cardCount={cardCount}
            activeIndex={activeIndex}
            hasPrevious={hasPrevious}
            hasNext={hasNext}
            isComplete={isComplete}
            isSwipeCommandActive={isSwipeCommandActive}
            progressModel={progressModel}
            labels={labels}
            onPrevious={onPrevious}
            onNext={onNext}
            onGoToCard={onGoToCard}
            onPractice={onPractice}
            onFlip={onFlip}
            onMastered={onMastered}
        />
    );
}
