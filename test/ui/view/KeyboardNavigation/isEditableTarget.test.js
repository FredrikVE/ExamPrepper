// test/ui/view/KeyboardNavigation/isEditableTarget.test.js
import { afterEach, describe, expect, test } from "@jest/globals";
import isEditableTarget from "../../../../src/ui/view/KeyboardNavigation/isEditableTarget.js";

const originalElement = global.Element;

class FakeElement {
	constructor(closestMatch) {
		this.closestMatch = closestMatch;
	}

	closest() {
		return this.closestMatch;
	}
}

afterEach(() => {
	global.Element = originalElement;
});

describe("isEditableTarget", () => {
	test("returns true when the target is inside an editable or keyboard-owned control", () => {
		global.Element = FakeElement;

		expect(isEditableTarget(new FakeElement({}))).toBe(true);
	});

	test("returns false when the target is an element outside editable controls", () => {
		global.Element = FakeElement;

		expect(isEditableTarget(new FakeElement(null))).toBe(false);
	});

	test("returns false when the target is not an Element", () => {
		global.Element = FakeElement;

		expect(isEditableTarget({})).toBe(false);
	});
});
