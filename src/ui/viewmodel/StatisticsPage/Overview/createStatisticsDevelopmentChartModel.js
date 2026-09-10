// src/ui/viewmodel/StatisticsPage/Overview/createStatisticsDevelopmentChartModel.js
import { STATISTICS_CHART_LAYOUT_MODES, STATISTICS_CHART_PERIODS, STATISTICS_PERIODS } from "../../../../constants/StatisticsContracts.js";
import roundMasteryPercentage from "../../Shared/roundMasteryPercentage.js";

const CHART_POINT_INDEX_STEP = 1;
const FIRST_INDEX = 0;
const PERCENTAGE_MAX = 100;
const PERCENTAGE_MIN = 0;
const HOURS_MINUTES_PAD_LENGTH = 2;
const CALENDAR_MONTH_FIRST_DAY = 1;
export default function createStatisticsDevelopmentChartModel({ developmentPeriods, selectedPeriod, formatDate, text }) {
	const weekMetrics = findDevelopmentPeriod(developmentPeriods, STATISTICS_PERIODS.WEEK);
	const todayPoints = filterPointsToLocalDay(weekMetrics.chartPoints, parseStatisticsTimestamp(weekMetrics.windowEndAt, "windowEndAt"));
	const hasTodayData = todayPoints.length > 0;
	const dailyBestPercentage = findHighestPercentage(todayPoints);
	let period = selectedPeriod;

	if (period === STATISTICS_CHART_PERIODS.TODAY && !hasTodayData) {
		period = STATISTICS_CHART_PERIODS.WEEK;
	}

	let developmentMetrics = findDevelopmentPeriod(developmentPeriods, period);
	let chartModel;

	if (period === STATISTICS_CHART_PERIODS.TODAY) {
		developmentMetrics = createTodayDevelopmentMetrics(weekMetrics, todayPoints);
		chartModel = createTodayChartModel(todayPoints, weekMetrics.windowEndAt, formatDate, text);
	}
	else if (period === STATISTICS_CHART_PERIODS.WEEK) {
		chartModel = createWeekChartModel(developmentMetrics, formatDate, text);
	}
	else if (period === STATISTICS_CHART_PERIODS.MONTH) {
		chartModel = createCompactMonthChartModel(developmentMetrics, formatDate, text);
	}
	else if (isCalendarMonthAxisPeriod(period)) {
		chartModel = createCalendarMonthChartModel(developmentMetrics, formatDate, text);
	}
	else if (period === STATISTICS_CHART_PERIODS.ALL) {
		chartModel = createSequentialChartModel(developmentMetrics.chartPoints, formatDate, text, createAllRangeLabel(developmentMetrics, formatDate, text));
	}
	else {
		chartModel = createContinuousChartModel(developmentMetrics.chartPoints, developmentMetrics, formatDate, text);
	}

	return {
		period,
		hasTodayData,
		developmentMetrics,
		chartPoints: chartModel.points,
		axisTicks: chartModel.axisTicks,
		rangeLabel: chartModel.rangeLabel,
		layoutMode: chartModel.layoutMode,
		dailyBestValue: text.createPercentageLabel(roundMasteryPercentage(dailyBestPercentage)),
		averageValue: text.createPercentageLabel(roundMasteryPercentage(calculateAveragePercentage(chartModel.points)))
	};
}


function createTodayDevelopmentMetrics(weekMetrics, todayPoints) {
	let progressPercentagePoints = null;
	let progressEvidenceCount = 0;

	for (const point of todayPoints) {
		progressEvidenceCount += point.evidenceCount;
	}

	if (todayPoints.length > 0) {
		const firstTodayEpochMs = todayPoints[FIRST_INDEX].occurredAtEpochMs;
		let baselinePercentage = resolveWeekBaselinePercentage(weekMetrics);

		for (const point of weekMetrics.chartPoints) {
			if (point.occurredAtEpochMs >= firstTodayEpochMs) {
				break;
			}

			baselinePercentage = point.percentage;
		}

		progressPercentagePoints = todayPoints[todayPoints.length - CHART_POINT_INDEX_STEP].percentage - baselinePercentage;
	}

	return {
		...weekMetrics,
		period: STATISTICS_CHART_PERIODS.TODAY,
		progressPercentagePoints,
		progressEvidenceCount,
		chartPoints: todayPoints
	};
}

