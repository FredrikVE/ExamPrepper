//src/model/domain/GetAvailableExamsUseCase.js
export default class GetAvailableExamsUseCase {
    constructor(repository) {
        this.repository = repository;
    }

    execute(lang) {
        return this.repository.getAvailableExams(lang);
    }
}
