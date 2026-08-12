// test/ui/viewmodel/GlossaryPage/useGlossarySearchModel.test.js
import { beforeEach, describe, expect, jest, test } from "@jest/globals";

const stateSetters = [jest.fn(), jest.fn(), jest.fn(), jest.fn(), jest.fn()];
let stateIndex = 0;
const useState = jest.fn((initialValue) => {
	const currentIndex = stateIndex;
	stateIndex += 1;
	return [initialValue, stateSetters[currentIndex]];
});
const useEffect = jest.fn((effect) => effect());

jest.unstable_mockModule("react", () => ({
	useEffect,
	useState
}));

const { default: useGlossarySearchModel } = await import(
	"../../../../src/ui/viewmodel/GlossaryPage/useGlossarySearchModel.js"
);

beforeEach(() => {
	stateIndex = 0;
	useState.mockClear();
	useEffect.mockClear();
	for (const setter of stateSetters) {
		setter.mockClear();
	}
});

describe("useGlossarySearchModel", () => {
	test("owns the glossary search state behind named fields", () => {
		const model = useGlossarySearchModel({ resetKey: "in2120:none" });

		expect(model.glossarySearchTerm).toBe("");
		expect(model.searchKeyboardIndex).toBe(-1);
		expect(model.isSearchFilterOptionsOpen).toBe(false);
		expect(model.isSearchAutocompleteOpen).toBe(false);
		expect(model.searchNarrowedGlossaryEntryKey).toBeNull();
		expect(model.setGlossarySearchTerm).toBe(stateSetters[0]);
		expect(model.setSearchNarrowedGlossaryEntryKey).toBe(stateSetters[4]);
	});

	test("resets only search-owned state when the reset key changes", () => {
		useGlossarySearchModel({ resetKey: "in2120:none" });

		expect(stateSetters[0]).toHaveBeenCalledWith("");
		expect(stateSetters[1]).toHaveBeenCalledWith(-1);
		expect(stateSetters[2]).toHaveBeenCalledWith(false);
		expect(stateSetters[3]).toHaveBeenCalledWith(false);
		expect(stateSetters[4]).toHaveBeenCalledWith(null);
	});
});
