//src/model/domain/GetExamQuestionsUseCase.js
export default class GetExamQuestionsUseCase {
    constructor(examRepository) {
        this.examRepository = examRepository;
    }

    async execute() {
        return this.examRepository.getQuestions();
    }
}
