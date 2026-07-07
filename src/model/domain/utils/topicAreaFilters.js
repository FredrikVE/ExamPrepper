// src/model/domain/utils/topicAreaFilters.js
export const ALL_TOPIC_AREAS = "all";

export function findTopicAreaByKey(topicAreas, topicAreaKey) {
	for (const topicArea of topicAreas) {
		if (topicArea.key === topicAreaKey) {
			return topicArea;
		}
	}

	return null;
}
