// test/ui/view/KeyboardNavigation/isActivationKey.test.js
import { describe, expect, test } from "@jest/globals";
import isActivationKey from "../../../../src/ui/view/KeyboardNavigation/isActivationKey.js";

describe("isActivationKey", () => {
	test("accepts Enter and Space", () => {
		expect(isActivationKey("Enter")).toBe(true);
		expect(isActivationKey(" ")).toBe(true);
	});

	test("rejects other keys", () => {
		expect(isActivationKey("Spacebar")).toBe(false);
		expect(isActivationKey("ArrowRight")).toBe(false);
	});
});
