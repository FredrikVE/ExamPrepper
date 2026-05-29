// src/model/domain/GetExamByIdUseCase.js
export default class GetExamByIdUseCase {
    constructor(examRepository) {
        this.examRepository = examRepository;
    }

    async execute(examId) {
        if (!examId) {
            return null;
        }

        return await this.examRepository.getExamById(examId);
    }
}
