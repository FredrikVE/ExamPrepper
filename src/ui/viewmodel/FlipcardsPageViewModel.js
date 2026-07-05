// src/ui/viewmodel/FlipcardsPageViewModel.js
import { useCallback, useEffect, useMemo, useState } from "react";
import { ALL_TOPIC_AREAS } from "../../model/domain/utils/topicAreaFilters.js";
import { filterFlashcardsByTopicArea } from "../../model/domain/utils/filterFlashcardsByTopicArea.js";
import usePresentationMode from "../presentation/usePresentationMode.js";
import { createFlipcardsProgressModel, FLIPCARD_PROGRESS_STATUS, resolveUpdatedFlipcardProgress } from "./FlipcardsPage/flipcardsProgressModel.js";
import { FLIPCARD_DECK_TOOL_KEYS } from "./FlipcardsPage/flipcardDeckTools.js";
import { createDeckToolItems, createDeckToolStatusLabels, createDisabledDeckToolKeys, createRepeatDifficultCardIds, createShuffledFlipcardIds, createVisibleFlipcards } from "./FlipcardsPage/flipcardDeckToolState.js";
import useLoadModel from "./load/useLoadModel.js";
import combineLoadStatuses from "./load/combineLoadStatuses.js";

const TOPIC_AREA_DECK_TOOL_PREFIX = "topic-area-";

