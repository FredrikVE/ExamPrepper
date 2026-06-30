import { afterEach, beforeEach, describe, expect, jest, test } from "@jest/globals";

const stateValues = [];
const stateSetters = [];
const refValues = [];
const cleanupEffects = [];

const useState = jest.fn((initialValue) => {
	const stateIndex = stateSetters.length;
	const fallbackValue = typeof initialValue === "function" ? initialValue() : initialValue;
	const value = stateIndex in stateValues ? stateValues[stateIndex] : fallbackValue;
	const setter = jest.fn((nextValue) => {
		stateValues[stateIndex] = typeof nextValue === "function"
			? nextValue(stateValues[stateIndex])
			: nextValue;
	});

	stateSetters.push(setter);

	return [value, setter];
});

const useRef = jest.fn((initialValue) => {
	const refIndex = refValues.length;

	if (!refValues[refIndex]) {
		refValues[refIndex] = { current: initialValue };
	}

	return refValues[refIndex];
});

const useCallback = jest.fn((callback) => callback);
const useEffect = jest.fn((effect) => {
	const cleanup = effect();

	if (typeof cleanup === "function") {
		cleanupEffects.push(cleanup);
	}
});

jest.unstable_mockModule("react", () => ({
	useCallback,
	useEffect,
	useRef,
	useState
}));

const { useFlipcardFeedbackToast } = await import(
	"../../../../../../src/ui/view/components/FlipcardsPage/FlipcardDeck/useFlipcardFeedbackToast.js"
);

function createHook(resetKey) {
	return useFlipcardFeedbackToast({ resetKey });
}

describe("useFlipcardFeedbackToast", () => {
	let scheduledCallback;
	let setTimeoutSpy;
	let clearTimeoutSpy;

	beforeEach(() => {
		stateValues.length = 0;
		stateSetters.length = 0;
		refValues.length = 0;
		cleanupEffects.length = 0;
		scheduledCallback = null;
		useState.mockClear();
		useRef.mockClear();
		useCallback.mockClear();
		useEffect.mockClear();
		setTimeoutSpy = jest.spyOn(globalThis, "setTimeout").mockImplementation((callback) => {
			scheduledCallback = callback;
			return "feedback-toast-timeout";
		});
		clearTimeoutSpy = jest.spyOn(globalThis, "clearTimeout").mockImplementation(() => {});
	});

	afterEach(() => {
		setTimeoutSpy.mockRestore();
		clearTimeoutSpy.mockRestore();
	});

	test("shows a feedback message and hides it after the toast duration", () => {
		const feedbackToast = createHook("deck-a");

		stateSetters.forEach((setter) => setter.mockClear());
		feedbackToast.showFeedbackToast("Markert som forstått");

		expect(stateSetters[0]).toHaveBeenCalledWith("Markert som forstått");
		expect(stateSetters[1]).toHaveBeenCalledWith(true);
		expect(setTimeoutSpy).toHaveBeenCalledWith(expect.any(Function), 950);

		scheduledCallback();

		expect(stateSetters[1]).toHaveBeenLastCalledWith(false);
	});

	test("hides the current toast and clears its timeout", () => {
		const feedbackToast = createHook("deck-a");

		feedbackToast.showFeedbackToast("Markert som øve mer");
		stateSetters.forEach((setter) => setter.mockClear());

		feedbackToast.hideFeedbackToast();

		expect(clearTimeoutSpy).toHaveBeenCalledWith("feedback-toast-timeout");
		expect(stateSetters[1]).toHaveBeenCalledWith(false);
	});
});
