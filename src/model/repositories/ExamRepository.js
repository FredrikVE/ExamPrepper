//src/model/repositories/ExamRepository.js
export default class ExamRepository {
    constructor(examQuestionDataSource) {
        this.examQuestionDataSource = examQuestionDataSource;
    }

    async getAllExams() {
        return await this.examQuestionDataSource.fetchAllExams();
    }

    async getAvailableExams({ subjectId, language } = {}) {
        const exams = await this.examQuestionDataSource.fetchAllExams();

        return exams
            .filter((exam) => this.matchesSubject(exam, subjectId))
            .filter((exam) => this.matchesLanguage(exam, language))
            .map((exam) => this.toExamListItem(exam));
    }

    async getExamById(examId) {
        return await this.examQuestionDataSource.fetchExamById(examId);
    }

    async getExamQuestions(examId) {
        const exam = await this.getExamById(examId);
        return exam?.questions ?? [];
    }

    async getExamByBaseIdAndLang(baseId, language) {
        return await this.examQuestionDataSource.fetchExamByBaseIdAndLang(
            baseId,
            language
        );
    }

    matchesSubject(exam, subjectId) {
        if (!subjectId) {
            return true;
        }

        return exam.subjectId === subjectId;
    }

    matchesLanguage(exam, language) {
        if (!language) {
            return true;
        }

        return exam.lang === language;
    }

    toExamListItem(exam) {
        return {
            id: exam.id,
            subjectId: exam.subjectId,
            baseId: exam.baseId,
            lang: exam.lang,
            title: exam.title,
            description: exam.description,
            duration: exam.duration,
            durationMinutes: exam.durationMinutes,
            questionCount: exam.questionCount ?? exam.questions?.length ?? 0
        };
    }
}