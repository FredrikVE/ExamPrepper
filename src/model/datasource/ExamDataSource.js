// src/model/datasource/ExamDataSource.js
import DataSource from "./DataSource.js";
import { validateExamTestSet, validateExamTestSetList } from "./validateScopedTestSetTransport.js";

export default class ExamDataSource extends DataSource {
    #subjectsPath = "/subjects";
    #examsPath = "/exams";

    async fetchTestSetsBySubject({ subjectId, language } = {}) {
        const response = await this.get(this.#buildSubjectExamsPath(subjectId, language));
        return validateExamTestSetList(response);
    }

    async fetchTestSetById(examId) {
        const response = await this.get(`${this.#examsPath}/${encodeURIComponent(examId)}`);
        return validateExamTestSet(response);
    }

    #buildSubjectExamsPath(subjectId, language) {
        const languageQuery = language
            ? `?lang=${encodeURIComponent(language)}`
            : "";

        return `${this.#subjectsPath}/${encodeURIComponent(subjectId)}${this.#examsPath}${languageQuery}`;
    }
}
