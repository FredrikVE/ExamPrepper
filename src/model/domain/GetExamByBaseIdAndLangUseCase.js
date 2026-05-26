//src/model/domain/GetExamByBaseIdAndLangUseCase.js
export default class GetExamByBaseIdAndLangUseCase {
	constructor(examRepository) {
		this.examRepository = examRepository;
	}

	execute({ baseId, lang }) {
		if (!baseId || !lang) {
			return null;
		}

		return this.examRepository.getExamByBaseIdAndLang(baseId, lang);
	}
}