function resolveWeekBaselinePercentage(weekMetrics) {
	if (weekMetrics.chartPoints.length === 0 || weekMetrics.progressPercentagePoints === null) {
		return PERCENTAGE_MIN;
	}

	const latestWeekPoint = weekMetrics.chartPoints[weekMetrics.chartPoints.length - CHART_POINT_INDEX_STEP];
	return latestWeekPoint.percentage - weekMetrics.progressPercentagePoints;
}

function createTodayChartModel(todayPoints, windowEndAt, formatDate, text) {
	if (todayPoints.length === 0) {
		const todayLabel = formatStatisticsDate(windowEndAt, formatDate);
		return { points: [], axisTicks: [], rangeLabel: todayLabel, layoutMode: STATISTICS_CHART_LAYOUT_MODES.COMPACT };
	}

	const points = createSequentialPointModels(
		todayPoints,
		(point) => createTimeLabel(point.occurredAtEpochMs),
		text.createPercentageLabel
	);
	const axisTicks = points.map((point) => ({
		key: `axis:${point.key}`,
		label: point.label,
		positionPercent: point.positionPercent
	}));
	const rangeLabel = formatStatisticsDate(windowEndAt, formatDate);

	return { points, axisTicks, rangeLabel, layoutMode: STATISTICS_CHART_LAYOUT_MODES.COMPACT };
}

function createWeekChartModel(developmentMetrics, formatDate, text) {
	if (developmentMetrics.chartPoints.length === 0) {
		return {
			points: [],
			axisTicks: [],
			rangeLabel: createFallbackRangeLabel(developmentMetrics, formatDate, text),
			layoutMode: STATISTICS_CHART_LAYOUT_MODES.TIME
		};
	}

	const dailyBestPoints = selectDailyBestPoints(developmentMetrics.chartPoints);
	const firstDayEpochMs = startOfLocalDay(dailyBestPoints[FIRST_INDEX].occurredAtEpochMs);
	const endDayEpochMs = startOfLocalDay(parseStatisticsTimestamp(developmentMetrics.windowEndAt, "windowEndAt"));
	const axisTicks = createCompressedWeekdayAxisTicks(dailyBestPoints, endDayEpochMs, text);
	const positionByDayKey = new Map();

	for (const tick of axisTicks) {
		positionByDayKey.set(tick.dayKey, tick.positionPercent);
	}

	const points = dailyBestPoints.map((point, index) => {
		const positionPercent = positionByDayKey.get(createLocalDayKey(point.occurredAtEpochMs));

		if (positionPercent === undefined) {
			throw new Error("Statistics week chart point is outside the visible calendar axis");
		}

		return {
			key: point.key,
			value: point.percentage,
			label: formatStatisticsDate(point.occurredAt, formatDate),
			valueLabel: text.createPercentageLabel(point.percentage),
			positionPercent,
			isLatest: index === dailyBestPoints.length - CHART_POINT_INDEX_STEP
		};
	});
	const rangeLabel = createRangeLabelFromEpochs(firstDayEpochMs, endDayEpochMs, formatDate, text);

	return { points, axisTicks, rangeLabel, layoutMode: STATISTICS_CHART_LAYOUT_MODES.COMPACT };
}

function createCompactMonthChartModel(developmentMetrics, formatDate, text) {
	if (developmentMetrics.chartPoints.length === 0) {
		return {
			points: [],
			axisTicks: [],
			rangeLabel: createFallbackRangeLabel(developmentMetrics, formatDate, text),
			layoutMode: STATISTICS_CHART_LAYOUT_MODES.COMPACT
		};
	}

	const dailyBestPoints = selectDailyBestPoints(developmentMetrics.chartPoints);
	const points = createSequentialPointModels(
		dailyBestPoints,
		(point) => formatStatisticsDate(point.occurredAt, formatDate),
		text.createPercentageLabel
	);
	const axisTicks = points.map((point) => ({
		key: `axis:${point.key}`,
		label: point.label,
		positionPercent: point.positionPercent
	}));
	const firstEpochMs = dailyBestPoints[FIRST_INDEX].occurredAtEpochMs;
	const lastEpochMs = dailyBestPoints[dailyBestPoints.length - CHART_POINT_INDEX_STEP].occurredAtEpochMs;
	const rangeLabel = createRangeLabelFromEpochs(firstEpochMs, lastEpochMs, formatDate, text);

	return { points, axisTicks, rangeLabel, layoutMode: STATISTICS_CHART_LAYOUT_MODES.COMPACT };
}

