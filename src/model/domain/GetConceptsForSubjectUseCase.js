// src/model/domain/GetConceptsForSubjectUseCase.js
import { ALL_TOPIC_AREAS } from "./utils/topicAreaFilters.js";

export default class GetConceptsForSubjectUseCase {
	constructor(conceptRepository) {
		this.conceptRepository = conceptRepository;
	}

	async execute({ subjectId, topicAreaKey }) {
		if (!subjectId) {
			return [];
		}

		if (topicAreaKey && topicAreaKey !== ALL_TOPIC_AREAS) {
			return await this.conceptRepository.getConceptsBySubjectAndTopicArea({
				subjectId,
				topicAreaKey
			});
		}

		return await this.conceptRepository.getConceptsBySubject({ subjectId });
	}
}
