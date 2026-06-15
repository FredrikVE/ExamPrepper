// src/ui/viewmodel/StatisticsPage/buildStatisticsHero.js
import { createPercentageLabel } from "./statisticsValueLabels.js";

const HERO_METER_CLASS_NAME = "statistics-hero-meter";

export function buildHero(statistics, text) {
	if (statistics.attemptCount === 0) {
		return {
			title: text.emptyTitle,
			body: text.emptyBody,
			progressPercentage: 0,
			progressLabel: text.kpiAverageScore,
			meterClassName: HERO_METER_CLASS_NAME,
			meterValueLabel: text.emptyValueLabel,
			meterDescription: text.kpiAverageScore
		};
	}

	return {
		title: text.createHeroTitle(statistics.attemptCount),
		body: text.heroBody,
		progressPercentage: statistics.averageScorePercentage ?? 0,
		progressLabel: text.kpiAverageScore,
		meterClassName: HERO_METER_CLASS_NAME,
		meterValueLabel: createPercentageLabel(statistics.averageScorePercentage, text),
		meterDescription: text.kpiAverageScore
	};
}
