// test/ui/viewmodel/MatchCardsPageViewModel.test.js
import { afterEach, beforeEach, describe, expect, jest, test } from "@jest/globals";
import { LOAD_STATUS } from "../../../src/ui/viewmodel/LoadState/loadStatus.js";
import { createMatchCardsSession } from "../../../src/ui/viewmodel/MatchCards/matchCardsSession.js";
import { resetWrongSlots } from "../../../src/ui/viewmodel/MatchCards/matchCardsRoundTransitions.js";
import { selectMatchSlot } from "../../../src/ui/viewmodel/MatchCards/matchCardsSelectionTransitions.js";
import { createGlossaryEntries, keepOrderRandomNumber } from "./MatchCards/matchCardsTestFixtures.js";

const stateValues = [];
const stateSetters = [];
const refs = [];
const scheduledCallbacks = [];
let loadModelQueue = [];

const useState = jest.fn((initialValue) => {
	const stateIndex = stateSetters.length;
	const fallbackValue = typeof initialValue === "function" ? initialValue() : initialValue;
	const value = stateIndex in stateValues ? stateValues[stateIndex] : fallbackValue;
	const setter = jest.fn();

	stateSetters.push(setter);

	return [value, setter];
});

const useRef = jest.fn((initialValue) => {
	const ref = { current: initialValue };
	refs.push(ref);
	return ref;
});

const useEffect = jest.fn((effect) => effect());
const useMemo = jest.fn((factory) => factory());
const useCallback = jest.fn((callback) => callback);
const useLoadModel = jest.fn(() => loadModelQueue.shift());

jest.unstable_mockModule("react", () => ({
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState
}));

jest.unstable_mockModule("../../../src/ui/viewmodel/LoadState/useLoadModel.js", () => ({
	default: useLoadModel
}));

const { default: useMatchCardsPageViewModel } = await import("../../../src/ui/viewmodel/MatchCardsPageViewModel.js");

describe("useMatchCardsPageViewModel concept practice persistence", () => {
	beforeEach(() => {
		stateValues.length = 0;
		stateSetters.length = 0;
		refs.length = 0;
		scheduledCallbacks.length = 0;
		useState.mockClear();
		useRef.mockClear();
		useEffect.mockClear();
		useMemo.mockClear();
		useCallback.mockClear();
		useLoadModel.mockClear();
		jest.spyOn(globalThis, "setTimeout").mockImplementation((callback) => {
			scheduledCallbacks.push(callback);
			return scheduledCallbacks.length;
		});
		jest.spyOn(globalThis, "clearTimeout").mockImplementation(() => undefined);
	});

	afterEach(() => {
		jest.restoreAllMocks();
	});

	test("persists one result with the correct glossary key and wrong-attempt count", () => {
		const selectedSession = createSelectedSessionWithWrongAttempts(2);
		const { recordMatchCardResultUseCase, viewModel } = createViewModel({
			session: selectedSession,
			authState: { isLoaded: true, isSignedIn: true }
		});

		viewModel.handleSelectSlot("explanation-0");

		expect(recordMatchCardResultUseCase.execute).toHaveBeenCalledTimes(1);
		expect(recordMatchCardResultUseCase.execute).toHaveBeenCalledWith({
			eventId: expect.stringMatching(/^[0-9a-f-]{36}$/i),
			subjectId: "in2120",
			glossaryEntryKey: "entry-a",
			wrongAttemptCount: 2
		});
	});

	test("does not duplicate a result when the same completion event is handled twice", () => {
		const selectedSession = createSelectedSessionWithWrongAttempts(1);
		const { recordMatchCardResultUseCase, viewModel } = createViewModel({
			session: selectedSession,
			authState: { isLoaded: true, isSignedIn: true }
		});

		viewModel.handleSelectSlot("explanation-0");
		viewModel.handleSelectSlot("explanation-0");

		expect(recordMatchCardResultUseCase.execute).toHaveBeenCalledTimes(1);

		for (const callback of scheduledCallbacks) {
			callback();
		}

		expect(recordMatchCardResultUseCase.execute).toHaveBeenCalledTimes(1);
	});

	test("keeps signed-out MatchCards local without persistence", () => {
		const selectedSession = createSelectedSessionWithWrongAttempts(1);
		const { recordMatchCardResultUseCase, viewModel } = createViewModel({
			session: selectedSession,
			authState: { isLoaded: true, isSignedIn: false }
		});

		viewModel.handleSelectSlot("explanation-0");

		expect(recordMatchCardResultUseCase.execute).not.toHaveBeenCalled();
		expect(stateSetters[1]).toHaveBeenCalled();
	});
});

function createViewModel({ session, authState }) {
	stateValues[0] = "all";
	stateValues[1] = session;
	loadModelQueue = [
		{ status: LOAD_STATUS.READY, data: createGlossaryEntries(), error: null, reload: jest.fn() },
		{ status: LOAD_STATUS.READY, data: [], error: null, reload: jest.fn() }
	];

	const recordMatchCardResultUseCase = {
		execute: jest.fn().mockResolvedValue(undefined)
	};
	const viewModel = useMatchCardsPageViewModel({
		getGlossaryEntriesForSubjectUseCase: { execute: jest.fn() },
		getTopicAreasUseCase: { execute: jest.fn() },
		recordMatchCardResultUseCase,
		subjectId: "in2120",
		initialTopicAreaKey: "all",
		language: "no",
		t: createTranslations(),
		isActive: false,
		backContract: null,
		authState
	});

	return { recordMatchCardResultUseCase, viewModel };
}

function createSelectedSessionWithWrongAttempts(wrongAttemptCount) {
	let session = createMatchCardsSession({
		glossaryEntries: createGlossaryEntries(),
		roundPairCount: 3,
		visiblePairCount: 2,
		randomNumber: keepOrderRandomNumber
	});

	for (let attemptIndex = 0; attemptIndex < wrongAttemptCount; attemptIndex += 1) {
		session = selectMatchSlot(session, "term-0");
		session = selectMatchSlot(session, "explanation-1");
		session = resetWrongSlots(session);
	}

	return selectMatchSlot(session, "term-0");
}

function createTranslations() {
	return new Proxy({}, {
		get(_target, property) {
			if (property === "matchCardsProgressLabel") {
				return (current, total) => `${current}/${total}`;
			}

			if (property === "matchCardsCardAriaLabel") {
				return (text) => String(text);
			}

			return String(property);
		}
	});
}
