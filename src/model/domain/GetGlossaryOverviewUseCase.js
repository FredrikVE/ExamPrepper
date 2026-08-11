// src/model/domain/GetGlossaryOverviewUseCase.js
export default class GetGlossaryOverviewUseCase {
	constructor(glossaryRepository) {
		this.glossaryRepository = glossaryRepository;
	}

	async execute({ subjectId }) {
		if (!subjectId) {
			return [];
		}

		return await this.glossaryRepository.getGlossaryOverview({ subjectId });
	}
}