function createCalendarMonthChartModel(developmentMetrics, formatDate, text) {
	if (developmentMetrics.chartPoints.length === 0) {
		return {
			points: [],
			axisTicks: [],
			rangeLabel: createFallbackRangeLabel(developmentMetrics, formatDate, text),
			layoutMode: STATISTICS_CHART_LAYOUT_MODES.TIME
		};
	}

	const axisStartEpochMs = parseStatisticsTimestamp(developmentMetrics.windowStartAt, "windowStartAt");
	const axisEndEpochMs = parseStatisticsTimestamp(developmentMetrics.windowEndAt, "windowEndAt");
	const points = createPointModels(
		developmentMetrics.chartPoints,
		axisStartEpochMs,
		axisEndEpochMs,
		(point) => formatStatisticsDate(point.occurredAt, formatDate),
		text.createPercentageLabel
	);
	const axisTicks = createCalendarMonthAxisTicks(axisStartEpochMs, axisEndEpochMs, text);
	const rangeLabel = createRangeLabelFromEpochs(axisStartEpochMs, axisEndEpochMs, formatDate, text);

	return { points, axisTicks, rangeLabel, layoutMode: STATISTICS_CHART_LAYOUT_MODES.TIME };
}

function createCalendarMonthAxisTicks(axisStartEpochMs, axisEndEpochMs, text) {
	if (axisEndEpochMs < axisStartEpochMs) {
		throw new Error("Statistics calendar chart ends before it starts");
	}

	const ticks = [];
	let monthEpochMs = firstLocalMonthStartAfter(axisStartEpochMs);

	while (monthEpochMs <= axisEndEpochMs) {
		const date = new Date(monthEpochMs);
		ticks.push({
			key: `month:${date.getFullYear()}-${date.getMonth()}`,
			label: text.monthShortLabels[date.getMonth()],
			positionPercent: createChartPositionPercent(monthEpochMs, axisStartEpochMs, axisEndEpochMs)
		});
		monthEpochMs = addLocalCalendarMonth(monthEpochMs);
	}

	return ticks;
}

function createContinuousChartModel(chartPoints, developmentMetrics, formatDate, text) {
	if (chartPoints.length === 0) {
		return {
			points: [],
			axisTicks: [],
			rangeLabel: createFallbackRangeLabel(developmentMetrics, formatDate, text),
			layoutMode: STATISTICS_CHART_LAYOUT_MODES.TIME
		};
	}

	const firstEpochMs = chartPoints[FIRST_INDEX].occurredAtEpochMs;
	const lastEpochMs = chartPoints[chartPoints.length - CHART_POINT_INDEX_STEP].occurredAtEpochMs;
	const points = createPointModels(chartPoints, firstEpochMs, lastEpochMs, (point) => formatStatisticsDate(point.occurredAt, formatDate), text.createPercentageLabel);
	const axisTicks = createEndpointAxisTicks(points);
	const rangeLabel = createRangeLabelFromEpochs(firstEpochMs, lastEpochMs, formatDate, text);

	return { points, axisTicks, rangeLabel, layoutMode: STATISTICS_CHART_LAYOUT_MODES.TIME };
}

function createSequentialChartModel(chartPoints, formatDate, text, rangeLabel) {
	if (chartPoints.length === 0) {
		return {
			points: [],
			axisTicks: [],
			rangeLabel,
			layoutMode: STATISTICS_CHART_LAYOUT_MODES.SEQUENCE
		};
	}

	const points = createSequentialPointModels(chartPoints, (point) => formatStatisticsDate(point.occurredAt, formatDate), text.createPercentageLabel);
	const axisTicks = points.map((point) => ({
		key: `axis:${point.key}`,
		label: point.label,
		positionPercent: point.positionPercent
	}));

	return { points, axisTicks, rangeLabel, layoutMode: STATISTICS_CHART_LAYOUT_MODES.SEQUENCE };
}

