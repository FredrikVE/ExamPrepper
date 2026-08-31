// src/model/domain/glossary/GetFlipcardDeckSummariesUseCase.js

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
			const topicArea = localizedTopicAreas.find((candidate) => candidate.key === deckSummary.topicAreaKey) ?? null;

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

function buildGlossaryDeckSummaries(glossaryEntries, topicAreas) {
	const deckSummaries = [];

	for (const topicArea of topicAreas) {
		let cardCount = 0;

		for (const glossaryEntry of glossaryEntries) {
			if (glossaryEntry.topicAreaKey === topicArea.key) {
				cardCount += 1;
			}
		}

		if (cardCount === 0) {
			continue;
		}

		deckSummaries.push({
			topicAreaKey: topicArea.key,
			cardCount,
			estimatedMinutes: Math.max(5, Math.round(cardCount / 2))
		});
	}

	return deckSummaries;
}
