// src/ui/viewmodel/Utils/statisticsCopy.js
const DEFAULT_LANGUAGE = "no";

const FALLBACK_TEXT_BY_LANGUAGE = {
	no: {
		statisticsLoadErrorMessage: "Kunne ikke laste statistikken din.",
		statisticsHeroEmptyTitle: "Du har ingen forsøk ennå",
		statisticsHeroEmptyBody: "Når du leverer en eksamen, vises fremgangen din her.",
		statisticsHeroTitlePrefix: "Du har øvd",
		statisticsHeroTitleUnitSingular: "gang",
		statisticsHeroTitleUnitPlural: "ganger",
		statisticsHeroBody: "Flott innsats. Du bygger kunnskap litt for litt.",
		statisticsHeroNoTrend: "Lever flere eksamener for å se utviklingen over tid.",
		statisticsHeroImprovementSinceFirstSuffix: "siden første forsøk",
		statisticsHeroLowerSinceFirstSuffix: "lavere enn første forsøk",
		statisticsKpiAverageScore: "Snittscore",
		statisticsKpiAverageScoreDescriptionPrefix: "Basert på",
		statisticsKpiBestScore: "Beste score",
		statisticsKpiBestScoreDescriptionPrefix: "Oppnådd",
		statisticsKpiCorrectAnswers: "Riktige svar",
		statisticsKpiUniqueExams: "Eksamener øvd på",
		statisticsScoreTrendTitle: "Din læringsreise",
		statisticsScoreTrendSubtitle: "Se hvordan scoren din har utviklet seg over tid.",
		statisticsScoreTrendEmptySummary: "Du trenger minst ett innlevert forsøk før vi kan vise en trend.",
		statisticsScoreTrendSummaryPrefix: "De siste forsøkene dine er",
		statisticsRecentAttemptsTitle: "Siste forsøk",
		statisticsRecentAttemptsUnit: "nyeste forsøk",
		statisticsAttemptFallbackTitlePrefix: "Eksamen",
		statisticsAttemptScoreLabel: "Score",
		statisticsTrendPointLabel: "Forsøk",
		statisticsAttemptPointUnit: "poeng",
		statisticsAttemptUnitSingular: "forsøk",
		statisticsAttemptUnitPlural: "forsøk",
		statisticsExamUnitSingular: "eksamen",
		statisticsExamUnitPlural: "eksamener",
		statisticsQuestionUnitSingular: "spørsmål",
		statisticsQuestionUnitPlural: "spørsmål",
		statisticsUniqueSingular: "unik",
		statisticsUniquePlural: "unike",
		statisticsOfLabel: "av",
		statisticsPercentagePointSingular: "prosentpoeng",
		statisticsPercentagePointPlural: "prosentpoeng"
	},
	en: {
		statisticsLoadErrorMessage: "Could not load your statistics.",
		statisticsHeroEmptyTitle: "You do not have any attempts yet",
		statisticsHeroEmptyBody: "When you submit an exam, your progress will appear here.",
		statisticsHeroTitlePrefix: "You have practised",
		statisticsHeroTitleUnitSingular: "time",
		statisticsHeroTitleUnitPlural: "times",
		statisticsHeroBody: "Good work. You are building knowledge step by step.",
		statisticsHeroNoTrend: "Submit more exams to see your progress over time.",
		statisticsHeroImprovementSinceFirstSuffix: "since your first attempt",
		statisticsHeroLowerSinceFirstSuffix: "lower than your first attempt",
		statisticsKpiAverageScore: "Average score",
		statisticsKpiAverageScoreDescriptionPrefix: "Based on",
		statisticsKpiBestScore: "Best score",
		statisticsKpiBestScoreDescriptionPrefix: "Reached",
		statisticsKpiCorrectAnswers: "Correct answers",
		statisticsKpiUniqueExams: "Exams practised",
		statisticsScoreTrendTitle: "Your learning journey",
		statisticsScoreTrendSubtitle: "See how your score has developed over time.",
		statisticsScoreTrendEmptySummary: "You need at least one submitted attempt before we can show a trend.",
		statisticsScoreTrendSummaryPrefix: "Your latest attempts are",
		statisticsRecentAttemptsTitle: "Latest attempts",
		statisticsRecentAttemptsUnit: "latest",
		statisticsAttemptFallbackTitlePrefix: "Exam",
		statisticsAttemptScoreLabel: "Score",
		statisticsTrendPointLabel: "Attempt",
		statisticsAttemptPointUnit: "points",
		statisticsAttemptUnitSingular: "attempt",
		statisticsAttemptUnitPlural: "attempts",
		statisticsExamUnitSingular: "exam",
		statisticsExamUnitPlural: "exams",
		statisticsQuestionUnitSingular: "question",
		statisticsQuestionUnitPlural: "questions",
		statisticsUniqueSingular: "unique",
		statisticsUniquePlural: "unique",
		statisticsOfLabel: "of",
		statisticsPercentagePointSingular: "percentage point",
		statisticsPercentagePointPlural: "percentage points"
	}
};

