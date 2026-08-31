// src/ui/viewmodel/FlipcardsPageViewModel.js
import { useCallback, useEffect, useMemo, useState } from "react";
import { APP_AUTH_STATUS } from "../../auth/AppAuthState.js";
import { CONTENT_ICON_KEYS } from "../../constants/ContentIconKeys.js";
import { ALL_TOPIC_AREAS } from "../../constants/TopicAreas.js";
import { CONCEPT_MASTERY_STATUS } from "../../constants/ConceptMasteryStatus.js";
import createConceptPracticeEventId from "./Shared/createConceptPracticeEventId.js";
import usePresentationMode from "../presentation/usePresentationMode.js";
import { createFlipcardsProgressModel, FLIPCARD_PROGRESS_STATUS, resolveUpdatedFlipcardProgress } from "./FlipcardsPage/flipcardsProgressModel.js";
import { createFlipcardsFromGlossaryEntries } from "./FlipcardsPage/glossaryEntryFlipcardModel.js";
import { createDeckToolItems, createDeckToolStatusLabels, createDisabledDeckToolKeys, createRepeatDifficultCardIds, createShuffledFlipcardIds, createVisibleFlipcards } from "./FlipcardsPage/flipcardDeckToolState.js";
import useLoadModel from "./LoadState/useLoadModel.js";
import combineLoadStatuses from "./LoadState/combineLoadStatuses.js";
import { createWorkspaceState } from "./WorkspaceState/createWorkspaceState.js";
import { WORKSPACE_STATE_KINDS } from "./WorkspaceState/workspaceStateKinds.js";
import resolveFirstLoadError from "./Utils/resolveFirstLoadError.js";

const TOPIC_AREA_DECK_TOOL_PREFIX = "topic-area-";

