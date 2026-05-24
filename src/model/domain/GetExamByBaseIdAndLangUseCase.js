//src/model/domain/GetExamByBaseIdAndLangUseCase.js
export default class GetExamByBaseIdAndLangUseCase {
    constructor(repository) {
        this.repository = repository;
    }

    execute(baseId, lang) {
        return this.repository.getExamByBaseIdAndLang(baseId, lang);
    }
}