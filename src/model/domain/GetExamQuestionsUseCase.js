//src/model/domain/GetExamQuestionsUseCase.js
export default class GetExamQuestionsUseCase {
    constructor(examRepository) {
        this.examRepository = examRepository;
    }

    async execute(examId) {
        return this.examRepository.getQuestions(examId);
    }
}