// src/model/domain/testSets/GetTestSetByIdUseCase.js
export default class GetTestSetByIdUseCase {
    constructor(testSetRepository) {
        this.testSetRepository = testSetRepository;
    }

    async execute(testSetId) {
        if (!testSetId) {
            return null;
        }

        return await this.testSetRepository.getTestSetById(testSetId);
    }
}
