// test/ui/theme/themePreference.test.js
import { afterEach, beforeEach, describe, expect, jest, test } from "@jest/globals";
import { readThemePreference, tryWriteThemePreference } from "../../../src/ui/theme/themePreference.js";

let originalLocalStorageDescriptor;

beforeEach(() => {
	originalLocalStorageDescriptor = Object.getOwnPropertyDescriptor(globalThis, "localStorage");
});

afterEach(() => {
	jest.restoreAllMocks();

	if (originalLocalStorageDescriptor) {
		Object.defineProperty(globalThis, "localStorage", originalLocalStorageDescriptor);
		return;
	}

	delete globalThis.localStorage;
});

describe("theme preference storage", () => {
	test.each([
		["dark", "dark"],
		["light", "light"],
		["unexpected", null],
		[null, null]
	])("normalizes stored theme %p to %p", (storedTheme, expectedTheme) => {
		const getItem = jest.fn().mockReturnValue(storedTheme);
		setLocalStorage({ getItem, setItem: jest.fn() });

		expect(readThemePreference()).toBe(expectedTheme);
		expect(getItem).toHaveBeenCalledWith("theme");
	});

	test("falls back when storage cannot be read", () => {
		setUnavailableLocalStorage();

		expect(readThemePreference()).toBeNull();
	});

	test.each([
		[true, "dark"],
		[false, "light"]
	])("writes the runtime theme as %p", (isDark, expectedTheme) => {
		const setItem = jest.fn();
		setLocalStorage({ getItem: jest.fn(), setItem });

		tryWriteThemePreference(isDark);

		expect(setItem).toHaveBeenCalledWith("theme", expectedTheme);
	});

	test("keeps storage writes best-effort when storage is unavailable", () => {
		setUnavailableLocalStorage();

		expect(() => tryWriteThemePreference(true)).not.toThrow();
	});
});

function setLocalStorage(storage) {
	Object.defineProperty(globalThis, "localStorage", {
		configurable: true,
		value: storage
	});
}

function setUnavailableLocalStorage() {
	Object.defineProperty(globalThis, "localStorage", {
		configurable: true,

		get() {
			throw new Error("Storage unavailable");
		}
	});
}