export default function useFlipcardsPageViewModel(props) {
	const presentationMode = usePresentationMode();
	const [topicAreaKey, setTopicAreaKey] = useState(props.initialTopicAreaKey ?? ALL_TOPIC_AREAS);
	const [masteredCardIds, setMasteredCardIds] = useState([]);
	const [practiceCardIds, setPracticeCardIds] = useState([]);
	const [activeDeckToolKey, setActiveDeckToolKey] = useState("all-cards");
	const [selectedDeckCardIds, setSelectedDeckCardIds] = useState([]);
	const [activeCardIndex, setActiveCardIndex] = useState(0);
	const [isActiveCardFlipped, setIsActiveCardFlipped] = useState(false);

	useEffect(() => {
		setTopicAreaKey(props.initialTopicAreaKey ?? ALL_TOPIC_AREAS);
	}, [props.initialTopicAreaKey, props.subjectId]);

	const executeGlossaryEntryLoad = useCallback(() => {
		if (!props.isActive || !props.subjectId) {
			return Promise.resolve([]);
		}

		return props.getGlossaryEntriesForSubjectUseCase.execute({
			subjectId: props.subjectId,
			topicAreaKey: ALL_TOPIC_AREAS
		});
	}, [props.getGlossaryEntriesForSubjectUseCase, props.isActive, props.subjectId]);

	const executeTopicAreaLoad = useCallback(() => {
		if (!props.isActive || !props.subjectId) {
			return Promise.resolve([]);
		}

		return props.getTopicAreasUseCase.execute({
			subjectId: props.subjectId,
			language: props.language
		});
	}, [props.getTopicAreasUseCase, props.isActive, props.subjectId, props.language]);

	const noteGlossaryEntriesLoaded = useCallback(() => {
		setMasteredCardIds([]);
		setPracticeCardIds([]);
	}, []);

	const glossaryResourceKey = props.subjectId;
	const topicAreaResourceKey = props.subjectId === null ? "no-subject" : `${props.subjectId}:${props.language}`;
	const isLoadEnabled = props.isActive && props.subjectId !== null;

	const glossaryEntryLoad = useLoadModel({
		execute: executeGlossaryEntryLoad,
		emptyData: [],
		errorMessage: props.t.flipcardsErrorMessage,
		resourceKey: glossaryResourceKey,
		isEnabled: isLoadEnabled,
		onLoaded: noteGlossaryEntriesLoaded
	});

	const topicAreaLoad = useLoadModel({
		execute: executeTopicAreaLoad,
		emptyData: [],
		errorMessage: props.t.flipcardsErrorMessage,
		resourceKey: topicAreaResourceKey,
		isEnabled: isLoadEnabled,
		onLoaded: null
	});

	const glossaryEntries = glossaryEntryLoad.data;
	const flashcards = useMemo(() => {
		return createFlipcardsFromGlossaryEntries(glossaryEntries, props.language);
	}, [glossaryEntries, props.language]);
	const topicAreas = topicAreaLoad.data;
	const pageStatus = combineLoadStatuses([
		glossaryEntryLoad.status,
		topicAreaLoad.status
	]);
	const pageErrorMessage = resolveFirstLoadError([
		glossaryEntryLoad,
		topicAreaLoad
	], props.t.flipcardsErrorMessage);

	const topicFilteredFlashcards = useMemo(() => {
		return filterFlipcardsByTopicArea(flashcards, topicAreaKey);
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
		setActiveDeckToolKey("all-cards");
		setSelectedDeckCardIds([]);
	}, []);

	const progressModel = useMemo(() => {
		return createFlipcardsProgressModel({
			totalCardCount: topicFilteredFlashcards.length,
			masteredCardIds: visibleMasteredCardIds,
			practiceCardIds: visiblePracticeCardIds,
			labels: {
				progressLabel: props.t.flipcardsProgressLabel,
				completeBody: props.t.flipcardsCompleteBody
			}
		});
	}, [topicFilteredFlashcards.length, visibleMasteredCardIds, visiblePracticeCardIds, props.t.flipcardsCompleteBody, props.t.flipcardsProgressLabel]);

	const deckKey = useMemo(() => {
		return createDeckKey(topicFilteredFlashcards);
	}, [topicFilteredFlashcards]);

	useEffect(() => {
		setActiveDeckToolKey("all-cards");
		setSelectedDeckCardIds([]);
	}, [deckKey]);

	const activeTopicArea = useMemo(() => {
		return topicAreas.find((topicArea) => topicArea.key === topicAreaKey) ?? null;
	}, [topicAreas, topicAreaKey]);

	const labels = useMemo(() => {
		const topicAreaLabel = activeTopicArea?.label ?? null;
		const pageTitle = topicAreaLabel
			? props.t.flipcardsTopicAreaTitle(topicAreaLabel)
			: props.t.flipcardsTitle;
		const pageIntro = topicAreaLabel
			? props.t.flipcardsTopicAreaIntro(topicAreaLabel)
			: props.t.flipcardsIntro;

		return {
			pageEyebrow: props.t.flipcardsEyebrow,
			pageTitle,
			pageIntro,
			loadingTitle: props.t.flipcardsLoadingTitle,
			errorTitle: props.t.flipcardsErrorTitle,
			emptyTitle: props.t.flipcardsEmptyTitle,
			emptyBody: props.t.flipcardsEmptyBody,
			summaryLabel: props.t.flipcardsSummaryLabel,
			cardCountLabel: props.t.flipcardsCardCountLabel,
			studySurfaceLabel: props.t.flipcardsStudySurfaceLabel,
			studyKicker: props.t.flipcardsStudyKicker,
			studyTitle: props.t.flipcardsStudyTitle,
			progressSummaryLabel: props.t.flipcardsProgressSummaryLabel,
			deckLabel: props.t.flipcardsDeckLabel,
			emptyDeckTitle: props.t.flipcardsEmptyDeckTitle,
			completeTitle: props.t.flipcardsCompleteTitle,
			completeStatsLabel: props.t.flipcardsCompleteStatsLabel,
			completedCardsLabel: props.t.flipcardsCompletedCardsLabel,
			masteredCardsLabel: props.t.flipcardsMasteredCardsLabel,
			practiceCardsLabel: props.t.flipcardsPracticeCardsLabel,
			restartDeckLabel: props.t.flipcardsRestartDeckLabel,
			previousCardLabel: props.t.flipcardsPreviousCardLabel,
			nextCardLabel: props.t.flipcardsNextCardLabel,
			practiceCardLabel: props.t.flipcardsPracticeCardLabel,
			flipCardLabel: props.t.flipcardsFlipCardLabel,
			masteredCardLabel: props.t.flipcardsMasteredCardLabel,
			practiceFeedbackLabel: props.t.flipcardsPracticeFeedbackLabel,
			masteredFeedbackLabel: props.t.flipcardsMasteredFeedbackLabel,
			quickActionsLabel: props.t.flipcardsQuickActionsLabel,
			completePositionLabel: props.t.flipcardsCompletePositionLabel,
			completeBody: props.t.flipcardsCompleteBody,
			deckPositionLabel: props.t.flipcardsDeckPositionLabel,
			activeCardLabel: props.t.flipcardsActiveCardLabel,
			toolMenuLabel: props.t.flipcardsToolMenuLabel,
			openToolMenuLabel: props.t.flipcardsOpenToolMenuLabel,
			closeToolMenuLabel: props.t.flipcardsCloseToolMenuLabel,
			toolMenuTitle: props.t.flipcardsToolMenuTitle,
			toolMenuSubtitle: props.t.flipcardsToolMenuSubtitle,
			toolMenuPagerLabel: props.t.flipcardsToolMenuPagerLabel,
			toolMenuCurrentCardLabel: props.t.flipcardsToolMenuCurrentCardLabel,
			toolMenuActionsLabel: props.t.flipcardsToolMenuActionsLabel,
			toolMenuStatsLabel: props.t.flipcardsToolMenuStatsLabel,
			goToCardLabel: props.t.flipcardsGoToCardLabel,
			toolMenuAllCardsLabel: props.t.flipcardsToolMenuAllCardsLabel,
			toolMenuShuffleLabel: props.t.flipcardsToolMenuShuffleLabel,
			toolMenuRepeatDifficultLabel: props.t.flipcardsToolMenuRepeatDifficultLabel,
			toolMenuAddCardLabel: props.t.flipcardsToolMenuAddCardLabel,
			toolMenuUnavailableLabel: props.t.flipcardsToolMenuUnavailableLabel,
			toolMenuSelectedLabel: props.t.flipcardsToolMenuSelectedLabel,
			toolMenuAllCardsStatusLabel: props.t.flipcardsToolMenuAllCardsStatusLabel,
			toolMenuShuffleStatusLabel: props.t.flipcardsToolMenuShuffleStatusLabel,
			toolMenuRepeatDifficultCountLabel: props.t.flipcardsToolMenuRepeatDifficultCountLabel,
			toolMenuNoPracticeCardsLabel: props.t.flipcardsToolMenuNoPracticeCardsLabel,
			toolMenuPracticeDescription: props.t.flipcardsToolMenuPracticeDescription,
			toolMenuFlipDescription: props.t.flipcardsToolMenuFlipDescription,
			toolMenuMasteredDescription: props.t.flipcardsToolMenuMasteredDescription,
			topicAreaAllLabel: props.t.topicAreaAllLabel,
			topicAreaToolStatusLabel: props.t.flipcardsTopicAreaToolStatusLabel,
			topicAreaSelectedLabel: props.t.flipcardsToolMenuSelectedLabel
		};
	}, [activeTopicArea, props.t]);

	const workspaceState = createWorkspaceState({
		loadStatus: pageStatus,
		isEmpty: topicFilteredFlashcards.length === 0,
		labels: {
			loading: labels.loadingTitle,
			errorTitle: labels.errorTitle,
			errorBody: pageErrorMessage,
			emptyTitle: labels.emptyTitle,
			emptyBody: labels.emptyBody
		},
		errorAction: null
	});
	const shouldShowHeaderTools = workspaceState.kind === WORKSPACE_STATE_KINDS.CONTENT;

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
		return createDeckToolItems(props.t, labels, activeDeckToolKey, disabledDeckToolKeys, deckToolStatusLabels);
	}, [activeDeckToolKey, deckToolStatusLabels, disabledDeckToolKeys, labels, props.t]);

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
		setActiveDeckToolKey("all-cards");
		setSelectedDeckCardIds([]);
	}, []);

	const shuffleDeck = useCallback(() => {
		setActiveDeckToolKey("shuffle");
		setSelectedDeckCardIds(createShuffledFlipcardIds(topicFilteredFlashcards));
	}, [topicFilteredFlashcards]);

	const repeatDifficultCards = useCallback(() => {
		if (repeatDifficultCardIds.length === 0) {
			return;
		}

		setActiveDeckToolKey("repeat-difficult");
		setSelectedDeckCardIds(repeatDifficultCardIds);
	}, [repeatDifficultCardIds]);

	const selectTopicAreaKey = useCallback((nextTopicAreaKey) => {
		setTopicAreaKey(nextTopicAreaKey);
		setActiveDeckToolKey("all-cards");
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

		if (deckToolKey === "all-cards") {
			showAllCards();
			return;
		}

		if (deckToolKey === "shuffle") {
			shuffleDeck();
			return;
		}

		if (deckToolKey === "repeat-difficult") {
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

	const persistFlipcardAssessment = useCallback((cardId, assessment) => {
		if (props.authState.status !== APP_AUTH_STATUS.SIGNED_IN) {
			return;
		}

		if (!props.subjectId) {
			throw new Error("Signed-in FlipCards persistence requires subjectId");
		}

		const eventId = createConceptPracticeEventId();

		void props.recordFlipcardAssessmentUseCase.execute({
			eventId,
			subjectId: props.subjectId,
			glossaryEntryKey: cardId,
			assessment
		}).catch(reportConceptPracticeWriteError);
	}, [props.authState.status, props.recordFlipcardAssessmentUseCase, props.subjectId]);

	const completeCardForPractice = useCallback((cardId) => {
		if (!activeCard || activeCard.id !== cardId) {
			return;
		}

		markCardForPractice(cardId);
		persistFlipcardAssessment(cardId, CONCEPT_MASTERY_STATUS.PRACTICE);
		setIsActiveCardFlipped(false);
		setActiveCardIndex((currentIndex) => Math.min(currentIndex + 1, visibleCards.length));
	}, [activeCard, markCardForPractice, persistFlipcardAssessment, visibleCards.length]);

	const completeCardAsMastered = useCallback((cardId) => {
		if (!activeCard || activeCard.id !== cardId) {
			return;
		}

		markCardAsMastered(cardId);
		persistFlipcardAssessment(cardId, CONCEPT_MASTERY_STATUS.UNDERSTOOD);
		setIsActiveCardFlipped(false);
		setActiveCardIndex((currentIndex) => Math.min(currentIndex + 1, visibleCards.length));
	}, [activeCard, markCardAsMastered, persistFlipcardAssessment, visibleCards.length]);

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
		workspaceState,
		shouldShowHeaderTools,
		progressLabel: progressModel.progressLabel,
		progressModel,
		presentationMode,
		deckKey,
		visibleCards,
		visibleDeckKey,
		activeDeckToolKey,
		deckToolItems,
		backContract: props.backContract,
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

function createTopicAreaDeckToolItems(topicAreas, activeTopicAreaKey, labels) {
	const items = [
		{
			key: createTopicAreaDeckToolKey(ALL_TOPIC_AREAS),
			iconKey: CONTENT_ICON_KEYS.LIST,
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

	return labelParts.join(", ");
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

function filterFlipcardsByTopicArea(flipcards, topicAreaKey) {
	if (!topicAreaKey || topicAreaKey === ALL_TOPIC_AREAS) {
		return flipcards;
	}

	return flipcards.filter((flipcard) => flipcard.topicAreaKey === topicAreaKey);
}

function reportConceptPracticeWriteError(error) {
	if (import.meta.env?.DEV === true) {
		console.error("[Flipcards] Could not persist concept assessment", error);
	}
}
