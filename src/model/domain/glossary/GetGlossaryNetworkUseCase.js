// src/model/domain/glossary/GetGlossaryNetworkUseCase.js
export default class GetGlossaryNetworkUseCase {
	constructor(glossaryRepository) {
		this.glossaryRepository = glossaryRepository;
	}

	async execute({ subjectId, glossaryEntryKey }) {
		if (!subjectId || !glossaryEntryKey) {
			return null;
		}

		return await this.glossaryRepository.getGlossaryNetwork({
			subjectId,
			glossaryEntryKey
		});
	}
}
