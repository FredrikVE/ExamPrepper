//src/model/repositories/ExamRepository.js
export default class ExamRepository {
    constructor(dataSource) {
        this.dataSource = dataSource;
    }

    getQuestions(examId) {
        return this.dataSource.fetchQuestions(examId);
    }

    getAvailableExams(lang) {
        const allExams = this.dataSource.fetchAllExams();
        const filtered = lang ? allExams.filter((exam) => exam.lang === lang) : allExams;

        return filtered.map(({ id, title, description, questions }) => ({
            id,
            title,
            description,
            questionCount: questions.length
        }));
    }
}