// src/ui/view/components/FlipcardsPage/FlipcardToolMenu/DesktopFlipcardPopOutMenu.jsx
import { useCallback, useEffect, useRef } from "react";
import { SlidersHorizontal } from "lucide-react";
import FlipcardToolMenuContent from "./FlipcardToolMenuContent.jsx";

const DESKTOP_POPOUT_ID = "flipcard-desktop-tool-popout";

export default function DesktopFlipcardPopOutMenu({
    isOpen,
    onToggle,
    onClose,
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
    const shellRef = useRef(null);
    const toggleRef = useRef(null);

    const closeAndRestoreFocus = useCallback(() => {
        onClose();
        window.setTimeout(() => {
            toggleRef.current?.focus();
        }, 0);
    }, [onClose]);

    useEffect(() => {
        if (!isOpen) {
            return undefined;
        }

        const handleKeyDown = (event) => {
            if (event.key === "Escape") {
                event.preventDefault();
                closeAndRestoreFocus();
            }
        };

        const handlePointerDown = (event) => {
            if (!shellRef.current?.contains(event.target)) {
                closeAndRestoreFocus();
            }
        };

        document.addEventListener("keydown", handleKeyDown);
        document.addEventListener("pointerdown", handlePointerDown);

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
            document.removeEventListener("pointerdown", handlePointerDown);
        };
    }, [closeAndRestoreFocus, isOpen]);

    return (
        <div className="flipcard-popout-shell" ref={shellRef}>
            <button
                type="button"
                ref={toggleRef}
                className="flipcard-popout-toggle"
                aria-controls={DESKTOP_POPOUT_ID}
                aria-expanded={isOpen}
                aria-label={isOpen ? labels.closeToolMenuLabel : labels.openToolMenuLabel}
                onClick={onToggle}
            >
                <SlidersHorizontal aria-hidden="true" focusable="false" />
                <span>{labels.toolMenuTitle}</span>
            </button>

            {isOpen && (
                <aside
                    id={DESKTOP_POPOUT_ID}
                    className="flipcard-popout flipcard-popout-open"
                    aria-label={labels.toolMenuLabel}
                >
                    <FlipcardToolMenuContent
                        variant="desktop"
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
                        onClose={closeAndRestoreFocus}
                    />
                </aside>
            )}
        </div>
    );
}
