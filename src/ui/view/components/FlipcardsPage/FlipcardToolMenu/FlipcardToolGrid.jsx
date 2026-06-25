// src/ui/view/components/FlipcardsPage/FlipcardToolMenu/FlipcardToolGrid.jsx
import { Check, RotateCcw, Repeat } from "lucide-react";
import FlipcardToolCard from "./FlipcardToolCard.jsx";

export default function FlipcardToolGrid({
    isComplete,
    isSwipeCommandActive,
    labels,
    onPractice,
    onFlip,
    onMastered
}) {
    const actionDisabled = isComplete || isSwipeCommandActive;

    return (
        <div className="flipcard-tool-grid" aria-label={labels.toolMenuActionsLabel}>
            <FlipcardToolCard
                variant="practice"
                icon={Repeat}
                label={labels.practiceCardLabel}
                description={labels.toolMenuPracticeDescription}
                disabled={actionDisabled}
                onClick={onPractice}
            />
            <FlipcardToolCard
                variant="flip"
                icon={RotateCcw}
                label={labels.flipCardLabel}
                description={labels.toolMenuFlipDescription}
                disabled={actionDisabled}
                onClick={onFlip}
            />
            <FlipcardToolCard
                variant="mastered"
                icon={Check}
                label={labels.masteredCardLabel}
                description={labels.toolMenuMasteredDescription}
                disabled={actionDisabled}
                onClick={onMastered}
            />
        </div>
    );
}
