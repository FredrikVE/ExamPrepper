//src/model/datasource/ExamQuestionDataSource.js
import { getExamQuestions, EXAMS } from "../../data/data.js";

export default class ExamQuestionDataSource {
    fetchQuestions(examId) {
        return getExamQuestions(examId);
    }

    fetchAllExams() {
        return EXAMS;
    }
}