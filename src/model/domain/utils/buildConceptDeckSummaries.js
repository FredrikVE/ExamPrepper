// src/model/domain/utils/buildConceptDeckSummaries.js
export function buildConceptDeckSummaries(concepts, topicAreas) {
	const deckSummaries = [];

	for (const topicArea of topicAreas) {
		const cardCount = countConceptsForTopicArea(concepts, topicArea.key);

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

function countConceptsForTopicArea(concepts, topicAreaKey) {
	let cardCount = 0;

	for (const concept of concepts) {
		if (concept.topicAreaKey !== topicAreaKey) {
			continue;
		}

		cardCount += 1;
	}

	return cardCount;
}
