// src/ui/viewmodel/StatisticsPage/Overview/createStatisticsOverviewModel.js
import createStatisticsChapterModels from "./createStatisticsChapterModels.js";
import createStatisticsHistoryModel from "./createStatisticsHistoryModel.js";

const EMPTY_ATTEMPT_COUNT = 0;
const EMPTY_ATTEMPTS = Object.freeze([]);
const EMPTY_CHAPTERS = Object.freeze([]);
const EMPTY_DEVELOPMENT_METRICS = Object.freeze({
	windowStartAt: null,
	windowEndAt: null,
	averageScorePercentage: null,
	progressPercentagePoints: null,
	progressAttemptCount: 0,
	chartPoints: Object.freeze([])
});
const CHART_POINT_INDEX_STEP = 1;

export default function createStatisticsOverviewModel({ statistics, period, historySortKey, historySortDirection, historyExpanded, historyPage, formatDate, language, text }) {
	let attempts = EMPTY_ATTEMPTS;
	let chapters = EMPTY_CHAPTERS;
	let completedAttemptCount = EMPTY_ATTEMPT_COUNT;
	let developmentMetrics = EMPTY_DEVELOPMENT_METRICS;

	if (statistics !== null) {
		attempts = statistics.attempts;
		chapters = statistics.chapters;
		completedAttemptCount = statistics.completedAttemptCount;
		developmentMetrics = findDevelopmentPeriod(statistics.developmentPeriods, period);
	}

	const history = createStatisticsHistoryModel({ attempts, sortKey: historySortKey, sortDirection: historySortDirection, expanded: historyExpanded, page: historyPage, formatDate, text });
	const chartPoints = createChartPointModels(developmentMetrics.chartPoints, formatDate, text);
	const chartWindow = createChartWindowModel(developmentMetrics, formatDate, text);
	let historyToggleLabel = text.historyShowAllLabel;
	let progressValue = text.emptyValueLabel;
	let progressNumberValue = text.emptyValueLabel;
	let progressUnitLabel = "";
	let progressAttemptSummaryLabel = "";
	let progressDirection = "neutral";
	let hasProgress = false;

	if (history.expanded) {
		historyToggleLabel = text.historyShowLessLabel;
	}

	if (developmentMetrics.progressPercentagePoints !== null) {
		hasProgress = true;
		progressValue = text.createPercentagePointShortLabel(developmentMetrics.progressPercentagePoints);
		progressNumberValue = text.createPercentagePointNumberLabel(developmentMetrics.progressPercentagePoints);
		progressUnitLabel = text.createPercentagePointUnitLabel(developmentMetrics.progressPercentagePoints);
		progressAttemptSummaryLabel = text.createProgressAttemptSummaryLabel(developmentMetrics.progressAttemptCount);

		if (developmentMetrics.progressPercentagePoints > 0) {
			progressDirection = "up";
		}

		else if (developmentMetrics.progressPercentagePoints < 0) {
			progressDirection = "down";
		}
	}

	return {
		isEmpty: attempts.length === EMPTY_ATTEMPT_COUNT,
		development: {
			title: text.developmentTitle,
			subtitle: text.developmentSubtitle,
			periodLabel: text.periodLabel,
			period,
			periodOptions: text.periodOptions,
			previousPeriodLabel: text.previousPeriodLabel,
			nextPeriodLabel: text.nextPeriodLabel,
			averageScoreLabel: text.averageScoreLabel,
			averageScoreValue: text.createPercentageLabel(developmentMetrics.averageScorePercentage),
			progressLabel: text.progressLabel,
			progressAttemptContextLabel: text.createProgressAttemptContextLabel(developmentMetrics.progressAttemptCount),
			progressValue,
			progressDirection,
			chartLabel: text.chartLabel,
			chartPoints,
			chartAxisStartLabel: chartWindow.startLabel,
			chartAxisEndLabel: chartWindow.endLabel,
			periodRangeLabel: chartWindow.rangeLabel,
			chartEmptyLabel: text.chartEmptyLabel
		},
		summary: {
			ariaLabel: text.summaryLabel,
			completedLabel: text.completedLabel,
			completedValue: String(completedAttemptCount),
			completedUnitLabel: text.completedUnitLabel,
			progressLabel: text.progressLabel,
			progressNumberValue,
			progressUnitLabel,
			progressAttemptSummaryLabel,
			hasProgress,
			progressDirection
		},
		chapters: {
			title: text.chaptersTitle,
			subtitle: text.chaptersSubtitle,
			carouselLabel: text.chaptersCarouselLabel,
			previousLabel: text.chaptersPreviousLabel,
			nextLabel: text.chaptersNextLabel,
			showAllLabel: text.chaptersShowAllLabel,
			showLessLabel: text.chaptersShowLessLabel,
			items: createStatisticsChapterModels({ chapters, language, text })
		},
		history: {
			...history,
			title: text.historyTitle,
			subtitle: text.historySubtitle,
			dateLabel: text.historyDateLabel,
			nameLabel: text.historyNameLabel,
			statusLabel: text.historyStatusLabel,
			scoreLabel: text.historyScoreLabel,
			detailsLabel: text.historyDetailsLabel,
			toggleLabel: historyToggleLabel,
			pagerLabel: text.historyPagerLabel,
			previousPageLabel: text.historyPreviousPageLabel,
			nextPageLabel: text.historyNextPageLabel,
			createGoToPageLabel: text.createGoToHistoryPageLabel,
			createPageCounterLabel: text.createHistoryPageCounterLabel
		}
	};
}

function findDevelopmentPeriod(developmentPeriods, selectedPeriod) {
	for (const developmentPeriod of developmentPeriods) {
		if (developmentPeriod.period === selectedPeriod) {
			return developmentPeriod;
		}
	}

	throw new Error(`Missing Statistics development period ${String(selectedPeriod)}`);
}

function createChartPointModels(chartPoints, formatDate, text) {
	const lastIndex = chartPoints.length - CHART_POINT_INDEX_STEP;

	return chartPoints.map((chartPoint, index) => {
		const label = formatStatisticsDate(chartPoint.submittedAt, formatDate);

		return {
			key: chartPoint.attemptId,
			value: chartPoint.percentage,
			label,
			valueLabel: text.createPercentageLabel(chartPoint.percentage),
			isLatest: index === lastIndex
		};
	});
}

function createChartWindowModel(developmentMetrics, formatDate, text) {
	if (developmentMetrics.windowEndAt === null) {
		return { startLabel: "", endLabel: "", rangeLabel: "" };
	}

	const endLabel = formatStatisticsDate(developmentMetrics.windowEndAt, formatDate);

	if (developmentMetrics.windowStartAt === null) {
		return { startLabel: "", endLabel, rangeLabel: endLabel };
	}

	const startLabel = formatStatisticsDate(developmentMetrics.windowStartAt, formatDate);

	if (startLabel === endLabel) {
		return { startLabel, endLabel: "", rangeLabel: startLabel };
	}

	return {
		startLabel,
		endLabel,
		rangeLabel: text.createPeriodRangeLabel(startLabel, endLabel)
	};
}

function formatStatisticsDate(timestamp, formatDate) {
	const label = formatDate(timestamp);

	if (label === null || label === undefined) {
		return timestamp;
	}

	return label;
}
