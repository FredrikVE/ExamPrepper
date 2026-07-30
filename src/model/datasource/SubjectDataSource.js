//src/model/datasource/SubjectDataSource.js
import DataSource from "./DataSource.js";

export default class SubjectDataSource extends DataSource {
	async fetchSubjects() {
		return await this.get("/subjects");
	}

	async fetchTopicAreasBySubject(subjectId) {
		return await this.get(`/subjects/${encodeURIComponent(subjectId)}/topic-areas`);
	}
}
