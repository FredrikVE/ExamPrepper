//src/model/datasource/ExamAttemptDataSource.js
import DataSource from "./DataSource.js";

export default class ExamAttemptDataSource extends DataSource {
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
