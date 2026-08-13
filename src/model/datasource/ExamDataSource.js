// src/model/datasource/ExamDataSource.js
import DataSource from "./DataSource.js";

export default class ExamDataSource extends DataSource {
    #subjectsPath = "/subjects";
    #examsPath = "/exams";

    async fetchTestSetsBySubject({ subjectId, language } = {}) {
        return await this.get(this.#buildSubjectExamsPath(subjectId, language));
    }

    async fetchTestSetById(examId) {
        return await this.get(`${this.#examsPath}/${encodeURIComponent(examId)}`);
    }

    #buildSubjectExamsPath(subjectId, language) {
        const languageQuery = language
            ? `?lang=${encodeURIComponent(language)}`
            : "";

        return `${this.#subjectsPath}/${encodeURIComponent(subjectId)}${this.#examsPath}${languageQuery}`;
    }
}
