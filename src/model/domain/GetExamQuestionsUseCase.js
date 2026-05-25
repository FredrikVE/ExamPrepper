//src/model/domain/GetExamQuestionsUseCase.js
export default class GetExamQuestionsUseCase {
    constructor(examRepository) {
        this.examRepository = examRepository;
    }

    async execute(examId) {
        if (!examId) {
            return [];
        }

        const questions = await this.examRepository.getExamQuestions(examId);

        return questions;
    }
}