export default function useFlipcardsPageViewModel(
    getFlashcardsUseCase,
    getTopicAreasUseCase,
    subjectId,
    initialTopicAreaKey,
    language,
    t,
    isActive,
    backContract
) {
    const presentationMode = usePresentationMode();
    const [topicAreaKey, setTopicAreaKey] = useState(initialTopicAreaKey ?? ALL_TOPIC_AREAS);
    const [masteredCardIds, setMasteredCardIds] = useState([]);
    const [practiceCardIds, setPracticeCardIds] = useState([]);
    const [activeDeckToolKey, setActiveDeckToolKey] = useState(FLIPCARD_DECK_TOOL_KEYS.ALL_CARDS);
    const [selectedDeckCardIds, setSelectedDeckCardIds] = useState([]);
    const [activeCardIndex, setActiveCardIndex] = useState(0);
    const [isActiveCardFlipped, setIsActiveCardFlipped] = useState(false);

    useEffect(() => {
        setTopicAreaKey(initialTopicAreaKey ?? ALL_TOPIC_AREAS);
    }, [initialTopicAreaKey, subjectId]);

    const executeFlashcardLoad = useCallback(() => {
        if (!isActive || !subjectId) {
            return Promise.resolve([]);
        }

        return getFlashcardsUseCase.execute({
            subjectId,
            language
        });
    }, [getFlashcardsUseCase, isActive, subjectId, language]);

    const executeTopicAreaLoad = useCallback(() => {
        if (!isActive || !subjectId) {
            return Promise.resolve([]);
        }

        return getTopicAreasUseCase.execute({
            subjectId,
            language
        });
    }, [getTopicAreasUseCase, isActive, subjectId, language]);

    const noteFlashcardsLoaded = useCallback(() => {
        setMasteredCardIds([]);
        setPracticeCardIds([]);
    }, []);

    const flashcardLoad = useLoadModel({
        execute: executeFlashcardLoad,
        emptyData: [],
        errorFallbackMessage: t.flipcardsErrorMessage,
        onLoaded: noteFlashcardsLoaded
    });

    const topicAreaLoad = useLoadModel({
        execute: executeTopicAreaLoad,
        emptyData: [],
        errorFallbackMessage: t.flipcardsErrorMessage,
        onLoaded: noteFlipcardTopicAreasLoaded
    });

    const flashcards = flashcardLoad.data;
    const topicAreas = topicAreaLoad.data;
    const pageStatus = combineLoadStatuses([
        flashcardLoad.status,
        topicAreaLoad.status
    ]);
    const pageErrorMessage = resolveFlipcardsPageErrorMessage(
        flashcardLoad,
        topicAreaLoad,
        t.flipcardsErrorMessage
    );

    const topicFilteredFlashcards = useMemo(() => {
        return filterFlashcardsByTopicArea(flashcards, topicAreaKey);
    }, [flashcards, topicAreaKey]);

    const visibleMasteredCardIds = useMemo(() => {
        return selectCardIdsForCards(masteredCardIds, topicFilteredFlashcards);
    }, [masteredCardIds, topicFilteredFlashcards]);

    const visiblePracticeCardIds = useMemo(() => {
        return selectCardIdsForCards(practiceCardIds, topicFilteredFlashcards);
    }, [practiceCardIds, topicFilteredFlashcards]);

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
            totalCardCount: topicFilteredFlashcards.length,
            masteredCardIds: visibleMasteredCardIds,
            practiceCardIds: visiblePracticeCardIds,
            labels: {
                progressLabel: t.flipcardsProgressLabel,
                completeBody: t.flipcardsCompleteBody
            }
        });
    }, [topicFilteredFlashcards.length, visibleMasteredCardIds, visiblePracticeCardIds, t.flipcardsCompleteBody, t.flipcardsProgressLabel]);

    const deckKey = useMemo(() => {
        return createDeckKey(topicFilteredFlashcards);
    }, [topicFilteredFlashcards]);

    useEffect(() => {
        setActiveDeckToolKey(FLIPCARD_DECK_TOOL_KEYS.ALL_CARDS);
        setSelectedDeckCardIds([]);
    }, [deckKey]);

    const activeTopicArea = useMemo(() => {
        return findTopicArea(topicAreas, topicAreaKey);
    }, [topicAreas, topicAreaKey]);

    const labels = useMemo(() => {
        const topicAreaLabel = activeTopicArea?.label ?? null;
        const pageTitle = topicAreaLabel
            ? t.flipcardsTopicAreaTitle(topicAreaLabel)
            : t.flipcardsTitle;
        const pageIntro = topicAreaLabel
            ? t.flipcardsTopicAreaIntro(topicAreaLabel)
            : t.flipcardsIntro;

        return {
            pageEyebrow: t.flipcardsEyebrow,
            pageTitle,
            pageIntro,
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
            topicAreaAllLabel: t.topicAreaAllLabel,
            topicAreaToolStatusLabel: t.flipcardsTopicAreaToolStatusLabel,
            topicAreaSelectedLabel: t.flipcardsToolMenuSelectedLabel
        };
    }, [activeTopicArea, t]);

    const visibleCards = useMemo(() => {
        return createVisibleFlipcards(topicFilteredFlashcards, selectedDeckCardIds);
    }, [topicFilteredFlashcards, selectedDeckCardIds]);

    const visibleDeckKey = useMemo(() => {
        return [topicAreaKey, deckKey, activeDeckToolKey, createDeckKey(visibleCards)].join("::");
    }, [activeDeckToolKey, deckKey, topicAreaKey, visibleCards]);

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
        return createRepeatDifficultCardIds(topicFilteredFlashcards, practiceCardIds);
    }, [topicFilteredFlashcards, practiceCardIds]);

    const disabledDeckToolKeys = useMemo(() => {
        return createDisabledDeckToolKeys(repeatDifficultCardIds);
    }, [repeatDifficultCardIds]);

    const deckToolStatusLabels = useMemo(() => {
        return createDeckToolStatusLabels(labels, topicFilteredFlashcards.length, repeatDifficultCardIds.length);
    }, [topicFilteredFlashcards.length, labels, repeatDifficultCardIds.length]);

    const baseDeckToolItems = useMemo(() => {
        return createDeckToolItems(labels, activeDeckToolKey, disabledDeckToolKeys, deckToolStatusLabels);
    }, [activeDeckToolKey, deckToolStatusLabels, disabledDeckToolKeys, labels]);

    const topicAreaDeckToolItems = useMemo(() => {
        return createTopicAreaDeckToolItems(topicAreas, topicAreaKey, labels);
    }, [labels, topicAreaKey, topicAreas]);

    const deckToolItems = useMemo(() => {
        const items = [];

        for (const item of baseDeckToolItems) {
            items.push(item);
        }

        for (const item of topicAreaDeckToolItems) {
            items.push(item);
        }

        return items;
    }, [baseDeckToolItems, topicAreaDeckToolItems]);

    const showAllCards = useCallback(() => {
        setActiveDeckToolKey(FLIPCARD_DECK_TOOL_KEYS.ALL_CARDS);
        setSelectedDeckCardIds([]);
    }, []);

    const shuffleDeck = useCallback(() => {
        setActiveDeckToolKey(FLIPCARD_DECK_TOOL_KEYS.SHUFFLE);
        setSelectedDeckCardIds(createShuffledFlipcardIds(topicFilteredFlashcards));
    }, [topicFilteredFlashcards]);

    const repeatDifficultCards = useCallback(() => {
        if (repeatDifficultCardIds.length === 0) {
            return;
        }

        setActiveDeckToolKey(FLIPCARD_DECK_TOOL_KEYS.REPEAT_DIFFICULT);
        setSelectedDeckCardIds(repeatDifficultCardIds);
    }, [repeatDifficultCardIds]);

    const selectTopicAreaKey = useCallback((nextTopicAreaKey) => {
        setTopicAreaKey(nextTopicAreaKey);
        setActiveDeckToolKey(FLIPCARD_DECK_TOOL_KEYS.ALL_CARDS);
        setSelectedDeckCardIds([]);
        setActiveCardIndex(0);
        setIsActiveCardFlipped(false);
    }, []);

    const selectDeckTool = useCallback((deckToolKey) => {
        if (isTopicAreaDeckToolKey(deckToolKey)) {
            selectTopicAreaKey(readTopicAreaKeyFromDeckToolKey(deckToolKey));
            return;
        }

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
    }, [disabledDeckToolKeys, repeatDifficultCards, selectTopicAreaKey, showAllCards, shuffleDeck]);

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
        flashcards: topicFilteredFlashcards,
        topicAreas,
        topicAreaKey,
        pageStatus,
        pageErrorMessage,
        progressLabel: progressModel.progressLabel,
        progressModel,
        presentationMode,
        deckKey,
        visibleCards,
        visibleDeckKey,
        activeDeckToolKey,
        deckToolItems,
        showBackButton: backContract.showBackButton,
        backLabel: backContract.backLabel,
        navigationLabel: backContract.navigationLabel,
        onBack: backContract.onBack,
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

