// src/model/datasource/ApiExamQuestionDataSource.js
import ApiDataSource from "./ApiDataSource.js";

export default class ApiExamQuestionDataSource extends ApiDataSource {
	async fetchAllExams() {
		const subjects = await this.get("/subjects");
		const examArrays = await Promise.all(
			subjects.map((subject) => this.get(`/subjects/${encodeURIComponent(subject.id)}/exams`))
		);
		return examArrays.flat();
	}

	async fetchExamById(examId) {
		const [exam, questions] = await Promise.all([
			this.get(`/exams/${encodeURIComponent(examId)}`),
			this.get(`/exams/${encodeURIComponent(examId)}/questions?mode=practice`)
		]);
		return { ...exam, questions };
	}

	async fetchExamByBaseIdAndLang(baseId, language) {
		const exams = await this.fetchAllExams();
		return exams.find((exam) => exam.baseId === baseId && exam.lang === language) ?? null;
	}
}
