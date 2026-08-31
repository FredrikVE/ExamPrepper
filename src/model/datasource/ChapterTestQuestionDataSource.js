// src/model/datasource/ChapterTestQuestionDataSource.js
import DataSource from "./DataSource.js";

export default class ChapterTestQuestionDataSource extends DataSource {
    #chapterTestsPath = "/chapter-tests";
    #questionsPathSuffix = "/questions";
    #practiceQuestionsQuery = "mode=practice";

    async fetchPracticeQuestions(chapterTestId) {
        return await this.get(this.#buildPracticeQuestionsPath(chapterTestId));
    }

    #buildPracticeQuestionsPath(chapterTestId) {
        return `${this.#chapterTestsPath}/${encodeURIComponent(chapterTestId)}${this.#questionsPathSuffix}?${this.#practiceQuestionsQuery}`;
    }
}
