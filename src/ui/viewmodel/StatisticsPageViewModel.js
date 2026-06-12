// src/ui/viewmodel/StatisticsPageViewModel.js
import { useCallback, useEffect, useMemo, useState } from "react";

const EMPTY_LABEL = "—";
const isNeverCancelled = () => false;

export default function useStatisticsPageViewModel(
	getMyStatisticsUseCase,
	formatDate,
	t = {},
	authState = {},
	onStartNewExam = () => {}
) {
	const [statistics, setStatistics] = useState(null);
	const [statisticsLoading, setStatisticsLoading] = useState(false);
	const [statisticsLoadError, setStatisticsLoadError] = useState(null);

	const isAuthLoaded = authState.isLoaded ?? true;
	const isSignedIn = authState.isSignedIn === true;
	const hasClerkAuth = authState.hasClerkAuth !== false;

	const copy = useMemo(() => createStatisticsCopy(t), [t]);

	const loadStatistics = useCallback(async (isCancelled = isNeverCancelled) => {
		if (!isAuthLoaded || !isSignedIn) {
			setStatistics(null);
			setStatisticsLoading(false);
			setStatisticsLoadError(null);
			return;
		}

		try {
			setStatisticsLoading(true);
			setStatisticsLoadError(null);

			const result = await getMyStatisticsUseCase.execute();

			if (!isCancelled()) {
				setStatistics(result);
			}
		} catch (error) {
			console.error("Feil ved henting av statistikk:", error);

			if (!isCancelled()) {
				setStatistics(null);
				setStatisticsLoadError(error?.message ?? copy.loadErrorMessage);
			}
		} finally {
			if (!isCancelled()) {
				setStatisticsLoading(false);
			}
		}
	}, [copy.loadErrorMessage, getMyStatisticsUseCase, isAuthLoaded, isSignedIn]);

	useEffect(() => {
		let cancelled = false;

		loadStatistics(() => cancelled);

		return () => {
			cancelled = true;
		};
	}, [loadStatistics]);

	const dashboard = useMemo(() => createDashboardModel(statistics, formatDate, copy), [statistics, formatDate, copy]);

	const retryLoadStatistics = useCallback(() => {
		loadStatistics();
	}, [loadStatistics]);

	const startNewExam = useCallback(() => {
		onStartNewExam();
	}, [onStartNewExam]);

	return {
		// Auth state
		hasClerkAuth,
		isAuthLoaded,
		isSignedIn,
		isAuthLoading: hasClerkAuth && !isAuthLoaded,
		isSignedOut: !hasClerkAuth || (isAuthLoaded && !isSignedIn),

		// Data state
		statistics,
		statisticsLoading,
		statisticsLoadError,

		// Text
		pageTitle: copy.pageTitle,
		pageSubtitle: copy.pageSubtitle,
		loadingTitle: copy.loadingTitle,
		loadingBody: copy.loadingBody,
		signedOutTitle: copy.signedOutTitle,
		signedOutBody: copy.signedOutBody,
		emptyTitle: copy.emptyTitle,
		emptyBody: copy.emptyBody,
		errorTitle: copy.errorTitle,
		retryButtonLabel: copy.retryButton,
		startNewExamLabel: copy.startNewExamButton,

		// Dashboard model
		...dashboard,

		// Handlers
		onRetryLoadStatistics: retryLoadStatistics,
		onStartNewExam: startNewExam
	};
}

function createDashboardModel(statistics, formatDate, copy) {
	const normalized = normalizeStatistics(statistics, formatDate, copy);

	return {
		isStatisticsEmpty: normalized.attemptCount === 0,
		hero: buildHero(normalized, copy),
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
			improvement: null
		};
	}

	const improvement = computeImprovement(statistics.scoreTrend, copy);

	return {
		title: copy.createHeroTitle(statistics.attemptCount),
		body: copy.heroBody,
		progressPercentage: statistics.averageScorePercentage ?? 0,
		improvement
	};
}

