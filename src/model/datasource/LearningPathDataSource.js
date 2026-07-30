//src/model/datasource/LearningPathDataSource.js
import DataSource from "./DataSource.js";

export default class LearningPathDataSource extends DataSource {
	async getLearningPath({ subjectId, language }) {
		return await this.get(`/subjects/${encodeURIComponent(subjectId)}/learning-path?lang=${encodeURIComponent(language)}`);
	}

	async startLearningSession(command) {
		return await this.post("/learning-sessions", { subjectId: command.subjectId, moduleId: command.moduleId, lang: command.language, round: command.round });
	}

	async getLearningSession(sessionId) {
		return await this.get(`/learning-sessions/${encodeURIComponent(sessionId)}`);
	}

	async submitLearningSession({ sessionId, answers }) {
		return await this.post(`/learning-sessions/${encodeURIComponent(sessionId)}/submit`, { answers });
	}
}
