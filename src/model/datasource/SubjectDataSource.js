//src/model/datasource/SubjectDataSource.js
import DataSource from "./DataSource.js";

export default class SubjectDataSource extends DataSource {
	async fetchSubjects({ language } = {}) {
		return await this.get(this.#buildSubjectsPath(language));
	}

	async fetchSubjectById({ subjectId, language } = {}) {
		return await this.get(this.#buildSubjectPath(subjectId, language));
	}

	async fetchTopicAreasBySubject(subjectId) {
		return await this.get(`/subjects/${encodeURIComponent(subjectId)}/topic-areas`);
	}

	#buildSubjectsPath(language) {
		return `/subjects${buildLanguageQuery(language)}`;
	}

	#buildSubjectPath(subjectId, language) {
		return `/subjects/${encodeURIComponent(subjectId)}${buildLanguageQuery(language)}`;
	}
}

function buildLanguageQuery(language) {
	return language
		? `?lang=${encodeURIComponent(language)}`
		: "";
}
