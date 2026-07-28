// test/ui/components/ToggleButtonRow/useToggleButtonRowMobile.test.js
import { beforeEach, describe, expect, jest, test } from "@jest/globals";
import { LEARNING_CONTENT_TYPES, TEST_TYPES } from "../../../../src/navigation/navigation.js";

let expandedGroupId = null;
let refIndex = 0;
const refs = [];
const setExpandedGroupId = jest.fn((nextExpandedGroupId) => {
	expandedGroupId = nextExpandedGroupId;
});
const useState = jest.fn(() => [expandedGroupId, setExpandedGroupId]);
const useEffect = jest.fn((effect) => effect());
const useRef = jest.fn((initialValue) => {
	const currentRefIndex = refIndex;
	refIndex += 1;

	if (refs[currentRefIndex] === undefined) {
		refs[currentRefIndex] = { current: initialValue };
	}

	return refs[currentRefIndex];
});

jest.unstable_mockModule("react", () => ({
	useEffect,
	useRef,
	useState
}));

const { default: useToggleButtonRowMobile } = await import(
	"../../../../src/ui/view/components/ToggleButtonRow/useToggleButtonRowMobile.js"
);

const practiceEntries = [
	{
		id: LEARNING_CONTENT_TYPES.FLIPCARDS,
		label: "Flipcards",
		isDisabled: false
	},
	{
		id: LEARNING_CONTENT_TYPES.MATCHCARDS,
		label: "Begrepsmatch",
		isDisabled: false
	},
	{
		id: LEARNING_CONTENT_TYPES.GLOSSARY,
		label: "Begrepslister",
		isDisabled: false
	}
];
const testEntries = [
	{
		id: TEST_TYPES.CHAPTER_TEST,
		label: "Kapitteltester",
		isDisabled: false
	},
	{
		id: LEARNING_CONTENT_TYPES.EXAMS,
		label: "Eksamener",
		isDisabled: false
	}
];
const items = [
	{
		id: "learning-path",
		label: "Sti",
		contentTypeId: null,
		isDisabled: true,
		isActive: false,
		entries: []
	},
	{
		id: "practice",
		label: "Øve",
		contentTypeId: null,
		isDisabled: false,
		isActive: false,
		entries: practiceEntries
	},
	{
		id: "tests",
		label: "Tester",
		contentTypeId: null,
		isDisabled: false,
		isActive: true,
		entries: testEntries
	}
];

function renderInteraction(onSelectEntry, activeEntryId = LEARNING_CONTENT_TYPES.EXAMS) {
	refIndex = 0;

	return useToggleButtonRowMobile({
		items,
		activeEntryId,
		onSelectEntry
	});
}

beforeEach(() => {
	expandedGroupId = null;
	refIndex = 0;
	refs.length = 0;
	setExpandedGroupId.mockClear();
	useState.mockClear();
	useEffect.mockClear();
	useRef.mockClear();
});

