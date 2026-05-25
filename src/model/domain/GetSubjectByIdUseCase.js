//src/model/domain/GetSubjectByIdUseCase.js
export default class GetSubjectByIdUseCase {
    constructor(subjectRepository) {
        this.subjectRepository = subjectRepository;
    }

    execute({ subjectId, lang } = {}) {
        return this.subjectRepository.getSubjectById(subjectId, lang);
    }
}
