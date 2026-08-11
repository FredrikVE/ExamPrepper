//src/model/datasource/GlossaryDataSource.js
import DataSource from "./DataSource.js";

const INVALID_GLOSSARY_RESPONSE_MESSAGE = "Invalid glossary response";
const GLOSSARY_RELATION_TYPES = new Set(["related", "contrasts-with", "prerequisite", "part-of"]);
const MASTERY_STATUSES = new Set(["not-assessed", "practice", "progress", "understood"]);

export default class GlossaryDataSource extends DataSource {
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

	async fetchGlossaryOverview({ subjectId }) {
		const response = await this.get(`/subjects/${encodeURIComponent(subjectId)}/glossary/overview`);
		return validateGlossaryOverviewResponse(response);
	}

	async fetchGlossaryNetwork({ subjectId, glossaryEntryKey }) {
		const encodedSubjectId = encodeURIComponent(subjectId);
		const encodedGlossaryEntryKey = encodeURIComponent(glossaryEntryKey);
		const response = await this.get(`/subjects/${encodedSubjectId}/glossary/${encodedGlossaryEntryKey}/network`);
		return validateGlossaryNetworkResponse(response);
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

function validateGlossaryOverviewResponse(response) {
	if (!response || typeof response.subjectId !== "string" || !Array.isArray(response.concepts)) {
		throw new Error(INVALID_GLOSSARY_RESPONSE_MESSAGE);
	}

	for (const concept of response.concepts) {
		if (!isGlossaryOverviewConceptDto(concept)) {
			throw new Error(INVALID_GLOSSARY_RESPONSE_MESSAGE);
		}
	}

	return response;
}

function validateGlossaryNetworkResponse(response) {
	if (!response
		|| typeof response.subjectId !== "string"
		|| !isGlossaryConceptDto(response.center)
		|| !Array.isArray(response.nodes)
		|| !Array.isArray(response.relations)
		|| !Number.isInteger(response.limit)
		|| !Number.isInteger(response.depth)) {
		throw new Error(INVALID_GLOSSARY_RESPONSE_MESSAGE);
	}

	for (const node of response.nodes) {
		if (!isGlossaryConceptDto(node)) {
			throw new Error(INVALID_GLOSSARY_RESPONSE_MESSAGE);
		}
	}

	for (const relation of response.relations) {
		if (!isGlossaryRelationDto(relation)) {
			throw new Error(INVALID_GLOSSARY_RESPONSE_MESSAGE);
		}
	}

	return response;
}

function isGlossaryOverviewConceptDto(concept) {
	return isGlossaryConceptDto(concept)
		&& Number.isInteger(concept.directNeighborCount)
		&& concept.directNeighborCount >= 0
		&& Array.isArray(concept.directNeighborGlossaryKeys)
		&& concept.directNeighborGlossaryKeys.every(isGlossaryEntryKey);
}

function isGlossaryConceptDto(concept) {
	return isGlossaryEntryDto(concept) && isConceptMasteryDtoOrNull(concept.mastery);
}

function isGlossaryEntryKey(glossaryEntryKey) {
	return typeof glossaryEntryKey === "string" && glossaryEntryKey.length > 0;
}

function isGlossaryEntryDto(glossaryEntry) {
	return Boolean(glossaryEntry)
		&& typeof glossaryEntry.glossaryEntryKey === "string"
		&& typeof glossaryEntry.topicAreaKey === "string"
		&& isLocalizedText(glossaryEntry.term)
		&& isLocalizedText(glossaryEntry.explanation)
		&& Number.isFinite(glossaryEntry.position);
}

function isConceptMasteryDtoOrNull(mastery) {
	if (mastery === null) {
		return true;
	}

	return Boolean(mastery)
		&& MASTERY_STATUSES.has(mastery.status)
		&& (mastery.score === null || Number.isFinite(mastery.score))
		&& Number.isInteger(mastery.evidenceCount)
		&& Number.isInteger(mastery.correctCount)
		&& Number.isInteger(mastery.incorrectCount)
		&& Number.isInteger(mastery.easyCorrect)
		&& Number.isInteger(mastery.easyIncorrect)
		&& Number.isInteger(mastery.mediumCorrect)
		&& Number.isInteger(mastery.mediumIncorrect)
		&& Number.isInteger(mastery.hardCorrect)
		&& Number.isInteger(mastery.hardIncorrect)
		&& (mastery.lastEvidenceAt === null || typeof mastery.lastEvidenceAt === "string")
		&& Number.isInteger(mastery.policyVersion);
}

function isGlossaryRelationDto(relation) {
	return Boolean(relation)
		&& typeof relation.subjectId === "string"
		&& typeof relation.sourceGlossaryKey === "string"
		&& typeof relation.targetGlossaryKey === "string"
		&& GLOSSARY_RELATION_TYPES.has(relation.type);
}

function isLocalizedText(localizedText) {
	return Boolean(localizedText)
		&& typeof localizedText.no === "string"
		&& typeof localizedText.en === "string";
}
