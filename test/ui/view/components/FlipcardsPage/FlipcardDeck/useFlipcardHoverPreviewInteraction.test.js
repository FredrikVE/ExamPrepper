import { afterAll, beforeEach, describe, expect, jest, test } from "@jest/globals";

const stateValues = [];
const stateSetters = [];
const refValues = [];

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

const useCallback = jest.fn((callback) => callback);
const useEffect = jest.fn((effect) => effect());
const useRef = jest.fn((initialValue) => {
	const refIndex = refValues.length;

	if (!refValues[refIndex]) {
		refValues[refIndex] = { current: initialValue };
	}

	return refValues[refIndex];
});

jest.unstable_mockModule("react", () => ({
	useCallback,
	useEffect,
	useRef,
	useState
}));

const { FLIPCARD_HOVER_PREVIEW_DURATION_MS, useFlipcardHoverPreviewInteraction } = await import(
	"../../../../../../src/ui/view/components/FlipcardsPage/FlipcardDeck/useFlipcardHoverPreviewInteraction.js"
);

let queuedTimeoutCallback = null;
let timeoutId = null;
const setTimeoutSpy = jest.spyOn(globalThis, "setTimeout").mockImplementation((callback) => {
	queuedTimeoutCallback = callback;
	timeoutId = { id: "hover-preview-timeout" };

	return timeoutId;
});
const clearTimeoutSpy = jest.spyOn(globalThis, "clearTimeout").mockImplementation(() => {});

function createHook(isDisabled) {
	return useFlipcardHoverPreviewInteraction({ isDisabled });
}

afterAll(() => {
	setTimeoutSpy.mockRestore();
	clearTimeoutSpy.mockRestore();
});

describe("useFlipcardHoverPreviewInteraction", () => {
	beforeEach(() => {
		stateValues.length = 0;
		stateSetters.length = 0;
		refValues.length = 0;
		queuedTimeoutCallback = null;
		timeoutId = null;
		useState.mockClear();
		useCallback.mockClear();
		useEffect.mockClear();
		useRef.mockClear();
		setTimeoutSpy.mockClear();
		clearTimeoutSpy.mockClear();
	});

	test("starts the intro preview on initial mount and arms the hover border after the prototype cue duration", () => {
		createHook(false);

		expect(stateSetters[0]).toHaveBeenCalledWith(true);
		expect(stateSetters[1]).toHaveBeenCalledWith(false);
		expect(setTimeoutSpy).toHaveBeenCalledWith(expect.any(Function), FLIPCARD_HOVER_PREVIEW_DURATION_MS);

		queuedTimeoutCallback();

		expect(stateSetters[0]).toHaveBeenLastCalledWith(false);
		expect(stateSetters[1]).toHaveBeenLastCalledWith(true);
	});

	test("does not expose a hover replay callback", () => {
		const hoverPreview = createHook(false);

		expect(hoverPreview.requestHoverPreview).toBeUndefined();
	});

	test("does not start the intro preview when the screen loads with interaction disabled", () => {
		createHook(true);

		expect(setTimeoutSpy).not.toHaveBeenCalled();
	});
});
