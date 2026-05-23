//src/model/repositories/ExamRepository.js
import { EXAMS } from "../../data/data.js";

export default class ExamRepository {
    constructor(examQuestionDataSource) {
        this.examQuestionDataSource = examQuestionDataSource;
    }

    async getQuestions(examId) {
        return this.examQuestionDataSource.fetchQuestions(examId);
    }

    getAvailableExams() {
        return EXAMS.map(({ id, title, description, questions }) => ({
            id,
            title,
            description,
            questionCount: questions.length
        }));
    }
}