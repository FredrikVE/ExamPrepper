// src/ui/viewmodel/FlipcardsPageViewModel.js
import { useCallback, useEffect, useMemo, useState } from "react";
import usePresentationMode from "../presentation/usePresentationMode.js";
import { createFlipcardsProgressModel, FLIPCARD_PROGRESS_STATUS, resolveUpdatedFlipcardProgress } from "./FlipcardsPage/flipcardsProgressModel.js";
import { FLIPCARD_DECK_TOOL_KEYS } from "./FlipcardsPage/flipcardDeckTools.js";
import { createDeckToolItems, createDeckToolStatusLabels, createDisabledDeckToolKeys, createRepeatDifficultCardIds, createShuffledFlipcardIds, createVisibleFlipcards } from "./FlipcardsPage/flipcardDeckToolState.js";

export default function useFlipcardsPageViewModel(getFlashcardsUseCase, subjectId, language, t, isActive, showBackButton, onBack) {
    const presentationMode = usePresentationMode();
    const [flashcards, setFlashcards] = useState([]);
    const [flashcardsLoading, setFlashcardsLoading] = useState(true);
    const [flashcardsLoadError, setFlashcardsLoadError] = useState(null);
    const [masteredCardIds, setMasteredCardIds] = useState([]);
    const [practiceCardIds, setPracticeCardIds] = useState([]);
    const [activeDeckToolKey, setActiveDeckToolKey] = useState(FLIPCARD_DECK_TOOL_KEYS.ALL_CARDS);
    const [selectedDeckCardIds, setSelectedDeckCardIds] = useState([]);
    const [activeCardIndex, setActiveCardIndex] = useState(0);
    const [isActiveCardFlipped, setIsActiveCardFlipped] = useState(false);

    useEffect(() => {
        if (!isActive) {
            return undefined;
        }

        let cancelled = false;

        async function loadFlashcards() {
            try {
                setFlashcardsLoading(true);
                setFlashcardsLoadError(null);

                const loadedFlashcards = await getFlashcardsUseCase.execute({
                    subjectId,
                    language
                });

                if (!cancelled) {
                    setFlashcards(loadedFlashcards);
                    setMasteredCardIds([]);
                    setPracticeCardIds([]);
                }
            } catch (error) {
                console.error("Feil ved henting av flipcards:", error);

                if (!cancelled) {
                    setFlashcards([]);
                    setFlashcardsLoadError(t.flipcardsErrorMessage);
                }
            } finally {
                if (!cancelled) {
                    setFlashcardsLoading(false);
                }
            }
        }

        loadFlashcards();

        return () => {
            cancelled = true;
        };
    }, [getFlashcardsUseCase, subjectId, language, t.flipcardsErrorMessage, isActive]);

    const updateCardProgress = useCallback((cardId, status) => {
        const progressUpdate = resolveUpdatedFlipcardProgress({
            masteredCardIds,
            practiceCardIds,
            cardId,
            status
        });

        setMasteredCardIds(progressUpdate.masteredCardIds);
        setPracticeCardIds(progressUpdate.practiceCardIds);
    }, [masteredCardIds, practiceCardIds]);

    const markCardAsMastered = useCallback((cardId) => {
        updateCardProgress(cardId, FLIPCARD_PROGRESS_STATUS.MASTERED);
    }, [updateCardProgress]);

    const markCardForPractice = useCallback((cardId) => {
        updateCardProgress(cardId, FLIPCARD_PROGRESS_STATUS.PRACTICE);
    }, [updateCardProgress]);

    const resetFlipcardsProgress = useCallback(() => {
        setMasteredCardIds([]);
        setPracticeCardIds([]);
        setActiveDeckToolKey(FLIPCARD_DECK_TOOL_KEYS.ALL_CARDS);
        setSelectedDeckCardIds([]);
    }, []);

    const progressModel = useMemo(() => {
        return createFlipcardsProgressModel({
            totalCardCount: flashcards.length,
            masteredCardIds,
            practiceCardIds,
            labels: {
                progressLabel: t.flipcardsProgressLabel,
                completeBody: t.flipcardsCompleteBody
            }
        });
    }, [flashcards.length, masteredCardIds, practiceCardIds, t.flipcardsCompleteBody, t.flipcardsProgressLabel]);

    const deckKey = useMemo(() => {
        return flashcards.map((flashcard) => flashcard.id).join("|");
    }, [flashcards]);

    useEffect(() => {
        setActiveDeckToolKey(FLIPCARD_DECK_TOOL_KEYS.ALL_CARDS);
        setSelectedDeckCardIds([]);
    }, [deckKey]);

    const labels = useMemo(() => ({
        pageEyebrow: t.flipcardsEyebrow,
        pageTitle: t.flipcardsTitle,
        pageIntro: t.flipcardsIntro,
        loadingTitle: t.flipcardsLoadingTitle,
        errorTitle: t.flipcardsErrorTitle,
        emptyTitle: t.flipcardsEmptyTitle,
        emptyBody: t.flipcardsEmptyBody,
        summaryLabel: t.flipcardsSummaryLabel,
        cardCountLabel: t.flipcardsCardCountLabel,
        studySurfaceLabel: t.flipcardsStudySurfaceLabel,
        studyKicker: t.flipcardsStudyKicker,
        studyTitle: t.flipcardsStudyTitle,
        progressSummaryLabel: t.flipcardsProgressSummaryLabel,
        deckLabel: t.flipcardsDeckLabel,
        emptyDeckTitle: t.flipcardsEmptyDeckTitle,
        completeTitle: t.flipcardsCompleteTitle,
        completeStatsLabel: t.flipcardsCompleteStatsLabel,
        completedCardsLabel: t.flipcardsCompletedCardsLabel,
        masteredCardsLabel: t.flipcardsMasteredCardsLabel,
        practiceCardsLabel: t.flipcardsPracticeCardsLabel,
        restartDeckLabel: t.flipcardsRestartDeckLabel,
        previousCardLabel: t.flipcardsPreviousCardLabel,
        nextCardLabel: t.flipcardsNextCardLabel,
        practiceCardLabel: t.flipcardsPracticeCardLabel,
        flipCardLabel: t.flipcardsFlipCardLabel,
        masteredCardLabel: t.flipcardsMasteredCardLabel,
        practiceFeedbackLabel: t.flipcardsPracticeFeedbackLabel,
        masteredFeedbackLabel: t.flipcardsMasteredFeedbackLabel,
        quickActionsLabel: t.flipcardsQuickActionsLabel,
        completePositionLabel: t.flipcardsCompletePositionLabel,
        completeBody: t.flipcardsCompleteBody,
        deckPositionLabel: t.flipcardsDeckPositionLabel,
        activeCardLabel: t.flipcardsActiveCardLabel,
        toolMenuLabel: t.flipcardsToolMenuLabel,
        openToolMenuLabel: t.flipcardsOpenToolMenuLabel,
        closeToolMenuLabel: t.flipcardsCloseToolMenuLabel,
        toolMenuTitle: t.flipcardsToolMenuTitle,
        toolMenuSubtitle: t.flipcardsToolMenuSubtitle,
        toolMenuPagerLabel: t.flipcardsToolMenuPagerLabel,
        toolMenuCurrentCardLabel: t.flipcardsToolMenuCurrentCardLabel,
        toolMenuActionsLabel: t.flipcardsToolMenuActionsLabel,
        toolMenuStatsLabel: t.flipcardsToolMenuStatsLabel,
        goToCardLabel: t.flipcardsGoToCardLabel,
        toolMenuAllCardsLabel: t.flipcardsToolMenuAllCardsLabel,
        toolMenuShuffleLabel: t.flipcardsToolMenuShuffleLabel,
        toolMenuRepeatDifficultLabel: t.flipcardsToolMenuRepeatDifficultLabel,
        toolMenuAddCardLabel: t.flipcardsToolMenuAddCardLabel,
        toolMenuUnavailableLabel: t.flipcardsToolMenuUnavailableLabel,
        toolMenuSelectedLabel: t.flipcardsToolMenuSelectedLabel,
        toolMenuAllCardsStatusLabel: t.flipcardsToolMenuAllCardsStatusLabel,
        toolMenuShuffleStatusLabel: t.flipcardsToolMenuShuffleStatusLabel,
        toolMenuRepeatDifficultCountLabel: t.flipcardsToolMenuRepeatDifficultCountLabel,
        toolMenuNoPracticeCardsLabel: t.flipcardsToolMenuNoPracticeCardsLabel,
        toolMenuPracticeDescription: t.flipcardsToolMenuPracticeDescription,
        toolMenuFlipDescription: t.flipcardsToolMenuFlipDescription,
        toolMenuMasteredDescription: t.flipcardsToolMenuMasteredDescription,
    }), [t]);

    const visibleCards = useMemo(() => {
        return createVisibleFlipcards(flashcards, selectedDeckCardIds);
    }, [flashcards, selectedDeckCardIds]);

    const visibleDeckKey = useMemo(() => {
        return [deckKey, activeDeckToolKey, visibleCards.map((card) => card.id).join("|")].join("::");
    }, [activeDeckToolKey, deckKey, visibleCards]);

    useEffect(() => {
        setActiveCardIndex(0);
        setIsActiveCardFlipped(false);
    }, [visibleDeckKey]);

    const activeCard = visibleCards[activeCardIndex] ?? null;

    const nextCard = activeCardIndex < visibleCards.length - 1
        ? visibleCards[activeCardIndex + 1]
        : null;

    const isDeckComplete = activeCardIndex >= visibleCards.length;

    const hasPreviousCard = activeCardIndex > 0;

    const hasNextCard = activeCardIndex < visibleCards.length - 1;

    const activeCardPositionLabel = isDeckComplete
        ? labels.completePositionLabel
        : labels.deckPositionLabel(
            Math.min(activeCardIndex + 1, visibleCards.length),
            visibleCards.length
        );

    const repeatDifficultCardIds = useMemo(() => {
        return createRepeatDifficultCardIds(flashcards, practiceCardIds);
    }, [flashcards, practiceCardIds]);

    const disabledDeckToolKeys = useMemo(() => {
        return createDisabledDeckToolKeys(repeatDifficultCardIds);
    }, [repeatDifficultCardIds]);

    const deckToolStatusLabels = useMemo(() => {
        return createDeckToolStatusLabels(labels, flashcards.length, repeatDifficultCardIds.length);
    }, [flashcards.length, labels, repeatDifficultCardIds.length]);

    const deckToolItems = useMemo(() => {
        return createDeckToolItems(labels, activeDeckToolKey, disabledDeckToolKeys, deckToolStatusLabels);
    }, [activeDeckToolKey, deckToolStatusLabels, disabledDeckToolKeys, labels]);

    const showAllCards = useCallback(() => {
        setActiveDeckToolKey(FLIPCARD_DECK_TOOL_KEYS.ALL_CARDS);
        setSelectedDeckCardIds([]);
    }, []);

    const shuffleDeck = useCallback(() => {
        setActiveDeckToolKey(FLIPCARD_DECK_TOOL_KEYS.SHUFFLE);
        setSelectedDeckCardIds(createShuffledFlipcardIds(flashcards));
    }, [flashcards]);

    const repeatDifficultCards = useCallback(() => {
        if (repeatDifficultCardIds.length === 0) {
            return;
        }

        setActiveDeckToolKey(FLIPCARD_DECK_TOOL_KEYS.REPEAT_DIFFICULT);
        setSelectedDeckCardIds(repeatDifficultCardIds);
    }, [repeatDifficultCardIds]);

    const selectDeckTool = useCallback((deckToolKey) => {
        if (disabledDeckToolKeys.includes(deckToolKey)) {
            return;
        }

        if (deckToolKey === FLIPCARD_DECK_TOOL_KEYS.ALL_CARDS) {
            showAllCards();
            return;
        }

        if (deckToolKey === FLIPCARD_DECK_TOOL_KEYS.SHUFFLE) {
            shuffleDeck();
            return;
        }

        if (deckToolKey === FLIPCARD_DECK_TOOL_KEYS.REPEAT_DIFFICULT) {
            repeatDifficultCards();
        }
    }, [disabledDeckToolKeys, repeatDifficultCards, showAllCards, shuffleDeck]);

    const goToPreviousCard = useCallback(() => {
        setIsActiveCardFlipped(false);
        setActiveCardIndex((currentIndex) => Math.max(currentIndex - 1, 0));
    }, []);

    const goToNextCard = useCallback(() => {
        setIsActiveCardFlipped(false);
        setActiveCardIndex((currentIndex) => Math.min(currentIndex + 1, visibleCards.length));
    }, [visibleCards.length]);

    const goToCard = useCallback((cardIndex) => {
        setIsActiveCardFlipped(false);
        setActiveCardIndex(
            Math.min(Math.max(cardIndex, 0), Math.max(visibleCards.length - 1, 0))
        );
    }, [visibleCards.length]);

    const toggleActiveCard = useCallback(() => {
        setIsActiveCardFlipped((isCurrentlyFlipped) => !isCurrentlyFlipped);
    }, []);

    const completeCardForPractice = useCallback((cardId) => {
        if (!activeCard || activeCard.id !== cardId) {
            return;
        }

        markCardForPractice(cardId);
        setIsActiveCardFlipped(false);
        setActiveCardIndex((currentIndex) => Math.min(currentIndex + 1, visibleCards.length));
    }, [activeCard, markCardForPractice, visibleCards.length]);

    const completeCardAsMastered = useCallback((cardId) => {
        if (!activeCard || activeCard.id !== cardId) {
            return;
        }

        markCardAsMastered(cardId);
        setIsActiveCardFlipped(false);
        setActiveCardIndex((currentIndex) => Math.min(currentIndex + 1, visibleCards.length));
    }, [activeCard, markCardAsMastered, visibleCards.length]);

    const restartFlipcardSession = useCallback(() => {
        resetFlipcardsProgress();
        setActiveCardIndex(0);
        setIsActiveCardFlipped(false);
    }, [resetFlipcardsProgress]);

    return {
        labels,
        flashcards,
        flashcardsLoading,
        flashcardsLoadError,
        progressLabel: progressModel.progressLabel,
        progressModel,
        presentationMode,
        deckKey,
        visibleCards,
        visibleDeckKey,
        activeDeckToolKey,
        deckToolItems,
        showBackButton,
        backLabel: t.sidebarBack,
        navigationLabel: t.sidebarMobileNavigation,
        onBack,
        activeCardIndex,
        activeCard,
        nextCard,
        isActiveCardFlipped,
        isDeckComplete,
        hasPreviousCard,
        hasNextCard,
        activeCardPositionLabel,
        goToPreviousCard,
        goToNextCard,
        goToCard,
        toggleActiveCard,
        completeCardForPractice,
        completeCardAsMastered,
        restartFlipcardSession,
        masteredCardIds,
        practiceCardIds,
        markCardAsMastered,
        markCardForPractice,
        resetFlipcardsProgress,
        onSelectDeckTool: selectDeckTool
    };
}
