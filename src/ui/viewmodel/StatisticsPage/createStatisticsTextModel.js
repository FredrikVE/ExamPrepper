// src/ui/viewmodel/StatisticsPage/createStatisticsTextModel.js
import { STATISTICS_PERIODS } from "../../../constants/StatisticsContracts.js";

const SINGULAR_COUNT = 1;
const MINUTES_PER_HOUR = 60;
const NO_REMAINDER = 0;
const STRING_INDEX_STEP = 1;
const NOT_FOUND_INDEX = -1;
const PERCENTAGE_DECIMAL_PLACES = 1;
const HISTORY_PAGE_NUMBER_OFFSET = 1;

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
		emptyValueLabel: t.statisticsEmptyValueLabel,

		developmentTitle: t.statisticsOverviewDevelopmentTitle,
		developmentSubtitle: t.statisticsOverviewDevelopmentSubtitle,
		periodLabel: t.statisticsOverviewPeriodLabel,
		periodOptions: Object.freeze([
			{ key: STATISTICS_PERIODS.WEEK, label: t.statisticsOverviewPeriodWeek },
			{ key: STATISTICS_PERIODS.MONTH, label: t.statisticsOverviewPeriodMonth },
			{ key: STATISTICS_PERIODS.THREE_MONTHS, label: t.statisticsOverviewPeriodThreeMonths },
			{ key: STATISTICS_PERIODS.SIX_MONTHS, label: t.statisticsOverviewPeriodSixMonths },
			{ key: STATISTICS_PERIODS.YEAR, label: t.statisticsOverviewPeriodYear },
			{ key: STATISTICS_PERIODS.ALL, label: t.statisticsOverviewPeriodAll }
		]),
		averageScoreLabel: t.statisticsOverviewAverageScoreLabel,
		progressLabel: t.statisticsOverviewProgressLabel,
		completedLabel: t.statisticsOverviewCompletedLabel,
		summaryLabel: t.statisticsOverviewSummaryLabel,
		chartLabel: t.statisticsOverviewChartLabel,
		chartEmptyLabel: t.statisticsOverviewChartEmptyLabel,
		chaptersTitle: t.statisticsOverviewChaptersTitle,
		chaptersSubtitle: t.statisticsOverviewChaptersSubtitle,
		historyTitle: t.statisticsOverviewHistoryTitle,
		historySubtitle: t.statisticsOverviewHistorySubtitle,
		historyDateLabel: t.statisticsOverviewHistoryDateLabel,
		historyNameLabel: t.statisticsOverviewHistoryNameLabel,
		historyScoreLabel: t.statisticsOverviewHistoryScoreLabel,
		historyShowAllLabel: t.statisticsOverviewHistoryShowAllLabel,
		historyShowLessLabel: t.statisticsOverviewHistoryShowLessLabel,
		historyPagerLabel: t.statisticsOverviewHistoryPagerLabel,
		historyPreviousPageLabel: t.statisticsOverviewHistoryPreviousPageLabel,
		historyNextPageLabel: t.statisticsOverviewHistoryNextPageLabel,

		// Legacy Statistics-felter beholdes frem til Patch 11, slik at mellomsteg fortsatt kan rendres.
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

		createPercentageLabel(value) {
			return value === null ? t.statisticsEmptyValueLabel : `${formatNumber(value)} %`;
		},

		createPercentagePointLabel(value) {
			return `${formatNumber(value)} ${selectSingularOrPlural(Math.abs(value), t.statisticsPercentagePointSingular, t.statisticsPercentagePointPlural)}`;
		},

		createEvidenceCountLabel(count) {
			return `${count} ${selectSingularOrPlural(count, t.statisticsOverviewEvidenceUnitSingular, t.statisticsOverviewEvidenceUnitPlural)}`;
		},

		createPointsLabel(scorePoints, totalPoints) {
			return `${scorePoints} / ${totalPoints} ${t.statisticsAttemptPointUnit}`;
		},

		createCorrectCountLabel(correctCount) {
			return `${correctCount} ${t.statisticsOverviewCorrectLabel}`;
		},

		createIncorrectCountLabel(incorrectCount) {
			return `${incorrectCount} ${t.statisticsOverviewIncorrectLabel}`;
		},

		createDurationSecondsLabel(durationSeconds) {
			return `${durationSeconds} ${t.statisticsOverviewSecondsShort}`;
		},

		createGoToHistoryPageLabel(pageNumber) {
			return t.statisticsOverviewHistoryGoToPageLabel(pageNumber);
		},

		createHistoryPageCounterLabel(pageIndex, pageCount) {
			return t.statisticsOverviewHistoryPageCounterLabel(pageIndex + HISTORY_PAGE_NUMBER_OFFSET, pageCount);
		},

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
			const hours = Math.floor(totalMinutes / MINUTES_PER_HOUR);
			const minutes = totalMinutes % MINUTES_PER_HOUR;

			if (hours === NO_REMAINDER) {
				return `${minutes} ${t.statisticsActivityMinuteShort}`;
			}

			if (minutes === NO_REMAINDER) {
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

	if (prefixStart === NOT_FOUND_INDEX) {
		return null;
	}

	let numberStart = prefixStart + prefix.length;

	while (value[numberStart] === "-" || value[numberStart] === "_") {
		numberStart += STRING_INDEX_STEP;
	}

	let numberText = "";

	for (let index = numberStart; index < value.length; index += STRING_INDEX_STEP) {
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
	return count === SINGULAR_COUNT ? singular : plural;
}

function formatNumber(value) {
	return Number.isInteger(value) ? String(value) : value.toFixed(PERCENTAGE_DECIMAL_PLACES);
}
