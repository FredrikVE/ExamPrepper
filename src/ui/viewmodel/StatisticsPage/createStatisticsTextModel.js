// src/ui/viewmodel/StatisticsPage/createStatisticsTextModel.js
import { STATISTICS_CHART_PERIODS } from "../../../constants/StatisticsContracts.js";

const SINGULAR_COUNT = 1;
const PERCENTAGE_DECIMAL_PLACES = 1;
const HISTORY_PAGE_NUMBER_OFFSET = 1;

export default function createStatisticsTextModel(t) {
	return {
		pageTitle: t.selectStatistics,
		pageSubtitle: t.statisticsPageSubtitle,
		viewToggleOverviewLabel: t.statisticsViewOverviewLabel,
		viewToggleInsightsLabel: t.statisticsViewInsightsLabel,
		viewToggleAriaLabel: t.statisticsViewToggleAriaLabel,
		viewToggleBackLabel: t.statisticsViewToggleBackLabel,
		subjectSelectorMenuLabel: t.sidebarSubjectMenuLabel,
		subjectSelectorCloseLabel: t.sidebarCloseSubjectMenu,
		loadingTitle: t.statisticsLoadingTitle,
		signedOutTitle: t.statisticsSignedOutTitle,
		signedOutBody: t.statisticsSignedOutBody,
		errorTitle: t.statisticsErrorTitle,
		retryButton: t.statisticsRetryButton,
		startNewExamButton: t.statisticsStartNewExamButton,
		loadErrorMessage: t.statisticsLoadErrorMessage,
		sectionLoadingLabel: t.statisticsSectionLoadingLabel,
		sectionEmptyTitle: t.statisticsSectionEmptyTitle,
		developmentEmptyBody: t.statisticsSectionDevelopmentEmptyBody,
		progressEmptyBody: t.statisticsSectionProgressEmptyBody,
		completedEmptyBody: t.statisticsSectionCompletedEmptyBody,
		chaptersEmptyBody: t.statisticsSectionChaptersEmptyBody,
		historyEmptyBody: t.statisticsSectionHistoryEmptyBody,
		emptyValueLabel: t.statisticsEmptyValueLabel,
		developmentTitle: t.statisticsOverviewDevelopmentTitle,
		createDevelopmentSubtitle: t.statisticsOverviewDevelopmentSubtitle,
		periodLabel: t.statisticsOverviewPeriodLabel,
		createPeriodRangeLabel: t.statisticsOverviewPeriodRangeLabel,
		previousPeriodLabel: t.statisticsOverviewPreviousPeriodLabel,
		nextPeriodLabel: t.statisticsOverviewNextPeriodLabel,
		periodOptions: Object.freeze([
			{ key: STATISTICS_CHART_PERIODS.TODAY, label: t.statisticsOverviewPeriodToday },
			{ key: STATISTICS_CHART_PERIODS.WEEK, label: t.statisticsOverviewPeriodWeek },
			{ key: STATISTICS_CHART_PERIODS.MONTH, label: t.statisticsOverviewPeriodMonth },
			{ key: STATISTICS_CHART_PERIODS.THREE_MONTHS, label: t.statisticsOverviewPeriodThreeMonths },
			{ key: STATISTICS_CHART_PERIODS.SIX_MONTHS, label: t.statisticsOverviewPeriodSixMonths },
			{ key: STATISTICS_CHART_PERIODS.YEAR, label: t.statisticsOverviewPeriodYear },
			{ key: STATISTICS_CHART_PERIODS.ALL, label: t.statisticsOverviewPeriodAll }
		]),
		weekdayShortLabels: Object.freeze([
			t.statisticsWeekdaySundayShort,
			t.statisticsWeekdayMondayShort,
			t.statisticsWeekdayTuesdayShort,
			t.statisticsWeekdayWednesdayShort,
			t.statisticsWeekdayThursdayShort,
			t.statisticsWeekdayFridayShort,
			t.statisticsWeekdaySaturdayShort
		]),
		monthShortLabels: Object.freeze([
			t.statisticsMonthJanuaryShort,
			t.statisticsMonthFebruaryShort,
			t.statisticsMonthMarchShort,
			t.statisticsMonthAprilShort,
			t.statisticsMonthMayShort,
			t.statisticsMonthJuneShort,
			t.statisticsMonthJulyShort,
			t.statisticsMonthAugustShort,
			t.statisticsMonthSeptemberShort,
			t.statisticsMonthOctoberShort,
			t.statisticsMonthNovemberShort,
			t.statisticsMonthDecemberShort
		]),
		dailyBestLabel: t.statisticsOverviewDailyBestLabel,
		averageLabel: t.statisticsOverviewAverageLabel,
		subjectMasteryLabel: t.statisticsOverviewSubjectMasteryLabel,
		createSubjectScopeLabel: t.statisticsOverviewSubjectScopeLabel,
		progressLabel: t.statisticsOverviewProgressLabel,
		createProgressAttemptSummaryLabel: t.statisticsOverviewProgressAttemptSummaryLabel,
		completedLabel: t.statisticsOverviewCompletedLabel,
		completedUnitLabel: t.statisticsOverviewCompletedUnitLabel,
		summaryLabel: t.statisticsOverviewSummaryLabel,
		createChartLabel: t.statisticsOverviewChartLabel,
		chartEmptyLabel: t.statisticsOverviewChartEmptyLabel,
		chaptersTitle: t.statisticsOverviewChaptersTitle,
		chaptersSubtitle: t.statisticsOverviewChaptersSubtitle,
		masteryLabel: t.statisticsOverviewMasteryLabel,
		chaptersCarouselLabel: t.statisticsOverviewChaptersCarouselLabel,
		chaptersPreviousLabel: t.statisticsOverviewChaptersPreviousLabel,
		chaptersNextLabel: t.statisticsOverviewChaptersNextLabel,
		chaptersShowAllLabel: t.statisticsOverviewChaptersShowAllLabel,
		chaptersShowLessLabel: t.statisticsOverviewChaptersShowLessLabel,
		historyTitle: t.statisticsOverviewHistoryTitle,
		historySubtitle: t.statisticsOverviewHistorySubtitle,
		historyDateLabel: t.statisticsOverviewHistoryDateLabel,
		historyNameLabel: t.statisticsOverviewHistoryNameLabel,
		historyStatusLabel: t.statisticsOverviewHistoryStatusLabel,
		historyScoreLabel: t.statisticsOverviewHistoryScoreLabel,
		historyDetailsLabel: t.statisticsOverviewHistoryDetailsLabel,
		historyShowDetailsLabel: t.statisticsOverviewHistoryShowDetailsLabel,
		historyHideDetailsLabel: t.statisticsOverviewHistoryHideDetailsLabel,
		historyStatusGoodLabel: t.statisticsOverviewHistoryStatusGoodLabel,
		historyStatusAttentionLabel: t.statisticsOverviewHistoryStatusAttentionLabel,
		historyStatusRiskLabel: t.statisticsOverviewHistoryStatusRiskLabel,
		historyStatusNotAssessedLabel: t.statisticsOverviewHistoryStatusNotAssessedLabel,
		historyPointsLabel: t.statisticsOverviewHistoryPointsLabel,
		historyCorrectAnswersLabel: t.statisticsOverviewHistoryCorrectAnswersLabel,
		historyIncorrectAnswersLabel: t.statisticsOverviewHistoryIncorrectAnswersLabel,
		historyTimeUsedLabel: t.statisticsOverviewHistoryTimeUsedLabel,
		historyShowAllLabel: t.statisticsOverviewHistoryShowAllLabel,
		historyShowLessLabel: t.statisticsOverviewHistoryShowLessLabel,
		historyPagerLabel: t.statisticsOverviewHistoryPagerLabel,
		historyPreviousPageLabel: t.statisticsOverviewHistoryPreviousPageLabel,
		historyNextPageLabel: t.statisticsOverviewHistoryNextPageLabel,

		createPercentageLabel(value) {
			if (value === null) {
				return t.statisticsEmptyValueLabel;
			}

			return `${formatNumber(value)} %`;
		},

		createPercentagePointNumberLabel(value) {
			return `${formatNumber(value)} %`;
		},

		createPercentagePointUnitLabel(value) {
			return selectSingularOrPlural(Math.abs(value), t.statisticsPercentagePointSingular, t.statisticsPercentagePointPlural);
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
		}
	};
}

function selectSingularOrPlural(count, singular, plural) {
	if (count === SINGULAR_COUNT) {
		return singular;
	}

	return plural;
}

function formatNumber(value) {
	if (Number.isInteger(value)) {
		return String(value);
	}

	return value.toFixed(PERCENTAGE_DECIMAL_PLACES);
}
