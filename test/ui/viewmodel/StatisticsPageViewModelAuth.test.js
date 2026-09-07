// test/ui/viewmodel/StatisticsPageViewModelAuth.test.js
import { beforeEach, expect, jest, test } from "@jest/globals";
import { WORKSPACE_STATE_KINDS } from "../../../src/ui/viewmodel/WorkspaceState/workspaceStateKinds.js";

const useStatisticsOverviewModel = jest.fn(() => ({
	workspaceState: { kind: WORKSPACE_STATE_KINDS.CONTENT },
	presentation: { isEmpty: false },
	actions: { selectPeriod: jest.fn() }
}));

jest.unstable_mockModule("../../../src/ui/viewmodel/StatisticsPage/Overview/useStatisticsOverviewModel.js", () => ({
	default: useStatisticsOverviewModel
}));

jest.unstable_mockModule("../../../src/ui/viewmodel/StatisticsPage/createStatisticsTextModel.js", () => ({
	default: () => ({ pageTitle: "statistics", pageSubtitle: "subtitle" })
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
		subjectSwitcher: { kind: "ready" },
		onSelectSubject: jest.fn(),
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
});

beforeEach(() => {
	useStatisticsOverviewModel.mockClear();
});
