// src/ui/viewmodel/Utils/statisticsDashboardModel.js
import createStatisticsCopy from "./statisticsCopy.js";

const EMPTY_LABEL = "—";
const PERCENTAGE_SUFFIX = " %";
const RECENT_ATTEMPT_LIMIT = 3;
const TREND_POINT_LIMIT = 5;

const LOCALES = {
	no: "nb-NO",
	en: "en-GB"
};

export default function createStatisticsDashboardModel(attemptsResult, language = "no", t = {}) {
	const copy = createStatisticsCopy(language, t);
	const attempts = normalizeAttempts(attemptsResult, language, copy);
	const attemptsByOldestFirst = [...attempts].sort(compareAttemptOldestFirst);
	const attemptsByNewestFirst = [...attempts].sort(compareAttemptNewestFirst);
	const percentageAttempts = attempts.filter((attempt) => attempt.percentage !== null);
	const attemptsCount = attempts.length;
	const correctAnswerCount = sum(attempts.map((attempt) => attempt.correctAnswerCount));
	const answeredQuestionCount = sum(attempts.map((attempt) => attempt.answeredQuestionCount));
	const totalScorePoints = sum(attempts.map((attempt) => attempt.scorePoints));
	const totalMaxPoints = sum(attempts.map((attempt) => attempt.totalPoints));
	const uniqueExamCount = countUniqueExamIds(attempts);
	const averagePercentage = getAveragePercentage(percentageAttempts);
	const bestAttempt = getBestAttempt(percentageAttempts);
	const firstAttemptWithPercentage = attemptsByOldestFirst.find((attempt) => attempt.percentage !== null) ?? null;
	const latestAttemptWithPercentage = attemptsByNewestFirst.find((attempt) => attempt.percentage !== null) ?? null;
	const improvementSinceFirst = getImprovementSinceFirst(firstAttemptWithPercentage, latestAttemptWithPercentage);

	return {
		statisticsAttempts: attempts,
		isStatisticsEmpty: attemptsCount === 0,
		hero: buildHero({ attemptsCount, averagePercentage, improvementSinceFirst, copy }),
		kpiCards: buildKpiCards({
			attemptsCount,
			averagePercentage,
			bestAttempt,
			correctAnswerCount,
			answeredQuestionCount,
			uniqueExamCount,
			copy
		}),
		scoreTrendChart: buildScoreTrendChart(attemptsByOldestFirst, copy),
		recentAttempts: attemptsByNewestFirst.slice(0, RECENT_ATTEMPT_LIMIT),
		recentAttemptsTitle: copy.recentAttemptsTitle,
		recentAttemptsSubtitle: copy.createRecentAttemptsSubtitle(attemptsByNewestFirst.slice(0, RECENT_ATTEMPT_LIMIT).length),
		totals: {
			attemptsCount,
			correctAnswerCount,
			answeredQuestionCount,
			totalScorePoints,
			totalMaxPoints,
			uniqueExamCount,
			averagePercentage
		}
	};
}

function normalizeAttempts(attemptsResult, language, copy) {
	const attempts = Array.isArray(attemptsResult)
		? attemptsResult
		: attemptsResult?.attempts;

	if (!Array.isArray(attempts)) {
		return [];
	}

	return attempts
		.filter(Boolean)
		.map((attempt, index) => normalizeAttempt(attempt, index, language, copy));
}

function normalizeAttempt(attempt, index, language, copy) {
	const scorePoints = normalizeNumber(attempt.scorePoints);
	const totalPoints = normalizeNumber(attempt.totalPoints);
	const percentage = normalizePercentage(attempt.percentage, scorePoints, totalPoints);
	const submittedAtTimestamp = getTimestamp(attempt.submittedAt);
	const results = Array.isArray(attempt.results) ? attempt.results : [];
	const correctAnswerCount = results.filter((result) => result?.isCorrect === true).length;
	const dateLabel = formatDateLabel(attempt.submittedAt, language);
	const examId = attempt.examId ?? "";

	return {
		id: attempt.id ?? `attempt-${index + 1}`,
		examId,
		examTitle: attempt.examTitle ?? copy.createAttemptFallbackTitle(examId || index + 1),
		lang: attempt.lang ?? language,
		scorePoints,
		totalPoints,
		percentage,
		percentageLabel: formatPercentageLabel(percentage),
		pointsLabel: copy.createAttemptPointsLabel(formatNumber(scorePoints), formatNumber(totalPoints)),
		scoreLabel: copy.attemptScoreLabel,
		correctAnswerCount,
		answeredQuestionCount: results.length,
		results,
		startedAt: attempt.startedAt ?? null,
		submittedAt: attempt.submittedAt ?? null,
		submittedAtTimestamp,
		submittedAtLabel: dateLabel
	};
}

function buildHero({ attemptsCount, averagePercentage, improvementSinceFirst, copy }) {
	if (attemptsCount === 0) {
		return {
			title: copy.heroEmptyTitle,
			body: copy.heroEmptyBody,
			progressPercentage: 0,
			trendLabel: copy.heroNoTrend,
			trendDirection: "neutral"
		};
	}

	return {
		title: copy.createHeroTitle(attemptsCount),
		body: copy.heroBody,
		progressPercentage: averagePercentage ?? 0,
		trendLabel: getHeroTrendLabel(improvementSinceFirst, copy),
		trendDirection: getTrendDirection(improvementSinceFirst)
	};
}

