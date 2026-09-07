// src/ui/viewmodel/StatisticsPage/Overview/statisticsHistoryComparators.js
import { SORT_DIRECTION, STATISTICS_HISTORY_SORT } from "../../../../constants/StatisticsContracts.js";

const TITLE_COLLATOR = new Intl.Collator("nb");
const SORT_ORDER_BEFORE = -1;
const SORT_ORDER_EQUAL = 0;
const SORT_ORDER_AFTER = 1;
const SORT_DIRECTION_ASCENDING = 1;
const SORT_DIRECTION_DESCENDING = -1;

export function createStatisticsHistoryComparator({ sortKey, sortDirection }) {
	const direction = sortDirection === SORT_DIRECTION.ASC
		? SORT_DIRECTION_ASCENDING
		: SORT_DIRECTION_DESCENDING;

	return (left, right) => {
		const primary = comparePrimaryHistoryValue({ left, right, sortKey, direction });

		if (primary !== SORT_ORDER_EQUAL) {
			return primary;
		}

		const submittedAtDifference = right.submittedAtEpochMs - left.submittedAtEpochMs;

		if (submittedAtDifference !== SORT_ORDER_EQUAL) {
			return submittedAtDifference;
		}

		return compareAttemptIds(left.attemptId, right.attemptId);
	};
}

function comparePrimaryHistoryValue({ left, right, sortKey, direction }) {
	if (sortKey === STATISTICS_HISTORY_SORT.SCORE) {
		return compareNullablePercentage(left.percentage, right.percentage, direction);
	}

	if (sortKey === STATISTICS_HISTORY_SORT.NAME) {
		return TITLE_COLLATOR.compare(left.title, right.title) * direction;
	}

	return (left.submittedAtEpochMs - right.submittedAtEpochMs) * direction;
}

function compareNullablePercentage(leftPercentage, rightPercentage, direction) {
	const leftIsNull = leftPercentage === null;
	const rightIsNull = rightPercentage === null;

	if (leftIsNull && rightIsNull) {
		return SORT_ORDER_EQUAL;
	}

	// Null betyr "umålbar" og skal alltid ligge sist, uavhengig av ASC/DESC.
	// Derfor skal disse returverdiene bevisst IKKE multipliseres med direction.
	if (leftIsNull) {
		return SORT_ORDER_AFTER;
	}

	if (rightIsNull) {
		return SORT_ORDER_BEFORE;
	}

	return (leftPercentage - rightPercentage) * direction;
}

function compareAttemptIds(leftAttemptId, rightAttemptId) {
	if (leftAttemptId < rightAttemptId) {
		return SORT_ORDER_BEFORE;
	}

	if (leftAttemptId > rightAttemptId) {
		return SORT_ORDER_AFTER;
	}

	return SORT_ORDER_EQUAL;
}
