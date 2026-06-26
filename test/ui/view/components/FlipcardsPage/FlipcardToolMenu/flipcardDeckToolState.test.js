import { describe, expect, test } from "@jest/globals";
import {
    createDisabledDeckToolKeys,
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

    test("disables favorites and repeat difficult when no practice cards exist", () => {
        expect(createDisabledDeckToolKeys([])).toEqual([
            FLIPCARD_DECK_TOOL_KEYS.FAVORITES,
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
