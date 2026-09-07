// src/ui/viewmodel/StatisticsPage/Overview/createStatisticsOverviewModel.js
import createStatisticsChapterModels from "./createStatisticsChapterModels.js";
import createStatisticsHistoryModel from "./createStatisticsHistoryModel.js";

const EMPTY_ATTEMPT_COUNT = 0;
const EMPTY_ATTEMPTS = Object.freeze([]);
const EMPTY_CHAPTERS = Object.freeze([]);
const EMPTY_DEVELOPMENT_METRICS = Object.freeze({
	averageScorePercentage: null,
	progressPercentagePoints: null,
	chartPoints: Object.freeze([])
});

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
	let progressValue = null;

	if (developmentMetrics.progressPercentagePoints !== null) {
		progressValue = text.createPercentagePointLabel(developmentMetrics.progressPercentagePoints);
	}

	return {
		isEmpty: attempts.length === EMPTY_ATTEMPT_COUNT,
		development: {
			title: text.developmentTitle,
			subtitle: text.developmentSubtitle,
			periodLabel: text.periodLabel,
			period,
			periodOptions: text.periodOptions,
			averageScoreLabel: text.averageScoreLabel,
			averageScoreValue: text.createPercentageLabel(developmentMetrics.averageScorePercentage),
			progressLabel: text.progressLabel,
			progressValue,
			chartLabel: text.chartLabel,
			chartPoints,
			chartEmptyLabel: text.chartEmptyLabel
		},
		summary: {
			ariaLabel: text.summaryLabel,
			completedLabel: text.completedLabel,
			completedValue: String(completedAttemptCount),
			progressLabel: text.progressLabel,
			progressValue
		},
		chapters: {
			title: text.chaptersTitle,
			subtitle: text.chaptersSubtitle,
			items: createStatisticsChapterModels({ chapters, language, text })
		},
		history: {
			...history,
			title: text.historyTitle,
			subtitle: text.historySubtitle,
			dateLabel: text.historyDateLabel,
			nameLabel: text.historyNameLabel,
			scoreLabel: text.historyScoreLabel,
			toggleLabel: history.expanded ? text.historyShowLessLabel : text.historyShowAllLabel,
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
	return chartPoints.map((chartPoint) => {
		let label = formatDate(chartPoint.submittedAt);

		if (label === null || label === undefined) {
			label = chartPoint.submittedAt;
		}

		return {
			key: chartPoint.attemptId,
			value: chartPoint.percentage,
			label,
			valueLabel: text.createPercentageLabel(chartPoint.percentage)
		};
	});
}
