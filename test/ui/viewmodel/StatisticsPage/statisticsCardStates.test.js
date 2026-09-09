// test/ui/viewmodel/StatisticsPage/statisticsCardStates.test.js
import { describe, expect, test } from "@jest/globals";
import { LOAD_STATUS } from "../../../../src/ui/viewmodel/LoadState/loadStatus.js";
import { WORKSPACE_STATE_KINDS } from "../../../../src/ui/viewmodel/WorkspaceState/workspaceStateKinds.js";
import createStatisticsCardStates from "../../../../src/ui/viewmodel/StatisticsPage/Overview/createStatisticsCardStates.js";

const TEXT = Object.freeze({
	sectionLoadingLabel: "Loading",
	sectionEmptyTitle: "No data available",
	developmentEmptyBody: "No development",
	progressEmptyBody: "No progress",
	completedEmptyBody: "No attempts",
	chaptersEmptyBody: "No chapter mastery",
	historyEmptyBody: "No history",
	errorTitle: "Error",
	loadErrorMessage: "Load error"
});

function createStatistics({ completedAttemptCount = 1 }) {
	return {
		completedAttemptCount
	};
}

function createPresentation({ hasDevelopmentEvidence = true, hasProgress = true, hasChapterEvidence = true, historyTotalCount = 1, chartPoints = [{ key: "point" }] }) {
	return {
		development: {
			hasEvidence: hasDevelopmentEvidence,
			chartPoints
		},
		summary: {
			hasProgress
		},
		chapters: {
			hasEvidence: hasChapterEvidence
		},
		history: {
			totalCount: historyTotalCount
		}
	};
}

function createStates({ loadStatus = LOAD_STATUS.READY, statistics = createStatistics({}), presentation = createPresentation({}) } = {}) {
	return createStatisticsCardStates({
		loadStatus,
		statistics,
		presentation,
		text: TEXT
	});
}

function expectAllKinds(states, kind) {
	expect(states.development.kind).toBe(kind);
	expect(states.progress.kind).toBe(kind);
	expect(states.completed.kind).toBe(kind);
	expect(states.chapters.kind).toBe(kind);
	expect(states.history.kind).toBe(kind);
}

describe("statistics card states", () => {
	test("ferskt fag med kapitler og ingen evidens gir EMPTY i alle fem kort", () => {
		const states = createStates({
			statistics: createStatistics({ completedAttemptCount: 0 }),
			presentation: createPresentation({ hasDevelopmentEvidence: false, hasProgress: false, hasChapterEvidence: false, historyTotalCount: 0, chartPoints: [] })
		});

		expectAllKinds(states, WORKSPACE_STATE_KINDS.EMPTY);
	});

	test("læringssti-bruker uten exam_attempts gir CONTENT i development og chapters", () => {
		const states = createStates({
			statistics: createStatistics({ completedAttemptCount: 0 }),
			presentation: createPresentation({ hasDevelopmentEvidence: true, hasProgress: true, hasChapterEvidence: true, historyTotalCount: 0 })
		});

		expect(states.development.kind).toBe(WORKSPACE_STATE_KINDS.CONTENT);
		expect(states.chapters.kind).toBe(WORKSPACE_STATE_KINDS.CONTENT);
		expect(states.completed.kind).toBe(WORKSPACE_STATE_KINDS.EMPTY);
		expect(states.history.kind).toBe(WORKSPACE_STATE_KINDS.EMPTY);
	});

	test("evidens utenfor valgt periode gir development CONTENT", () => {
		const states = createStates({
			presentation: createPresentation({ hasDevelopmentEvidence: true, chartPoints: [] })
		});

		expect(states.development.kind).toBe(WORKSPACE_STATE_KINDS.CONTENT);
	});

	test("LOAD_STATUS.LOADING gir LOADING i alle fem kort", () => {
		const states = createStates({
			loadStatus: LOAD_STATUS.LOADING,
			statistics: null,
			presentation: createPresentation({ hasDevelopmentEvidence: false, hasProgress: false, hasChapterEvidence: false, historyTotalCount: 0, chartPoints: [] })
		});

		expectAllKinds(states, WORKSPACE_STATE_KINDS.LOADING);
	});

	test("historikk er CONTENT når totalCount er større enn null selv om utviklingskortet er tomt", () => {
		const states = createStates({
			presentation: createPresentation({ hasDevelopmentEvidence: false, historyTotalCount: 1 })
		});

		expect(states.development.kind).toBe(WORKSPACE_STATE_KINDS.EMPTY);
		expect(states.history.kind).toBe(WORKSPACE_STATE_KINDS.CONTENT);
	});
});
