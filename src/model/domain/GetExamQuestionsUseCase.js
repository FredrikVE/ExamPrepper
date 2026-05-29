// src/model/domain/GetExamQuestionsUseCase.js
export default class GetExamQuestionsUseCase {
    constructor(examRepository) {
        this.examRepository = examRepository;
    }

    async execute(input) {
        const { examId, language } = normalizeExecuteInput(input);

        if (!examId) {
            return [];
        }

        return await this.examRepository.getExamQuestions({
            examId,
            language
        });
    }
}

function normalizeExecuteInput(input) {
    if (typeof input === "string") {
        return {
            examId: input,
            language: undefined
        };
    }

    return {
        examId: input?.examId,
        language: input?.language
    };
}
