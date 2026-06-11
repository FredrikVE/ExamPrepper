// src/ui/viewmodel/StatisticsPageViewModel.js
import { useCallback, useEffect, useMemo, useState } from "react";

const EMPTY_LABEL = "—";
const LOAD_ERROR_MESSAGE = "Kunne ikke laste statistikken din.";
const DEFAULT_LANGUAGE = "no";
const isNeverCancelled = () => false;

const LOCALES = {
	no: "nb-NO",
	en: "en-GB"
};

const FALLBACK_TEXT_BY_LANGUAGE = {
	no: {
		pageTitle: "Din statistikk",
		pageSubtitle: "Se hvordan øvingen din utvikler seg over tid.",
		loadingTitle: "Laster statistikk...",
		loadingBody: "Vi henter tallene dine fra backend.",
		signedOutTitle: "Logg inn for å se statistikk",
		signedOutBody: "Statistikk lagres bare for innloggede brukere i denne iterasjonen.",
		emptyTitle: "Du har ingen forsøk ennå",
		emptyBody: "Når du leverer en eksamen, vises fremgangen din her.",
		errorTitle: "Kunne ikke laste statistikk",
		retryButton: "Prøv igjen",
		startNewExamButton: "Start ny eksamen",
		heroBody: "Flott innsats. Du bygger kunnskap litt for litt.",
		heroNoTrend: "Lever flere eksamener for å se utviklingen over tid.",
		heroTitlePrefix: "Du har øvd",
		heroTitleUnitSingular: "gang",
		heroTitleUnitPlural: "ganger",
		kpiAttemptCount: "Antall forsøk",
		kpiAverageScore: "Snittscore",
		kpiBestScore: "Beste score",
		kpiCorrectAnswers: "Riktige svar",
		kpiUniqueExams: "Eksamener øvd på",
		attemptUnitSingular: "forsøk",
		attemptUnitPlural: "forsøk",
		examUnitSingular: "eksamen",
		examUnitPlural: "eksamener",
		questionUnitSingular: "spørsmål",
		questionUnitPlural: "spørsmål",
		ofLabel: "av",
		scoreTrendTitle: "Din læringsreise",
		scoreTrendSubtitle: "Siste 20 forsøk fra backend.",
		scoreTrendEmptySummary: "Du trenger minst ett innlevert forsøk før vi kan vise en trend.",
		recentAttemptsTitle: "Siste forsøk",
		recentAttemptsSubtitle: "Siste 5 innleverte forsøk.",
		recentAttemptsEmpty: "Ingen forsøk å vise ennå.",
		attemptScoreLabel: "Score",
		attemptFallbackTitlePrefix: "Eksamen",
		attemptPointUnit: "poeng",
		trendPointLabel: "Forsøk"
	},
	en: {
		pageTitle: "Your statistics",
		pageSubtitle: "See how your practice develops over time.",
		loadingTitle: "Loading statistics...",
		loadingBody: "We are fetching your numbers from the backend.",
		signedOutTitle: "Sign in to see statistics",
		signedOutBody: "Statistics are only saved for signed-in users in this iteration.",
		emptyTitle: "You do not have any attempts yet",
		emptyBody: "When you submit an exam, your progress will appear here.",
		errorTitle: "Could not load statistics",
		retryButton: "Try again",
		startNewExamButton: "Start new exam",
		heroBody: "Good work. You are building knowledge step by step.",
		heroNoTrend: "Submit more exams to see your progress over time.",
		heroTitlePrefix: "You have practised",
		heroTitleUnitSingular: "time",
		heroTitleUnitPlural: "times",
		kpiAttemptCount: "Attempts",
		kpiAverageScore: "Average score",
		kpiBestScore: "Best score",
		kpiCorrectAnswers: "Correct answers",
		kpiUniqueExams: "Exams practised",
		attemptUnitSingular: "attempt",
		attemptUnitPlural: "attempts",
		examUnitSingular: "exam",
		examUnitPlural: "exams",
		questionUnitSingular: "question",
		questionUnitPlural: "questions",
		ofLabel: "of",
		scoreTrendTitle: "Your learning journey",
		scoreTrendSubtitle: "Latest 20 attempts from the backend.",
		scoreTrendEmptySummary: "You need at least one submitted attempt before we can show a trend.",
		recentAttemptsTitle: "Latest attempts",
		recentAttemptsSubtitle: "Latest 5 submitted attempts.",
		recentAttemptsEmpty: "No attempts to show yet.",
		attemptScoreLabel: "Score",
		attemptFallbackTitlePrefix: "Exam",
		attemptPointUnit: "points",
		trendPointLabel: "Attempt"
	}
};

