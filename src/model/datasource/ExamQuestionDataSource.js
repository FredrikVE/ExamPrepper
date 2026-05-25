//src/model/datasource/ExamQuestionDataSource.js
import { EXAMS } from "../../data/data.js";

export default class ExamQuestionDataSource {
    async fetchAllExams() {
        return EXAMS;
    }

    async fetchExamById(examId) {
        return EXAMS.find((exam) => exam.id === examId) ?? null;
    }

    async fetchExamByBaseIdAndLang(baseId, language) {
        return EXAMS.find((exam) => {
            return exam.baseId === baseId && exam.lang === language;
        }) ?? null;
    }
}