// src/model/domain/utils/buildGlossaryDeckSummaries.js
export function buildGlossaryDeckSummaries(glossaryEntries, topicAreas) {
	const deckSummaries = [];

	for (const topicArea of topicAreas) {
		const cardCount = countGlossaryEntriesForTopicArea(glossaryEntries, topicArea.key);

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

function countGlossaryEntriesForTopicArea(glossaryEntries, topicAreaKey) {
	let cardCount = 0;

	for (const glossaryEntry of glossaryEntries) {
		if (glossaryEntry.topicAreaKey !== topicAreaKey) {
			continue;
		}

		cardCount += 1;
	}

	return cardCount;
}
