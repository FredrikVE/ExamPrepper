// test/ui/viewmodel/GlossaryPage/useGlossaryTopicAreaSelectionModel.test.js
import { beforeEach, describe, expect, jest, test } from "@jest/globals";

const setSelectedTopicAreaKeys = jest.fn();
const useState = jest.fn((initialValue) => [initialValue, setSelectedTopicAreaKeys]);
const useEffect = jest.fn((effect) => effect());

jest.unstable_mockModule("react", () => ({
	useEffect,
	useState
}));

const { default: useGlossaryTopicAreaSelectionModel } = await import(
	"../../../../src/ui/viewmodel/GlossaryPage/useGlossaryTopicAreaSelectionModel.js"
);

beforeEach(() => {
	setSelectedTopicAreaKeys.mockClear();
	useState.mockClear();
	useEffect.mockClear();
});

describe("useGlossaryTopicAreaSelectionModel", () => {
	test("owns topic-area selection and resets it with the page context", () => {
		const model = useGlossaryTopicAreaSelectionModel({ resetKey: "in2120:none" });

		expect(model.selectedTopicAreaKeys).toBeNull();
		expect(model.setSelectedTopicAreaKeys).toBe(setSelectedTopicAreaKeys);
		expect(setSelectedTopicAreaKeys).toHaveBeenCalledWith(null);
	});
});
