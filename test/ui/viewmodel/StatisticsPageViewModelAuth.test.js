// test/ui/viewmodel/StatisticsPageViewModelAuth.test.js
import { beforeEach, expect, jest, test } from "@jest/globals";
import { WORKSPACE_STATE_KINDS } from "../../../src/ui/viewmodel/WorkspaceState/workspaceStateKinds.js";
import { SUBJECT_SWITCHER_KINDS } from "../../../src/ui/viewmodel/SubjectCatalog/subjectSwitcherKinds.js";

const useStatisticsOverviewModel = jest.fn(() => ({
	workspaceState: { kind: WORKSPACE_STATE_KINDS.CONTENT },
	presentation: { isEmpty: false },
	actions: { selectPeriod: jest.fn() }
}));

jest.unstable_mockModule("../../../src/ui/viewmodel/StatisticsPage/Overview/useStatisticsOverviewModel.js", () => ({
	default: useStatisticsOverviewModel
}));

jest.unstable_mockModule("../../../src/ui/viewmodel/StatisticsPage/createStatisticsTextModel.js", () => ({
	default: () => ({ pageTitle: "statistics", pageSubtitle: "subtitle", subjectSelectorMenuLabel: "Choose subject", subjectSelectorCloseLabel: "Close subject picker" })
}));

const { default: useStatisticsPageViewModel } = await import("../../../src/ui/viewmodel/StatisticsPageViewModel.js");

test("wires subject-scoped statistics into the overview model", () => {
	const getSubjectStatisticsUseCase = { execute: jest.fn() };
	const onStartNewExam = jest.fn();
	const authState = { status: "signed-in", userId: "user-1" };
	const viewModel = useStatisticsPageViewModel({
		getSubjectStatisticsUseCase,
		subjectId: "in2120",
		selectedSubject: { id: "in2120", name: "IN2120" },
		language: "no",
		subjectSwitcher: { kind: SUBJECT_SWITCHER_KINDS.READY, subjects: [{ id: "in2120", name: "IN2120" }], currentSubject: { id: "in2120", name: "IN2120" }, label: "IN2120", canOpen: true },
		onSelectSubject: jest.fn(),
		onBackToLearningPath: jest.fn(),
		formatDate: jest.fn(),
		t: {},
		authState,
		backContract: { onBack: jest.fn() },
		onStartNewExam
	});

	expect(useStatisticsOverviewModel).toHaveBeenCalledWith(expect.objectContaining({
		getSubjectStatisticsUseCase,
		subjectId: "in2120",
		language: "no",
		authState,
		onStartNewExam
	}));
	expect(viewModel.workspaceState.kind).toBe(WORKSPACE_STATE_KINDS.CONTENT);
	expect(viewModel.overview).toEqual({ isEmpty: false });
	expect(viewModel.subjectSelector).toEqual({ kind: SUBJECT_SWITCHER_KINDS.READY, subjects: [{ id: "in2120", name: "IN2120" }], currentSubject: { id: "in2120", name: "IN2120" }, label: "IN2120", canOpen: true, menuLabel: "Choose subject", closeLabel: "Close subject picker" });
});

test("viser første SubjectSelect-fag i Statistics uten å velge det globalt", () => {
	const getSubjectStatisticsUseCase = { execute: jest.fn() };
	const onSelectSubject = jest.fn();
	const onBackToLearningPath = jest.fn();
	const firstSubject = { id: "in4150", code: "IN4150", name: "IN4150" };
	const secondSubject = { id: "in2120", code: "IN2120", name: "IN2120" };

	const viewModel = useStatisticsPageViewModel({
		getSubjectStatisticsUseCase,
		subjectId: null,
		selectedSubject: null,
		language: "no",
		subjectSwitcher: { kind: SUBJECT_SWITCHER_KINDS.UNSELECTED, subjects: [firstSubject, secondSubject], currentSubject: null, label: "Choose subject", canOpen: true },
		onSelectSubject,
		onBackToLearningPath,
		formatDate: jest.fn(),
		t: {},
		authState: { status: "signed-in", userId: "user-1" },
		backContract: { onBack: jest.fn() },
		onStartNewExam: jest.fn()
	});

	expect(onSelectSubject).not.toHaveBeenCalled();
	expect(useStatisticsOverviewModel).toHaveBeenCalledWith(expect.objectContaining({
		getSubjectStatisticsUseCase,
		subjectId: "in4150",
		selectedSubject: firstSubject
	}));
	expect(viewModel.subjectId).toBe("in4150");
	expect(viewModel.selectedSubject).toBe(firstSubject);
	expect(viewModel.subjectSelector).toEqual({
		kind: SUBJECT_SWITCHER_KINDS.READY,
		subjects: [firstSubject, secondSubject],
		currentSubject: firstSubject,
		label: "IN4150",
		canOpen: true,
		menuLabel: "Choose subject",
		closeLabel: "Close subject picker"
	});
	expect(viewModel.workspaceState.kind).toBe(WORKSPACE_STATE_KINDS.CONTENT);

	viewModel.backContract.onBack();

	expect(onBackToLearningPath).toHaveBeenCalledWith("in4150");
});

test("does not replace a non-null subject id when the catalog cannot resolve it", () => {
	const onSelectSubject = jest.fn();

	useStatisticsPageViewModel({
		getSubjectStatisticsUseCase: { execute: jest.fn() },
		subjectId: "missing-subject",
		selectedSubject: null,
		language: "no",
		subjectSwitcher: { kind: SUBJECT_SWITCHER_KINDS.UNSELECTED, subjects: [{ id: "in4150", name: "IN4150" }], currentSubject: null, label: "Choose subject", canOpen: true },
		onSelectSubject,
		onBackToLearningPath: jest.fn(),
		formatDate: jest.fn(),
		t: {},
		authState: { status: "signed-in", userId: "user-1" },
		backContract: { onBack: jest.fn() },
		onStartNewExam: jest.fn()
	});

	expect(onSelectSubject).not.toHaveBeenCalled();
});

test("uses canonical error state when the subject catalog fails before a default can be selected", () => {
	const viewModel = useStatisticsPageViewModel({
		getSubjectStatisticsUseCase: { execute: jest.fn() },
		subjectId: null,
		selectedSubject: null,
		language: "no",
		subjectSwitcher: { kind: SUBJECT_SWITCHER_KINDS.ERROR, subjects: [], currentSubject: null, label: "Could not load subjects", canOpen: false },
		onSelectSubject: jest.fn(),
		onBackToLearningPath: jest.fn(),
		formatDate: jest.fn(),
		t: { errorPrefix: "Error" },
		authState: { status: "signed-in", userId: "user-1" },
		backContract: { onBack: jest.fn() },
		onStartNewExam: jest.fn()
	});

	expect(viewModel.workspaceState).toEqual({
		kind: WORKSPACE_STATE_KINDS.ERROR,
		title: "Error",
		body: "Could not load subjects",
		action: null
	});
});

beforeEach(() => {
	useStatisticsOverviewModel.mockClear();
});
