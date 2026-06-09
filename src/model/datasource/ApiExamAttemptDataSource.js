// src/model/datasource/ApiExamAttemptDataSource.js
import ApiDataSource from "./ApiDataSource.js";

export default class ApiExamAttemptDataSource extends ApiDataSource {
	async submitAttempt({ examId, lang, answers }) {
		return await this.post("/exam-attempts", { examId, lang, answers });
	}

	async getAttemptById(attemptId) {
		return await this.get(`/exam-attempts/${encodeURIComponent(attemptId)}`);
	}
}
