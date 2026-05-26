//src/model/domain/GetExamByBaseIdAndLangUseCase.js
export default class GetExamByBaseIdAndLangUseCase {
	constructor(examRepository) {
		this.examRepository = examRepository;
	}

	execute(baseId, language) {
		if (!baseId || !language) {
			return null;
		}

		return this.examRepository.getExamByBaseIdAndLang(baseId, language);
	}
}