function computeImprovement(scoreTrend, copy) {
	if (!Array.isArray(scoreTrend) || scoreTrend.length < 2) {
		return null;
	}

	const first = scoreTrend[0];
	const last = scoreTrend[scoreTrend.length - 1];

	if (first.percentage === null || last.percentage === null) {
		return null;
	}

	const diff = Math.round((last.percentage - first.percentage) * 10) / 10;

	if (diff === 0) {
		return null;
	}

	const sign = diff > 0 ? "+" : "";
	const suffix = diff > 0 ? copy.improvementSuffix : copy.lowerSuffix;

	return {
		value: diff,
		label: `${sign}${formatNumber(Math.abs(diff))} %`,
		suffix,
		isPositive: diff > 0
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

function createStatisticsCopy(t = {}) {
	return {
		pageTitle: t.selectStatistics,
		pageSubtitle: t.statisticsPageSubtitle,
		loadingTitle: t.statisticsLoadingTitle,
		loadingBody: t.statisticsLoadingBody,
		signedOutTitle: t.statisticsSignedOutTitle,
		signedOutBody: t.statisticsSignedOutBody,
		emptyTitle: t.statisticsHeroEmptyTitle,
		emptyBody: t.statisticsHeroEmptyBody,
		errorTitle: t.statisticsErrorTitle,
		retryButton: t.statisticsRetryButton,
		startNewExamButton: t.statisticsStartNewExamButton,
		heroBody: t.statisticsHeroBody,
		heroNoTrend: t.statisticsHeroNoTrend,
		improvementSuffix: t.statisticsHeroImprovementSinceFirstSuffix,
		lowerSuffix: t.statisticsHeroLowerSinceFirstSuffix,
		kpiAttemptCount: t.statisticsKpiAttemptCount,
		kpiAverageScore: t.statisticsKpiAverageScore,
		kpiBestScore: t.statisticsKpiBestScore,
		kpiCorrectAnswers: t.statisticsKpiCorrectAnswers,
		kpiUniqueExams: t.statisticsKpiUniqueExams,
		scoreTrendTitle: t.statisticsScoreTrendTitle,
		scoreTrendSubtitle: t.statisticsScoreTrendSubtitle,
		scoreTrendEmptySummary: t.statisticsScoreTrendEmptySummary,
		recentAttemptsTitle: t.statisticsRecentAttemptsTitle,
		recentAttemptsSubtitle: t.statisticsRecentAttemptsSubtitle,
		recentAttemptsEmpty: t.statisticsRecentAttemptsEmpty,
		attemptScoreLabel: t.statisticsAttemptScoreLabel,
		loadErrorMessage: t.statisticsLoadErrorMessage,

		createHeroTitle(count) {
			return `${t.statisticsHeroTitlePrefix} ${count} ${selectUnit(count, t.statisticsHeroTitleUnitSingular, t.statisticsHeroTitleUnitPlural)}`;
		},

		createTrendPointLabel(number) {
			return `${t.statisticsTrendPointLabel} ${number}`;
		},

		createAttemptCountDescription(count) {
			return `${count} ${selectUnit(count, t.statisticsAttemptUnitSingular, t.statisticsAttemptUnitPlural)}`;
		},

		createCorrectAnswersDescription(correct, total) {
			return `${correct} ${t.statisticsOfLabel} ${total} ${selectUnit(total, t.statisticsQuestionUnitSingular, t.statisticsQuestionUnitPlural)}`;
		},

		createUniqueExamsDescription(count) {
			return `${count} ${selectUnit(count, t.statisticsExamUnitSingular, t.statisticsExamUnitPlural)}`;
		},

		createAttemptFallbackTitle(examId) {
			return `${t.statisticsAttemptFallbackTitlePrefix} ${examId}`;
		},

		createAttemptPointsLabel(scorePoints, totalPoints) {
			return `${scorePoints} / ${totalPoints} ${t.statisticsAttemptPointUnit}`;
		}
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

function selectUnit(count, singular, plural) {
	return count === 1 ? singular : plural;
}
