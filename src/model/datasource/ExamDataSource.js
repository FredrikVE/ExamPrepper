// src/model/datasource/ExamDataSource.js
import DataSource from "./DataSource.js";

export default class ExamDataSource extends DataSource {

	fetchTestSetsBySubject({ subjectId, language }) {
		const languageQuery = language ? `?lang=${encodeURIComponent(language)}` : "";
		return this.get(`/subjects/${encodeURIComponent(subjectId)}/exams${languageQuery}`);
	}

	fetchTestSetById(examId) {
		return this.get(`/exams/${encodeURIComponent(examId)}`);
	}

}