function noteFlipcardTopicAreasLoaded() {}

function resolveFlipcardsPageErrorMessage(flashcardLoad, topicAreaLoad, fallbackMessage) {
    if (flashcardLoad.error) {
        return flashcardLoad.error;
    }

    if (topicAreaLoad.error) {
        return topicAreaLoad.error;
    }

    return fallbackMessage;
}

function createDeckKey(cards) {
    const cardIds = [];

    for (const card of cards) {
        cardIds.push(card.id);
    }

    return cardIds.join("|");
}

function selectCardIdsForCards(cardIds, cards) {
    const selectedCardIds = [];
    const visibleCardIds = new Set();

    for (const card of cards) {
        visibleCardIds.add(card.id);
    }

    for (const cardId of cardIds) {
        if (!visibleCardIds.has(cardId)) {
            continue;
        }

        selectedCardIds.push(cardId);
    }

    return selectedCardIds;
}

function findTopicArea(topicAreas, topicAreaKey) {
    for (const topicArea of topicAreas) {
        if (topicArea.key === topicAreaKey) {
            return topicArea;
        }
    }

    return null;
}

function createTopicAreaDeckToolItems(topicAreas, activeTopicAreaKey, labels) {
    const items = [
        {
            key: createTopicAreaDeckToolKey(ALL_TOPIC_AREAS),
            iconKey: "list",
            label: labels.topicAreaAllLabel,
            statusLabel: labels.topicAreaToolStatusLabel,
            ariaLabel: createTopicAreaDeckToolAriaLabel(
                labels.topicAreaAllLabel,
                labels.topicAreaToolStatusLabel,
                activeTopicAreaKey === ALL_TOPIC_AREAS,
                labels.topicAreaSelectedLabel
            ),
            isSelected: activeTopicAreaKey === ALL_TOPIC_AREAS,
            isDisabled: false
        }
    ];

    for (const topicArea of topicAreas) {
        const isSelected = activeTopicAreaKey === topicArea.key;

        items.push({
            key: createTopicAreaDeckToolKey(topicArea.key),
            iconKey: topicArea.iconKey,
            label: topicArea.label,
            statusLabel: labels.topicAreaToolStatusLabel,
            ariaLabel: createTopicAreaDeckToolAriaLabel(
                topicArea.label,
                labels.topicAreaToolStatusLabel,
                isSelected,
                labels.topicAreaSelectedLabel
            ),
            isSelected,
            isDisabled: false
        });
    }

    return items;
}

function createTopicAreaDeckToolAriaLabel(label, statusLabel, isSelected, selectedLabel) {
    const labelParts = [label, statusLabel];

    if (isSelected) {
        labelParts.push(selectedLabel);
    }

    return labelParts.join(" · ");
}

function createTopicAreaDeckToolKey(topicAreaKey) {
    return `${TOPIC_AREA_DECK_TOOL_PREFIX}${topicAreaKey}`;
}

function isTopicAreaDeckToolKey(deckToolKey) {
    return deckToolKey.startsWith(TOPIC_AREA_DECK_TOOL_PREFIX);
}

function readTopicAreaKeyFromDeckToolKey(deckToolKey) {
    return deckToolKey.slice(TOPIC_AREA_DECK_TOOL_PREFIX.length);
}
