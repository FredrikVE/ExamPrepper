// src/model/domain/GetFlashcardsUseCase.js
export default class GetFlashcardsUseCase {
    constructor(flashcardRepository) {
        this.flashcardRepository = flashcardRepository;
    }

    async execute({ subjectId, language } = {}) {
        if (!subjectId) {
            return [];
        }

        return await this.flashcardRepository.getFlashcardsBySubject({
            subjectId,
            language
        });
    }
}
