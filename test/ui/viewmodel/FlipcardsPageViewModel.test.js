import { beforeEach, describe, expect, jest, test } from "@jest/globals";

const stateValues = [];
const stateSetters = [];

const useState = jest.fn((initialValue) => {
    const stateIndex = stateSetters.length;
    const fallbackValue = typeof initialValue === "function" ? initialValue() : initialValue;
    const value = stateIndex in stateValues ? stateValues[stateIndex] : fallbackValue;
    const setter = jest.fn();

    stateSetters.push(setter);

    return [value, setter];
});

const useEffect = jest.fn((effect) => {
    return effect();
});

const useMemo = jest.fn((factory) => factory());
const useCallback = jest.fn((callback) => callback);

jest.unstable_mockModule("react", () => ({
    useCallback,
    useEffect,
    useMemo,
    useState
}));

jest.unstable_mockModule("../../../src/ui/presentation/usePresentationMode.js", () => ({
    default: jest.fn(() => "desktop")
}));

const { default: useFlipcardsPageViewModel } = await import("../../../src/ui/viewmodel/FlipcardsPageViewModel.js");

const cards = [
    { id: "card-a", term: "A" },
    { id: "card-b", term: "B" },
    { id: "card-c", term: "C" }
];

function createTranslations() {
    return new Proxy({}, {
        get(_target, property) {
            if (property === "flipcardsDeckPositionLabel") {
                return (currentPosition, totalCount) => `${currentPosition}/${totalCount}`;
            }

            if (property === "flipcardsProgressLabel") {
                return (completedCount, totalCount, masteredCount, practiceCount) => (
                    `${completedCount}/${totalCount} reviewed · ${masteredCount} mastered · ${practiceCount} practice`
                );
            }

            if (property === "flipcardsCompleteBody") {
                return (masteredCount, practiceCount, totalCount) => (
                    `${totalCount} total · ${masteredCount} mastered · ${practiceCount} practice`
                );
            }

            if (property === "flipcardsToolMenuAllCardsStatusLabel") {
                return (totalCount) => `${totalCount} kort`;
            }

            if (property === "flipcardsToolMenuRepeatDifficultCountLabel") {
                return (repeatCount) => `${repeatCount} vanskelige`;
            }

            return String(property);
        }
    });
}

function primeViewModelState({
    flashcards = cards,
    masteredCardIds = [],
    practiceCardIds = [],
    activeDeckToolKey = "all-cards",
    selectedDeckCardIds = [],
    activeCardIndex = 0,
    isActiveCardFlipped = false
} = {}) {
    stateValues[0] = flashcards;
    stateValues[1] = false;
    stateValues[2] = null;
    stateValues[3] = masteredCardIds;
    stateValues[4] = practiceCardIds;
    stateValues[5] = activeDeckToolKey;
    stateValues[6] = selectedDeckCardIds;
    stateValues[7] = activeCardIndex;
    stateValues[8] = isActiveCardFlipped;
}

function createViewModel(params = {}) {
    primeViewModelState(params);

    const getFlashcardsUseCase = {
        execute: jest.fn()
    };

    const viewModel = useFlipcardsPageViewModel(
        getFlashcardsUseCase,
        "in2120",
        "no",
        createTranslations(),
        false
    );

    return {
        getFlashcardsUseCase,
        viewModel
    };
}

function clearStateSetterCalls() {
    stateSetters.forEach((setter) => setter.mockClear());
}

describe("useFlipcardsPageViewModel flipcard session state", () => {
    beforeEach(() => {
        stateValues.length = 0;
        stateSetters.length = 0;
        useState.mockClear();
        useEffect.mockClear();
        useMemo.mockClear();
        useCallback.mockClear();
    });

    test("returns active card session state derived from visible cards", () => {
        const { getFlashcardsUseCase, viewModel } = createViewModel({
            activeCardIndex: 1,
            isActiveCardFlipped: true
        });

        expect(getFlashcardsUseCase.execute).not.toHaveBeenCalled();
        expect(viewModel.activeCardIndex).toBe(1);
        expect(viewModel.activeCard).toEqual(cards[1]);
        expect(viewModel.nextCard).toEqual(cards[2]);
        expect(viewModel.isActiveCardFlipped).toBe(true);
        expect(viewModel.isDeckComplete).toBe(false);
        expect(viewModel.hasPreviousCard).toBe(true);
        expect(viewModel.hasNextCard).toBe(true);
        expect(viewModel.activeCardPositionLabel).toBe("2/3");
    });

    test("resets cursor and flipped state when the visible deck key changes", () => {
        createViewModel({
            activeCardIndex: 2,
            isActiveCardFlipped: true
        });

        expect(stateSetters[7]).toHaveBeenCalledWith(0);
        expect(stateSetters[8]).toHaveBeenCalledWith(false);
    });

    test("exposes navigation and flip handlers for the active card", () => {
        const { viewModel } = createViewModel({
            activeCardIndex: 1,
            isActiveCardFlipped: false
        });

        clearStateSetterCalls();

        viewModel.goToPreviousCard();
        expect(stateSetters[8]).toHaveBeenCalledWith(false);
        expect(stateSetters[7].mock.calls[0][0](1)).toBe(0);
        expect(stateSetters[7].mock.calls[0][0](0)).toBe(0);

        clearStateSetterCalls();

        viewModel.goToNextCard();
        expect(stateSetters[8]).toHaveBeenCalledWith(false);
        expect(stateSetters[7].mock.calls[0][0](1)).toBe(2);
        expect(stateSetters[7].mock.calls[0][0](2)).toBe(3);

        clearStateSetterCalls();

        viewModel.goToCard(99);
        expect(stateSetters[8]).toHaveBeenCalledWith(false);
        expect(stateSetters[7]).toHaveBeenCalledWith(2);

        clearStateSetterCalls();

        viewModel.toggleActiveCard();
        expect(stateSetters[8].mock.calls[0][0](false)).toBe(true);
    });

    test("guards completion handlers against stale card ids", () => {
        const { viewModel } = createViewModel({
            activeCardIndex: 1
        });

        clearStateSetterCalls();

        viewModel.completeCardForPractice("card-c");

        expect(stateSetters[3]).not.toHaveBeenCalled();
        expect(stateSetters[4]).not.toHaveBeenCalled();
        expect(stateSetters[7]).not.toHaveBeenCalled();
        expect(stateSetters[8]).not.toHaveBeenCalled();

        viewModel.completeCardForPractice("card-b");

        expect(stateSetters[3]).toHaveBeenCalledWith([]);
        expect(stateSetters[4]).toHaveBeenCalledWith(["card-b"]);
        expect(stateSetters[8]).toHaveBeenCalledWith(false);
        expect(stateSetters[7].mock.calls[0][0](1)).toBe(2);
    });
});
