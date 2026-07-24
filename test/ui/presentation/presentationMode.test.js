import { describe, expect, test } from "@jest/globals";
import { APP_MOBILE_QUERY, PRESENTATION_MODE, getPresentationMode, resolvePresentationModeFromMatches, subscribeToPresentationMode } from "../../../src/ui/presentation/presentationMode.js";

describe("presentationMode", () => {
	test("uses the canonical app-mobile query", () => {
		expect(APP_MOBILE_QUERY).toBe("(max-width: 932px)");
	});
    test("resolves presentation mode from media query match state", () => {
        expect(resolvePresentationModeFromMatches(true)).toBe(PRESENTATION_MODE.MOBILE);
        expect(resolvePresentationModeFromMatches(false)).toBe(PRESENTATION_MODE.DESKTOP);
    });

    test("uses desktop mode when viewport querying is unavailable", () => {
        expect(getPresentationMode()).toBe(PRESENTATION_MODE.DESKTOP);
    });

    test("returns a noop unsubscribe when viewport querying is unavailable", () => {
        const unsubscribe = subscribeToPresentationMode(() => {});

        expect(typeof unsubscribe).toBe("function");
        expect(unsubscribe()).toBeUndefined();
    });
});
