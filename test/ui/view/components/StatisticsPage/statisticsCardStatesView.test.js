// test/ui/view/components/StatisticsPage/statisticsCardStatesView.test.js
import { afterAll, beforeAll, describe, expect, test } from "@jest/globals";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { SORT_DIRECTION, STATISTICS_HISTORY_SORT, STATISTICS_PERIODS } from "../../../../../src/constants/StatisticsContracts.js";
import { WORKSPACE_STATE_KINDS } from "../../../../../src/ui/viewmodel/WorkspaceState/workspaceStateKinds.js";
import { closeJsxModuleLoader, loadJsxModule } from "../../../../helpers/loadJsxModule.js";

const EMPTY_STATE = Object.freeze({ kind: WORKSPACE_STATE_KINDS.EMPTY, title: "No data available", body: "No data yet", action: null });
const CONTENT_STATE = Object.freeze({ kind: WORKSPACE_STATE_KINDS.CONTENT });

let StatisticsDevelopmentCard = null;
let StatisticsOverview = null;
let StatisticsSummaryCards = null;

beforeAll(async () => {
	const developmentModule = await loadJsxModule("/src/ui/view/components/StatisticsPage/Overview/StatisticsDevelopmentCard.jsx");
	const overviewModule = await loadJsxModule("/src/ui/view/components/StatisticsPage/Overview/StatisticsOverview.jsx");
	const summaryModule = await loadJsxModule("/src/ui/view/components/StatisticsPage/Overview/StatisticsSummaryCards.jsx");
	StatisticsDevelopmentCard = developmentModule.default;
	StatisticsOverview = overviewModule.default;
	StatisticsSummaryCards = summaryModule.default;
});

afterAll(async () => {
	await closeJsxModuleLoader();
});

function createDevelopmentModel() {
	return {
		title: "Mastery development",
		subtitle: "Development subtitle",
		periodLabel: "Period",
		period: STATISTICS_PERIODS.WEEK,
		periodOptions: [
			{ key: STATISTICS_PERIODS.WEEK, label: "1 week" },
			{ key: STATISTICS_PERIODS.ALL, label: "All" }
		],
		previousPeriodLabel: "Previous",
		nextPeriodLabel: "Next",
		masteryLabel: "Overall mastery",
		masteryValue: "0 %",
		chartLabel: "Mastery chart",
		chartPoints: [],
		chartAxisStartLabel: "",
		chartAxisEndLabel: "",
		periodRangeLabel: "This week",
		chartEmptyLabel: "No mastery activity in this period."
	};
}

function createSummaryModel() {
	return {
		ariaLabel: "Statistics summary",
		completedLabel: "Completed",
		completedValue: "0",
		completedUnitLabel: "attempts",
		progressLabel: "Progress",
		progressNumberValue: "0 %",
		progressUnitLabel: "percentage points",
		progressAttemptSummaryLabel: "Last 0 attempts",
		progressDirection: "neutral"
	};
}

function createOverviewModel() {
	return {
		development: createDevelopmentModel(),
		summary: createSummaryModel(),
		chapters: {
			title: "Chapter overview",
			subtitle: "Chapter subtitle",
			carouselLabel: "Chapters",
			previousLabel: "Previous chapters",
			nextLabel: "Next chapters",
			showAllLabel: "Show all chapters",
			showLessLabel: "Show fewer chapters",
			items: []
		},
		history: {
			title: "History",
			subtitle: "History subtitle",
			dateLabel: "Date",
			nameLabel: "Attempt",
			statusLabel: "Status",
			scoreLabel: "Result",
			detailsLabel: "Details",
			items: [],
			expanded: false,
			page: 0,
			pageCount: 1,
			sortKey: STATISTICS_HISTORY_SORT.DATE,
			sortDirection: SORT_DIRECTION.DESC,
			showExpansionToggle: false,
			canToggleExpanded: false,
			toggleLabel: "Show all",
			pagerLabel: "History pages",
			previousPageLabel: "Previous page",
			nextPageLabel: "Next page",
			createGoToPageLabel: (page) => `Go to ${page}`,
			createPageCounterLabel: (page, count) => `${page}/${count}`
		}
	};
}

const ACTIONS = Object.freeze({
	selectPeriod: () => {},
	selectMasteryScope: () => {},
	changeHistorySort: () => {},
	toggleHistoryExpanded: () => {},
	selectHistoryPage: () => {},
	goToPreviousHistoryPage: () => {},
	goToNextHistoryPage: () => {}
});

describe("Statistics card state rendering", () => {
	test("ferskt fag rendrer fem tommeldinger og ingen 0 prosent-verdi", () => {
		const html = renderToStaticMarkup(createElement(StatisticsOverview, {
			model: createOverviewModel(),
			cardStates: {
				development: EMPTY_STATE,
				progress: EMPTY_STATE,
				completed: EMPTY_STATE,
				chapters: EMPTY_STATE,
				history: EMPTY_STATE
			},
			actions: ACTIONS
		}));

		expect(html.match(/No data available/g)).toHaveLength(5);
		expect(html).not.toContain("0 %");
	});

	test("tom valgt periode beholder periodevelger og aria-controls-målet", () => {
		const html = renderToStaticMarkup(createElement(StatisticsDevelopmentCard, {
			model: createDevelopmentModel(),
			state: CONTENT_STATE,
			onSelectPeriod: () => {}
		}));

		expect(html).toContain('id="statistics-development-chart"');
		expect(html).toContain('aria-controls="statistics-development-chart"');
		expect(html).toContain("1 week");
		expect(html).toContain("No mastery activity in this period.");
	});

	test("summary-kortene er skillbare i EMPTY via aria-label", () => {
		const html = renderToStaticMarkup(createElement(StatisticsSummaryCards, {
			model: createSummaryModel(),
			progressState: EMPTY_STATE,
			completedState: EMPTY_STATE
		}));

		expect(html).toContain('aria-label="Progress"');
		expect(html).toContain('aria-label="Completed"');
	});
});
