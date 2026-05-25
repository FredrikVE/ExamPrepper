//src/model/domain/GetAvailableExamsUseCase.js
export default class GetAvailableExamsUseCase {
    constructor(examRepository) {
        this.examRepository = examRepository;
    }

    async execute({ subjectId, language } = {}) {
        if (!subjectId) {
            return [];
        }

        const exams = await this.examRepository.getAvailableExams({
            subjectId,
            language
        });

        return exams.filter((exam) => {
            return exam.questionCount > 0;
        });
    }
}