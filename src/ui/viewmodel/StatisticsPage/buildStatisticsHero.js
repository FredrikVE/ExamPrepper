// src/ui/viewmodel/StatisticsPage/buildStatisticsHero.js
import { EMPTY_LABEL, formatPercentageLabel } from "./statisticsFormatters.js";

const HERO_METER_CLASS_NAME = "statistics-hero-meter";

export function buildHero(statistics, copy) {
	if (statistics.attemptCount === 0) {
		return {
			title: copy.emptyTitle,
			body: copy.emptyBody,
			progressPercentage: 0,
			progressLabel: copy.kpiAverageScore,
			meterClassName: HERO_METER_CLASS_NAME,
			meterValueLabel: EMPTY_LABEL,
			meterDescription: copy.kpiAverageScore
		};
	}

	return {
		title: copy.createHeroTitle(statistics.attemptCount),
		body: copy.heroBody,
		progressPercentage: statistics.averageScorePercentage ?? 0,
		progressLabel: copy.kpiAverageScore,
		meterClassName: HERO_METER_CLASS_NAME,
		meterValueLabel: formatPercentageLabel(statistics.averageScorePercentage),
		meterDescription: copy.kpiAverageScore
	};
}