function buildKpiCards({ attemptsCount, averagePercentage, bestAttempt, correctAnswerCount, answeredQuestionCount, uniqueExamCount, copy }) {
	return [
		{
			id: "average-score",
			label: copy.kpiAverageScore,
			value: formatPercentageLabel(averagePercentage),
			description: copy.createAverageScoreDescription(attemptsCount),
			trendDirection: "neutral"
		},
		{
			id: "best-score",
			label: copy.kpiBestScore,
			value: formatPercentageLabel(bestAttempt?.percentage ?? null),
			description: bestAttempt
				? copy.createBestScoreDescription(bestAttempt.submittedAtLabel)
				: EMPTY_LABEL,
			trendDirection: "positive"
		},
		{
			id: "correct-answers",
			label: copy.kpiCorrectAnswers,
			value: answeredQuestionCount > 0 ? String(correctAnswerCount) : EMPTY_LABEL,
			description: copy.createCorrectAnswersDescription(correctAnswerCount, answeredQuestionCount),
			trendDirection: "neutral"
		},
		{
			id: "unique-exams",
			label: copy.kpiUniqueExams,
			value: uniqueExamCount > 0 ? String(uniqueExamCount) : EMPTY_LABEL,
			description: copy.createUniqueExamsDescription(uniqueExamCount),
			trendDirection: "neutral"
		}
	];
}

function buildScoreTrendChart(attemptsByOldestFirst, copy) {
	const points = attemptsByOldestFirst
		.filter((attempt) => attempt.percentage !== null)
		.slice(-TREND_POINT_LIMIT)
		.map((attempt, index) => ({
			id: attempt.id,
			label: copy.createTrendPointLabel(index + 1),
			dateLabel: attempt.submittedAtLabel,
			percentage: attempt.percentage
		}));

	return {
		title: copy.scoreTrendTitle,
		subtitle: copy.scoreTrendSubtitle,
		summary: points.length > 0
			? copy.createScoreTrendSummary(points.map((point) => formatPercentageLabel(point.percentage)))
			: copy.scoreTrendEmptySummary,
		points
	};
}

function getAveragePercentage(attempts) {
	if (attempts.length === 0) {
		return null;
	}

	return roundPercentage(sum(attempts.map((attempt) => attempt.percentage)) / attempts.length);
}

function getBestAttempt(attempts) {
	if (attempts.length === 0) {
		return null;
	}

	return attempts.reduce((best, attempt) => {
		if (!best || attempt.percentage > best.percentage) {
			return attempt;
		}

		return best;
	}, null);
}

function getImprovementSinceFirst(firstAttempt, latestAttempt) {
	if (!firstAttempt || !latestAttempt || firstAttempt.id === latestAttempt.id) {
		return null;
	}

	return roundPercentage(latestAttempt.percentage - firstAttempt.percentage);
}

function getHeroTrendLabel(improvementSinceFirst, copy) {
	if (improvementSinceFirst === null) {
		return copy.heroNoTrend;
	}

	if (improvementSinceFirst >= 0) {
		return copy.createHeroImprovementSinceFirst(improvementSinceFirst);
	}

	return copy.createHeroLowerSinceFirst(Math.abs(improvementSinceFirst));
}

function getTrendDirection(value) {
	if (value === null || value === 0) {
		return "neutral";
	}

	return value > 0 ? "positive" : "negative";
}

function countUniqueExamIds(attempts) {
	return new Set(
		attempts
			.map((attempt) => attempt.examId)
			.filter(Boolean)
	).size;
}

function normalizePercentage(value, scorePoints, totalPoints) {
	const numericValue = normalizeNullableNumber(value);

	if (numericValue !== null) {
		return roundPercentage(numericValue);
	}

	if (totalPoints <= 0) {
		return null;
	}

	return roundPercentage((scorePoints / totalPoints) * 100);
}

function normalizeNumber(value) {
	const numericValue = normalizeNullableNumber(value);
	return numericValue ?? 0;
}

function normalizeNullableNumber(value) {
	if (typeof value === "number" && Number.isFinite(value)) {
		return value;
	}

	if (typeof value === "string" && value.trim().length > 0) {
		const parsed = Number.parseFloat(value);
		return Number.isFinite(parsed) ? parsed : null;
	}

	return null;
}

function compareAttemptOldestFirst(a, b) {
	return compareNullableTimestamps(a.submittedAtTimestamp, b.submittedAtTimestamp);
}

function compareAttemptNewestFirst(a, b) {
	return compareNullableTimestamps(b.submittedAtTimestamp, a.submittedAtTimestamp);
}

function compareNullableTimestamps(a, b) {
	if (a === null && b === null) {
		return 0;
	}

	if (a === null) {
		return 1;
	}

	if (b === null) {
		return -1;
	}

	return a - b;
}

function getTimestamp(value) {
	if (!value) {
		return null;
	}

	const timestamp = Date.parse(value);
	return Number.isFinite(timestamp) ? timestamp : null;
}

function formatDateLabel(value, language) {
	const timestamp = getTimestamp(value);

	if (timestamp === null) {
		return EMPTY_LABEL;
	}

	return new Intl.DateTimeFormat(LOCALES[language] ?? LOCALES.no, {
		day: "2-digit",
		month: "short",
		timeZone: "UTC"
	}).format(new Date(timestamp));
}

function formatPercentageLabel(value) {
	if (value === null || value === undefined) {
		return EMPTY_LABEL;
	}

	return `${formatNumber(value)}${PERCENTAGE_SUFFIX}`;
}


function formatNumber(value) {
	if (Number.isInteger(value)) {
		return String(value);
	}

	return String(Number(value.toFixed(1)));
}

function roundPercentage(value) {
	return Math.round(value * 10) / 10;
}

function sum(values) {
	return values.reduce((total, value) => total + value, 0);
}
