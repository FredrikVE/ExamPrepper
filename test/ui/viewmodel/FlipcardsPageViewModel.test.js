import { beforeEach, describe, expect, jest, test } from "@jest/globals";
import { LOAD_STATUS } from "../../../src/ui/viewmodel/LoadState/loadStatus.js";
import { WORKSPACE_STATE_KINDS } from "../../../src/ui/viewmodel/WorkspaceState/workspaceStateKinds.js";

const stateValues = [];
const stateSetters = [];
let loadModelQueue = [];

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
const useLoadModel = jest.fn(() => loadModelQueue.shift());

jest.unstable_mockModule("react", () => ({
	useCallback,
	useEffect,
	useMemo,
	useState
}));

jest.unstable_mockModule("../../../src/ui/presentation/usePresentationMode.js", () => ({
	default: jest.fn(() => "desktop")
}));

jest.unstable_mockModule("../../../src/ui/viewmodel/LoadState/useLoadModel.js", () => ({
	default: useLoadModel
}));

const { default: useFlipcardsPageViewModel } = await import("../../../src/ui/viewmodel/FlipcardsPageViewModel.js");

const glossaryEntries = [
	{ id: "card-a", glossaryEntryKey: "card-a", term: { no: "A" }, explanation: { no: "A-definition" }, topicAreaKey: "kryptografi" },
	{ id: "card-b", glossaryEntryKey: "card-b", term: { no: "B" }, explanation: { no: "B-definition" }, topicAreaKey: "kryptografi" },
	{ id: "card-c", glossaryEntryKey: "card-c", term: { no: "C" }, explanation: { no: "C-definition" }, topicAreaKey: "iam" }
];

const cards = [
	{ id: "card-a", term: "A", definition: "A-definition", topicAreaKey: "kryptografi" },
	{ id: "card-b", term: "B", definition: "B-definition", topicAreaKey: "kryptografi" },
	{ id: "card-c", term: "C", definition: "C-definition", topicAreaKey: "iam" }
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
		glossaryEntries,
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
	stateValues[0] = params.topicAreaKey;
	stateValues[1] = params.masteredCardIds;
	stateValues[2] = params.practiceCardIds;
	stateValues[3] = params.activeDeckToolKey;
	stateValues[4] = params.selectedDeckCardIds;
	stateValues[5] = params.activeCardIndex;
	stateValues[6] = params.isActiveCardFlipped;
}

function createViewModel(params) {
	primeViewModelState(params);
	loadModelQueue = [
		{ status: LOAD_STATUS.READY, data: params.glossaryEntries, error: null, reload: jest.fn() },
		{ status: LOAD_STATUS.READY, data: params.topicAreas, error: null, reload: jest.fn() }
	];

	const getGlossaryEntriesForSubjectUseCase = {
		execute: jest.fn()
	};
	const getTopicAreasUseCase = {
		execute: jest.fn()
	};

	const onBack = jest.fn();
	const backContract = {
		showBackButton: true,
		backLabel: "sidebarBack",
		navigationLabel: "sidebarMobileNavigation",
		onBack
	};
	const viewModel = useFlipcardsPageViewModel(
		getGlossaryEntriesForSubjectUseCase,
		getTopicAreasUseCase,
		"in2120",
		params.topicAreaKey,
		"no",
		createTranslations(),
		false,
		backContract
	);

	return {
		getGlossaryEntriesForSubjectUseCase,
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
		useLoadModel.mockClear();
	});

	test("returns active card session state derived from visible cards", () => {
		const { getGlossaryEntriesForSubjectUseCase, viewModel } = createViewModel(createViewModelParams({
			activeCardIndex: 1,
			isActiveCardFlipped: true
		}));

		expect(getGlossaryEntriesForSubjectUseCase.execute).not.toHaveBeenCalled();
		expect(viewModel.activeCardIndex).toBe(1);
		expect(viewModel.activeCard).toEqual(cards[1]);
		expect(viewModel.nextCard).toEqual(cards[2]);
		expect(viewModel.isActiveCardFlipped).toBe(true);
		expect(viewModel.isDeckComplete).toBe(false);
		expect(viewModel.hasPreviousCard).toBe(true);
		expect(viewModel.hasNextCard).toBe(true);
		expect(viewModel.activeCardPositionLabel).toBe("2/3");
	});


	test("returns centralized page load state", () => {
		const { viewModel } = createViewModel(createViewModelParams({
			activeCardIndex: 0
		}));

		expect(viewModel.workspaceState).toEqual({
			kind: WORKSPACE_STATE_KINDS.CONTENT
		});
		expect(viewModel.flashcardsLoading).toBeUndefined();
		expect(viewModel.flashcardsLoadError).toBeUndefined();
	});

	test("resets cursor and flipped state when the visible deck key changes", () => {
		createViewModel(createViewModelParams({
			activeCardIndex: 2,
			isActiveCardFlipped: true
		}));

		expect(stateSetters[5]).toHaveBeenCalledWith(0);
		expect(stateSetters[6]).toHaveBeenCalledWith(false);
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
		expect(stateSetters[6]).toHaveBeenCalledWith(false);
		expect(stateSetters[5].mock.calls[0][0](1)).toBe(0);
		expect(stateSetters[5].mock.calls[0][0](0)).toBe(0);

		clearStateSetterCalls();

		viewModel.goToNextCard();
		expect(stateSetters[6]).toHaveBeenCalledWith(false);
		expect(stateSetters[5].mock.calls[0][0](1)).toBe(2);
		expect(stateSetters[5].mock.calls[0][0](2)).toBe(3);

		clearStateSetterCalls();

		viewModel.goToCard(99);
		expect(stateSetters[6]).toHaveBeenCalledWith(false);
		expect(stateSetters[5]).toHaveBeenCalledWith(2);

		clearStateSetterCalls();

		viewModel.toggleActiveCard();
		expect(stateSetters[6].mock.calls[0][0](false)).toBe(true);
	});

	test("guards completion handlers against stale card ids", () => {
		const { viewModel } = createViewModel(createViewModelParams({
			activeCardIndex: 1
		}));

		clearStateSetterCalls();

		viewModel.completeCardForPractice("card-c");

		expect(stateSetters[1]).not.toHaveBeenCalled();
		expect(stateSetters[2]).not.toHaveBeenCalled();
		expect(stateSetters[5]).not.toHaveBeenCalled();
		expect(stateSetters[6]).not.toHaveBeenCalled();

		viewModel.completeCardForPractice("card-b");

		expect(stateSetters[1]).toHaveBeenCalledWith([]);
		expect(stateSetters[2]).toHaveBeenCalledWith(["card-b"]);
		expect(stateSetters[6]).toHaveBeenCalledWith(false);
		expect(stateSetters[5].mock.calls[0][0](1)).toBe(2);
	});
});
