// src/ui/view/components/FlipcardsPage/FlipcardToolMenu/FlipcardToolMenu.jsx
import { useEffect } from "react";
import usePresentationMode from "../../../hooks/usePresentationMode.js";
import DesktopFlipcardPopOutMenu from "./DesktopFlipcardPopOutMenu.jsx";
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
    onPrevious,
    onNext,
    onPractice,
    onFlip,
    onMastered
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

    if (presentationMode === "desktop") {
        return (
            <DesktopFlipcardPopOutMenu
                isOpen={isDesktopMenuOpen}
                onToggle={toggleDesktopMenu}
                onClose={closeDesktopMenu}
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
                onPractice={onPractice}
                onFlip={onFlip}
                onMastered={onMastered}
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
            onPractice={onPractice}
            onFlip={onFlip}
            onMastered={onMastered}
        />
    );
}
