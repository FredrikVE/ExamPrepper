// src/ui/viewmodel/StatisticsPage/Overview/createStatisticsDevelopmentModel.js
import { STATISTICS_PERIODS } from "../../../../constants/StatisticsContracts.js";

const FIRST_ARRAY_INDEX = 0;
const ARRAY_LAST_INDEX_OFFSET = 1;
const ARRAY_INDEX_STEP = 1;
const EMPTY_SCORE_SUM = 0;
const EMPTY_ATTEMPT_COUNT = 0;
const WEEK_DAY_COUNT = 7;
const MONTH_OFFSET = 1;
const THREE_MONTH_OFFSET = 3;
const SIX_MONTH_OFFSET = 6;
const YEAR_OFFSET = 1;

export default function createStatisticsDevelopmentModel({ attempts, period, nowEpochMs, formatDate }) {
	const cutoffEpochMs = resolvePeriodCutoff(period, nowEpochMs);
	const chronologicalAttempts = [];

	// Backend leverer newest-first. Iterer baklengs slik at chart-data blir oldest-first
	// uten filter/slice/reverse-kjede og uten unødvendige mellomarrayer.
	for (let index = attempts.length - ARRAY_LAST_INDEX_OFFSET; index >= FIRST_ARRAY_INDEX; index -= ARRAY_INDEX_STEP) {
		const attempt = attempts[index];

		if (attempt.percentage === null) {
			continue;
		}

		if (cutoffEpochMs !== null && attempt.submittedAtEpochMs < cutoffEpochMs) {
			continue;
		}

		chronologicalAttempts.push(attempt);
	}

	let scoreSum = EMPTY_SCORE_SUM;

	for (const attempt of chronologicalAttempts) {
		scoreSum += attempt.percentage;
	}

	const averageScorePercentage = chronologicalAttempts.length === EMPTY_ATTEMPT_COUNT
		? null
		: scoreSum / chronologicalAttempts.length;

	return {
		averageScorePercentage,

		// O-D4 er ikke eksplisitt låst ennå. Fremgang skal derfor ikke vises i v1-modellen.
		progressPercentagePoints: null,

		chartPoints: chronologicalAttempts.map((attempt) => ({
			key: attempt.attemptId,
			value: attempt.percentage,
			label: formatDate(attempt.submittedAt) ?? attempt.submittedAt
		}))
	};
}

function resolvePeriodCutoff(period, nowEpochMs) {
	if (period === STATISTICS_PERIODS.ALL) {
		return null;
	}

	const cutoffDate = new Date(nowEpochMs);

	if (period === STATISTICS_PERIODS.WEEK) {
		cutoffDate.setDate(cutoffDate.getDate() - WEEK_DAY_COUNT);
		return cutoffDate.getTime();
	}

	if (period === STATISTICS_PERIODS.MONTH) {
		cutoffDate.setMonth(cutoffDate.getMonth() - MONTH_OFFSET);
		return cutoffDate.getTime();
	}

	if (period === STATISTICS_PERIODS.THREE_MONTHS) {
		cutoffDate.setMonth(cutoffDate.getMonth() - THREE_MONTH_OFFSET);
		return cutoffDate.getTime();
	}

	if (period === STATISTICS_PERIODS.SIX_MONTHS) {
		cutoffDate.setMonth(cutoffDate.getMonth() - SIX_MONTH_OFFSET);
		return cutoffDate.getTime();
	}

	if (period === STATISTICS_PERIODS.YEAR) {
		cutoffDate.setFullYear(cutoffDate.getFullYear() - YEAR_OFFSET);
		return cutoffDate.getTime();
	}

	throw new Error(`Unknown statistics period: ${String(period)}`);
}
