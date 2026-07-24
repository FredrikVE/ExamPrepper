// src/ui/viewmodel/FlipcardsPage/flipcardDeckToolState.js
import { NAV_ITEMS, NAV_SCREENS } from "../../../navigation/navigation.js";
import shuffleInPlace from "../Utils/shuffleInPlace.js";

export const FLIPCARD_DECK_TOOLS = NAV_ITEMS.popOutMenuItems[NAV_SCREENS.FLIPCARDS].items;

function rotateCardIds(cardIds) {
	if (cardIds.length < 2) {
		return cardIds;
	}

	return [...cardIds.slice(1), cardIds[0]];
}

function haveSameOrder(firstCardIds, secondCardIds) {
	return firstCardIds.length === secondCardIds.length && firstCardIds.every((cardId, index) => cardId === secondCardIds[index]);
}

function createDeckToolAriaLabel(label, statusLabel, isSelected, selectedLabel) {
	return [label, statusLabel, isSelected ? selectedLabel : null].filter(Boolean).join(" · ");
}

export function createShuffledFlipcardIds(cards) {
	const originalCardIds = cards.map((card) => card.id);
	const shuffledCardIds = [...originalCardIds];

	shuffleInPlace(shuffledCardIds, Math.random);

	if (haveSameOrder(originalCardIds, shuffledCardIds)) {
		return rotateCardIds(shuffledCardIds);
	}

	return shuffledCardIds;
}

export function createVisibleFlipcards(cards, selectedCardIds) {
	if (selectedCardIds.length === 0) {
		return cards;
	}

	const cardsById = new Map(cards.map((card) => [card.id, card]));

	return selectedCardIds.map((cardId) => cardsById.get(cardId)).filter(Boolean);
}

export function createRepeatDifficultCardIds(cards, practiceCardIds) {
	return cards.filter((card) => practiceCardIds.includes(card.id)).map((card) => card.id);
}

export function createDisabledDeckToolKeys(repeatDifficultCardIds) {
	const disabledDeckToolKeys = FLIPCARD_DECK_TOOLS.filter((toolCard) => toolCard.isDisabled).map((toolCard) => toolCard.id);

	if (repeatDifficultCardIds.length === 0) {
		disabledDeckToolKeys.push("repeat-difficult");
	}

	return disabledDeckToolKeys;
}

export function createDeckToolStatusLabels(labels, totalCardCount, repeatDifficultCardCount) {
	return {
		"all-cards": labels.toolMenuAllCardsStatusLabel(totalCardCount),
		shuffle: labels.toolMenuShuffleStatusLabel,
		"repeat-difficult": repeatDifficultCardCount > 0 ? labels.toolMenuRepeatDifficultCountLabel(repeatDifficultCardCount) : labels.toolMenuNoPracticeCardsLabel,
		"add-card": labels.toolMenuUnavailableLabel
	};
}

export function createDeckToolItems(t, labels, activeDeckToolKey, disabledDeckToolKeys, deckToolStatusLabels) {
	return FLIPCARD_DECK_TOOLS.map((toolCard) => {
		const label = t[toolCard.labelKey];
		const statusLabel = deckToolStatusLabels[toolCard.id];
		const isSelected = activeDeckToolKey === toolCard.id;
		const isDisabled = disabledDeckToolKeys.includes(toolCard.id);

		return {
			key: toolCard.id,
			iconKey: toolCard.iconKey,
			label,
			statusLabel,
			ariaLabel: createDeckToolAriaLabel(label, statusLabel, isSelected, labels.toolMenuSelectedLabel),
			isSelected,
			isDisabled
		};
	});
}
