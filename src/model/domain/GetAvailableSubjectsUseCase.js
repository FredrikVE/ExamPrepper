//src/model/domain/GetAvailableSubjectsUseCase.js
export default class GetAvailableSubjectsUseCase {
    constructor(subjectRepository) {
        this.subjectRepository = subjectRepository;
    }

    async execute({ language } = {}) {
        const subjects = await this.subjectRepository.getSubjectsWithExamCount({
            language
        });

        return {
            subjects: subjects.filter((subject) => subject.isVisible)
        };
    }
}