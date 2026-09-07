// src/constants/StatisticsContracts.js
export const STATISTICS_PERIODS = Object.freeze({
	WEEK: "1w",
	MONTH: "1m",
	THREE_MONTHS: "3m",
	SIX_MONTHS: "6m",
	YEAR: "1y",
	ALL: "all"
});

export const DEFAULT_STATISTICS_PERIOD = STATISTICS_PERIODS.WEEK;

export const STATISTICS_MASTERY_SCOPE_KINDS = Object.freeze({
	SUBJECT: "subject",
	TOPIC_AREA: "topic-area"
});

export const DEFAULT_STATISTICS_MASTERY_SCOPE = Object.freeze({
	kind: STATISTICS_MASTERY_SCOPE_KINDS.SUBJECT,
	topicAreaKey: null
});

export const STATISTICS_HISTORY_SORT = Object.freeze({
	DATE: "date",
	NAME: "name",
	STATUS: "status",
	SCORE: "score"
});

export const SORT_DIRECTION = Object.freeze({
	ASC: "asc",
	DESC: "desc"
});
