// src/ui/viewmodel/StatisticsPage/createWeeklyActivityModel.js
import { normalizeNumber, normalizeNullablePercentagePoints } from "./statisticsNumbers.js";
import { createPercentageLabel } from "./statisticsValueLabels.js";

const WEEKDAY_KEYS = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];
const ACTIVITY_TONES = ["blue", "teal", "green", "orange", "pink", "purple", "neutral"];

export function createWeeklyActivityModel(weeklyActivity, text) {
	const days = createWeeklyActivityDays(weeklyActivity?.days, text);
	const totalMinutes = normalizeNumber(weeklyActivity?.totalMinutesThisWeek);
	const changePercentage = normalizeNullablePercentagePoints(weeklyActivity?.changePercentageFromPreviousWeek);
	const maxMinutes = findMaxMinutes(days);

	return {
		title: text.weeklyActivityTitle,
		totalTimeLabel: text.createDurationLabel(totalMinutes),
		totalTimeCaption: text.weeklyActivityTotalTimeCaption,
		changeLabel: createWeeklyActivityChangeLabel(changePercentage, text),
		changeTone: createWeeklyActivityChangeTone(changePercentage),
		note: text.weeklyActivityNote,
		days: addBarHeights(days, maxMinutes)
	};
}

function createWeeklyActivityDays(rawDays, text) {
	const daysByKey = createDaysByKey(rawDays);
	const days = [];

	for (let index = 0; index < WEEKDAY_KEYS.length; index += 1) {
		const key = WEEKDAY_KEYS[index];
		const rawDay = daysByKey[key];

		days.push(createWeeklyActivityDay(key, rawDay, index, text));
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

function createWeeklyActivityDay(key, rawDay, index, text) {
	const totalMinutes = normalizeNumber(rawDay?.totalMinutes);

	return {
		key,
		label: text.weekdayLabels[key],
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

function createWeeklyActivityChangeLabel(changePercentage, text) {
	if (changePercentage === null) {
		return text.weeklyActivityNoComparisonLabel;
	}

	const percentageLabel = createPercentageLabel(Math.abs(changePercentage), text);

	if (changePercentage > 0) {
		return `+${percentageLabel} ${text.weeklyActivityChangeSuffix}`;
	}

	if (changePercentage < 0) {
		return `-${percentageLabel} ${text.weeklyActivityChangeSuffix}`;
	}

	return text.weeklyActivityNoChangeLabel;
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
