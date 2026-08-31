// test/ui/viewmodel/SubjectCatalog/useSubjectCatalogModel.test.js
import { beforeEach, describe, expect, jest, test } from "@jest/globals";
import { LOAD_STATUS } from "../../../../src/ui/viewmodel/LoadState/loadStatus.js";

let loadModel;
const useCallback = jest.fn((callback) => callback);
const useLoadModel = jest.fn(() => loadModel);

jest.unstable_mockModule("react", () => ({
	useCallback
}));

jest.unstable_mockModule("../../../../src/ui/viewmodel/LoadState/useLoadModel.js", () => ({
	default: useLoadModel
}));

const { default: useSubjectCatalogModel } = await import("../../../../src/ui/viewmodel/SubjectCatalog/useSubjectCatalogModel.js");

const t = {
	subjectErrorMessage: "Kunne ikke hente fag",
	subjectLoadingMessage: "Laster fag",
	subjectSwitcherEmptyLabel: "Ingen fag",
	subjectSwitcherSelectLabel: "Velg fag"
};

function createModel(selectedSubjectId = null) {
	return useSubjectCatalogModel({
		getAvailableSubjectsUseCase: {
			execute: jest.fn().mockResolvedValue(loadModel.data)
		},
		language: "nb",
		selectedSubjectId,
		t
	});
}

describe("useSubjectCatalogModel", () => {
	beforeEach(() => {
		loadModel = {
			status: LOAD_STATUS.LOADING,
			data: [],
			error: null,
			reload: jest.fn()
		};
		useCallback.mockClear();
		useLoadModel.mockClear();
	});

	test("loads the app-global subject catalog independently of page lifetime", async () => {
		const execute = jest.fn().mockResolvedValue([]);

		useSubjectCatalogModel({
			getAvailableSubjectsUseCase: { execute },
			language: "nb",
			selectedSubjectId: null,
			t
		});

		const loadConfiguration = useLoadModel.mock.calls[0][0];
		await loadConfiguration.execute();

		expect(execute).toHaveBeenCalledWith({ language: "nb" });
		expect(loadConfiguration.resourceKey).toBe("nb");
		expect(loadConfiguration.isEnabled).toBe(true);
	});

	test("owns selected subject and the shell subject switcher", () => {
		const subject = { id: "in2120", code: "IN2120", name: "Informasjonssikkerhet" };
		loadModel = {
			status: LOAD_STATUS.READY,
			data: [subject],
			error: null,
			reload: jest.fn()
		};

		const model = createModel("in2120");

		expect(model.selectedSubject).toBe(subject);
		expect(model.subjectSwitcher).toEqual({
			kind: "ready",
			subjects: [subject],
			currentSubject: subject,
			label: subject.name,
			canOpen: true
		});
		expect(model.loadStatus).toBe(LOAD_STATUS.READY);
		expect(model.errorMessage).toBeNull();
	});

	test("returns an unselected switcher when loaded subjects have no selected id", () => {
		const subject = { id: "in2120", code: "IN2120", name: "Informasjonssikkerhet" };
		loadModel = {
			status: LOAD_STATUS.READY,
			data: [subject],
			error: null,
			reload: jest.fn()
		};

		const model = createModel("missing");

		expect(model.selectedSubject).toBeNull();
		expect(model.subjectSwitcher).toEqual({
			kind: "unselected",
			subjects: [subject],
			currentSubject: null,
			label: t.subjectSwitcherSelectLabel,
			canOpen: true
		});
	});

	test.each([
		[LOAD_STATUS.LOADING, "loading", t.subjectLoadingMessage],
		[LOAD_STATUS.ERROR, "error", t.subjectErrorMessage]
	])("maps %s load state to a closed shell switcher", (status, kind, label) => {
		loadModel = {
			status,
			data: [],
			error: status === LOAD_STATUS.ERROR ? "Feil" : null,
			reload: jest.fn()
		};

		const model = createModel();

		expect(model.subjectSwitcher).toEqual({
			kind,
			subjects: [],
			currentSubject: null,
			label,
			canOpen: false
		});
	});

	test("maps an empty ready catalog to a closed shell switcher", () => {
		loadModel = {
			status: LOAD_STATUS.READY,
			data: [],
			error: null,
			reload: jest.fn()
		};

		const model = createModel();

		expect(model.subjectSwitcher).toEqual({
			kind: "empty",
			subjects: [],
			currentSubject: null,
			label: t.subjectSwitcherEmptyLabel,
			canOpen: false
		});
	});
});
