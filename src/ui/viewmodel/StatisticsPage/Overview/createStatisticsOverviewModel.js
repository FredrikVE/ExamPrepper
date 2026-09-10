// src/ui/viewmodel/StatisticsPage/Overview/createStatisticsOverviewModel.js
import { STATISTICS_CHART_LAYOUT_MODES, STATISTICS_CHART_PERIODS, STATISTICS_MASTERY_SCOPE_KINDS, STATISTICS_PERIODS } from "../../../../constants/StatisticsContracts.js";
import { LANGUAGES } from "../../../../i18n/translations.js";
import createStatisticsChapterModels from "./createStatisticsChapterModels.js";
import createStatisticsDevelopmentChartModel from "./createStatisticsDevelopmentChartModel.js";
import createStatisticsHistoryModel from "./createStatisticsHistoryModel.js";

const EMPTY_ATTEMPT_COUNT = 0;
const EMPTY_ATTEMPTS = Object.freeze([]);
const EMPTY_CHAPTERS = Object.freeze([]);
const EMPTY_CHART_POINTS = Object.freeze([]);
const EMPTY_AXIS_TICKS = Object.freeze([]);
const EMPTY_DEVELOPMENT_METRICS = Object.freeze({
	windowStartAt: null,
	windowEndAt: null,
	progressPercentagePoints: null,
	progressEvidenceCount: 0,
	chartPoints: Object.freeze([])
});
const EMPTY_MASTERY_SCOPE = Object.freeze({
	masteryPercentage: null,
	performanceBand: "not-assessed",
	developmentPeriods: Object.freeze([])
});

export default function createStatisticsOverviewModel({ statistics, period, masteryScope, historySortKey, historySortDirection, historyExpanded, historyPage, formatDate, language, subject, text }) {
	let attempts = EMPTY_ATTEMPTS;
	let chapters = EMPTY_CHAPTERS;
	let completedAttemptCount = EMPTY_ATTEMPT_COUNT;
	let selectedMastery = EMPTY_MASTERY_SCOPE;
	let selectedScopeLabel = "";
	let developmentMetrics = EMPTY_DEVELOPMENT_METRICS;
	let chartPoints = EMPTY_CHART_POINTS;
	let chartAxisTicks = EMPTY_AXIS_TICKS;
	let selectedPeriod = period;
	let periodOptions = text.periodOptions;
	let periodRangeLabel = "";
	let chartLayoutMode = STATISTICS_CHART_LAYOUT_MODES.TIME;
	let dailyBestValue = text.emptyValueLabel;
	let averageValue = text.emptyValueLabel;
	let chapterItems = EMPTY_CHAPTERS;
	let hasDevelopmentEvidence = false;
	let hasChapterEvidence = false;

	if (statistics !== null) {
		if (subject === null) {
			throw new Error("Loaded Statistics requires a selected subject");
		}

		attempts = statistics.attempts;
		chapters = statistics.chapters;
		completedAttemptCount = statistics.completedAttemptCount;
		const selectedScope = resolveMasteryScope({ statistics, masteryScope, subject, language, text });
		selectedMastery = selectedScope.mastery;
		selectedScopeLabel = selectedScope.label;
		const developmentChart = createStatisticsDevelopmentChartModel({
			developmentPeriods: selectedMastery.developmentPeriods,
			selectedPeriod: period,
			formatDate,
			text
		});
		developmentMetrics = developmentChart.developmentMetrics;
		chartPoints = developmentChart.chartPoints;
		chartAxisTicks = developmentChart.axisTicks;
		selectedPeriod = developmentChart.period;
		periodOptions = createAvailablePeriodOptions(text.periodOptions, developmentChart.hasTodayData);
		periodRangeLabel = developmentChart.rangeLabel;
		chartLayoutMode = developmentChart.layoutMode;
		dailyBestValue = developmentChart.dailyBestValue;
		averageValue = developmentChart.averageValue;
		chapterItems = createStatisticsChapterModels({ chapters, subjectMastery: statistics.subjectMastery, selectedScope: masteryScope, subject, language, text });
		hasDevelopmentEvidence = resolveDevelopmentEvidence(selectedMastery);
		hasChapterEvidence = resolveChapterEvidence(chapters);
	}

	const history = createStatisticsHistoryModel({ attempts, sortKey: historySortKey, sortDirection: historySortDirection, expanded: historyExpanded, page: historyPage, formatDate, text });
	let historyToggleLabel = text.historyShowAllLabel;
	let progressNumberValue = text.emptyValueLabel;
	let progressUnitLabel = "";
	let progressAttemptSummaryLabel = "";
	let progressDirection = "neutral";
	let hasProgress = false;

	if (history.expanded) {
		historyToggleLabel = text.historyShowLessLabel;
	}

	if (developmentMetrics.progressPercentagePoints !== null) {
		hasProgress = true;
		progressNumberValue = text.createPercentagePointNumberLabel(developmentMetrics.progressPercentagePoints);
		progressUnitLabel = text.createPercentagePointUnitLabel(developmentMetrics.progressPercentagePoints);
		progressAttemptSummaryLabel = text.createProgressAttemptSummaryLabel(developmentMetrics.progressEvidenceCount);

		if (developmentMetrics.progressPercentagePoints > 0) {
			progressDirection = "up";
		}
		else if (developmentMetrics.progressPercentagePoints < 0) {
			progressDirection = "down";
		}
	}

	return {
		development: {
			hasEvidence: hasDevelopmentEvidence,
			title: text.developmentTitle,
			subtitle: text.createDevelopmentSubtitle(selectedScopeLabel),
			periodLabel: text.periodLabel,
			period: selectedPeriod,
			periodOptions,
			previousPeriodLabel: text.previousPeriodLabel,
			nextPeriodLabel: text.nextPeriodLabel,
			masteryLabel: text.dailyBestLabel,
			masteryValue: dailyBestValue,
			averageLabel: text.averageLabel,
			averageValue,
			chartLabel: text.createChartLabel(selectedScopeLabel),
			chartPoints,
			chartAxisTicks,
			chartLayoutMode,
			periodRangeLabel,
			chartEmptyLabel: text.chartEmptyLabel
		},
		summary: {
			ariaLabel: text.summaryLabel,
			completedLabel: text.completedLabel,
			completedValue: String(completedAttemptCount),
			completedUnitLabel: text.completedUnitLabel,
			progressLabel: text.progressLabel,
			progressNumberValue,
			progressUnitLabel,
			progressAttemptSummaryLabel,
			hasProgress,
			progressDirection
		},
		chapters: {
			hasEvidence: hasChapterEvidence,
			title: text.chaptersTitle,
			subtitle: text.chaptersSubtitle,
			carouselLabel: text.chaptersCarouselLabel,
			previousLabel: text.chaptersPreviousLabel,
			nextLabel: text.chaptersNextLabel,
			showAllLabel: text.chaptersShowAllLabel,
			showLessLabel: text.chaptersShowLessLabel,
			items: chapterItems
		},
		history: {
			...history,
			title: text.historyTitle,
			subtitle: text.historySubtitle,
			dateLabel: text.historyDateLabel,
			nameLabel: text.historyNameLabel,
			statusLabel: text.historyStatusLabel,
			scoreLabel: text.historyScoreLabel,
			detailsLabel: text.historyDetailsLabel,
			toggleLabel: historyToggleLabel,
			pagerLabel: text.historyPagerLabel,
			previousPageLabel: text.historyPreviousPageLabel,
			nextPageLabel: text.historyNextPageLabel,
			createGoToPageLabel: text.createGoToHistoryPageLabel,
			createPageCounterLabel: text.createHistoryPageCounterLabel
		}
	};
}

