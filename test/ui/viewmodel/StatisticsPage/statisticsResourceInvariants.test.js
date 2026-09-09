// test/ui/viewmodel/StatisticsPage/statisticsResourceInvariants.test.js
import { beforeEach, describe, expect, jest, test } from "@jest/globals";
import { APP_AUTH_STATUS } from "../../../../src/auth/AppAuthState.js";
import { DEFAULT_STATISTICS_MASTERY_SCOPE, STATISTICS_MASTERY_SCOPE_KINDS } from "../../../../src/constants/StatisticsContracts.js";
import { LOAD_STATUS } from "../../../../src/ui/viewmodel/LoadState/loadStatus.js";
import { WORKSPACE_STATE_KINDS } from "../../../../src/ui/viewmodel/WorkspaceState/workspaceStateKinds.js";

let hookState;
let stateIndex;

const useState = jest.fn((initialValue) => {
	const index = stateIndex++;

	if (hookState[index] === undefined) {
		hookState[index] = initialValue;
	}

	return [
		hookState[index],
		jest.fn((nextValue) => {
			hookState[index] = typeof nextValue === "function"
				? nextValue(hookState[index])
				: nextValue;
		})
	];
});
const useCallback = jest.fn((callback) => callback);
const reload = jest.fn();
const loadedStatistics = { subjectId: "loaded-subject" };
let enabledLoadStatus = LOAD_STATUS.READY;
const useLoadModel = jest.fn(({ isEnabled }) => ({
	status: isEnabled ? enabledLoadStatus : LOAD_STATUS.LOADING,
	data: isEnabled ? loadedStatistics : null,
	error: isEnabled && enabledLoadStatus === LOAD_STATUS.ERROR ? "Kunne ikke laste statistikk" : null,
	reload
}));
const createStatisticsOverviewModel = jest.fn(({ statistics, masteryScope, subject }) => {
	if (statistics !== null && subject === null) {
		throw new Error("loaded Statistics requires selected subject");
	}

	const hasStatistics = statistics !== null;
	let historyTotalCount = 0;

	if (hasStatistics) {
		historyTotalCount = 1;
	}

	return {
		development: { hasEvidence: hasStatistics },
		summary: { hasProgress: hasStatistics },
		chapters: { hasEvidence: hasStatistics },
		history: { pageCount: 1, totalCount: historyTotalCount },
		observedMasteryScope: masteryScope
	};
});
jest.unstable_mockModule("react", () => ({
	useCallback,
	useState
}));

jest.unstable_mockModule("../../../../src/ui/viewmodel/LoadState/useLoadModel.js", () => ({
	default: useLoadModel
}));

jest.unstable_mockModule("../../../../src/ui/viewmodel/StatisticsPage/Overview/createStatisticsOverviewModel.js", () => ({
	default: createStatisticsOverviewModel
}));

const { default: useStatisticsOverviewModel } = await import("../../../../src/ui/viewmodel/StatisticsPage/Overview/useStatisticsOverviewModel.js");

function createProps(subjectId, selectedSubject) {
	return {
		getSubjectStatisticsUseCase: { execute: jest.fn(() => Promise.resolve(loadedStatistics)) },
		subjectId,
		selectedSubject,
		language: "no",
		formatDate: jest.fn(),
		text: {
			loadErrorMessage: "Kunne ikke laste statistikk",
			loadingTitle: "Laster statistikk",
			errorTitle: "Feil",
			sectionLoadingLabel: "Laster",
			sectionEmptyTitle: "Ingen data tilgjengelig",
			developmentEmptyBody: "Ingen utvikling",
			progressEmptyBody: "Ingen fremgang",
			completedEmptyBody: "Ingen forsøk",
			chaptersEmptyBody: "Ingen mestringsdata",
			historyEmptyBody: "Ingen historikk",
			signedOutTitle: "Logg inn",
			signedOutBody: "Logg inn for å se statistikk",
			startNewExamButton: "Start eksamen",
			retryButton: "Prøv igjen"
		},
		authState: { status: APP_AUTH_STATUS.SIGNED_IN, userId: "user-1" },
		onStartNewExam: jest.fn()
	};
}

function renderOverview(props) {
	stateIndex = 0;
	return useStatisticsOverviewModel(props);
}

beforeEach(() => {
	hookState = [];
	enabledLoadStatus = LOAD_STATUS.READY;
	jest.clearAllMocks();
});

describe("Statistics resource invariants", () => {
	test("selectedSubject null gir CONTENT-side med fem LOADING-kort uten gammel Statistics-data", () => {
		const props = createProps("in2120", null);

		const viewModel = renderOverview(props);

		expect(useLoadModel).toHaveBeenCalledWith(expect.objectContaining({
			isEnabled: false,
			resourceKey: null
		}));
		expect(createStatisticsOverviewModel).toHaveBeenCalledWith(expect.objectContaining({
			statistics: null,
			subject: null
		}));
		expect(viewModel.workspaceState.kind).toBe(WORKSPACE_STATE_KINDS.CONTENT);
		expect(viewModel.cardStates.development.kind).toBe(WORKSPACE_STATE_KINDS.LOADING);
		expect(viewModel.cardStates.progress.kind).toBe(WORKSPACE_STATE_KINDS.LOADING);
		expect(viewModel.cardStates.completed.kind).toBe(WORKSPACE_STATE_KINDS.LOADING);
		expect(viewModel.cardStates.chapters.kind).toBe(WORKSPACE_STATE_KINDS.LOADING);
		expect(viewModel.cardStates.history.kind).toBe(WORKSPACE_STATE_KINDS.LOADING);
	});

	test("fagbytte tilbakestiller masteryScope i samme render", () => {
		const firstProps = createProps("in2120", { id: "in2120", name: "in2120" });
		const topicAreaScope = { kind: STATISTICS_MASTERY_SCOPE_KINDS.TOPIC_AREA, topicAreaKey: "chapter-1" };
		const firstViewModel = renderOverview(firstProps);
		firstViewModel.actions.selectMasteryScope(topicAreaScope);

		renderOverview(firstProps);
		expect(createStatisticsOverviewModel).toHaveBeenLastCalledWith(expect.objectContaining({ masteryScope: topicAreaScope }));

		renderOverview(createProps("in5140", { id: "in5140", name: "in5140" }));
		expect(createStatisticsOverviewModel).toHaveBeenLastCalledWith(expect.objectContaining({ masteryScope: DEFAULT_STATISTICS_MASTERY_SCOPE }));
	});

	test("reload på samme fag beholder masteryScope", () => {
		const props = createProps("in2120", { id: "in2120", name: "in2120" });
		const topicAreaScope = { kind: STATISTICS_MASTERY_SCOPE_KINDS.TOPIC_AREA, topicAreaKey: "chapter-1" };
		const firstViewModel = renderOverview(props);
		firstViewModel.actions.selectMasteryScope(topicAreaScope);
		enabledLoadStatus = LOAD_STATUS.ERROR;
		const errorViewModel = renderOverview(props);

		errorViewModel.workspaceState.action.onAction();
		enabledLoadStatus = LOAD_STATUS.READY;
		renderOverview(props);

		expect(reload).toHaveBeenCalledTimes(1);
		expect(createStatisticsOverviewModel).toHaveBeenLastCalledWith(expect.objectContaining({ masteryScope: topicAreaScope }));
	});
});