export default function createStatisticsCopy(language = DEFAULT_LANGUAGE, t = {}) {
	const text = {
		...getFallbackText(language),
		...t
	};

	return {
		loadErrorMessage: text.statisticsLoadErrorMessage,
		heroEmptyTitle: text.statisticsHeroEmptyTitle,
		heroEmptyBody: text.statisticsHeroEmptyBody,
		heroBody: text.statisticsHeroBody,
		heroNoTrend: text.statisticsHeroNoTrend,
		kpiAverageScore: text.statisticsKpiAverageScore,
		kpiBestScore: text.statisticsKpiBestScore,
		kpiCorrectAnswers: text.statisticsKpiCorrectAnswers,
		kpiUniqueExams: text.statisticsKpiUniqueExams,
		scoreTrendTitle: text.statisticsScoreTrendTitle,
		scoreTrendSubtitle: text.statisticsScoreTrendSubtitle,
		scoreTrendEmptySummary: text.statisticsScoreTrendEmptySummary,
		recentAttemptsTitle: text.statisticsRecentAttemptsTitle,
		attemptScoreLabel: text.statisticsAttemptScoreLabel,

		createTrendPointLabel(number) {
			return `${text.statisticsTrendPointLabel} ${number}`;
		},

		createHeroTitle(count) {
			return `${text.statisticsHeroTitlePrefix} ${count} ${selectUnit(count, text.statisticsHeroTitleUnitSingular, text.statisticsHeroTitleUnitPlural)}`;
		},

		createHeroImprovementSinceFirst(value) {
			return `${formatSignedPercentagePoints(value, text)} ${text.statisticsHeroImprovementSinceFirstSuffix}`;
		},

		createHeroLowerSinceFirst(value) {
			return `${formatPercentagePoints(value, text)} ${text.statisticsHeroLowerSinceFirstSuffix}`;
		},

		createAverageScoreDescription(count) {
			return `${text.statisticsKpiAverageScoreDescriptionPrefix} ${count} ${selectUnit(count, text.statisticsAttemptUnitSingular, text.statisticsAttemptUnitPlural)}`;
		},

		createBestScoreDescription(dateLabel) {
			return `${text.statisticsKpiBestScoreDescriptionPrefix} ${dateLabel}`;
		},

		createCorrectAnswersDescription(correct, total) {
			return `${correct} ${text.statisticsOfLabel} ${total} ${selectUnit(total, text.statisticsQuestionUnitSingular, text.statisticsQuestionUnitPlural)}`;
		},

		createUniqueExamsDescription(count) {
			return `${count} ${selectUnit(count, text.statisticsUniqueSingular, text.statisticsUniquePlural)} ${selectUnit(count, text.statisticsExamUnitSingular, text.statisticsExamUnitPlural)}`;
		},

		createScoreTrendSummary(values) {
			return `${text.statisticsScoreTrendSummaryPrefix} ${values.join(", ")}.`;
		},

		createRecentAttemptsSubtitle(count) {
			return `${count} ${text.statisticsRecentAttemptsUnit}`;
		},

		createAttemptFallbackTitle(examId) {
			return `${text.statisticsAttemptFallbackTitlePrefix} ${examId}`;
		},

		createAttemptPointsLabel(scorePoints, totalPoints) {
			return `${scorePoints} / ${totalPoints} ${text.statisticsAttemptPointUnit}`;
		}
	};
}

function getFallbackText(language) {
	return FALLBACK_TEXT_BY_LANGUAGE[language] ?? FALLBACK_TEXT_BY_LANGUAGE[DEFAULT_LANGUAGE];
}

function selectUnit(count, singular, plural) {
	return count === 1 ? singular : plural;
}

function formatSignedPercentagePoints(value, text) {
	const prefix = value > 0 ? "+" : "";
	return `${prefix}${formatPercentagePoints(value, text)}`;
}

function formatPercentagePoints(value, text) {
	return `${formatNumber(value)} ${selectUnit(Math.abs(value), text.statisticsPercentagePointSingular, text.statisticsPercentagePointPlural)}`;
}

function formatNumber(value) {
	if (Number.isInteger(value)) {
		return String(value);
	}

	return String(Number(value.toFixed(1)));
}
