// src/model/datasource/ExamQuestionDataSource.js
import DataSource from "./DataSource.js";

export default class ExamQuestionDataSource extends DataSource {
    #examsPath = "/exams";
    #questionsPathSuffix = "/questions";
    #practiceQuestionsQuery = "mode=practice";

    async fetchPracticeQuestions(examId) {
        return await this.get(this.#buildPracticeQuestionsPath(examId));
    }

    #buildPracticeQuestionsPath(examId) {
        return `${this.#examsPath}/${encodeURIComponent(examId)}${this.#questionsPathSuffix}?${this.#practiceQuestionsQuery}`;
    }
}
