// src/ui/viewmodel/StatisticsPage/Overview/createStatisticsOverviewModel.js
import createStatisticsChapterModels from "./createStatisticsChapterModels.js";
import createStatisticsDevelopmentModel from "./createStatisticsDevelopmentModel.js";
import createStatisticsHistoryModel from "./createStatisticsHistoryModel.js";

const EMPTY_ATTEMPT_COUNT = 0;
const EMPTY_STATISTICS = Object.freeze({
	attempts: Object.freeze([]),
	chapters: Object.freeze([])
});

export default function createStatisticsOverviewModel({ statistics, period, historySortKey, historySortDirection, historyExpanded, historyPage, nowEpochMs, formatDate, language, text }) {
	const source = statistics ?? EMPTY_STATISTICS;
	const developmentMetrics = createStatisticsDevelopmentModel({
		attempts: source.attempts,
		period,
		nowEpochMs,
		formatDate
	});
	const history = createStatisticsHistoryModel({
		attempts: source.attempts,
		sortKey: historySortKey,
		sortDirection: historySortDirection,
		expanded: historyExpanded,
		page: historyPage,
		formatDate,
		text
	});

	return {
		isEmpty: source.attempts.length === EMPTY_ATTEMPT_COUNT,
		development: {
			title: text.developmentTitle,
			subtitle: text.developmentSubtitle,
			periodLabel: text.periodLabel,
			period,
			periodOptions: text.periodOptions,
			averageScoreLabel: text.averageScoreLabel,
			averageScoreValue: text.createPercentageLabel(developmentMetrics.averageScorePercentage),
			progressLabel: text.progressLabel,
			progressValue: developmentMetrics.progressPercentagePoints === null
				? null
				: text.createPercentagePointLabel(developmentMetrics.progressPercentagePoints),
			chartLabel: text.chartLabel,
			chartPoints: developmentMetrics.chartPoints.map((point) => ({
				...point,
				valueLabel: text.createPercentageLabel(point.value)
			})),
			chartEmptyLabel: text.chartEmptyLabel
		},
		summary: {
			ariaLabel: text.summaryLabel,
			completedLabel: text.completedLabel,
			completedValue: String(source.attempts.length),
			progressLabel: text.progressLabel,
			progressValue: developmentMetrics.progressPercentagePoints === null
				? null
				: text.createPercentagePointLabel(developmentMetrics.progressPercentagePoints)
		},
		chapters: {
			title: text.chaptersTitle,
			subtitle: text.chaptersSubtitle,
			items: createStatisticsChapterModels({ chapters: source.chapters, language, text })
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
