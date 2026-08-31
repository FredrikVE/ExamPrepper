// src/model/domain/mastery/RecordMatchCardResultUseCase.js
export default class RecordMatchCardResultUseCase {
	#conceptPracticeRepository;

	constructor(conceptPracticeRepository) {
		this.#conceptPracticeRepository = conceptPracticeRepository;
	}

	async execute(command) {
		requireNonEmptyString(command?.eventId, "eventId");
		requireNonEmptyString(command?.subjectId, "subjectId");
		requireNonEmptyString(command?.glossaryEntryKey, "glossaryEntryKey");

		if (!Number.isInteger(command?.wrongAttemptCount) || command.wrongAttemptCount < 0) {
			throw new Error("wrongAttemptCount must be a non-negative integer");
		}

		return await this.#conceptPracticeRepository.getRecordMatchCardResult(command);
	}
}

function requireNonEmptyString(value, name) {
	if (typeof value !== "string" || value.length === 0) {
		throw new Error(`${name} must be a non-empty string`);
	}
}
