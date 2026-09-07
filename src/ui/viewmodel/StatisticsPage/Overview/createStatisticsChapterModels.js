// src/ui/viewmodel/StatisticsPage/Overview/createStatisticsChapterModels.js
import { LANGUAGES } from "../../../../i18n/translations.js";

export default function createStatisticsChapterModels({ chapters, language, text }) {
	return chapters.map((chapter) => ({
		key: chapter.topicAreaKey,
		label: language === LANGUAGES.EN ? chapter.labelEn : chapter.labelNo,
		iconKey: chapter.iconKey,
		scorePercentage: chapter.scorePercentage,
		scoreLabel: text.createPercentageLabel(chapter.scorePercentage),
		evidenceLabel: text.createEvidenceCountLabel(chapter.evidenceCount)
	}));
}
