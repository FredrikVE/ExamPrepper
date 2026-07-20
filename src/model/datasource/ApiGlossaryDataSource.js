// src/model/datasource/ApiGlossaryDataSource.js
import ApiDataSource from "./ApiDataSource.js";

const INVALID_GLOSSARY_RESPONSE_MESSAGE = "Invalid glossary response";

export default class ApiGlossaryDataSource extends ApiDataSource {
	async fetchGlossaryEntriesBySubject({ subjectId }) {
		const response = await this.get(`/subjects/${encodeURIComponent(subjectId)}/glossary`);
		return validateGlossaryResponse(response);
	}

	async fetchGlossaryEntriesBySubjectAndTopicArea({ subjectId, topicAreaKey }) {
		const encodedSubjectId = encodeURIComponent(subjectId);
		const encodedTopicAreaKey = encodeURIComponent(topicAreaKey);
		const response = await this.get(`/subjects/${encodedSubjectId}/glossary?topicArea=${encodedTopicAreaKey}`);

		return validateGlossaryResponse(response);
	}
}

function validateGlossaryResponse(response) {
	if (!response || !Array.isArray(response.glossaryEntries)) {
		throw new Error(INVALID_GLOSSARY_RESPONSE_MESSAGE);
	}

	for (const glossaryEntry of response.glossaryEntries) {
		if (!isGlossaryEntryDto(glossaryEntry)) {
			throw new Error(INVALID_GLOSSARY_RESPONSE_MESSAGE);
		}
	}

	return response;
}

function isGlossaryEntryDto(glossaryEntry) {
	return Boolean(glossaryEntry)
		&& typeof glossaryEntry.glossaryEntryKey === "string"
		&& typeof glossaryEntry.topicAreaKey === "string"
		&& isLocalizedText(glossaryEntry.term)
		&& isLocalizedText(glossaryEntry.explanation)
		&& Number.isFinite(glossaryEntry.position);
}

function isLocalizedText(localizedText) {
	return Boolean(localizedText)
		&& typeof localizedText.no === "string"
		&& typeof localizedText.en === "string";
}
