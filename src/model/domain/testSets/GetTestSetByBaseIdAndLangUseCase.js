// src/model/domain/testSets/GetTestSetByBaseIdAndLangUseCase.js
export default class GetTestSetByBaseIdAndLangUseCase {
    constructor(testSetRepository) {
        this.testSetRepository = testSetRepository;
    }

    execute({ baseId, lang, subjectId }) {
        if (!baseId || !lang || !subjectId) {
            return null;
        }

        return this.testSetRepository.getTestSetByBaseIdAndLang({
            baseId,
            language: lang,
            subjectId
        });
    }
}
