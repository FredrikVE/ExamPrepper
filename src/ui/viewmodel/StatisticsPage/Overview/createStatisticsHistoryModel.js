// src/ui/viewmodel/StatisticsPage/Overview/createStatisticsHistoryModel.js
import { createStatisticsHistoryComparator } from "./statisticsHistoryComparators.js";
import createStatisticsPerformancePresentation from "./createStatisticsPerformancePresentation.js";

const FIRST_HISTORY_PAGE_INDEX = 0;
const FIRST_HISTORY_ITEM_OFFSET = 0;
const HISTORY_PAGE_INDEX_STEP = 1;
const MINIMUM_HISTORY_PAGE_COUNT = 1;
const STATISTICS_HISTORY_COLLAPSED_ITEM_COUNT = 3;
const STATISTICS_HISTORY_EXPANDED_PAGE_SIZE = 10;

export default function createStatisticsHistoryModel({ attempts, sortKey, sortDirection, expanded, page, formatDate, text }) {
	const sortedAttempts = [...attempts];
	sortedAttempts.sort(createStatisticsHistoryComparator({ sortKey, sortDirection }));

	let pageCount = MINIMUM_HISTORY_PAGE_COUNT;

	if (expanded) {
		pageCount = Math.max(MINIMUM_HISTORY_PAGE_COUNT, Math.ceil(sortedAttempts.length / STATISTICS_HISTORY_EXPANDED_PAGE_SIZE));
	}

	const safePage = Math.min(Math.max(page, FIRST_HISTORY_PAGE_INDEX), pageCount - HISTORY_PAGE_INDEX_STEP);
	let start = FIRST_HISTORY_ITEM_OFFSET;
	let count = STATISTICS_HISTORY_COLLAPSED_ITEM_COUNT;

	if (expanded) {
		start = safePage * STATISTICS_HISTORY_EXPANDED_PAGE_SIZE;
		count = STATISTICS_HISTORY_EXPANDED_PAGE_SIZE;
	}

	const visible = sortedAttempts.slice(start, start + count);

	return {
		items: visible.map((attempt) => createHistoryRowModel(attempt, formatDate, text)),
		totalCount: sortedAttempts.length,
		expanded,
		page: safePage,
		pageCount,
		sortKey,
		sortDirection,
		canToggleExpanded: sortedAttempts.length > STATISTICS_HISTORY_COLLAPSED_ITEM_COUNT
	};
}

function createHistoryRowModel(attempt, formatDate, text) {
	const performance = createStatisticsPerformancePresentation({ performanceBand: attempt.performanceBand, text });
	let submittedAtLabel = formatDate(attempt.submittedAt);

	if (submittedAtLabel === null || submittedAtLabel === undefined) {
		submittedAtLabel = attempt.submittedAt;
	}

	const scoreLabel = text.createPercentageLabel(attempt.percentage);
	const pointsLabel = text.createPointsLabel(attempt.scorePoints, attempt.totalPoints);
	const correctLabel = text.createCorrectCountLabel(attempt.correctCount);
	const incorrectLabel = text.createIncorrectCountLabel(attempt.incorrectCount);
	const durationLabel = text.createDurationSecondsLabel(attempt.durationSeconds);

	return {
		attemptId: attempt.attemptId,
		title: attempt.title,
		submittedAtLabel,
		scoreLabel,
		performanceBand: attempt.performanceBand,
		statusTone: performance.tone,
		statusLabel: performance.label,
		showDetailsLabel: text.historyShowDetailsLabel,
		hideDetailsLabel: text.historyHideDetailsLabel,
		detailMetrics: [
			{ key: "score", label: text.historyScoreLabel, value: scoreLabel },
			{ key: "points", label: text.historyPointsLabel, value: pointsLabel },
			{ key: "correct", label: text.historyCorrectAnswersLabel, value: correctLabel },
			{ key: "incorrect", label: text.historyIncorrectAnswersLabel, value: incorrectLabel },
			{ key: "duration", label: text.historyTimeUsedLabel, value: durationLabel }
		]
	};
}
