// src/ui/viewmodel/StatisticsPage/Overview/createStatisticsChapterModels.js
import { STATISTICS_MASTERY_SCOPE_KINDS } from "../../../../constants/StatisticsContracts.js";
import { LANGUAGES } from "../../../../i18n/translations.js";
import roundMasteryPercentage from "../../Shared/roundMasteryPercentage.js";
import createStatisticsPerformancePresentation from "./createStatisticsPerformancePresentation.js";

export default function createStatisticsChapterModels({ chapters, subjectMastery, selectedScope, subject, language, text }) {
	const items = [createSubjectScopeModel({ subjectMastery, selectedScope, subject, text })];

	for (const chapter of chapters) {
		items.push(createChapterScopeModel({ chapter, selectedScope, language, text }));
	}

	return items;
}

function createSubjectScopeModel({ subjectMastery, selectedScope, subject, text }) {
	const performance = createStatisticsPerformancePresentation({ performanceBand: subjectMastery.performanceBand, text });
	const roundedMasteryPercentage = roundMasteryPercentage(subjectMastery.masteryPercentage);

	return {
		key: "subject",
		scope: {
			kind: STATISTICS_MASTERY_SCOPE_KINDS.SUBJECT,
			topicAreaKey: null
		},
		isSubject: true,
		isSelected: selectedScope.kind === STATISTICS_MASTERY_SCOPE_KINDS.SUBJECT,
		label: text.createSubjectScopeLabel(subject.name),
		iconKey: null,
		subjectIcon: subject.icon,
		masteryPercentage: subjectMastery.masteryPercentage,
		performanceBand: subjectMastery.performanceBand,
		performanceTone: performance.tone,
		masteryPercentageLabel: text.createPercentageLabel(roundedMasteryPercentage),
		masteryLabel: text.subjectMasteryLabel
	};
}

function createChapterScopeModel({ chapter, selectedScope, language, text }) {
	const performance = createStatisticsPerformancePresentation({ performanceBand: chapter.performanceBand, text });
	const roundedMasteryPercentage = roundMasteryPercentage(chapter.masteryPercentage);
	let label = chapter.labelNo;

	if (language === LANGUAGES.EN) {
		label = chapter.labelEn;
	}

	return {
		key: chapter.topicAreaKey,
		scope: {
			kind: STATISTICS_MASTERY_SCOPE_KINDS.TOPIC_AREA,
			topicAreaKey: chapter.topicAreaKey
		},
		isSubject: false,
		isSelected: selectedScope.kind === STATISTICS_MASTERY_SCOPE_KINDS.TOPIC_AREA && selectedScope.topicAreaKey === chapter.topicAreaKey,
		label,
		iconKey: chapter.iconKey,
		subjectIcon: null,
		masteryPercentage: chapter.masteryPercentage,
		performanceBand: chapter.performanceBand,
		performanceTone: performance.tone,
		masteryPercentageLabel: text.createPercentageLabel(roundedMasteryPercentage),
		masteryLabel: text.masteryLabel
	};
}
