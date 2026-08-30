// test/ui/viewmodel/StatisticsPageViewModelAuth.test.js
import { beforeEach, describe, expect, jest, test } from "@jest/globals";
import { LOAD_STATUS } from "../../../src/ui/viewmodel/LoadState/loadStatus.js";
import { WORKSPACE_STATE_KINDS } from "../../../src/ui/viewmodel/WorkspaceState/workspaceStateKinds.js";

const useCallback = jest.fn((callback) => callback);
const useMemo = jest.fn((factory) => factory());
const useLoadModel = jest.fn(() => ({
	status: LOAD_STATUS.READY,
	data: null,
	error: null,
	reload: jest.fn()
}));

jest.unstable_mockModule("react", () => ({
	useCallback,
	useMemo
}));

jest.unstable_mockModule("../../../src/ui/viewmodel/LoadState/useLoadModel.js", () => ({
	default: useLoadModel
}));

jest.unstable_mockModule("../../../src/ui/viewmodel/StatisticsPage/createStatisticsTextModel.js", () => ({
	default: () => ({
		loadErrorMessage: "load error",
		loadingTitle: "loading",
		errorTitle: "error",
		retryButton: "retry",
		signedOutTitle: "signed out",
		signedOutBody: "sign in",
		startNewExamButton: "start",
		emptyTitle: "empty",
		emptyBody: "empty body",
		pageTitle: "statistics",
		pageSubtitle: "subtitle",
		loadingBody: "loading body"
	})
}));

jest.unstable_mockModule("../../../src/ui/viewmodel/StatisticsPage/createStatisticsDashboardModel.js", () => ({
	default: () => ({
		isStatisticsEmpty: true
	})
}));

const { default: useStatisticsPageViewModel } = await import("../../../src/ui/viewmodel/StatisticsPageViewModel.js");

function renderViewModel(authState) {
	const getMyStatisticsUseCase = {
		execute: jest.fn().mockResolvedValue(null)
	};

	const viewModel = useStatisticsPageViewModel({
		getMyStatisticsUseCase,
		formatDate: jest.fn(),
		t: {},
		authState,
		backContract: { onBack: jest.fn() },
		onStartNewExam: jest.fn()
	});

	return {
		getMyStatisticsUseCase,
		viewModel
	};
}

describe("Statistics auth state", () => {
	beforeEach(() => {
		useCallback.mockClear();
		useMemo.mockClear();
		useLoadModel.mockClear();
	});

	test("keeps statistics disabled while auth is loading", () => {
		const { viewModel } = renderViewModel({ status: "loading" });

		expect(useLoadModel.mock.calls[0][0]).toMatchObject({
			resourceKey: null,
			isEnabled: false
		});
		expect(viewModel.workspaceState.kind).toBe(WORKSPACE_STATE_KINDS.LOADING);
	});

	test("treats disabled auth as signed out without loading user statistics", async () => {
		const { getMyStatisticsUseCase, viewModel } = renderViewModel({ status: "disabled" });
		const executeStatisticsLoad = useLoadModel.mock.calls[0][0].execute;

		expect(useLoadModel.mock.calls[0][0]).toMatchObject({
			resourceKey: null,
			isEnabled: false
		});
		expect(viewModel.workspaceState).toMatchObject({
			kind: WORKSPACE_STATE_KINDS.EMPTY,
			title: "signed out"
		});

		await expect(executeStatisticsLoad()).resolves.toBeNull();
		expect(getMyStatisticsUseCase.execute).not.toHaveBeenCalled();
	});

	test("loads statistics with the signed-in user identity as resource key", async () => {
		const { getMyStatisticsUseCase } = renderViewModel({ status: "signed-in", userId: "user-1" });
		const loadOptions = useLoadModel.mock.calls[0][0];

		expect(loadOptions).toMatchObject({
			resourceKey: "user-1",
			isEnabled: true
		});

		await loadOptions.execute();
		expect(getMyStatisticsUseCase.execute).toHaveBeenCalledTimes(1);
	});
});
