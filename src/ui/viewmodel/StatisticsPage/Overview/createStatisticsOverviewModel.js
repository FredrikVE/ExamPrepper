// src/ui/viewmodel/StatisticsPage/Overview/createStatisticsOverviewModel.js
import { STATISTICS_MASTERY_SCOPE_KINDS, STATISTICS_PERIODS } from "../../../../constants/StatisticsContracts.js";
import { LANGUAGES } from "../../../../i18n/translations.js";
import roundMasteryPercentage from "../../Shared/roundMasteryPercentage.js";
import createStatisticsChapterModels from "./createStatisticsChapterModels.js";
import createStatisticsHistoryModel from "./createStatisticsHistoryModel.js";

const EMPTY_ATTEMPT_COUNT = 0;
const EMPTY_ATTEMPTS = Object.freeze([]);
const EMPTY_CHAPTERS = Object.freeze([]);
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
const CHART_POINT_INDEX_STEP = 1;

export default function createStatisticsOverviewModel({ statistics, period, masteryScope, historySortKey, historySortDirection, historyExpanded, historyPage, formatDate, language, subject, text }) {
	let attempts = EMPTY_ATTEMPTS;
	let chapters = EMPTY_CHAPTERS;
	let completedAttemptCount = EMPTY_ATTEMPT_COUNT;
	let selectedMastery = EMPTY_MASTERY_SCOPE;
	let selectedScopeLabel = "";
	let selectedMasteryLabel = text.masteryLabel;
	let developmentMetrics = EMPTY_DEVELOPMENT_METRICS;
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
		selectedMasteryLabel = selectedScope.masteryLabel;
		developmentMetrics = findDevelopmentPeriod(selectedMastery.developmentPeriods, period);
		chapterItems = createStatisticsChapterModels({ chapters, subjectMastery: statistics.subjectMastery, selectedScope: masteryScope, subject, language, text });
		hasDevelopmentEvidence = resolveDevelopmentEvidence(selectedMastery);
		hasChapterEvidence = resolveChapterEvidence(chapters);
	}

	const history = createStatisticsHistoryModel({ attempts, sortKey: historySortKey, sortDirection: historySortDirection, expanded: historyExpanded, page: historyPage, formatDate, text });
	const chartPoints = createChartPointModels(developmentMetrics.chartPoints, formatDate, text);
	const chartWindow = createChartWindowModel(developmentMetrics, formatDate, text);
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
			period,
			periodOptions: text.periodOptions,
			previousPeriodLabel: text.previousPeriodLabel,
			nextPeriodLabel: text.nextPeriodLabel,
			masteryLabel: selectedMasteryLabel,
			masteryValue: text.createPercentageLabel(roundMasteryPercentage(selectedMastery.masteryPercentage)),
			chartLabel: text.createChartLabel(selectedScopeLabel),
			chartPoints,
			chartAxisStartLabel: chartWindow.startLabel,
			chartAxisEndLabel: chartWindow.endLabel,
			periodRangeLabel: chartWindow.rangeLabel,
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
			label: text.createSubjectScopeLabel(subject.name),
			masteryLabel: text.subjectMasteryLabel
		};
	}

	if (masteryScope.kind === STATISTICS_MASTERY_SCOPE_KINDS.TOPIC_AREA) {
		for (const chapter of statistics.chapters) {
			if (chapter.topicAreaKey === masteryScope.topicAreaKey) {
				let label = chapter.labelNo;

				if (language === LANGUAGES.EN) {
					label = chapter.labelEn;
				}

				return { mastery: chapter, label, masteryLabel: text.masteryLabel };
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

function createChartPointModels(chartPoints, formatDate, text) {
	const lastIndex = chartPoints.length - CHART_POINT_INDEX_STEP;

	return chartPoints.map((chartPoint, index) => {
		const label = formatStatisticsDate(chartPoint.occurredAt, formatDate);

		return {
			key: chartPoint.key,
			value: chartPoint.percentage,
			label,
			valueLabel: text.createPercentageLabel(chartPoint.percentage),
			isLatest: index === lastIndex
		};
	});
}

function createChartWindowModel(developmentMetrics, formatDate, text) {
	if (developmentMetrics.windowEndAt === null) {
		return { startLabel: "", endLabel: "", rangeLabel: "" };
	}

	const endLabel = formatStatisticsDate(developmentMetrics.windowEndAt, formatDate);

	if (developmentMetrics.windowStartAt === null) {
		return { startLabel: "", endLabel, rangeLabel: endLabel };
	}

	const startLabel = formatStatisticsDate(developmentMetrics.windowStartAt, formatDate);

	if (startLabel === endLabel) {
		return { startLabel, endLabel: "", rangeLabel: startLabel };
	}

	return {
		startLabel,
		endLabel,
		rangeLabel: text.createPeriodRangeLabel(startLabel, endLabel)
	};
}

function formatStatisticsDate(timestamp, formatDate) {
	const label = formatDate(timestamp);

	if (label === null || label === undefined) {
		return timestamp;
	}

	return label;
}
