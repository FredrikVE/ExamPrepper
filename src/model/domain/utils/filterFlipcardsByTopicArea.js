// src/model/domain/utils/filterFlipcardsByTopicArea.js
import { ALL_TOPIC_AREAS } from "./topicAreaFilters.js";

export function filterFlipcardsByTopicArea(flipcards, topicAreaKey) {
	const filteredFlipcards = [];

	for (const flipcard of flipcards) {
		if (!flipcardMatchesTopicArea(flipcard, topicAreaKey)) {
			continue;
		}

		filteredFlipcards.push(flipcard);
	}

	return filteredFlipcards;
}

function flipcardMatchesTopicArea(flipcard, topicAreaKey) {
	if (!topicAreaKey || topicAreaKey === ALL_TOPIC_AREAS) {
		return true;
	}

	return flipcard.topicAreaKey === topicAreaKey;
}
