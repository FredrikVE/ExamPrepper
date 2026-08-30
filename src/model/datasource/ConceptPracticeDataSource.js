// src/model/datasource/ConceptPracticeDataSource.js
import DataSource from "./DataSource.js";

export default class ConceptPracticeDataSource extends DataSource {
	async fetchRecordFlipcardAssessment({ eventId, subjectId, glossaryEntryKey, assessment }) {
		const encodedSubjectId = encodeURIComponent(subjectId);

		return await this.post(`/subjects/${encodedSubjectId}/concept-practice/flipcards`, {
			eventId,
			glossaryEntryKey,
			assessment
		});
	}

	async fetchRecordMatchCardResult({ eventId, subjectId, glossaryEntryKey, wrongAttemptCount }) {
		const encodedSubjectId = encodeURIComponent(subjectId);

		return await this.post(`/subjects/${encodedSubjectId}/concept-practice/match-cards`, {
			eventId,
			glossaryEntryKey,
			wrongAttemptCount
		});
	}
}
