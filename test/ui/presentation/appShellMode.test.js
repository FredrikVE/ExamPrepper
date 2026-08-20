import { describe, expect, test } from "@jest/globals";
import { APP_COMPACT_SHELL_QUERY, APP_SHELL_MODE, getAppShellMode, resolveAppShellModeFromMatches, subscribeToAppShellMode } from "../../../src/ui/presentation/appShellMode.js";

describe("appShellMode", () => {
	test("uses the canonical compact-shell query", () => {
		expect(APP_COMPACT_SHELL_QUERY).toBe("(max-width: 1200px)");
	});

	test("resolves app-shell mode from media query match state", () => {
		expect(resolveAppShellModeFromMatches(true)).toBe(APP_SHELL_MODE.COMPACT);
		expect(resolveAppShellModeFromMatches(false)).toBe(APP_SHELL_MODE.FULL);
	});

	test("uses full shell when viewport querying is unavailable", () => {
		expect(getAppShellMode()).toBe(APP_SHELL_MODE.FULL);
	});

	test("returns a noop unsubscribe when viewport querying is unavailable", () => {
		const unsubscribe = subscribeToAppShellMode(() => {});

		expect(typeof unsubscribe).toBe("function");
		expect(unsubscribe()).toBeUndefined();
	});
});
