import { describe, expect, test } from "@jest/globals";
import {
    createDisabledDeckToolKeys,
    createFavoriteCardIds,
    createNextFavoriteCardIds,
    createRepeatDifficultCardIds,
    createShuffledFlipcardIds,
    createVisibleFlipcards
} from "../../../../../../src/ui/view/components/FlipcardsPage/FlipcardToolMenu/flipcardDeckToolState.js";
import {
    FLIPCARD_DECK_TOOL_KEYS,
    FLIPCARD_DECK_TOOLS
} from "../../../../../../src/ui/view/components/FlipcardsPage/FlipcardToolMenu/flipcardDeckTools.js";

const cards = [
    { id: "card-1", term: "One" },
    { id: "card-2", term: "Two" },
    { id: "card-3", term: "Three" }
];

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

    test("creates favorite card ids from favorite ids", () => {
        expect(createFavoriteCardIds(cards, ["card-3", "missing-card", "card-1"])).toEqual(["card-1", "card-3"]);
    });

    test("toggles favorite card ids", () => {
        expect(createNextFavoriteCardIds(["card-1"], "card-2")).toEqual(["card-1", "card-2"]);
        expect(createNextFavoriteCardIds(["card-1", "card-2"], "card-1")).toEqual(["card-2"]);
    });

    test("disables favorites and repeat difficult when both lists are empty", () => {
        expect(createDisabledDeckToolKeys([], [])).toEqual([
            FLIPCARD_DECK_TOOL_KEYS.FAVORITES,
            FLIPCARD_DECK_TOOL_KEYS.REPEAT_DIFFICULT
        ]);
    });

    test("enables favorites when favorite cards exist", () => {
        expect(createDisabledDeckToolKeys([], ["card-1"])).toEqual([
            FLIPCARD_DECK_TOOL_KEYS.REPEAT_DIFFICULT
        ]);
    });

    test("includes add card as an unavailable shared deck tool", () => {
        expect(FLIPCARD_DECK_TOOLS).toEqual(expect.arrayContaining([
            expect.objectContaining({
                key: FLIPCARD_DECK_TOOL_KEYS.ADD_CARD,
                labelKey: "toolMenuAddCardLabel",
                unavailable: true
            })
        ]));
    });
});
