// src/ui/view/components/FlipcardsPage/FlipcardToolMenu/FlipcardToolMenuFooter.jsx
export default function FlipcardToolMenuFooter({ progressModel, labels }) {
    return (
        <footer className="flipcard-tool-menu-footer" aria-label={labels.toolMenuStatsLabel}>
            <span>{labels.completedCardsLabel(progressModel.completedCount, progressModel.totalCardCount)}</span>
            <span>{labels.masteredCardsLabel(progressModel.masteredCount)}</span>
            <span>{labels.practiceCardsLabel(progressModel.practiceCount)}</span>
        </footer>
    );
}
