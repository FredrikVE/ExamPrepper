// src/model/domain/utils/filterConceptCardsByTopicArea.js
import { ALL_TOPIC_AREAS } from "./topicAreaFilters.js";

export function filterConceptCardsByTopicArea(conceptCards, topicAreaKey) {
	const filteredConceptCards = [];

	for (const conceptCard of conceptCards) {
		if (!conceptCardMatchesTopicArea(conceptCard, topicAreaKey)) {
			continue;
		}

		filteredConceptCards.push(conceptCard);
	}

	return filteredConceptCards;
}

function conceptCardMatchesTopicArea(conceptCard, topicAreaKey) {
	if (!topicAreaKey || topicAreaKey === ALL_TOPIC_AREAS) {
		return true;
	}

	return conceptCard.topicAreaKey === topicAreaKey;
}
