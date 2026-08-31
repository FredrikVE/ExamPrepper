// src/model/datasource/GlossaryDataSource.js
import DataSource from "./DataSource.js";

export default class GlossaryDataSource extends DataSource {
	fetchGlossaryEntriesBySubject({ subjectId }) {
		return this.get(`/subjects/${encodeURIComponent(subjectId)}/glossary`);
	}

	fetchGlossaryEntriesBySubjectAndTopicArea({ subjectId, topicAreaKey }) {
		const encodedSubjectId = encodeURIComponent(subjectId);
		const encodedTopicAreaKey = encodeURIComponent(topicAreaKey);

		return this.get(`/subjects/${encodedSubjectId}/glossary?topicArea=${encodedTopicAreaKey}`);
	}

	fetchGlossaryOverview({ subjectId }) {
		return this.get(`/subjects/${encodeURIComponent(subjectId)}/glossary/overview`);
	}

	fetchGlossaryNetwork({ subjectId, glossaryEntryKey }) {
		const encodedSubjectId = encodeURIComponent(subjectId);
		const encodedGlossaryEntryKey = encodeURIComponent(glossaryEntryKey);

		return this.get(`/subjects/${encodedSubjectId}/glossary/${encodedGlossaryEntryKey}/network`);
	}
}
