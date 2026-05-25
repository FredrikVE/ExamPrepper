//src/model/domain/GetAvailableSubjectsUseCase.js
export default class GetAvailableSubjectsUseCase {
    constructor(subjectRepository, examRepository) {
        this.subjectRepository = subjectRepository;
        this.examRepository = examRepository;
    }

    execute({ lang } = {}) {
        const subjects = this.subjectRepository.getAvailableSubjects(lang);

        return subjects.map((subject) => ({
            ...subject,
            examCount: this.examRepository.getAvailableExams(lang, subject.id).length
        }));
    }
}
