// src/ui/viewmodel/StatisticsPage/createWeeklyActivityModel.js
import { normalizeNumber, normalizeNullablePercentagePoints } from "./statisticsNumbers.js";
import { createPercentageLabel } from "./statisticsValueLabels.js";

const WEEKDAY_KEYS = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];
const ACTIVITY_TONES = ["blue", "teal", "green", "orange", "pink", "purple", "neutral"];

export function createWeeklyActivityModel(weeklyActivity, copy) {
	const days = createWeeklyActivityDays(weeklyActivity?.days, copy);
	const totalMinutes = normalizeNumber(weeklyActivity?.totalMinutesThisWeek);
	const changePercentage = normalizeNullablePercentagePoints(weeklyActivity?.changePercentageFromPreviousWeek);
	const maxMinutes = findMaxMinutes(days);

	return {
		title: copy.weeklyActivityTitle,
		totalTimeLabel: copy.createDurationLabel(totalMinutes),
		totalTimeCaption: copy.weeklyActivityTotalTimeCaption,
		changeLabel: createWeeklyActivityChangeLabel(changePercentage, copy),
		changeTone: createWeeklyActivityChangeTone(changePercentage),
		note: copy.weeklyActivityNote,
		days: addBarHeights(days, maxMinutes)
	};
}

function createWeeklyActivityDays(rawDays, copy) {
	const daysByKey = createDaysByKey(rawDays);
	const days = [];

	for (let index = 0; index < WEEKDAY_KEYS.length; index += 1) {
		const key = WEEKDAY_KEYS[index];
		const rawDay = daysByKey[key];

		days.push(createWeeklyActivityDay(key, rawDay, index, copy));
	}

	return days;
}

function createDaysByKey(rawDays) {
	const daysByKey = {};

	if (!Array.isArray(rawDays)) {
		return daysByKey;
	}

	for (const rawDay of rawDays) {
		if (!rawDay?.key) {
			continue;
		}

		daysByKey[rawDay.key] = rawDay;
	}

	return daysByKey;
}

function createWeeklyActivityDay(key, rawDay, index, copy) {
	const totalMinutes = normalizeNumber(rawDay?.totalMinutes);

	return {
		key,
		label: copy.weekdayLabels[key],
		totalMinutes,
		attemptCount: normalizeNumber(rawDay?.attemptCount),
		tone: ACTIVITY_TONES[index]
	};
}

function findMaxMinutes(days) {
	let maxMinutes = 0;

	for (const day of days) {
		if (day.totalMinutes > maxMinutes) {
			maxMinutes = day.totalMinutes;
		}
	}

	return maxMinutes;
}

function addBarHeights(days, maxMinutes) {
	const daysWithHeights = [];

	for (const day of days) {
		daysWithHeights.push({
			...day,
			barHeight: createBarHeight(day.totalMinutes, maxMinutes)
		});
	}

	return daysWithHeights;
}

function createBarHeight(totalMinutes, maxMinutes) {
	if (totalMinutes === 0 || maxMinutes === 0) {
		return "4px";
	}

	const percentage = Math.round((totalMinutes / maxMinutes) * 100);

	if (percentage < 12) {
		return "12%";
	}

	return `${percentage}%`;
}

function createWeeklyActivityChangeLabel(changePercentage, copy) {
	if (changePercentage === null) {
		return copy.weeklyActivityNoComparisonLabel;
	}

	const percentageLabel = createPercentageLabel(Math.abs(changePercentage), copy);

	if (changePercentage > 0) {
		return `+${percentageLabel} ${copy.weeklyActivityChangeSuffix}`;
	}

	if (changePercentage < 0) {
		return `-${percentageLabel} ${copy.weeklyActivityChangeSuffix}`;
	}

	return copy.weeklyActivityNoChangeLabel;
}

function createWeeklyActivityChangeTone(changePercentage) {
	if (changePercentage === null) {
		return "neutral";
	}

	if (changePercentage < 0) {
		return "negative";
	}

	return "positive";
}
