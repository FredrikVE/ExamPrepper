// test/ui/view/components/StatisticsPage/statisticsCardStatesView.test.js
import { afterAll, beforeAll, describe, expect, test } from "@jest/globals";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { SORT_DIRECTION, STATISTICS_CHART_LAYOUT_MODES, STATISTICS_HISTORY_SORT, STATISTICS_PERIODS } from "../../../../../src/constants/StatisticsContracts.js";
import { WORKSPACE_STATE_KINDS } from "../../../../../src/ui/viewmodel/WorkspaceState/workspaceStateKinds.js";
import { closeJsxModuleLoader, loadJsxModule } from "../../../../helpers/loadJsxModule.js";

const EMPTY_STATE = Object.freeze({ kind: WORKSPACE_STATE_KINDS.EMPTY, title: "No data available", body: "No data yet", action: null });
const CONTENT_STATE = Object.freeze({ kind: WORKSPACE_STATE_KINDS.CONTENT });

let StatisticsDevelopmentCard = null;
let StatisticsOverview = null;
let StatisticsSummaryCards = null;

beforeAll(async () => {
	const developmentModule = await loadJsxModule("/src/ui/view/components/StatisticsPage/Overview/Development/Cards/StatisticsDevelopmentCard.jsx");
	const overviewModule = await loadJsxModule("/src/ui/view/components/StatisticsPage/Overview/StatisticsOverview.jsx");
	const summaryModule = await loadJsxModule("/src/ui/view/components/StatisticsPage/Overview/Summary/StatisticsSummaryCards.jsx");
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
		masteryLabel: "Today's best",
		masteryValue: "0 %",
		averageLabel: "Average",
		averageValue: "0 %",
		chartLabel: "Mastery chart",
		chartPoints: [],
		chartAxisTicks: [],
		chartLayoutMode: STATISTICS_CHART_LAYOUT_MODES.TIME,
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

	test("utviklingsgrafen bruker tidsposisjonen fra presentasjonsmodellen og rendrer hoverdetaljer", () => {
		const model = createDevelopmentModel();
		model.chartPoints = [
			{
				key: "history",
				label: "Onsdag 09:00",
				value: 44,
				valueLabel: "44 %",
				positionPercent: 0,
				isLatest: false
			},
			{
				key: "today",
				label: "Torsdag 15:00",
				value: 89,
				valueLabel: "89 %",
				positionPercent: 50,
				isLatest: true
			}
		];
		model.chartAxisTicks = [
			{ key: "wed", label: "ons", positionPercent: 0 },
			{ key: "thu", label: "tor", positionPercent: 25 },
			{ key: "fri", label: "fre", positionPercent: 50 },
			{ key: "sat", label: "lør", positionPercent: 75 },
			{ key: "sun", label: "søn", positionPercent: 100 }
		];

		const html = renderToStaticMarkup(createElement(StatisticsDevelopmentCard, {
			model,
			state: CONTENT_STATE,
			onSelectPeriod: () => {}
		}));

		expect(html).toContain('tabindex="0"');
		expect(html).toContain('data-latest="false"');
		expect(html).toContain('data-latest="true"');
		expect(html).toContain("--statistics-score-chart-position:50");
		expect(html).toContain('aria-label="Onsdag 09:00, 44 %"');
		expect(html).toContain('aria-label="Torsdag 15:00, 89 %"');
		expect(html).not.toContain('class="statistics-score-chart-tooltip"');
		expect(html).toContain(">ons</span>");
		expect(html).toContain(">tor</span>");
		expect(html).toContain(">fre</span>");
		expect(html).toContain(">lør</span>");
		expect(html).toContain(">søn</span>");
	});

	test("compact-grafen pakker datapunkter i faste slots fra venstre", () => {
		const model = createDevelopmentModel();
		model.chartLayoutMode = STATISTICS_CHART_LAYOUT_MODES.COMPACT;
		model.chartPoints = [
			{ key: "mon", label: "Mandag", value: 10, valueLabel: "10 %", positionPercent: 0, isLatest: false },
			{ key: "wed", label: "Onsdag", value: 90, valueLabel: "90 %", positionPercent: 50, isLatest: false },
			{ key: "thu", label: "Torsdag", value: 100, valueLabel: "100 %", positionPercent: 100, isLatest: true }
		];
		model.chartAxisTicks = [
			{ key: "mon", label: "man", positionPercent: 0 },
			{ key: "wed", label: "ons", positionPercent: 50 },
			{ key: "thu", label: "tor", positionPercent: 100 }
		];

		const html = renderToStaticMarkup(createElement(StatisticsDevelopmentCard, {
			model,
			state: CONTENT_STATE,
			onSelectPeriod: () => {}
		}));

		expect(html).toContain('data-layout-mode="compact"');
		expect(html).toContain('--statistics-score-chart-slot-left:0px');
		expect(html).toContain('--statistics-score-chart-slot-left:52px');
		expect(html).toContain('--statistics-score-chart-slot-left:104px');
	});

	test("Alt-grafen rendrer sekvenslayout med scrollbar-vennlig innholdsbredde", () => {
		const model = createDevelopmentModel();
		model.period = STATISTICS_PERIODS.ALL;
		model.chartLayoutMode = STATISTICS_CHART_LAYOUT_MODES.SEQUENCE;
		model.chartPoints = [
			{
				key: "all-a",
				label: "2026-09-07",
				value: 10,
				valueLabel: "10 %",
				positionPercent: 0,
				isLatest: false
			},
			{
				key: "all-b",
				label: "2026-09-09",
				value: 90,
				valueLabel: "90 %",
				positionPercent: 50,
				isLatest: false
			},
			{
				key: "all-c",
				label: "2026-09-10",
				value: 100,
				valueLabel: "100 %",
				positionPercent: 100,
				isLatest: true
			}
		];
		model.chartAxisTicks = [
			{ key: "all-a", label: "2026-09-07", positionPercent: 0 },
			{ key: "all-b", label: "2026-09-09", positionPercent: 50 },
			{ key: "all-c", label: "2026-09-10", positionPercent: 100 }
		];

		const html = renderToStaticMarkup(createElement(StatisticsDevelopmentCard, {
			model,
			state: CONTENT_STATE,
			onSelectPeriod: () => {}
		}));

		expect(html).toContain('data-layout-mode="sequence"');
		expect(html).toContain('--statistics-score-chart-sequence-content-width:142px');
		expect(html).toContain('--statistics-score-chart-slot-left:52px');
		expect(html).toContain('--statistics-score-chart-slot-left:104px');
		expect(html).toContain('>2026-09-07</span>');
		expect(html).toContain('>2026-09-09</span>');
		expect(html).toContain('>2026-09-10</span>');
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
