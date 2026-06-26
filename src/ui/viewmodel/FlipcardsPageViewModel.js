// src/ui/viewmodel/FlipcardsPageViewModel.js
import { useCallback, useEffect, useMemo, useState } from "react";
import {
    createFlipcardsProgressModel,
    FLIPCARD_PROGRESS_STATUS,
    resolveUpdatedFlipcardProgress
} from "./FlipcardsPage/flipcardsProgressModel.js";

export default function useFlipcardsPageViewModel(getFlashcardsUseCase, subjectId, language, t, isActive) {
    const [flashcards, setFlashcards] = useState([]);
    const [flashcardsLoading, setFlashcardsLoading] = useState(true);
    const [flashcardsLoadError, setFlashcardsLoadError] = useState(null);
    const [masteredCardIds, setMasteredCardIds] = useState([]);
    const [practiceCardIds, setPracticeCardIds] = useState([]);

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
        toolMenuFavoritesLabel: t.flipcardsToolMenuFavoritesLabel,
        toolMenuRepeatDifficultLabel: t.flipcardsToolMenuRepeatDifficultLabel,
        toolMenuPracticeDescription: t.flipcardsToolMenuPracticeDescription,
        toolMenuFlipDescription: t.flipcardsToolMenuFlipDescription,
        toolMenuMasteredDescription: t.flipcardsToolMenuMasteredDescription,
    }), [t]);

    return {
        labels,
        flashcards,
        flashcardsLoading,
        flashcardsLoadError,
        progressLabel: progressModel.progressLabel,
        progressModel,
        deckKey,
        masteredCardIds,
        practiceCardIds,
        markCardAsMastered,
        markCardForPractice,
        resetFlipcardsProgress
    };
}
