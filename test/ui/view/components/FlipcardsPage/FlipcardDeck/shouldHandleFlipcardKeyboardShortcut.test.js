import { afterEach, describe, expect, test } from "@jest/globals";
import { FLIPCARD_SWIPE_RESULT } from "../../../../../../src/ui/view/components/FlipcardsPage/FlipcardDeck/flipcardSwipe.js";
import shouldHandleFlipcardKeyboardShortcut, {
	resolveFlipcardKeyboardSwipeResult
} from "../../../../../../src/ui/view/components/FlipcardsPage/FlipcardDeck/shouldHandleFlipcardKeyboardShortcut.js";

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

function createKeyboardEvent(key, target, overrides) {
	return {
		key,
		target,
		repeat: false,
		altKey: false,
		ctrlKey: false,
		metaKey: false,
		shiftKey: false,
		isComposing: false,
		...overrides
	};
}

describe("shouldHandleFlipcardKeyboardShortcut", () => {
	test("allows prototype flipcard shortcuts on non-interactive targets", () => {
		global.Element = FakeElement;
		const target = new FakeElement(null);

		expect(shouldHandleFlipcardKeyboardShortcut(createKeyboardEvent("ArrowLeft", target, {}))).toBe(true);
		expect(shouldHandleFlipcardKeyboardShortcut(createKeyboardEvent("ArrowRight", target, {}))).toBe(true);
		expect(shouldHandleFlipcardKeyboardShortcut(createKeyboardEvent("Enter", target, {}))).toBe(true);
		expect(shouldHandleFlipcardKeyboardShortcut(createKeyboardEvent(" ", target, {}))).toBe(true);
	});

	test("ignores shortcuts owned by interactive targets", () => {
		global.Element = FakeElement;
		const target = new FakeElement({});

		expect(shouldHandleFlipcardKeyboardShortcut(createKeyboardEvent("ArrowLeft", target, {}))).toBe(false);
		expect(shouldHandleFlipcardKeyboardShortcut(createKeyboardEvent("ArrowRight", target, {}))).toBe(false);
		expect(shouldHandleFlipcardKeyboardShortcut(createKeyboardEvent("Enter", target, {}))).toBe(false);
		expect(shouldHandleFlipcardKeyboardShortcut(createKeyboardEvent(" ", target, {}))).toBe(false);
	});

	test("ignores unsupported, repeated and modified keys", () => {
		global.Element = FakeElement;
		const target = new FakeElement(null);

		expect(shouldHandleFlipcardKeyboardShortcut(createKeyboardEvent("ArrowUp", target, {}))).toBe(false);
		expect(shouldHandleFlipcardKeyboardShortcut(createKeyboardEvent("Spacebar", target, {}))).toBe(false);
		expect(shouldHandleFlipcardKeyboardShortcut(createKeyboardEvent("Enter", target, { repeat: true }))).toBe(false);
		expect(shouldHandleFlipcardKeyboardShortcut(createKeyboardEvent("Enter", target, { metaKey: true }))).toBe(false);
	});
});

describe("resolveFlipcardKeyboardSwipeResult", () => {
	test("maps left arrow to practice and right arrow to mastered", () => {
		expect(resolveFlipcardKeyboardSwipeResult("ArrowLeft"))
			.toBe(FLIPCARD_SWIPE_RESULT.PRACTICE);
		expect(resolveFlipcardKeyboardSwipeResult("ArrowRight"))
			.toBe(FLIPCARD_SWIPE_RESULT.MASTERED);
	});

	test("returns null for non-swipe keys", () => {
		expect(resolveFlipcardKeyboardSwipeResult("Enter")).toBeNull();
	});
});
