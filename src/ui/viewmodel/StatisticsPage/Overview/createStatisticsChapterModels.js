// src/ui/viewmodel/StatisticsPage/Overview/createStatisticsChapterModels.js
import { LANGUAGES } from "../../../../i18n/translations.js";
import createStatisticsPerformancePresentation from "./createStatisticsPerformancePresentation.js";

export default function createStatisticsChapterModels({ chapters, language, text }) {
	return chapters.map((chapter) => {
		const performance = createStatisticsPerformancePresentation({ performanceBand: chapter.performanceBand, text });
		let label = chapter.labelNo;

		if (language === LANGUAGES.EN) {
			label = chapter.labelEn;
		}

		return {
			key: chapter.topicAreaKey,
			label,
			iconKey: chapter.iconKey,
			scorePercentage: chapter.scorePercentage,
			performanceBand: chapter.performanceBand,
			performanceTone: performance.tone,
			scoreLabel: text.createPercentageLabel(chapter.scorePercentage),
			evidenceLabel: text.createEvidenceCountLabel(chapter.evidenceCount)
		};
	});
}
