// src/ui/viewmodel/StatisticsPage/Overview/createStatisticsChapterModels.js
import { LANGUAGES } from "../../../../i18n/translations.js";
import roundMasteryPercentage from "../../Shared/roundMasteryPercentage.js";
import createStatisticsPerformancePresentation from "./createStatisticsPerformancePresentation.js";

export default function createStatisticsChapterModels({ chapters, language, text }) {
	return chapters.map((chapter) => {
		const performance = createStatisticsPerformancePresentation({ performanceBand: chapter.performanceBand, text });
		const roundedMasteryPercentage = roundMasteryPercentage(chapter.masteryPercentage);
		let label = chapter.labelNo;

		if (language === LANGUAGES.EN) {
			label = chapter.labelEn;
		}

		return {
			key: chapter.topicAreaKey,
			label,
			iconKey: chapter.iconKey,
			masteryPercentage: chapter.masteryPercentage,
			performanceBand: chapter.performanceBand,
			performanceTone: performance.tone,
			masteryPercentageLabel: text.createPercentageLabel(roundedMasteryPercentage),
			masteryLabel: text.masteryLabel
		};
	});
}
