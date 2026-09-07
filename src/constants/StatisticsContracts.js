// src/constants/StatisticsContracts.js
export const STATISTICS_PERIODS = Object.freeze({
	WEEK: "1w",
	MONTH: "1m",
	THREE_MONTHS: "3m",
	SIX_MONTHS: "6m",
	YEAR: "1y",
	ALL: "all"
});

export const DEFAULT_STATISTICS_PERIOD = STATISTICS_PERIODS.THREE_MONTHS;

export const STATISTICS_HISTORY_SORT = Object.freeze({
	DATE: "date",
	NAME: "name",
	SCORE: "score"
});

export const SORT_DIRECTION = Object.freeze({
	ASC: "asc",
	DESC: "desc"
});
