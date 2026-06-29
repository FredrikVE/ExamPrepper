// src/ui/view/components/FlipcardsPage/FlipcardToolMenu/FlipcardFooterPager.jsx
import { ChevronLeft, ChevronRight } from "lucide-react";
import FooterNavigationButton from "../../Footer/FooterNavigationButton.jsx";
import QuestionDots from "../../Footer/QuestionDots.jsx";

function createQuestionDotEntries(cardCount, activeIndex) {
    const safeActiveIndex = Math.min(Math.max(activeIndex, 0), Math.max(cardCount - 1, 0));

    return Array.from({ length: cardCount }, (_item, index) => ({
        key: `flipcard-dot-${index}`,
        questionNumber: index + 1,
        questionIndex: index,
        isActive: index === safeActiveIndex,
        isCorrect: false
    }));
}

export default function FlipcardFooterPager({
    cardCount,
    activeIndex,
    hasPrevious,
    hasNext,
    isSwipeCommandActive,
    labels,
    onPrevious,
    onNext,
    onGoToCard
}) {
    const currentPosition = Math.min(activeIndex + 1, cardCount);
    const progressLabel = labels.deckPositionLabel(currentPosition, cardCount);
    const questionDotEntries = createQuestionDotEntries(cardCount, activeIndex);
    const footerPagerLabels = {
        footerQuestionNavigationLabel: labels.toolMenuPagerLabel,
        footerGoToQuestion: labels.goToCardLabel
    };

    return (
        <div className="flipcard-footer-pager" aria-label={labels.toolMenuPagerLabel}>
            <FooterNavigationButton
                onClick={onPrevious}
                disabled={!hasPrevious || isSwipeCommandActive}
                variant="previous"
                icon={<ChevronLeft className="exam-footer-icon" aria-hidden="true" focusable="false" />}
                className="flipcard-footer-pager-button"
            >
                {labels.previousCardLabel}
            </FooterNavigationButton>

            <div className="flipcard-footer-pager-counter">
                <QuestionDots
                    questionDotEntries={questionDotEntries}
                    filledCompactQuestionDotEntries={questionDotEntries}
                    minimalCompactQuestionDotEntries={questionDotEntries}
                    shouldUseCompactDots={cardCount > 9}
                    shouldUseResponsiveCompactDots={true}
                    submitted={false}
                    onGoToQuestion={onGoToCard}
                    labels={footerPagerLabels}
                />
                <span className="flipcard-footer-pager-label">{progressLabel}</span>
            </div>

            <FooterNavigationButton
                onClick={onNext}
                disabled={!hasNext || isSwipeCommandActive}
                variant="next"
                icon={<ChevronRight className="exam-footer-icon" aria-hidden="true" focusable="false" />}
                className="flipcard-footer-pager-button"
            >
                {labels.nextCardLabel}
            </FooterNavigationButton>
        </div>
    );
}
