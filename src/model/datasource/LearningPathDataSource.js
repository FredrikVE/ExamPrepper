// src/model/datasource/LearningPathDataSource.js
import DataSource from "./DataSource.js";

export default class LearningPathDataSource extends DataSource {

	fetchLearningPath({ subjectId, language }) {
		return this.get(`/subjects/${encodeURIComponent(subjectId)}/learning-path?lang=${encodeURIComponent(language)}`);
	}

	fetchStartLearningSession(command) {
		return this.post("/learning-sessions", {
			subjectId: command.subjectId,
			moduleId: command.moduleId,
			lang: command.language,
			target: command.target,
			discardActiveSession: command.discardActiveSession
		});
	}

	fetchLearningSession(sessionId) {
		return this.get(`/learning-sessions/${encodeURIComponent(sessionId)}`);
	}

	fetchSubmitLearningSession({ sessionId, matchCardResults, answers }) {
		return this.post(`/learning-sessions/${encodeURIComponent(sessionId)}/submit`, {
			matchCardResults,
			answers
		});
	}

}
