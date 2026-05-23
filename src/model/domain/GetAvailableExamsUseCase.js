//src/model/domain/GetAvailableExamsUseCase.js
export default class GetAvailableExamsUseCase {
    constructor(examRepository) {
        this.examRepository = examRepository;
    }

    execute() {
        return this.examRepository.getAvailableExams();
    }
}