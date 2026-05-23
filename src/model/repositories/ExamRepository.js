//src/model/repositories/ExamRepository.js
export default class ExamRepository {
    constructor(examQuestionDataSource) {
        this.examQuestionDataSource = examQuestionDataSource;
    }

    async getQuestions() {
        return this.examQuestionDataSource.fetchQuestions();
    }
}
