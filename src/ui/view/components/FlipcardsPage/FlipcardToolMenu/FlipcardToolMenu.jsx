// src/ui/view/components/FlipcardsPage/FlipcardToolMenu/FlipcardToolMenu.jsx
import { useEffect } from "react";
import usePresentationMode from "../../../hooks/usePresentationMode.js";
import DesktopFlipcardToolsPanel from "./DesktopFlipcardToolsPanel.jsx";
import MobileFlipcardToolMenu from "./MobileFlipcardToolMenu.jsx";
import useFlipcardToolMenu from "./useFlipcardToolMenu.js";

export default function FlipcardToolMenu(props) {
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
        props.onDesktopToolsOpenChange(presentationMode === "desktop" && isDesktopMenuOpen);
    }, [isDesktopMenuOpen, presentationMode, props.onDesktopToolsOpenChange]);

    if (presentationMode === "desktop") {
        return (
            <DesktopFlipcardToolsPanel
                isOpen={isDesktopMenuOpen}
                onToggle={toggleDesktopMenu}
                onClose={closeDesktopMenu}
                labels={props.labels}
                deckToolItems={props.deckToolItems}
                onDeckToolSelect={props.onDeckToolSelect}
            />
        );
    }

    return (
        <MobileFlipcardToolMenu
            isExpanded={isMobileSheetOpen}
            onExpandedChange={setMobileSheetOpen}
            onOpenExpandedMenu={openMobileSheet}
            cardCount={props.cardCount}
            activeIndex={props.activeIndex}
            hasPrevious={props.hasPrevious}
            hasNext={props.hasNext}
            isComplete={props.isComplete}
            isSwipeCommandActive={props.isSwipeCommandActive}
            progressModel={props.progressModel}
            labels={props.labels}
            deckToolItems={props.deckToolItems}
            onPrevious={props.onPrevious}
            onNext={props.onNext}
            onGoToCard={props.onGoToCard}
            onPractice={props.onPractice}
            onFlip={props.onFlip}
            onMastered={props.onMastered}
            onDeckToolSelect={props.onDeckToolSelect}
        />
    );
}
