//src/model/datasource/ExamQuestionDataSource.js
import { QUESTIONS } from "../../data/questions.js";

export default class ExamQuestionDataSource {
    async fetchQuestions() {
        return QUESTIONS;
    }
}
