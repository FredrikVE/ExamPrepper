// src/model/datasource/ChapterTestDataSource.js
import DataSource from "./DataSource.js";
import { validateChapterTest, validateChapterTestList } from "./validateScopedTestSetTransport.js";

export default class ChapterTestDataSource extends DataSource {
    #subjectsPath = "/subjects";
    #chapterTestsPath = "/chapter-tests";

    async fetchTestSetsBySubject({ subjectId, language } = {}) {
        const response = await this.get(this.#buildSubjectChapterTestsPath(subjectId, language));
        return validateChapterTestList(response);
    }

    async fetchTestSetById(chapterTestId) {
        const response = await this.get(`${this.#chapterTestsPath}/${encodeURIComponent(chapterTestId)}`);
        return validateChapterTest(response);
    }

    #buildSubjectChapterTestsPath(subjectId, language) {
        const languageQuery = language
            ? `?lang=${encodeURIComponent(language)}`
            : "";

        return `${this.#subjectsPath}/${encodeURIComponent(subjectId)}${this.#chapterTestsPath}${languageQuery}`;
    }
}