export default function useStatisticsPageViewModel(
	getMyStatisticsUseCase,
	language,
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

	const copy = useMemo(() => createStatisticsCopy(language, t), [language, t]);

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
				setStatisticsLoadError(error?.message ?? t.statisticsLoadErrorMessage ?? LOAD_ERROR_MESSAGE);
			}
		} finally {
			if (!isCancelled()) {
				setStatisticsLoading(false);
			}
		}
	}, [getMyStatisticsUseCase, isAuthLoaded, isSignedIn, t]);

	useEffect(() => {
		let cancelled = false;

		loadStatistics(() => cancelled);

		return () => {
			cancelled = true;
		};
	}, [loadStatistics]);

	const dashboard = useMemo(() => {
		return createDashboardModel(statistics, language, copy);
	}, [statistics, language, copy]);

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

function createDashboardModel(statistics, language, copy) {
	const normalized = normalizeStatistics(statistics, language, copy);

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

function normalizeStatistics(statistics, language, copy) {
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
		scoreTrend: normalizeTrendPoints(statistics?.scoreTrend, language, copy),
		recentAttempts: normalizeRecentAttempts(statistics?.recentAttempts, language, copy)
	};
}

function normalizeTrendPoints(scoreTrend, language, copy) {
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
				dateLabel: formatDateLabel(attempt.submittedAt, language),
				percentage,
				percentageLabel: formatPercentageLabel(percentage),
				scoreLabel: createPointsLabel(attempt.scorePoints, attempt.totalPoints, copy)
			};
		});
}

function normalizeRecentAttempts(recentAttempts, language, copy) {
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
				submittedAtLabel: formatDateLabel(attempt.submittedAt, language),
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
			trendLabel: copy.heroNoTrend
		};
	}

	return {
		title: copy.createHeroTitle(statistics.attemptCount),
		body: copy.heroBody,
		progressPercentage: statistics.averageScorePercentage ?? 0,
		trendLabel: copy.heroNoTrend
	};
}

