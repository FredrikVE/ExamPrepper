// src/model/datasource/ChapterTestDataSource.js
import DataSource from "./DataSource.js";

export default class ChapterTestDataSource extends DataSource {

	fetchTestSetsBySubject({ subjectId, language }) {
		const languageQuery = language ? `?lang=${encodeURIComponent(language)}` : "";
		return this.get(`/subjects/${encodeURIComponent(subjectId)}/chapter-tests${languageQuery}`);
	}

	fetchTestSetById(chapterTestId) {
		return this.get(`/chapter-tests/${encodeURIComponent(chapterTestId)}`);
	}

}
