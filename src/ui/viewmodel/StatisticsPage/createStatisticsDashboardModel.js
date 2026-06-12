// src/ui/viewmodel/StatisticsPage/createStatisticsDashboardModel.js
const EMPTY_LABEL = "—";
const HERO_METER_CLASS_NAME = "statistics-hero-meter";

export default function createStatisticsDashboardModel(statistics, formatDate, copy) {
	const normalized = normalizeStatistics(statistics, formatDate, copy);

	return {
		isStatisticsEmpty: normalized.attemptCount === 0,
		hero: buildHero(normalized, copy),
		kpiGridLabel: copy.kpiGridLabel,
		kpiCards: buildKpiCards(normalized, copy),
		scoreTrendChart: buildScoreTrendChart(normalized.scoreTrend, copy),
		recentAttempts: normalized.recentAttempts,
		recentAttemptsTitle: copy.recentAttemptsTitle,
		recentAttemptsSubtitle: copy.recentAttemptsSubtitle,
		recentAttemptsEmpty: copy.recentAttemptsEmpty
	};
}

function normalizeStatistics(statistics, formatDate, copy) {
	const attemptCount = normalizeNumber(statistics?.attemptCount);
	const totalCorrectAnswers = normalizeNumber(statistics?.totalCorrectAnswers);
	const totalQuestions = normalizeNumber(statistics?.totalQuestions);
	const uniqueExamCount = normalizeNumber(statistics?.uniqueExamCount);
	const averageScorePercentage = normalizeNullablePercentage(statistics?.averageScorePercentage);
	const bestScorePercentage = normalizeNullablePercentage(statistics?.bestScorePercentage);

	return {
		attemptCount,
		averageScorePercentage,
		bestScorePercentage,
		totalCorrectAnswers,
		totalQuestions,
		uniqueExamCount,
		scoreTrend: normalizeTrendPoints(statistics?.scoreTrend, formatDate, copy),
		recentAttempts: normalizeRecentAttempts(statistics?.recentAttempts, formatDate, copy)
	};
}

function normalizeTrendPoints(scoreTrend, formatDate, copy) {
	if (!Array.isArray(scoreTrend)) {
		return [];
	}

	return scoreTrend
		.filter(Boolean)
		.map((attempt, index) => {
			const percentage = normalizeNullablePercentage(attempt.percentage);

			return {
				id: attempt.attemptId ?? `trend-${index + 1}`,
				name: copy.createTrendPointLabel(index + 1),
				dateLabel: formatDate(attempt.submittedAt) ?? EMPTY_LABEL,
				percentage,
				percentageLabel: formatPercentageLabel(percentage),
				scoreLabel: createPointsLabel(attempt.scorePoints, attempt.totalPoints, copy)
			};
		});
}

function normalizeRecentAttempts(recentAttempts, formatDate, copy) {
	if (!Array.isArray(recentAttempts)) {
		return [];
	}

	return recentAttempts
		.filter(Boolean)
		.map((attempt, index) => {
			const percentage = normalizeNullablePercentage(attempt.percentage);
			const examId = attempt.examId ?? "";

			return {
				id: attempt.attemptId ?? `recent-${index + 1}`,
				examId,
				examTitle: examId ? copy.createAttemptFallbackTitle(examId) : copy.createAttemptFallbackTitle(index + 1),
				submittedAtLabel: formatDate(attempt.submittedAt) ?? EMPTY_LABEL,
				percentage,
				percentageLabel: formatPercentageLabel(percentage),
				pointsLabel: createPointsLabel(attempt.scorePoints, attempt.totalPoints, copy),
				scoreLabel: copy.attemptScoreLabel
			};
		});
}

function buildHero(statistics, copy) {
	if (statistics.attemptCount === 0) {
		return {
			title: copy.emptyTitle,
			body: copy.emptyBody,
			progressPercentage: 0,
			progressLabel: copy.kpiAverageScore,
			meterClassName: HERO_METER_CLASS_NAME,
			meterValueLabel: EMPTY_LABEL,
			meterDescription: copy.kpiAverageScore
		};
	}

	return {
		title: copy.createHeroTitle(statistics.attemptCount),
		body: copy.heroBody,
		progressPercentage: statistics.averageScorePercentage ?? 0,
		progressLabel: copy.kpiAverageScore,
		meterClassName: HERO_METER_CLASS_NAME,
		meterValueLabel: formatPercentageLabel(statistics.averageScorePercentage),
		meterDescription: copy.kpiAverageScore
	};
}

function buildKpiCards(statistics, copy) {
	return [
		{
			id: "average-score",
			iconKey: "chart",
			label: copy.kpiAverageScore,
			value: formatPercentageLabel(statistics.averageScorePercentage),
			description: copy.createAttemptCountDescription(statistics.attemptCount)
		},
		{
			id: "best-score",
			iconKey: "star",
			label: copy.kpiBestScore,
			value: formatPercentageLabel(statistics.bestScorePercentage),
			description: copy.createAttemptCountDescription(statistics.attemptCount)
		},
		{
			id: "correct-answers",
			iconKey: "check",
			label: copy.kpiCorrectAnswers,
			value: statistics.totalQuestions > 0 ? String(statistics.totalCorrectAnswers) : EMPTY_LABEL,
			description: copy.createCorrectAnswersDescription(statistics.totalCorrectAnswers, statistics.totalQuestions)
		},
		{
			id: "unique-exams",
			iconKey: "book",
			label: copy.kpiUniqueExams,
			value: statistics.uniqueExamCount > 0 ? String(statistics.uniqueExamCount) : EMPTY_LABEL,
			description: copy.createUniqueExamsDescription(statistics.uniqueExamCount)
		}
	];
}

function buildScoreTrendChart(scoreTrend, copy) {
	return {
		title: copy.scoreTrendTitle,
		subtitle: copy.scoreTrendSubtitle,
		emptySummary: copy.scoreTrendEmptySummary,
		points: scoreTrend.filter((point) => point.percentage !== null)
	};
}

function createPointsLabel(scorePoints, totalPoints, copy) {
	return copy.createAttemptPointsLabel(formatNumber(normalizeNumber(scorePoints)), formatNumber(normalizeNumber(totalPoints)));
}

function normalizeNumber(value) {
	const numericValue = normalizeNullableNumber(value);
	return numericValue ?? 0;
}

function normalizeNullablePercentage(value) {
	const numericValue = normalizeNullableNumber(value);
	return numericValue === null ? null : roundPercentage(numericValue);
}

function normalizeNullableNumber(value) {
	if (typeof value === "number" && Number.isFinite(value)) {
		return value;
	}

	if (typeof value === "string" && value.trim() !== "") {
		const parsed = Number(value);
		return Number.isFinite(parsed) ? parsed : null;
	}

	return null;
}

function roundPercentage(value) {
	return Math.round(value * 10) / 10;
}

function formatPercentageLabel(value) {
	if (value === null) {
		return EMPTY_LABEL;
	}

	return `${formatNumber(value)} %`;
}

function formatNumber(value) {
	if (Number.isInteger(value)) {
		return String(value);
	}

	return String(Number(value.toFixed(1)));
}
