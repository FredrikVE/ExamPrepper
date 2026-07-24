import { describe, expect, test } from "@jest/globals";
import { createDeckToolItems, createDeckToolStatusLabels, createDisabledDeckToolKeys, createRepeatDifficultCardIds, createShuffledFlipcardIds, createVisibleFlipcards, FLIPCARD_DECK_TOOLS } from "../../../../src/ui/viewmodel/FlipcardsPage/flipcardDeckToolState.js";

const cards = [
	{ id: "card-1", term: "One" },
	{ id: "card-2", term: "Two" },
	{ id: "card-3", term: "Three" }
];

const t = {
	flipcardsToolMenuAllCardsLabel: "Se alle kort",
	flipcardsToolMenuShuffleLabel: "Bland kortstokk",
	flipcardsToolMenuRepeatDifficultLabel: "Repeter vanskelige",
	flipcardsToolMenuAddCardLabel: "Legg til kort"
};

const labels = {
	toolMenuAllCardsStatusLabel: (cardCount) => `${cardCount} kort`,
	toolMenuShuffleStatusLabel: "Ny rekkefølge",
	toolMenuRepeatDifficultCountLabel: (practiceCount) => `${practiceCount} vanskelige kort`,
	toolMenuNoPracticeCardsLabel: "Ingen vanskelige ennå",
	toolMenuUnavailableLabel: "Ikke tilgjengelig ennå",
	toolMenuSelectedLabel: "Aktiv"
};

describe("flipcardDeckToolState", () => {
	test("creates a shuffled id list with the same card ids", () => {
		const shuffledCardIds = createShuffledFlipcardIds(cards);

		expect(shuffledCardIds).toHaveLength(cards.length);
		expect([...shuffledCardIds].sort()).toEqual(cards.map((card) => card.id).sort());
	});

	test("resolves visible cards from selected card ids", () => {
		expect(createVisibleFlipcards(cards, ["card-3", "card-1"])).toEqual([cards[2], cards[0]]);
	});

	test("uses all cards when no selected card ids exist", () => {
		expect(createVisibleFlipcards(cards, [])).toBe(cards);
	});

	test("creates difficult card ids from practice ids", () => {
		expect(createRepeatDifficultCardIds(cards, ["card-2", "missing-card"])).toEqual(["card-2"]);
	});

	test("disables unavailable tools and repeat difficult when the practice list is empty", () => {
		expect(createDisabledDeckToolKeys([])).toEqual(["add-card", "repeat-difficult"]);
	});

	test("keeps only unavailable tools disabled when practice cards exist", () => {
		expect(createDisabledDeckToolKeys(["card-1"])).toEqual(["add-card"]);
	});

	test("reads the shared deck tools from navigation configuration", () => {
		expect(FLIPCARD_DECK_TOOLS.map((toolCard) => toolCard.id)).toEqual(["all-cards", "shuffle", "repeat-difficult", "add-card"]);
		expect(FLIPCARD_DECK_TOOLS.at(-1)).toEqual(expect.objectContaining({
			id: "add-card",
			labelKey: "flipcardsToolMenuAddCardLabel",
			iconKey: "plus",
			isDisabled: true,
			onSelect: null
		}));
	});

	test("creates deck tool status labels with counts and empty states", () => {
		expect(createDeckToolStatusLabels(labels, 3, 1)).toEqual({
			"all-cards": "3 kort",
			shuffle: "Ny rekkefølge",
			"repeat-difficult": "1 vanskelige kort",
			"add-card": "Ikke tilgjengelig ennå"
		});
		expect(createDeckToolStatusLabels(labels, 3, 0)).toEqual(expect.objectContaining({
			"repeat-difficult": "Ingen vanskelige ennå"
		}));
	});

	test("creates shared deck tool items for desktop and mobile rendering", () => {
		const deckToolStatusLabels = createDeckToolStatusLabels(labels, 3, 0);
		const deckToolItems = createDeckToolItems(t, labels, "all-cards", createDisabledDeckToolKeys([]), deckToolStatusLabels);

		expect(deckToolItems).toEqual(expect.arrayContaining([
			expect.objectContaining({
				key: "all-cards",
				iconKey: "list",
				label: "Se alle kort",
				statusLabel: "3 kort",
				ariaLabel: "Se alle kort · 3 kort · Aktiv",
				isSelected: true,
				isDisabled: false
			}),
			expect.objectContaining({
				key: "repeat-difficult",
				label: "Repeter vanskelige",
				statusLabel: "Ingen vanskelige ennå",
				isSelected: false,
				isDisabled: true
			}),
			expect.objectContaining({
				key: "add-card",
				label: "Legg til kort",
				statusLabel: "Ikke tilgjengelig ennå",
				isSelected: false,
				isDisabled: true
			})
		]));
	});
});
