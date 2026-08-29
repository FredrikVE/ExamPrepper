// test/ui/viewmodel/GlossaryPage/useGlossaryDetailModel.test.js
import { beforeEach, describe, expect, jest, test } from "@jest/globals";

const stateSetters = [jest.fn(), jest.fn(), jest.fn(), jest.fn()];
const refs = [];
const effects = [];
let stateIndex = 0;
let refIndex = 0;
let stateValues = [null, [], null, false];
const useState = jest.fn((initialValue) => {
	const currentIndex = stateIndex;
	stateIndex += 1;
	const value = stateValues[currentIndex] === undefined ? initialValue : stateValues[currentIndex];
	return [value, stateSetters[currentIndex]];
});
const useEffect = jest.fn((effect) => {
	effects.push(effect);
});
const useCallback = jest.fn((callback) => callback);
const useRef = jest.fn((initialValue) => {
	const currentIndex = refIndex;
	refIndex += 1;

	if (refs[currentIndex] === undefined) {
		refs[currentIndex] = { current: initialValue };
	}

	return refs[currentIndex];
});

jest.unstable_mockModule("react", () => ({
	useCallback,
	useEffect,
	useRef,
	useState
}));

const { default: useGlossaryDetailModel } = await import(
	"../../../../src/ui/viewmodel/GlossaryPage/useGlossaryDetailModel.js"
);

function renderDetailModel(values) {
	stateIndex = 0;
	refIndex = 0;
	stateValues = values;
	return useGlossaryDetailModel({ resetKey: "in2120:none" });
}

beforeEach(() => {
	stateIndex = 0;
	refIndex = 0;
	stateValues = [null, [], null, false];
	refs.length = 0;
	effects.length = 0;
	useState.mockClear();
	useEffect.mockClear();
	useCallback.mockClear();
	useRef.mockClear();

	for (const setter of stateSetters) {
		setter.mockClear();
	}
});

describe("useGlossaryDetailModel", () => {
	test("owns detail state and clears retained detail-trigger refs on reset", () => {
		const model = renderDetailModel(["packet", ["transport-layer"], { key: "snapshot" }, true]);
		model.resolveGlossaryDetailTriggerRef("packet")({ id: "trigger" });

		expect(model.glossaryDetailTriggerElementByKey.current.size).toBe(1);
		effects[0]();

		expect(stateSetters[0]).toHaveBeenCalledWith(null);
		expect(stateSetters[1]).toHaveBeenCalledWith([]);
		expect(stateSetters[2]).toHaveBeenCalledWith(null);
		expect(stateSetters[3]).toHaveBeenCalledWith(false);
		expect(model.glossaryDetailTriggerElementByKey.current.size).toBe(0);
	});

	test("reuses detail-trigger callback refs across rerenders", () => {
		const first = renderDetailModel([null, [], null, false]);
		const firstTriggerRef = first.resolveGlossaryDetailTriggerRef("packet");
		const second = renderDetailModel([null, [], null, false]);

		expect(second.resolveGlossaryDetailTriggerRef("packet")).toBe(firstTriggerRef);
	});

	test("moves focus to the requested detail title without viewport state", () => {
		const model = renderDetailModel(["packet", [], null, false]);
		const titleElement = { focus: jest.fn() };
		model.glossaryDetailTitleFocusRequestKeyRef.current = "packet";
		model.glossaryDetailTitleElementRef.current = titleElement;

		effects[1]();

		expect(titleElement.focus).toHaveBeenCalledWith({ preventScroll: true });
		expect(model.glossaryDetailTitleFocusRequestKeyRef.current).toBeNull();
	});
});
