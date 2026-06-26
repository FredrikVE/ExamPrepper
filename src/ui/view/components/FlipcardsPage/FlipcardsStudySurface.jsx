// src/ui/view/components/FlipcardsPage/FlipcardsStudySurface.jsx
import { useEffect, useMemo, useState } from "react";
import { useFlipcardDeck } from "./FlipcardDeck/useFlipcardDeck.js";
import FlipcardDeck from "./FlipcardDeck/FlipcardDeck.jsx";
import FlipcardToolMenu from "./FlipcardToolMenu/FlipcardToolMenu.jsx";
import { FLIPCARD_DECK_TOOL_KEYS } from "./FlipcardToolMenu/flipcardDeckTools.js";
import {
    createDisabledDeckToolKeys,
    createFavoriteCardIds,
    createNextFavoriteCardIds,
    createRepeatDifficultCardIds,
    createShuffledFlipcardIds,
    createVisibleFlipcards
} from "./FlipcardToolMenu/flipcardDeckToolState.js";

export default function FlipcardsStudySurface(props) {
    const [activeDeckToolKey, setActiveDeckToolKey] = useState(FLIPCARD_DECK_TOOL_KEYS.ALL_CARDS);
    const [selectedDeckCardIds, setSelectedDeckCardIds] = useState([]);
    const [favoriteCardIds, setFavoriteCardIds] = useState([]);
    const [isDesktopToolsPanelOpen, setIsDesktopToolsPanelOpen] = useState(false);

    useEffect(() => {
        setActiveDeckToolKey(FLIPCARD_DECK_TOOL_KEYS.ALL_CARDS);
        setSelectedDeckCardIds([]);
        setFavoriteCardIds([]);
    }, [props.deckKey]);

    const visibleCards = useMemo(() => {
        return createVisibleFlipcards(props.cards, selectedDeckCardIds);
    }, [props.cards, selectedDeckCardIds]);

    const visibleDeckKey = useMemo(() => {
        return [props.deckKey, activeDeckToolKey, visibleCards.map((card) => card.id).join("|")].join("::");
    }, [activeDeckToolKey, props.deckKey, visibleCards]);

    const disabledDeckToolKeys = useMemo(() => {
        return createDisabledDeckToolKeys(props.practiceCardIds, favoriteCardIds);
    }, [favoriteCardIds, props.practiceCardIds]);

    const deck = useFlipcardDeck(visibleCards.length, visibleDeckKey);
    const activeCard = visibleCards[deck.activeIndex] ?? null;
    const isActiveCardFavorite = activeCard ? favoriteCardIds.includes(activeCard.id) : false;

    useEffect(() => {
        if (activeDeckToolKey !== FLIPCARD_DECK_TOOL_KEYS.FAVORITES) {
            return;
        }

        const favoriteIds = createFavoriteCardIds(props.cards, favoriteCardIds);

        if (favoriteIds.length === 0) {
            setActiveDeckToolKey(FLIPCARD_DECK_TOOL_KEYS.ALL_CARDS);
            setSelectedDeckCardIds([]);
            deck.restartDeck();
            return;
        }

        setSelectedDeckCardIds(favoriteIds);
        deck.restartDeck();
    }, [activeDeckToolKey, deck.restartDeck, favoriteCardIds, props.cards]);

    const restartSession = () => {
        props.onResetProgress();
        setActiveDeckToolKey(FLIPCARD_DECK_TOOL_KEYS.ALL_CARDS);
        setSelectedDeckCardIds([]);
        deck.restartDeck();
    };

    const showAllCards = () => {
        setActiveDeckToolKey(FLIPCARD_DECK_TOOL_KEYS.ALL_CARDS);
        setSelectedDeckCardIds([]);
        deck.restartDeck();
    };

    const shuffleCards = () => {
        setActiveDeckToolKey(FLIPCARD_DECK_TOOL_KEYS.SHUFFLE);
        setSelectedDeckCardIds(createShuffledFlipcardIds(props.cards));
        deck.restartDeck();
    };

    const showFavoriteCards = () => {
        const favoriteIds = createFavoriteCardIds(props.cards, favoriteCardIds);

        if (favoriteIds.length === 0) {
            return;
        }

        setActiveDeckToolKey(FLIPCARD_DECK_TOOL_KEYS.FAVORITES);
        setSelectedDeckCardIds(favoriteIds);
        deck.restartDeck();
    };

    const repeatDifficultCards = () => {
        const difficultCardIds = createRepeatDifficultCardIds(props.cards, props.practiceCardIds);

        if (difficultCardIds.length === 0) {
            return;
        }

        setActiveDeckToolKey(FLIPCARD_DECK_TOOL_KEYS.REPEAT_DIFFICULT);
        setSelectedDeckCardIds(difficultCardIds);
        deck.restartDeck();
    };

    const toggleActiveCardFavorite = () => {
        if (!activeCard) {
            return;
        }

        setFavoriteCardIds((currentFavoriteCardIds) => createNextFavoriteCardIds(currentFavoriteCardIds, activeCard.id));
    };

    const selectDeckTool = (deckToolKey) => {
        if (disabledDeckToolKeys.includes(deckToolKey)) {
            return;
        }

        if (deckToolKey === FLIPCARD_DECK_TOOL_KEYS.ALL_CARDS) {
            showAllCards();
            return;
        }

        if (deckToolKey === FLIPCARD_DECK_TOOL_KEYS.SHUFFLE) {
            shuffleCards();
            return;
        }

        if (deckToolKey === FLIPCARD_DECK_TOOL_KEYS.FAVORITES) {
            showFavoriteCards();
            return;
        }

        if (deckToolKey === FLIPCARD_DECK_TOOL_KEYS.REPEAT_DIFFICULT) {
            repeatDifficultCards();
        }
    };

    const completeAsMastered = () => {
        if (!activeCard) {
            return;
        }

        props.onCardMastered(activeCard.id);
        deck.goToNext();
    };

    const completeForPractice = () => {
        if (!activeCard) {
            return;
        }

        props.onCardForPractice(activeCard.id);
        deck.goToNext();
    };

    const studySurfaceClassName = isDesktopToolsPanelOpen
        ? "flipcards-study-surface flipcards-study-surface-desktop-tools-open"
        : "flipcards-study-surface";

    return (
        <section className={studySurfaceClassName} aria-label={props.labels.studySurfaceLabel}>
            <div className="flipcards-study-body">
                <FlipcardDeck
                    cards={visibleCards}
                    deck={deck}
                    labels={props.labels}
                    progressModel={props.progressModel}
                    isActiveCardFavorite={isActiveCardFavorite}
                    onPractice={completeForPractice}
                    onMastered={completeAsMastered}
                    onRestart={restartSession}
                    onToggleFavorite={toggleActiveCardFavorite}
                />

                <FlipcardToolMenu
                    cardCount={visibleCards.length}
                    activeIndex={deck.activeIndex}
                    hasPrevious={deck.hasPrevious}
                    hasNext={deck.hasNext}
                    isComplete={deck.isComplete}
                    isSwipeCommandActive={deck.isSwipeCommandActive}
                    progressModel={props.progressModel}
                    labels={props.labels}
                    activeDeckToolKey={activeDeckToolKey}
                    disabledDeckToolKeys={disabledDeckToolKeys}
                    onPrevious={deck.goToPrevious}
                    onNext={deck.goToNext}
                    onGoToCard={deck.goToCard}
                    onPractice={deck.requestSwipeLeft}
                    onFlip={deck.flipActiveCard}
                    onMastered={deck.requestSwipeRight}
                    onDeckToolSelect={selectDeckTool}
                    onDesktopToolsOpenChange={setIsDesktopToolsPanelOpen}
                />
            </div>
        </section>
    );
}
