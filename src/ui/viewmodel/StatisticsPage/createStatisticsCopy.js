// src/ui/viewmodel/StatisticsPage/createStatisticsCopy.js
export default function createStatisticsCopy(t) {
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
		kpiGridLabel: t.statisticsKpiGridLabel,
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

function selectUnit(count, singular, plural) {
	return count === 1 ? singular : plural;
}
