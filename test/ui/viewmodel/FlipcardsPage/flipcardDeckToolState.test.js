import { describe, expect, test } from "@jest/globals";
import { createDeckToolItems, createDeckToolStatusLabels, createDisabledDeckToolKeys, createRepeatDifficultCardIds, createShuffledFlipcardIds, createVisibleFlipcards } from "../../../../src/ui/viewmodel/FlipcardsPage/flipcardDeckToolState.js";
import { FLIPCARD_DECK_TOOL_KEYS, FLIPCARD_DECK_TOOLS } from "../../../../src/ui/viewmodel/FlipcardsPage/flipcardDeckTools.js";
import { PAGE_TOOL_ICON_KEYS } from "../../../../src/navigation/pageTools.js";

const cards = [
    { id: "card-1", term: "One" },
    { id: "card-2", term: "Two" },
    { id: "card-3", term: "Three" }
];

const labels = {
    toolMenuAllCardsLabel: "Se alle kort",
    toolMenuShuffleLabel: "Bland kortstokk",
    toolMenuRepeatDifficultLabel: "Repeter vanskelige",
    toolMenuAddCardLabel: "Legg til kort",
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
        expect(createDisabledDeckToolKeys([])).toEqual([
            FLIPCARD_DECK_TOOL_KEYS.ADD_CARD,
            FLIPCARD_DECK_TOOL_KEYS.REPEAT_DIFFICULT
        ]);
    });

    test("keeps only unavailable tools disabled when practice cards exist", () => {
        expect(createDisabledDeckToolKeys(["card-1"])).toEqual([
            FLIPCARD_DECK_TOOL_KEYS.ADD_CARD
        ]);
    });


    test("keeps the shared deck tool list focused on the current learning loop", () => {
        expect(FLIPCARD_DECK_TOOLS.map((toolCard) => toolCard.key)).toEqual([
            FLIPCARD_DECK_TOOL_KEYS.ALL_CARDS,
            FLIPCARD_DECK_TOOL_KEYS.SHUFFLE,
            FLIPCARD_DECK_TOOL_KEYS.REPEAT_DIFFICULT,
            FLIPCARD_DECK_TOOL_KEYS.ADD_CARD
        ]);
    });

    test("includes add card as an unavailable shared deck tool", () => {
        expect(FLIPCARD_DECK_TOOLS).toEqual(expect.arrayContaining([
            expect.objectContaining({
                key: FLIPCARD_DECK_TOOL_KEYS.ADD_CARD,
                labelKey: "toolMenuAddCardLabel",
                iconKey: PAGE_TOOL_ICON_KEYS.PLUS,
                unavailable: true
            })
        ]));
    });

    test("creates deck tool status labels with counts and empty states", () => {
        expect(createDeckToolStatusLabels(labels, 3, 1)).toEqual({
            [FLIPCARD_DECK_TOOL_KEYS.ALL_CARDS]: "3 kort",
            [FLIPCARD_DECK_TOOL_KEYS.SHUFFLE]: "Ny rekkefølge",
            [FLIPCARD_DECK_TOOL_KEYS.REPEAT_DIFFICULT]: "1 vanskelige kort",
            [FLIPCARD_DECK_TOOL_KEYS.ADD_CARD]: "Ikke tilgjengelig ennå"
        });

        expect(createDeckToolStatusLabels(labels, 3, 0)).toEqual(expect.objectContaining({
            [FLIPCARD_DECK_TOOL_KEYS.REPEAT_DIFFICULT]: "Ingen vanskelige ennå"
        }));
    });

    test("creates shared deck tool items for desktop and mobile rendering", () => {
        const deckToolStatusLabels = createDeckToolStatusLabels(labels, 3, 0);
        const deckToolItems = createDeckToolItems(
            labels,
            FLIPCARD_DECK_TOOL_KEYS.ALL_CARDS,
            createDisabledDeckToolKeys([]),
            deckToolStatusLabels
        );

        expect(deckToolItems).toEqual(expect.arrayContaining([
            expect.objectContaining({
                key: FLIPCARD_DECK_TOOL_KEYS.ALL_CARDS,
                iconKey: PAGE_TOOL_ICON_KEYS.LIST,
                label: "Se alle kort",
                statusLabel: "3 kort",
                ariaLabel: "Se alle kort · 3 kort · Aktiv",
                isSelected: true,
                isDisabled: false
            }),
            expect.objectContaining({
                key: FLIPCARD_DECK_TOOL_KEYS.REPEAT_DIFFICULT,
                label: "Repeter vanskelige",
                statusLabel: "Ingen vanskelige ennå",
                isSelected: false,
                isDisabled: true
            }),
            expect.objectContaining({
                key: FLIPCARD_DECK_TOOL_KEYS.ADD_CARD,
                label: "Legg til kort",
                statusLabel: "Ikke tilgjengelig ennå",
                isSelected: false,
                isDisabled: true
            })
        ]));
    });

});
