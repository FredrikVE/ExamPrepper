// src/model/domain/mastery/RecordFlipcardAssessmentUseCase.js
import { CONCEPT_MASTERY_STATUS } from "../../../constants/ConceptMasteryStatus.js";

export default class RecordFlipcardAssessmentUseCase {
	#conceptPracticeRepository;

	constructor(conceptPracticeRepository) {
		this.#conceptPracticeRepository = conceptPracticeRepository;
	}

	async execute(command) {
		requireNonEmptyString(command?.eventId, "eventId");
		requireNonEmptyString(command?.subjectId, "subjectId");
		requireNonEmptyString(command?.glossaryEntryKey, "glossaryEntryKey");
		requireFlipcardAssessment(command?.assessment);

		return await this.#conceptPracticeRepository.getRecordFlipcardAssessment(command);
	}
}

function requireFlipcardAssessment(assessment) {
	if (
		assessment !== CONCEPT_MASTERY_STATUS.PRACTICE
		&& assessment !== CONCEPT_MASTERY_STATUS.UNDERSTOOD
	) {
		throw new Error("Flipcard assessment must be practice or understood");
	}
}

function requireNonEmptyString(value, name) {
	if (typeof value !== "string" || value.length === 0) {
		throw new Error(`${name} must be a non-empty string`);
	}
}
