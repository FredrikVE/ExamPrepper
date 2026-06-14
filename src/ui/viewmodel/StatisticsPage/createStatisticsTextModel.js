// src/ui/viewmodel/StatisticsPage/createStatisticsTextModel.js
export default function createStatisticsTextModel(t) {
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
		recommendedTitle: t.statisticsRecommendedTitle,
		recommendedBody: t.statisticsRecommendedBody,
		recommendedBadge: t.statisticsRecommendedBadge,
		weeklyActivityTitle: t.statisticsWeeklyActivityTitle,
		weeklyActivityTotalTimeCaption: t.statisticsWeeklyActivityTotalTimeCaption,
		weeklyActivityChangeSuffix: t.statisticsWeeklyActivityChangeSuffix,
		weeklyActivityNoComparisonLabel: t.statisticsWeeklyActivityNoComparisonLabel,
		weeklyActivityNoChangeLabel: t.statisticsWeeklyActivityNoChangeLabel,
		weeklyActivityNote: t.statisticsWeeklyActivityNote,
		weekdayLabels: {
			mon: t.statisticsWeekdayMonday,
			tue: t.statisticsWeekdayTuesday,
			wed: t.statisticsWeekdayWednesday,
			thu: t.statisticsWeekdayThursday,
			fri: t.statisticsWeekdayFriday,
			sat: t.statisticsWeekdaySaturday,
			sun: t.statisticsWeekdaySunday
		},
		attemptScoreLabel: t.statisticsAttemptScoreLabel,
		loadErrorMessage: t.statisticsLoadErrorMessage,
		emptyValueLabel: t.statisticsEmptyValueLabel,

		createHeroTitle(count) {
			return `${t.statisticsHeroTitlePrefix} ${count} ${selectSingularOrPlural(count, t.statisticsHeroTitleUnitSingular, t.statisticsHeroTitleUnitPlural)}`;
		},

		createTrendPointLabel(number) {
			return `${t.statisticsTrendPointLabel} ${number}`;
		},

		createAttemptCountDescription(count) {
			return `${count} ${selectSingularOrPlural(count, t.statisticsAttemptUnitSingular, t.statisticsAttemptUnitPlural)}`;
		},

		createCorrectAnswersDescription(correct, total) {
			return `${correct} ${t.statisticsOfLabel} ${total} ${selectSingularOrPlural(total, t.statisticsQuestionUnitSingular, t.statisticsQuestionUnitPlural)}`;
		},

		createUniqueExamsDescription(count) {
			return `${count} ${selectSingularOrPlural(count, t.statisticsExamUnitSingular, t.statisticsExamUnitPlural)}`;
		},

		createAttemptFallbackTitle(value) {
			return `${t.statisticsAttemptFallbackTitlePrefix} ${value}`;
		},

		createAttemptTitleFromExamId(examId) {
			return createAttemptTitleFromExamId(examId, t);
		},

		createAttemptPointsLabel(scorePoints, totalPoints) {
			return `${scorePoints} / ${totalPoints} ${t.statisticsAttemptPointUnit}`;
		},

		createDurationLabel(totalMinutes) {
			const hours = Math.floor(totalMinutes / 60);
			const minutes = totalMinutes % 60;

			if (hours === 0) {
				return `${minutes} ${t.statisticsActivityMinuteShort}`;
			}

			if (minutes === 0) {
				return `${hours} ${t.statisticsActivityHourShort}`;
			}

			return `${hours} ${t.statisticsActivityHourShort} ${minutes} ${t.statisticsActivityMinuteShort}`;
		}
	};
}

function createAttemptTitleFromExamId(examId, t) {
	const examIdText = String(examId).toLowerCase();

	if (examIdText.includes("demo")) {
		return t.statisticsDemoExamFallbackTitle;
	}

	const mockExamNumber = findExamNumber(examIdText, "mock-exam");

	if (mockExamNumber !== null) {
		return `${t.statisticsPracticeExamFallbackTitlePrefix} ${mockExamNumber}`;
	}

	const examNumber = findExamNumber(examIdText, "exam");

	if (examNumber !== null) {
		return `${t.statisticsAttemptFallbackTitlePrefix} ${examNumber}`;
	}

	return null;
}

function findExamNumber(value, prefix) {
	const prefixStart = value.indexOf(prefix);

	if (prefixStart === -1) {
		return null;
	}

	let numberStart = prefixStart + prefix.length;

	while (value[numberStart] === "-" || value[numberStart] === "_") {
		numberStart += 1;
	}

	let numberText = "";

	for (let index = numberStart; index < value.length; index += 1) {
		const character = value[index];

		if (character < "0" || character > "9") {
			break;
		}

		numberText += character;
	}

	if (numberText === "") {
		return null;
	}

	return Number(numberText);
}

function selectSingularOrPlural(count, singular, plural) {
	if (count === 1) {
		return singular;
	}

	return plural;
}