describe("useToggleButtonRowMobile", () => {
	test("starts collapsed with the disabled path item before practice and tests", () => {
		const interaction = renderInteraction(jest.fn());

		expect(items.map((item) => item.id)).toEqual(["learning-path", "practice", "tests"]);
		expect(items[0].isDisabled).toBe(true);
		expect(interaction.expandedItem).toBeNull();
		expect(interaction.expandedActiveEntryId).toBeNull();
	});

	test("ignores the disabled path item", () => {
		const onSelectEntry = jest.fn();
		const interaction = renderInteraction(onSelectEntry);

		interaction.selectItem(items[0]);

		expect(expandedGroupId).toBeNull();
		expect(onSelectEntry).not.toHaveBeenCalled();
	});

	test("opens practice, selects Flipcards by default and focuses the back button", () => {
		const onSelectEntry = jest.fn();
		const collapsedInteraction = renderInteraction(onSelectEntry);

		collapsedInteraction.selectItem(items[1]);

		expect(expandedGroupId).toBe("practice");
		expect(onSelectEntry).toHaveBeenCalledWith(LEARNING_CONTENT_TYPES.FLIPCARDS);

		const focusBackButton = jest.fn();
		refs[0].current = { focus: focusBackButton };
		const expandedInteraction = renderInteraction(onSelectEntry);

		expect(expandedInteraction.expandedItem).toBe(items[1]);
		expect(expandedInteraction.expandedActiveEntryId).toBe(LEARNING_CONTENT_TYPES.FLIPCARDS);
		expect(focusBackButton).toHaveBeenCalledTimes(1);
	});

	test("preserves an active practice entry when the group opens", () => {
		const onSelectEntry = jest.fn();
		const collapsedInteraction = renderInteraction(onSelectEntry, LEARNING_CONTENT_TYPES.GLOSSARY);

		collapsedInteraction.selectItem(items[1]);

		expect(onSelectEntry).not.toHaveBeenCalled();

		const expandedInteraction = renderInteraction(onSelectEntry, LEARNING_CONTENT_TYPES.GLOSSARY);

		expect(expandedInteraction.expandedActiveEntryId).toBe(LEARNING_CONTENT_TYPES.GLOSSARY);
	});

	test("opens tests, selects the first test type and keeps the group expanded", () => {
		const onSelectEntry = jest.fn();
		const collapsedInteraction = renderInteraction(onSelectEntry, LEARNING_CONTENT_TYPES.GLOSSARY);

		collapsedInteraction.selectItem(items[2]);

		expect(expandedGroupId).toBe("tests");
		expect(onSelectEntry).toHaveBeenCalledWith(TEST_TYPES.CHAPTER_TEST);

		const expandedInteraction = renderInteraction(onSelectEntry, TEST_TYPES.CHAPTER_TEST);

		expect(expandedInteraction.expandedItem).toBe(items[2]);
		expect(expandedInteraction.expandedActiveEntryId).toBe(TEST_TYPES.CHAPTER_TEST);

		expandedInteraction.selectEntry(testEntries[1]);
		expect(onSelectEntry).toHaveBeenNthCalledWith(2, LEARNING_CONTENT_TYPES.EXAMS);
		expect(setExpandedGroupId).not.toHaveBeenCalledWith(null);
	});

	test("preserves the active exam test type when the tests group opens", () => {
		const onSelectEntry = jest.fn();
		const collapsedInteraction = renderInteraction(onSelectEntry, LEARNING_CONTENT_TYPES.EXAMS);

		collapsedInteraction.selectItem(items[2]);

		expect(onSelectEntry).not.toHaveBeenCalled();

		const expandedInteraction = renderInteraction(onSelectEntry, LEARNING_CONTENT_TYPES.EXAMS);

		expect(expandedInteraction.expandedActiveEntryId).toBe(LEARNING_CONTENT_TYPES.EXAMS);
	});

	test("closes on Escape and restores focus to the opening group button", () => {
		const onSelectEntry = jest.fn();
		const collapsedInteraction = renderInteraction(onSelectEntry);
		collapsedInteraction.selectItem(items[1]);
		const expandedInteraction = renderInteraction(onSelectEntry, LEARNING_CONTENT_TYPES.FLIPCARDS);
		const preventDefault = jest.fn();

		expect(expandedInteraction.resolveItemButtonRef("practice")).toBe(refs[1]);
		expect(expandedInteraction.resolveItemButtonRef("tests")).toBeNull();

		const restoreFocus = jest.fn();
		refs[1].current = { focus: restoreFocus };
		expandedInteraction.closeExpandedGroupOnEscape({
			key: "Escape",
			preventDefault
		});

		expect(preventDefault).toHaveBeenCalledTimes(1);
		expect(expandedGroupId).toBeNull();

		const restoredInteraction = renderInteraction(onSelectEntry, LEARNING_CONTENT_TYPES.FLIPCARDS);

		expect(restoredInteraction.expandedItem).toBeNull();
		expect(restoreFocus).toHaveBeenCalledTimes(1);
		expect(restoredInteraction.resolveItemButtonRef("practice")).toBeNull();
	});

	test("does not close on unrelated keys", () => {
		const interaction = renderInteraction(jest.fn());
		interaction.selectItem(items[1]);
		const expandedInteraction = renderInteraction(jest.fn(), LEARNING_CONTENT_TYPES.FLIPCARDS);
		const preventDefault = jest.fn();

		expandedInteraction.closeExpandedGroupOnEscape({
			key: "Enter",
			preventDefault
		});

		expect(expandedGroupId).toBe("practice");
		expect(preventDefault).not.toHaveBeenCalled();
	});

	test("fails clearly when expanded state references an unknown item", () => {
		expandedGroupId = "missing";

		expect(() => renderInteraction(jest.fn())).toThrow(
			"Unknown expanded toggle-button item: missing"
		);
	});
});