function resolveMasteryScope({ statistics, masteryScope, subject, language, text }) {
	if (masteryScope.kind === STATISTICS_MASTERY_SCOPE_KINDS.SUBJECT) {
		return {
			mastery: statistics.subjectMastery,
			label: text.createSubjectScopeLabel(subject.name)
		};
	}

	if (masteryScope.kind === STATISTICS_MASTERY_SCOPE_KINDS.TOPIC_AREA) {
		for (const chapter of statistics.chapters) {
			if (chapter.topicAreaKey === masteryScope.topicAreaKey) {
				let label = chapter.labelNo;

				if (language === LANGUAGES.EN) {
					label = chapter.labelEn;
				}

				return { mastery: chapter, label };
			}
		}

		throw new Error(`Missing Statistics mastery scope ${String(masteryScope.topicAreaKey)}`);
	}

	throw new Error(`Unknown Statistics mastery scope kind: ${String(masteryScope.kind)}`);
}

function resolveDevelopmentEvidence(selectedMastery) {
	const allDevelopmentMetrics = findDevelopmentPeriod(selectedMastery.developmentPeriods, STATISTICS_PERIODS.ALL);

	return allDevelopmentMetrics.chartPoints.length > 0;
}

function resolveChapterEvidence(chapters) {
	for (const chapter of chapters) {
		if (chapter.masteryPercentage !== null) {
			return true;
		}
	}

	return false;
}

function findDevelopmentPeriod(developmentPeriods, selectedPeriod) {
	for (const developmentPeriod of developmentPeriods) {
		if (developmentPeriod.period === selectedPeriod) {
			return developmentPeriod;
		}
	}

	throw new Error(`Missing Statistics development period ${String(selectedPeriod)}`);
}

function createAvailablePeriodOptions(periodOptions, hasTodayData) {
	if (hasTodayData) {
		return periodOptions;
	}

	return periodOptions.filter((option) => option.key !== STATISTICS_CHART_PERIODS.TODAY);
}
