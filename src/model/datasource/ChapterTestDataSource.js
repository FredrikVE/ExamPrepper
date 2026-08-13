// src/model/datasource/ChapterTestDataSource.js
import DataSource from "./DataSource.js";

export default class ChapterTestDataSource extends DataSource {
    #subjectsPath = "/subjects";
    #chapterTestsPath = "/chapter-tests";

    async fetchTestSetsBySubject({ subjectId, language } = {}) {
        return await this.get(this.#buildSubjectChapterTestsPath(subjectId, language));
    }

    async fetchTestSetById(chapterTestId) {
        return await this.get(`${this.#chapterTestsPath}/${encodeURIComponent(chapterTestId)}`);
    }

    #buildSubjectChapterTestsPath(subjectId, language) {
        const languageQuery = language
            ? `?lang=${encodeURIComponent(language)}`
            : "";

        return `${this.#subjectsPath}/${encodeURIComponent(subjectId)}${this.#chapterTestsPath}${languageQuery}`;
    }
}