function buildKpiCards(statistics, copy) {
	return [
		{
			id: "attempt-count",
			label: copy.kpiAttemptCount,
			value: String(statistics.attemptCount),
			description: copy.createAttemptCountDescription(statistics.attemptCount)
		},
		{
			id: "average-score",
			label: copy.kpiAverageScore,
			value: formatPercentageLabel(statistics.averageScorePercentage),
			description: copy.createAttemptCountDescription(statistics.attemptCount)
		},
		{
			id: "best-score",
			label: copy.kpiBestScore,
			value: formatPercentageLabel(statistics.bestScorePercentage),
			description: copy.createAttemptCountDescription(statistics.attemptCount)
		},
		{
			id: "correct-answers",
			label: copy.kpiCorrectAnswers,
			value: statistics.totalQuestions > 0 ? String(statistics.totalCorrectAnswers) : EMPTY_LABEL,
			description: copy.createCorrectAnswersDescription(statistics.totalCorrectAnswers, statistics.totalQuestions)
		},
		{
			id: "unique-exams",
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

function createStatisticsCopy(language = DEFAULT_LANGUAGE, t = {}) {
	const fallback = FALLBACK_TEXT_BY_LANGUAGE[language] ?? FALLBACK_TEXT_BY_LANGUAGE[DEFAULT_LANGUAGE];

	const text = {
		...fallback,
		pageTitle: t.selectStatistics ?? fallback.pageTitle,
		pageSubtitle: t.statisticsPageSubtitle ?? fallback.pageSubtitle,
		loadingTitle: t.statisticsLoadingTitle ?? fallback.loadingTitle,
		loadingBody: t.statisticsLoadingBody ?? fallback.loadingBody,
		signedOutTitle: t.statisticsSignedOutTitle ?? fallback.signedOutTitle,
		signedOutBody: t.statisticsSignedOutBody ?? fallback.signedOutBody,
		emptyTitle: t.statisticsHeroEmptyTitle ?? fallback.emptyTitle,
		emptyBody: t.statisticsHeroEmptyBody ?? fallback.emptyBody,
		errorTitle: t.statisticsErrorTitle ?? fallback.errorTitle,
		retryButton: t.statisticsRetryButton ?? fallback.retryButton,
		startNewExamButton: t.statisticsStartNewExamButton ?? fallback.startNewExamButton,
		heroBody: t.statisticsHeroBody ?? fallback.heroBody,
		heroNoTrend: t.statisticsHeroNoTrend ?? fallback.heroNoTrend,
		heroTitlePrefix: t.statisticsHeroTitlePrefix ?? fallback.heroTitlePrefix,
		heroTitleUnitSingular: t.statisticsHeroTitleUnitSingular ?? fallback.heroTitleUnitSingular,
		heroTitleUnitPlural: t.statisticsHeroTitleUnitPlural ?? fallback.heroTitleUnitPlural,
		kpiAttemptCount: t.statisticsKpiAttemptCount ?? fallback.kpiAttemptCount,
		kpiAverageScore: t.statisticsKpiAverageScore ?? fallback.kpiAverageScore,
		kpiBestScore: t.statisticsKpiBestScore ?? fallback.kpiBestScore,
		kpiCorrectAnswers: t.statisticsKpiCorrectAnswers ?? fallback.kpiCorrectAnswers,
		kpiUniqueExams: t.statisticsKpiUniqueExams ?? fallback.kpiUniqueExams,
		attemptUnitSingular: t.statisticsAttemptUnitSingular ?? fallback.attemptUnitSingular,
		attemptUnitPlural: t.statisticsAttemptUnitPlural ?? fallback.attemptUnitPlural,
		examUnitSingular: t.statisticsExamUnitSingular ?? fallback.examUnitSingular,
		examUnitPlural: t.statisticsExamUnitPlural ?? fallback.examUnitPlural,
		questionUnitSingular: t.statisticsQuestionUnitSingular ?? fallback.questionUnitSingular,
		questionUnitPlural: t.statisticsQuestionUnitPlural ?? fallback.questionUnitPlural,
		ofLabel: t.statisticsOfLabel ?? fallback.ofLabel,
		scoreTrendTitle: t.statisticsScoreTrendTitle ?? fallback.scoreTrendTitle,
		scoreTrendSubtitle: t.statisticsScoreTrendSubtitle ?? fallback.scoreTrendSubtitle,
		scoreTrendEmptySummary: t.statisticsScoreTrendEmptySummary ?? fallback.scoreTrendEmptySummary,
		recentAttemptsTitle: t.statisticsRecentAttemptsTitle ?? fallback.recentAttemptsTitle,
		recentAttemptsSubtitle: t.statisticsRecentAttemptsSubtitle ?? fallback.recentAttemptsSubtitle,
		recentAttemptsEmpty: t.statisticsRecentAttemptsEmpty ?? fallback.recentAttemptsEmpty,
		attemptScoreLabel: t.statisticsAttemptScoreLabel ?? fallback.attemptScoreLabel,
		attemptFallbackTitlePrefix: t.statisticsAttemptFallbackTitlePrefix ?? fallback.attemptFallbackTitlePrefix,
		attemptPointUnit: t.statisticsAttemptPointUnit ?? fallback.attemptPointUnit,
		trendPointLabel: t.statisticsTrendPointLabel ?? fallback.trendPointLabel
	};

	return {
		...text,

		createHeroTitle(count) {
			return `${text.heroTitlePrefix} ${count} ${selectUnit(count, text.heroTitleUnitSingular, text.heroTitleUnitPlural)}`;
		},

		createTrendPointLabel(number) {
			return `${text.trendPointLabel} ${number}`;
		},

		createAttemptCountDescription(count) {
			return `${count} ${selectUnit(count, text.attemptUnitSingular, text.attemptUnitPlural)}`;
		},

		createCorrectAnswersDescription(correct, total) {
			return `${correct} ${text.ofLabel} ${total} ${selectUnit(total, text.questionUnitSingular, text.questionUnitPlural)}`;
		},

		createUniqueExamsDescription(count) {
			return `${count} ${selectUnit(count, text.examUnitSingular, text.examUnitPlural)}`;
		},

		createAttemptFallbackTitle(examId) {
			return `${text.attemptFallbackTitlePrefix} ${examId}`;
		},

		createAttemptPointsLabel(scorePoints, totalPoints) {
			return `${scorePoints} / ${totalPoints} ${text.attemptPointUnit}`;
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

function formatDateLabel(value, language) {
	const timestamp = Date.parse(value);

	if (!Number.isFinite(timestamp)) {
		return EMPTY_LABEL;
	}

	return new Intl.DateTimeFormat(LOCALES[language] ?? LOCALES[DEFAULT_LANGUAGE], {
		day: "2-digit",
		month: "short",
		year: "numeric"
	}).format(new Date(timestamp));
}

function selectUnit(count, singular, plural) {
	return count === 1 ? singular : plural;
}
