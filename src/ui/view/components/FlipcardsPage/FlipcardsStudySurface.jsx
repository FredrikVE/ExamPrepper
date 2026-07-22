// src/ui/view/components/FlipcardsPage/FlipcardsStudySurface.jsx
import { useCallback, useEffect, useMemo } from "react";
import { PRESENTATION_MODE } from "../../../presentation/presentationMode.js";
import { FLIPCARD_SWIPE_RESULT } from "./FlipcardDeck/flipcardSwipe.js";
import { useFlipcardFeedbackToast } from "./FlipcardDeck/useFlipcardFeedbackToast.js";
import { useFlipcardSwipeInteraction } from "./FlipcardDeck/useFlipcardSwipeInteraction.js";
import FlipcardDeck from "./FlipcardDeck/FlipcardDeck.jsx";
import FlipcardsMobileFooterSheet from "./FlipcardToolMenu/FlipcardsMobileFooterSheet.jsx";
import ProgressPager from "../ProgressPager/ProgressPager.jsx";
import createProgressPagerEntries from "../ProgressPager/createProgressPagerEntries.js";
import shouldHandleFlipcardKeyboardShortcut, { resolveFlipcardKeyboardSwipeResult } from "./FlipcardDeck/shouldHandleFlipcardKeyboardShortcut.js";

const resolveFlipcardProgressCorrectness = () => false;

