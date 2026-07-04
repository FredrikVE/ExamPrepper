// src/model/datasource/ApiSubjectDataSource.js
import ApiDataSource from "./ApiDataSource.js";

export default class ApiSubjectDataSource extends ApiDataSource {
	async fetchSubjects() {
		return await this.get("/subjects");
	}

	async fetchTopicAreasBySubject(subjectId) {
		return await this.get(`/subjects/${encodeURIComponent(subjectId)}/topic-areas`);
	}
}
