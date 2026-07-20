// src/model/domain/GetFlipcardDeckSummariesUseCase.js
import { buildGlossaryDeckSummaries } from "./utils/buildGlossaryDeckSummaries.js";
import { findTopicAreaByKey } from "./utils/topicAreaFilters.js";

export default class GetFlipcardDeckSummariesUseCase {
	constructor(glossaryRepository, subjectRepository) {
		this.glossaryRepository = glossaryRepository;
		this.subjectRepository = subjectRepository;
	}

	async execute({ subjectId, language }) {
		if (!subjectId) {
			return [];
		}

		const glossaryEntries = await this.glossaryRepository.getGlossaryEntriesBySubject({ subjectId });
		const topicAreas = await this.subjectRepository.getTopicAreasBySubject(subjectId);
		const localizedTopicAreas = this.localizeTopicAreas(topicAreas, language);
		const deckSummaries = buildGlossaryDeckSummaries(glossaryEntries, localizedTopicAreas);
		const deckSummaryModels = [];

		for (const deckSummary of deckSummaries) {
			const topicArea = findTopicAreaByKey(localizedTopicAreas, deckSummary.topicAreaKey);

			if (!topicArea) {
				continue;
			}

			deckSummaryModels.push({
				key: deckSummary.topicAreaKey,
				topicAreaKey: deckSummary.topicAreaKey,
				title: topicArea.label,
				cardCount: deckSummary.cardCount,
				estimatedMinutes: deckSummary.estimatedMinutes,
				iconKey: topicArea.iconKey,
				position: topicArea.position
			});
		}

		deckSummaryModels.sort(compareDeckSummariesByTopicAreaPosition);

		return deckSummaryModels;
	}

	localizeTopicAreas(topicAreas, language) {
		const localizedTopicAreas = [];

		for (const topicArea of topicAreas) {
			localizedTopicAreas.push({
				key: topicArea.key,
				label: topicArea.label[language] ?? topicArea.label.no,
				iconKey: topicArea.iconKey,
				position: topicArea.position
			});
		}

		return localizedTopicAreas;
	}
}

function compareDeckSummariesByTopicAreaPosition(a, b) {
	return a.position - b.position;
}
