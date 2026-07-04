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
	{ id: "card-a", term: "A", topicAreaKey: "kryptografi" },
	{ id: "card-b", term: "B", topicAreaKey: "kryptografi" },
	{ id: "card-c", term: "C", topicAreaKey: "iam" }
];

const topicAreas = [
	{ key: "kryptografi", label: "Kryptografi", iconKey: "key", position: 1 },
	{ key: "iam", label: "IAM", iconKey: "user-cog", position: 2 }
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

function createViewModelParams(overrides) {
	return {
		flashcards: cards,
		topicAreas,
		topicAreaKey: "all",
		masteredCardIds: [],
		practiceCardIds: [],
		activeDeckToolKey: "all-cards",
		selectedDeckCardIds: [],
		activeCardIndex: 0,
		isActiveCardFlipped: false,
		...overrides
	};
}

function primeViewModelState(params) {
	stateValues[0] = params.flashcards;
	stateValues[1] = params.topicAreas;
	stateValues[2] = params.topicAreaKey;
	stateValues[3] = false;
	stateValues[4] = false;
	stateValues[5] = null;
	stateValues[6] = params.masteredCardIds;
	stateValues[7] = params.practiceCardIds;
	stateValues[8] = params.activeDeckToolKey;
	stateValues[9] = params.selectedDeckCardIds;
	stateValues[10] = params.activeCardIndex;
	stateValues[11] = params.isActiveCardFlipped;
}

function createViewModel(params) {
	primeViewModelState(params);

	const getFlashcardsUseCase = {
		execute: jest.fn()
	};
	const getTopicAreasUseCase = {
		execute: jest.fn()
	};

	const onBack = jest.fn();
	const viewModel = useFlipcardsPageViewModel(
		getFlashcardsUseCase,
		getTopicAreasUseCase,
		"in2120",
		params.topicAreaKey,
		"no",
		createTranslations(),
		false,
		true,
		"sidebarBack",
		"sidebarMobileNavigation",
		onBack
	);

	return {
		getFlashcardsUseCase,
		getTopicAreasUseCase,
		onBack,
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
		const { getFlashcardsUseCase, viewModel } = createViewModel(createViewModelParams({
			activeCardIndex: 1,
			isActiveCardFlipped: true
		}));

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
		createViewModel(createViewModelParams({
			activeCardIndex: 2,
			isActiveCardFlipped: true
		}));

		expect(stateSetters[10]).toHaveBeenCalledWith(0);
		expect(stateSetters[11]).toHaveBeenCalledWith(false);
	});


	test("exposes workspace back navigation contract", () => {
		const { onBack, viewModel } = createViewModel(createViewModelParams({
			activeCardIndex: 0
		}));

		expect(viewModel.showBackButton).toBe(true);
		expect(viewModel.backLabel).toBe("sidebarBack");
		expect(viewModel.navigationLabel).toBe("sidebarMobileNavigation");
		expect(viewModel.onBack).toBe(onBack);
	});

	test("exposes navigation and flip handlers for the active card", () => {
		const { viewModel } = createViewModel(createViewModelParams({
			activeCardIndex: 1,
			isActiveCardFlipped: false
		}));

		clearStateSetterCalls();

		viewModel.goToPreviousCard();
		expect(stateSetters[11]).toHaveBeenCalledWith(false);
		expect(stateSetters[10].mock.calls[0][0](1)).toBe(0);
		expect(stateSetters[10].mock.calls[0][0](0)).toBe(0);

		clearStateSetterCalls();

		viewModel.goToNextCard();
		expect(stateSetters[11]).toHaveBeenCalledWith(false);
		expect(stateSetters[10].mock.calls[0][0](1)).toBe(2);
		expect(stateSetters[10].mock.calls[0][0](2)).toBe(3);

		clearStateSetterCalls();

		viewModel.goToCard(99);
		expect(stateSetters[11]).toHaveBeenCalledWith(false);
		expect(stateSetters[10]).toHaveBeenCalledWith(2);

		clearStateSetterCalls();

		viewModel.toggleActiveCard();
		expect(stateSetters[11].mock.calls[0][0](false)).toBe(true);
	});

	test("guards completion handlers against stale card ids", () => {
		const { viewModel } = createViewModel(createViewModelParams({
			activeCardIndex: 1
		}));

		clearStateSetterCalls();

		viewModel.completeCardForPractice("card-c");

		expect(stateSetters[6]).not.toHaveBeenCalled();
		expect(stateSetters[7]).not.toHaveBeenCalled();
		expect(stateSetters[10]).not.toHaveBeenCalled();
		expect(stateSetters[11]).not.toHaveBeenCalled();

		viewModel.completeCardForPractice("card-b");

		expect(stateSetters[6]).toHaveBeenCalledWith([]);
		expect(stateSetters[7]).toHaveBeenCalledWith(["card-b"]);
		expect(stateSetters[11]).toHaveBeenCalledWith(false);
		expect(stateSetters[10].mock.calls[0][0](1)).toBe(2);
	});
});
