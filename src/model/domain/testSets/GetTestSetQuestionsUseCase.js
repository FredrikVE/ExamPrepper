// src/model/domain/testSets/GetTestSetQuestionsUseCase.js
export default class GetTestSetQuestionsUseCase {
    constructor(testSetRepository) {
        this.testSetRepository = testSetRepository;
    }

    async execute(input) {
        const { testSetId, language } = normalizeExecuteInput(input);

        if (!testSetId) {
            return [];
        }

        return await this.testSetRepository.getTestSetQuestions({
            testSetId,
            language
        });
    }
}

function normalizeExecuteInput(input) {
    if (typeof input === "string") {
        return {
            testSetId: input,
            language: undefined
        };
    }

    return {
        testSetId: input?.testSetId,
        language: input?.language
    };
}
