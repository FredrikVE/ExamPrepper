import { createElement, isValidElement } from "react";
import { describe, expect, test } from "@jest/globals";
import { CONTENT_ICON_FALLBACK_KEY, CONTENT_ICON_KEYS } from "../../../../../src/constants/ContentIconKeys.js";
import { getContentIcon } from "../../../../../src/ui/view/components/Shared/contentIconRegistry.js";

const UNKNOWN_CONTENT_ICON_KEY = "future-backend-icon";

describe("content icon registry", () => {
	test.each(Object.values(CONTENT_ICON_KEYS))("resolves content icon key %s", (iconKey) => {
		const Icon = getContentIcon(iconKey);
		expect(isValidElement(createElement(Icon))).toBe(true);

		if (iconKey !== CONTENT_ICON_FALLBACK_KEY) {
			expect(Icon).not.toBe(getContentIcon(CONTENT_ICON_FALLBACK_KEY));
		}
	});

	test("uses the canonical fallback icon for an unknown key", () => {
		expect(getContentIcon(UNKNOWN_CONTENT_ICON_KEY)).toBe(getContentIcon(CONTENT_ICON_FALLBACK_KEY));
	});
});
