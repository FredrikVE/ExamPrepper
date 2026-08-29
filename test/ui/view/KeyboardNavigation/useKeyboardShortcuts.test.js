// test/ui/view/KeyboardNavigation/useKeyboardShortcuts.test.js
import { afterEach, beforeEach, describe, expect, jest, test } from "@jest/globals";

let effectCleanup = undefined;
const useEffect = jest.fn((effect) => {
	effectCleanup = effect();
});

jest.unstable_mockModule("react", () => ({
	useEffect
}));

const { default: useKeyboardShortcuts, isShortcutEvent } = await import(
	"../../../../src/ui/view/KeyboardNavigation/useKeyboardShortcuts.js"
);

const originalWindow = global.window;

beforeEach(() => {
	effectCleanup = undefined;
	useEffect.mockClear();
	global.window = {
		addEventListener: jest.fn(),
		removeEventListener: jest.fn()
	};
});

afterEach(() => {
	global.window = originalWindow;
});

describe("useKeyboardShortcuts", () => {
	test("registers and removes the supplied global keydown callback when enabled", () => {
		const onKeyDown = jest.fn();

		useKeyboardShortcuts({
			isEnabled: true,
			onKeyDown
		});

		expect(global.window.addEventListener).toHaveBeenCalledWith(
			"keydown",
			onKeyDown,
			{ capture: true }
		);
		expect(effectCleanup).toEqual(expect.any(Function));

		effectCleanup();

		expect(global.window.removeEventListener).toHaveBeenCalledWith(
			"keydown",
			onKeyDown,
			{ capture: true }
		);
	});

	test("does not register a global keydown callback when disabled", () => {
		useKeyboardShortcuts({
			isEnabled: false,
			onKeyDown: jest.fn()
		});

		expect(global.window.addEventListener).not.toHaveBeenCalled();
		expect(effectCleanup).toBeUndefined();
	});
});

describe("isShortcutEvent", () => {
	test("accepts an unmodified non-repeated keyboard event outside composition", () => {
		expect(isShortcutEvent({
			repeat: false,
			altKey: false,
			ctrlKey: false,
			metaKey: false,
			shiftKey: false,
			isComposing: false
		})).toBe(true);
	});

	test.each([
		["repeat", { repeat: true }],
		["Alt", { altKey: true }],
		["Control", { ctrlKey: true }],
		["Meta", { metaKey: true }],
		["Shift", { shiftKey: true }],
		["composition", { isComposing: true }]
	])("rejects %s shortcut events", (_label, override) => {
		expect(isShortcutEvent({
			repeat: false,
			altKey: false,
			ctrlKey: false,
			metaKey: false,
			shiftKey: false,
			isComposing: false,
			...override
		})).toBe(false);
	});
});
