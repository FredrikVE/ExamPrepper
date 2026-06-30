import { afterAll, beforeEach, describe, expect, jest, test } from "@jest/globals";

const stateValues = [];
const stateSetters = [];
const refValues = [];
let stateCursor = 0;
let refCursor = 0;

const useState = jest.fn((initialValue) => {
	const stateIndex = stateCursor;
	stateCursor += 1;

	const fallbackValue = typeof initialValue === "function" ? initialValue() : initialValue;
	const value = stateIndex in stateValues ? stateValues[stateIndex] : fallbackValue;
	const setter = jest.fn((nextValue) => {
		stateValues[stateIndex] = typeof nextValue === "function"
			? nextValue(stateValues[stateIndex])
			: nextValue;
	});

	stateSetters[stateIndex] = setter;

	return [value, setter];
});

const useCallback = jest.fn((callback) => callback);
const useEffect = jest.fn((effect) => effect());
const useRef = jest.fn((initialValue) => {
	const refIndex = refCursor;
	refCursor += 1;

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

function renderHook(activeCardId, isDisabled) {
	stateCursor = 0;
	refCursor = 0;

	return useFlipcardHoverPreviewInteraction({ activeCardId, isDisabled });
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
		stateCursor = 0;
		refCursor = 0;
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
		renderHook("card-1", false);

		expect(stateSetters[0]).toHaveBeenCalledWith(true);
		expect(stateSetters[1]).toHaveBeenCalledWith(false);
		expect(setTimeoutSpy).toHaveBeenCalledWith(expect.any(Function), FLIPCARD_HOVER_PREVIEW_DURATION_MS);

		queuedTimeoutCallback();

		expect(stateSetters[0]).toHaveBeenLastCalledWith(false);
		expect(stateSetters[1]).toHaveBeenLastCalledWith(true);
	});

	test("does not expose a hover replay callback", () => {
		const hoverPreview = renderHook("card-1", false);

		expect(hoverPreview.requestHoverPreview).toBeUndefined();
	});

	test("does not start the intro preview when the screen loads with interaction disabled", () => {
		renderHook("card-1", true);

		expect(setTimeoutSpy).not.toHaveBeenCalled();
	});

	test("stops the intro preview instead of replaying it when the active card changes", () => {
		renderHook("card-1", false);
		setTimeoutSpy.mockClear();

		const hoverPreview = renderHook("card-2", false);

		expect(hoverPreview.isHoverPreviewActive).toBe(false);
		expect(setTimeoutSpy).not.toHaveBeenCalled();
		expect(clearTimeoutSpy).toHaveBeenCalledWith(timeoutId);
		expect(stateSetters[0]).toHaveBeenLastCalledWith(false);
		expect(stateSetters[1]).toHaveBeenLastCalledWith(true);
	});
});
