// src/ui/viewmodel/StatisticsPage/buildStatisticsHero.js
import { createPercentageLabel } from "./statisticsValueLabels.js";

const HERO_METER_CLASS_NAME = "statistics-hero-meter";

export function buildHero(statistics, copy) {
	if (statistics.attemptCount === 0) {
		return {
			title: copy.emptyTitle,
			body: copy.emptyBody,
			progressPercentage: 0,
			progressLabel: copy.kpiAverageScore,
			meterClassName: HERO_METER_CLASS_NAME,
			meterValueLabel: copy.emptyValueLabel,
			meterDescription: copy.kpiAverageScore
		};
	}

	return {
		title: copy.createHeroTitle(statistics.attemptCount),
		body: copy.heroBody,
		progressPercentage: statistics.averageScorePercentage ?? 0,
		progressLabel: copy.kpiAverageScore,
		meterClassName: HERO_METER_CLASS_NAME,
		meterValueLabel: createPercentageLabel(statistics.averageScorePercentage, copy),
		meterDescription: copy.kpiAverageScore
	};
}