export default function FlipcardsStudySurface(props) {
	const presentationMode = props.presentationMode;
	const isDesktopToolsPanelOpen =
		presentationMode === PRESENTATION_MODE.DESKTOP && props.isDesktopMenuOpen;
	const {
		activeSwipeCommand,
		isSwipeCommandActive,
		requestPracticeSwipe,
		requestMasteredSwipe,
		clearActiveSwipeCommand
	} = useFlipcardSwipeInteraction(props.visibleDeckKey);
	const {
		message: feedbackToastMessage,
		isVisible: isFeedbackToastVisible,
		showFeedbackToast
	} = useFlipcardFeedbackToast({
		resetKey: props.visibleDeckKey
	});

	const progressEntries = useMemo(() => {
		return createProgressPagerEntries({
			count: props.cards.length,
			activeIndex: props.activeCardIndex,
			keyPrefix: "flipcard-dot",
			resolveIsCorrect: resolveFlipcardProgressCorrectness
		});
	}, [props.activeCardIndex, props.cards.length]);

	const restartSession = useCallback(() => {
		clearActiveSwipeCommand();
		props.onRestartSession();
	}, [clearActiveSwipeCommand, props]);

	const selectDeckTool = useCallback((deckToolKey) => {
		clearActiveSwipeCommand();
		props.onSelectDeckTool(deckToolKey);
	}, [clearActiveSwipeCommand, props]);

	const completeAsMastered = useCallback((cardId) => {
		clearActiveSwipeCommand();
		props.onCompleteAsMastered(cardId);
	}, [clearActiveSwipeCommand, props.onCompleteAsMastered]);

	const completeForPractice = useCallback((cardId) => {
		clearActiveSwipeCommand();
		props.onCompleteForPractice(cardId);
	}, [clearActiveSwipeCommand, props.onCompleteForPractice]);

	const showSwipeFeedback = useCallback((swipeResult) => {
		if (swipeResult === FLIPCARD_SWIPE_RESULT.PRACTICE) {
			showFeedbackToast(props.labels.practiceFeedbackLabel);
			return;
		}

		if (swipeResult === FLIPCARD_SWIPE_RESULT.MASTERED) {
			showFeedbackToast(props.labels.masteredFeedbackLabel);
		}
	}, [props.labels.masteredFeedbackLabel, props.labels.practiceFeedbackLabel, showFeedbackToast]);

	const handleFlipcardKeyboardShortcut = useCallback((event) => {
		if (!shouldHandleFlipcardKeyboardShortcut(event)) {
			return;
		}

		if (props.cards.length === 0 || props.isDeckComplete || isSwipeCommandActive) {
			return;
		}

		const keyboardSwipeResult = resolveFlipcardKeyboardSwipeResult(event.key);

		if (keyboardSwipeResult === FLIPCARD_SWIPE_RESULT.PRACTICE) {
			event.preventDefault();
			requestPracticeSwipe();
			return;
		}

		if (keyboardSwipeResult === FLIPCARD_SWIPE_RESULT.MASTERED) {
			event.preventDefault();
			requestMasteredSwipe();
			return;
		}

		if (event.key === "Enter" || event.key === " ") {
			event.preventDefault();
			props.onToggleActiveCard();
		}
	}, [
		isSwipeCommandActive,
		props.cards.length,
		props.isDeckComplete,
		props.onToggleActiveCard,
		requestMasteredSwipe,
		requestPracticeSwipe
	]);

	useEffect(() => {
		window.addEventListener("keydown", handleFlipcardKeyboardShortcut);

		return () => window.removeEventListener("keydown", handleFlipcardKeyboardShortcut);
	}, [handleFlipcardKeyboardShortcut]);

	const studySurfaceClassName = isDesktopToolsPanelOpen
		? "flipcards-study-surface flipcards-study-surface-desktop-tools-open"
		: "flipcards-study-surface";

	const progressPager = (
		<ProgressPager
			className="flipcards-progress-pager flipcards-progress-pager-deck"
			containerClassName="flipcards-progress-pager-container"
			ariaLabel={props.labels.toolMenuPagerLabel}
			previousLabel={props.labels.previousCardLabel}
			previousDisabled={!props.hasPreviousCard || isSwipeCommandActive}
			previousButtonClassName="flipcards-progress-pager-button"
			onPrevious={props.onGoToPreviousCard}
			entries={progressEntries}
			compactEntries={progressEntries}
			minimalCompactEntries={progressEntries}
			shouldUseCompactDots={props.cards.length > 9}
			shouldUseResponsiveCompactDots={true}
			submitted={false}
			onSelectEntry={props.onGoToCard}
			dotsLabel={props.labels.toolMenuPagerLabel}
			goToEntryLabel={props.labels.goToCardLabel}
			counterLabel=""
			counterClassName="flipcards-progress-pager-counter"
			counterLabelClassName="flipcards-progress-pager-label"
			nextLabel={props.labels.nextCardLabel}
			nextDisabled={!props.hasNextCard || isSwipeCommandActive}
			nextButtonClassName="flipcards-progress-pager-button"
			onNext={props.onGoToNextCard}
			hasActionButton={false}
			actionButton={null}
		/>
	);

	return (
		<section className={studySurfaceClassName} aria-label={props.labels.studySurfaceLabel}>
			<div className="flipcards-study-body">
				<div className="flipcard-deck-column">
					<FlipcardDeck
						cards={props.cards}
						activeCard={props.activeCard}
						nextCard={props.nextCard}
						activeCardIndex={props.activeCardIndex}
						isActiveCardFlipped={props.isActiveCardFlipped}
						isDeckComplete={props.isDeckComplete}
						hasPreviousCard={props.hasPreviousCard}
						hasNextCard={props.hasNextCard}
						activeSwipeCommand={activeSwipeCommand}
						isSwipeCommandActive={isSwipeCommandActive}
						labels={props.labels}
						progressModel={props.progressModel}
						onGoToPreviousCard={props.onGoToPreviousCard}
						onGoToNextCard={props.onGoToNextCard}
						onToggleActiveCard={props.onToggleActiveCard}
						onRequestPracticeSwipe={requestPracticeSwipe}
						onRequestMasteredSwipe={requestMasteredSwipe}
						onPractice={completeForPractice}
						onMastered={completeAsMastered}
						onSwipeFeedback={showSwipeFeedback}
						feedbackToastMessage={feedbackToastMessage}
						isFeedbackToastVisible={isFeedbackToastVisible}
						onRestart={restartSession}
					/>

					{!props.isDeckComplete && (
						<div className="flipcard-deck-progress-pager">
							{progressPager}
						</div>
					)}
				</div>
			</div>

			<FlipcardsMobileFooterSheet
				progressEntries={progressEntries}
				progressLabel={props.activeCardPositionLabel}
				hasPrevious={props.hasPreviousCard}
				hasNext={props.hasNextCard}
				isSwipeCommandActive={isSwipeCommandActive}
				deckToolItems={props.deckToolItems}
				labels={props.labels}
				onPrevious={props.onGoToPreviousCard}
				onNext={props.onGoToNextCard}
				onGoToCard={props.onGoToCard}
				onDeckToolSelect={selectDeckTool}
			/>
		</section>
	);
}
