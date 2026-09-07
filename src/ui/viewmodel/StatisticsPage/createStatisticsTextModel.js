// src/ui/viewmodel/StatisticsPage/createStatisticsTextModel.js
import { STATISTICS_PERIODS } from "../../../constants/StatisticsContracts.js";

const SINGULAR_COUNT = 1;
const PERCENTAGE_DECIMAL_PLACES = 1;
const HISTORY_PAGE_NUMBER_OFFSET = 1;

export default function createStatisticsTextModel(t) {
	return {
		pageTitle: t.selectStatistics,
		pageSubtitle: t.statisticsPageSubtitle,
		subjectSelectorMenuLabel: t.sidebarSubjectMenuLabel,
		subjectSelectorCloseLabel: t.sidebarCloseSubjectMenu,
		loadingTitle: t.statisticsLoadingTitle,
		signedOutTitle: t.statisticsSignedOutTitle,
		signedOutBody: t.statisticsSignedOutBody,
		emptyTitle: t.statisticsHeroEmptyTitle,
		emptyBody: t.statisticsHeroEmptyBody,
		errorTitle: t.statisticsErrorTitle,
		retryButton: t.statisticsRetryButton,
		startNewExamButton: t.statisticsStartNewExamButton,
		loadErrorMessage: t.statisticsLoadErrorMessage,
		emptyValueLabel: t.statisticsEmptyValueLabel,
		developmentTitle: t.statisticsOverviewDevelopmentTitle,
		developmentSubtitle: t.statisticsOverviewDevelopmentSubtitle,
		periodLabel: t.statisticsOverviewPeriodLabel,
		previousPeriodLabel: t.statisticsOverviewPreviousPeriodLabel,
		nextPeriodLabel: t.statisticsOverviewNextPeriodLabel,
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
		completedUnitLabel: t.statisticsOverviewEvidenceUnitPlural,
		summaryLabel: t.statisticsOverviewSummaryLabel,
		chartLabel: t.statisticsOverviewChartLabel,
		chartEmptyLabel: t.statisticsOverviewChartEmptyLabel,
		chaptersTitle: t.statisticsOverviewChaptersTitle,
		chaptersSubtitle: t.statisticsOverviewChaptersSubtitle,
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

		createPercentagePointShortLabel(value) {
			return `${formatSignedNumber(value)} ${t.statisticsPercentagePointShort}`;
		},

		createPercentagePointNumberLabel(value) {
			return formatSignedNumber(value);
		},

		createPercentagePointUnitLabel(value) {
			return selectSingularOrPlural(Math.abs(value), t.statisticsPercentagePointSingular, t.statisticsPercentagePointPlural);
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

function formatSignedNumber(value) {
	const numberLabel = formatNumber(value);

	if (value > 0) {
		return `+${numberLabel}`;
	}

	return numberLabel;
}
