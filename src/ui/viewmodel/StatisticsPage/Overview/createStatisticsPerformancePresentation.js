// src/ui/viewmodel/StatisticsPage/Overview/createStatisticsPerformancePresentation.js
import { ASSESSMENT_BANDS, NOT_ASSESSED_BAND } from "../../../../constants/AssessmentBands.js";

export default function createStatisticsPerformancePresentation({ performanceBand, text }) {
	if (performanceBand === ASSESSMENT_BANDS.UNDERSTOOD) {
		return {
			tone: "positive",
			label: text.historyStatusGoodLabel
		};
	}

	if (performanceBand === ASSESSMENT_BANDS.PROGRESS) {
		return {
			tone: "warning",
			label: text.historyStatusAttentionLabel
		};
	}

	if (performanceBand === ASSESSMENT_BANDS.PRACTICE) {
		return {
			tone: "danger",
			label: text.historyStatusRiskLabel
		};
	}

	if (performanceBand === NOT_ASSESSED_BAND) {
		return {
			tone: "neutral",
			label: text.historyStatusNotAssessedLabel
		};
	}

	throw new Error(`Unknown Statistics performance band: ${String(performanceBand)}`);
}
