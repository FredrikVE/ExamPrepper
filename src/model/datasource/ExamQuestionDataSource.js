//src/model/datasource/ExamQuestionDataSource.js
import { getExamQuestions } from "../../data/data.js";

export default class ExamQuestionDataSource {
    async fetchQuestions(examId) {
        return getExamQuestions(examId);
    }
}