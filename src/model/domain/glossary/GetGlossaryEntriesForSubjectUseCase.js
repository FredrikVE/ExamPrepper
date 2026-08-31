// src/model/domain/glossary/GetGlossaryEntriesForSubjectUseCase.js
import { ALL_TOPIC_AREAS } from "../../../constants/TopicAreas.js";

export default class GetGlossaryEntriesForSubjectUseCase {
	constructor(glossaryRepository) {
		this.glossaryRepository = glossaryRepository;
	}

	async execute({ subjectId, topicAreaKey }) {
		if (!subjectId) {
			return [];
		}

		if (topicAreaKey && topicAreaKey !== ALL_TOPIC_AREAS) {
			return await this.glossaryRepository.getGlossaryEntriesBySubjectAndTopicArea({
				subjectId,
				topicAreaKey
			});
		}

		return await this.glossaryRepository.getGlossaryEntriesBySubject({ subjectId });
	}
}
