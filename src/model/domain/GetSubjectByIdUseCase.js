//src/model/domain/GetSubjectByIdUseCase.js
export default class GetSubjectByIdUseCase {
    constructor(subjectRepository) {
        this.subjectRepository = subjectRepository;
    }

    async execute(input) {
        const subjectId = typeof input === "string"
            ? input
            : input?.subjectId;

        const language = typeof input === "object"
            ? input.language
            : undefined;

        if (!subjectId) {
            return null;
        }

        return await this.subjectRepository.getSubjectByIdWithExamCount({
            subjectId,
            language
        });
    }
}