function createPointModels(chartPoints, axisStartEpochMs, axisEndEpochMs, createLabel, createValueLabel) {
	const lastIndex = chartPoints.length - CHART_POINT_INDEX_STEP;

	return chartPoints.map((chartPoint, index) => ({
		key: chartPoint.key,
		value: chartPoint.percentage,
		label: createLabel(chartPoint),
		valueLabel: createValueLabel(chartPoint.percentage),
		positionPercent: createChartPositionPercent(chartPoint.occurredAtEpochMs, axisStartEpochMs, axisEndEpochMs),
		isLatest: index === lastIndex
	}));
}

function createSequentialPointModels(chartPoints, createLabel, createValueLabel) {
	const lastIndex = chartPoints.length - CHART_POINT_INDEX_STEP;

	return chartPoints.map((chartPoint, index) => ({
		key: chartPoint.key,
		value: chartPoint.percentage,
		label: createLabel(chartPoint),
		valueLabel: createValueLabel(chartPoint.percentage),
		positionPercent: lastIndex === FIRST_INDEX ? PERCENTAGE_MIN : index / lastIndex * PERCENTAGE_MAX,
		isLatest: index === lastIndex
	}));
}

function createEndpointAxisTicks(points) {
	if (points.length === 0) {
		return [];
	}

	const firstPoint = points[FIRST_INDEX];
	const ticks = [{ key: `axis:${firstPoint.key}`, label: firstPoint.label, positionPercent: PERCENTAGE_MIN }];

	if (points.length > CHART_POINT_INDEX_STEP) {
		const lastPoint = points[points.length - CHART_POINT_INDEX_STEP];
		ticks.push({ key: `axis:${lastPoint.key}`, label: lastPoint.label, positionPercent: PERCENTAGE_MAX });
	}

	return ticks;
}

function createCompressedWeekdayAxisTicks(dailyBestPoints, endDayEpochMs, text) {
	const activeDayEpochs = dailyBestPoints.map((point) => startOfLocalDay(point.occurredAtEpochMs));
	const lastActiveDayEpochMs = activeDayEpochs[activeDayEpochs.length - CHART_POINT_INDEX_STEP];

	if (endDayEpochMs < lastActiveDayEpochMs) {
		throw new Error("Statistics week chart ends before its last active day");
	}

	const dayEpochs = [...activeDayEpochs];
	let trailingDayEpochMs = addLocalCalendarDay(lastActiveDayEpochMs);

	while (trailingDayEpochMs <= endDayEpochMs) {
		dayEpochs.push(trailingDayEpochMs);
		trailingDayEpochMs = addLocalCalendarDay(trailingDayEpochMs);
	}

	const lastIndex = dayEpochs.length - CHART_POINT_INDEX_STEP;

	return dayEpochs.map((epochMs, index) => ({
		key: `day:${createLocalDayKey(epochMs)}`,
		dayKey: createLocalDayKey(epochMs),
		label: text.weekdayShortLabels[new Date(epochMs).getDay()],
		positionPercent: lastIndex === FIRST_INDEX ? PERCENTAGE_MIN : index / lastIndex * PERCENTAGE_MAX
	}));
}

function selectDailyBestPoints(chartPoints) {
	const bestByDay = new Map();

	for (const point of chartPoints) {
		const dayKey = createLocalDayKey(point.occurredAtEpochMs);
		const currentBest = bestByDay.get(dayKey);

		if (currentBest === undefined || point.percentage >= currentBest.percentage) {
			bestByDay.set(dayKey, point);
		}
	}

	const points = Array.from(bestByDay.values());
	points.sort((left, right) => left.occurredAtEpochMs - right.occurredAtEpochMs);
	return points;
}

function filterPointsToLocalDay(chartPoints, referenceEpochMs) {
	const referenceDayKey = createLocalDayKey(referenceEpochMs);
	const points = [];

	for (const point of chartPoints) {
		if (createLocalDayKey(point.occurredAtEpochMs) === referenceDayKey) {
			points.push(point);
		}
	}

	return points;
}

function findHighestPercentage(points) {
	let highestPercentage = null;

	for (const point of points) {
		if (highestPercentage === null || point.percentage > highestPercentage) {
			highestPercentage = point.percentage;
		}
	}

	return highestPercentage;
}

function calculateAveragePercentage(points) {
	if (points.length === 0) {
		return null;
	}

	let total = PERCENTAGE_MIN;

	for (const point of points) {
		total += point.value;
	}

	return total / points.length;
}

