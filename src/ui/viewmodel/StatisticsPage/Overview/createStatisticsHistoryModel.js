// src/ui/viewmodel/StatisticsPage/Overview/createStatisticsHistoryModel.js
import { createStatisticsHistoryComparator } from "./statisticsHistoryComparators.js";

const FIRST_HISTORY_PAGE_INDEX = 0;
const FIRST_HISTORY_ITEM_OFFSET = 0;
const HISTORY_PAGE_INDEX_STEP = 1;
const MINIMUM_HISTORY_PAGE_COUNT = 1;
const STATISTICS_HISTORY_COLLAPSED_ITEM_COUNT = 3;
const STATISTICS_HISTORY_EXPANDED_PAGE_SIZE = 10;

export default function createStatisticsHistoryModel({ attempts, sortKey, sortDirection, expanded, page, formatDate, text }) {
	const sortedAttempts = [...attempts];
	sortedAttempts.sort(createStatisticsHistoryComparator({ sortKey, sortDirection }));

	const pageCount = expanded
		? Math.max(MINIMUM_HISTORY_PAGE_COUNT, Math.ceil(sortedAttempts.length / STATISTICS_HISTORY_EXPANDED_PAGE_SIZE))
		: MINIMUM_HISTORY_PAGE_COUNT;
	const safePage = Math.min(Math.max(page, FIRST_HISTORY_PAGE_INDEX), pageCount - HISTORY_PAGE_INDEX_STEP);
	const start = expanded
		? safePage * STATISTICS_HISTORY_EXPANDED_PAGE_SIZE
		: FIRST_HISTORY_ITEM_OFFSET;
	const count = expanded
		? STATISTICS_HISTORY_EXPANDED_PAGE_SIZE
		: STATISTICS_HISTORY_COLLAPSED_ITEM_COUNT;
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
	return {
		attemptId: attempt.attemptId,
		title: attempt.title,
		submittedAtLabel: formatDate(attempt.submittedAt) ?? attempt.submittedAt,
		scoreLabel: text.createPercentageLabel(attempt.percentage),
		performanceBand: attempt.performanceBand,
		pointsLabel: text.createPointsLabel(attempt.scorePoints, attempt.totalPoints),
		correctLabel: text.createCorrectCountLabel(attempt.correctCount),
		incorrectLabel: text.createIncorrectCountLabel(attempt.incorrectCount),
		durationLabel: text.createDurationSecondsLabel(attempt.durationSeconds)
	};
}
