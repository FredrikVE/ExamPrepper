// src/model/datasource/ApiExamAttemptDataSource.js
import ApiDataSource from "./ApiDataSource.js";

export default class ApiExamAttemptDataSource extends ApiDataSource {
	async submitAttempt({ examId, lang, durationSeconds, answers }) {
		return await this.post("/exam-attempts", { examId, lang, durationSeconds, answers });
	}

	async fetchAttemptById(attemptId) {
		return await this.get(`/exam-attempts/${encodeURIComponent(attemptId)}`);
	}

	async fetchMyStatistics() {
		return await this.get("/my/statistics");
	}
}