function createChartPositionPercent(occurredAtEpochMs, axisStartEpochMs, axisEndEpochMs) {
	if (!Number.isFinite(occurredAtEpochMs)) {
		throw new Error("Statistics development chart point requires occurredAtEpochMs");
	}

	if (occurredAtEpochMs < axisStartEpochMs || occurredAtEpochMs > axisEndEpochMs) {
		throw new Error("Statistics development chart point is outside the visible axis");
	}

	if (axisEndEpochMs === axisStartEpochMs) {
		return PERCENTAGE_MIN;
	}

	return (occurredAtEpochMs - axisStartEpochMs) / (axisEndEpochMs - axisStartEpochMs) * PERCENTAGE_MAX;
}

function createFallbackRangeLabel(developmentMetrics, formatDate, text) {
	if (developmentMetrics.windowEndAt === null) {
		return "";
	}

	const endLabel = formatStatisticsDate(developmentMetrics.windowEndAt, formatDate);

	if (developmentMetrics.windowStartAt === null) {
		return endLabel;
	}

	const startLabel = formatStatisticsDate(developmentMetrics.windowStartAt, formatDate);
	return text.createPeriodRangeLabel(startLabel, endLabel);
}

function createAllRangeLabel(developmentMetrics, formatDate, text) {
	return createFallbackRangeLabel(developmentMetrics, formatDate, text);
}

function createRangeLabelFromEpochs(startEpochMs, endEpochMs, formatDate, text) {
	const startLabel = formatStatisticsDate(new Date(startEpochMs).toISOString(), formatDate);
	const endLabel = formatStatisticsDate(new Date(endEpochMs).toISOString(), formatDate);

	if (startLabel === endLabel) {
		return startLabel;
	}

	return text.createPeriodRangeLabel(startLabel, endLabel);
}

function startOfLocalDay(epochMs) {
	const date = new Date(epochMs);
	return new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();
}

function addLocalCalendarDay(epochMs) {
	const date = new Date(epochMs);
	date.setDate(date.getDate() + CHART_POINT_INDEX_STEP);
	return date.getTime();
}

function firstLocalMonthStartAfter(epochMs) {
	const date = new Date(epochMs);
	return new Date(date.getFullYear(), date.getMonth() + CHART_POINT_INDEX_STEP, CALENDAR_MONTH_FIRST_DAY).getTime();
}

function addLocalCalendarMonth(epochMs) {
	const date = new Date(epochMs);
	return new Date(date.getFullYear(), date.getMonth() + CHART_POINT_INDEX_STEP, CALENDAR_MONTH_FIRST_DAY).getTime();
}

function isCalendarMonthAxisPeriod(period) {
	return period === STATISTICS_CHART_PERIODS.THREE_MONTHS
		|| period === STATISTICS_CHART_PERIODS.SIX_MONTHS
		|| period === STATISTICS_CHART_PERIODS.YEAR;
}

function createLocalDayKey(epochMs) {
	const date = new Date(epochMs);
	return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
}

function createTimeLabel(epochMs) {
	const date = new Date(epochMs);
	return `${String(date.getHours()).padStart(HOURS_MINUTES_PAD_LENGTH, "0")}:${String(date.getMinutes()).padStart(HOURS_MINUTES_PAD_LENGTH, "0")}`;
}

function formatStatisticsDate(timestamp, formatDate) {
	const label = formatDate(timestamp);

	if (label === null || label === undefined) {
		return timestamp;
	}

	return label;
}

function parseStatisticsTimestamp(timestamp, fieldName) {
	const epochMs = Date.parse(timestamp);

	if (!Number.isFinite(epochMs)) {
		throw new Error(`Invalid Statistics ${fieldName}`);
	}

	return epochMs;
}

function findDevelopmentPeriod(developmentPeriods, selectedPeriod) {
	if (selectedPeriod === STATISTICS_CHART_PERIODS.TODAY) {
		return findDevelopmentPeriod(developmentPeriods, STATISTICS_PERIODS.WEEK);
	}

	for (const developmentPeriod of developmentPeriods) {
		if (developmentPeriod.period === selectedPeriod) {
			return developmentPeriod;
		}
	}

	throw new Error(`Missing Statistics development period ${String(selectedPeriod)}`);
}
