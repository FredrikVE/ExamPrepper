// test/ui/components/ToggleButtonRow/useToggleButtonRowMobile.test.js
import { beforeEach, describe, expect, jest, test } from "@jest/globals";
import { LEARNING_CONTENT_TYPES, TEST_TYPES } from "../../../../src/navigation/navigation.js";

let expandedGroupId = null;
let refIndex = 0;
const refs = [];
const onOpenGroup = jest.fn((nextExpandedGroupId) => {
	expandedGroupId = nextExpandedGroupId;
});
const onCloseGroup = jest.fn(() => {
	expandedGroupId = null;
});
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
	useRef
}));

const { default: useToggleButtonRowMobile } = await import(
	"../../../../src/ui/view/components/ToggleButtonRow/useToggleButtonRowMobile.js"
);

const practiceEntries = [
	{
		id: LEARNING_CONTENT_TYPES.GLOSSARY,
		label: "Begrepsliste",
		isDisabled: false
	},
	{
		id: LEARNING_CONTENT_TYPES.FLIPCARDS,
		label: "Flipcards",
		isDisabled: false
	},
	{
		id: LEARNING_CONTENT_TYPES.MATCHCARDS,
		label: "Begrepsmatch",
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
		expandedGroupId,
		onOpenGroup,
		onCloseGroup,
		onSelectEntry
	});
}

beforeEach(() => {
	expandedGroupId = null;
	refIndex = 0;
	refs.length = 0;
	onOpenGroup.mockClear();
	onCloseGroup.mockClear();
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

		expect(onOpenGroup).not.toHaveBeenCalled();
		expect(onSelectEntry).not.toHaveBeenCalled();
	});

	test("opens practice in desktop order, selects Begrepsliste by default and focuses the close button", () => {
		const onSelectEntry = jest.fn();
		const collapsedInteraction = renderInteraction(onSelectEntry);

		collapsedInteraction.selectItem(items[1]);

		expect(practiceEntries.map((entry) => entry.id)).toEqual([
			LEARNING_CONTENT_TYPES.GLOSSARY,
			LEARNING_CONTENT_TYPES.FLIPCARDS,
			LEARNING_CONTENT_TYPES.MATCHCARDS
		]);
		expect(onOpenGroup).toHaveBeenCalledWith("practice");
		expect(onSelectEntry).toHaveBeenCalledWith(LEARNING_CONTENT_TYPES.GLOSSARY);

		const focusCloseButton = jest.fn();
		refs[0].current = { focus: focusCloseButton };
		const expandedInteraction = renderInteraction(onSelectEntry, LEARNING_CONTENT_TYPES.GLOSSARY);

		expect(expandedInteraction.expandedItem).toBe(items[1]);
		expect(expandedInteraction.expandedActiveEntryId).toBe(LEARNING_CONTENT_TYPES.GLOSSARY);
		expect(focusCloseButton).toHaveBeenCalledTimes(1);
	});

	test("preserves an active practice entry when the group opens", () => {
		const onSelectEntry = jest.fn();
		const collapsedInteraction = renderInteraction(onSelectEntry, LEARNING_CONTENT_TYPES.FLIPCARDS);

		collapsedInteraction.selectItem(items[1]);

		expect(onSelectEntry).not.toHaveBeenCalled();

		const expandedInteraction = renderInteraction(onSelectEntry, LEARNING_CONTENT_TYPES.FLIPCARDS);

		expect(expandedInteraction.expandedActiveEntryId).toBe(LEARNING_CONTENT_TYPES.FLIPCARDS);
	});

	test("keeps tests expanded when another test type is selected", () => {
		const onSelectEntry = jest.fn();
		const collapsedInteraction = renderInteraction(onSelectEntry, LEARNING_CONTENT_TYPES.GLOSSARY);

		collapsedInteraction.selectItem(items[2]);

		expect(onOpenGroup).toHaveBeenCalledWith("tests");
		expect(onSelectEntry).toHaveBeenCalledWith(TEST_TYPES.CHAPTER_TEST);

		const expandedInteraction = renderInteraction(onSelectEntry, TEST_TYPES.CHAPTER_TEST);

		expect(expandedInteraction.expandedItem).toBe(items[2]);
		expect(expandedInteraction.expandedActiveEntryId).toBe(TEST_TYPES.CHAPTER_TEST);

		expandedInteraction.selectEntry(testEntries[1]);

		expect(onSelectEntry).toHaveBeenNthCalledWith(2, LEARNING_CONTENT_TYPES.EXAMS);
		expect(expandedGroupId).toBe("tests");
		expect(onCloseGroup).not.toHaveBeenCalled();
	});

	test("preserves the active exam test type when the tests group opens", () => {
		const onSelectEntry = jest.fn();
		const collapsedInteraction = renderInteraction(onSelectEntry, LEARNING_CONTENT_TYPES.EXAMS);

		collapsedInteraction.selectItem(items[2]);

		expect(onSelectEntry).not.toHaveBeenCalled();

		const expandedInteraction = renderInteraction(onSelectEntry, LEARNING_CONTENT_TYPES.EXAMS);

		expect(expandedInteraction.expandedActiveEntryId).toBe(LEARNING_CONTENT_TYPES.EXAMS);
	});

	test("closes only through the explicit close action and restores focus", () => {
		const onSelectEntry = jest.fn();
		const collapsedInteraction = renderInteraction(onSelectEntry);
		collapsedInteraction.selectItem(items[1]);
		const expandedInteraction = renderInteraction(onSelectEntry, LEARNING_CONTENT_TYPES.GLOSSARY);

		expect(expandedInteraction.resolveItemButtonRef("practice")).toBe(refs[1]);
		expect(expandedInteraction.resolveItemButtonRef("tests")).toBeNull();

		const restoreFocus = jest.fn();
		refs[1].current = { focus: restoreFocus };

		expandedInteraction.selectEntry(practiceEntries[1]);

		expect(expandedGroupId).toBe("practice");
		expect(onCloseGroup).not.toHaveBeenCalled();

		expandedInteraction.collapseGroup();

		expect(onCloseGroup).toHaveBeenCalledTimes(1);
		expect(expandedGroupId).toBeNull();

		const restoredInteraction = renderInteraction(onSelectEntry, LEARNING_CONTENT_TYPES.FLIPCARDS);

		expect(restoredInteraction.expandedItem).toBeNull();
		expect(restoreFocus).toHaveBeenCalledTimes(1);
		expect(restoredInteraction.resolveItemButtonRef("practice")).toBeNull();
	});

	test("fails clearly when controlled expanded state references an unknown item", () => {
		expandedGroupId = "missing";

		expect(() => renderInteraction(jest.fn())).toThrow(
			"Unknown expanded toggle-button item: missing"
		);
	});
});
