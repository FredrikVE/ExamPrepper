// src/model/datasource/ApiConceptDataSource.js
import ApiDataSource from "./ApiDataSource.js";

export default class ApiConceptDataSource extends ApiDataSource {
	async fetchConceptsBySubject({ subjectId }) {
		return await this.get(`/subjects/${encodeURIComponent(subjectId)}/concepts`);
	}

	async fetchConceptsBySubjectAndTopicArea({ subjectId, topicAreaKey }) {
		const encodedSubjectId = encodeURIComponent(subjectId);
		const encodedTopicAreaKey = encodeURIComponent(topicAreaKey);

		return await this.get(`/subjects/${encodedSubjectId}/concepts?topicArea=${encodedTopicAreaKey}`);
	}
}
