// src/model/domain/GetAvailableTestSetsUseCase.js
export default class GetAvailableTestSetsUseCase {
    constructor(testSetRepository) {
        this.testSetRepository = testSetRepository;
    }

    async execute({ subjectId, language } = {}) {
        if (!subjectId) {
            return [];
        }

        const testSets = await this.testSetRepository.getAvailableTestSets({
            subjectId,
            language
        });

        return testSets.filter((testSet) => {
            return testSet.questionCount > 0;
        });
    }
}
