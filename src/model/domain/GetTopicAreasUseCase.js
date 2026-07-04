// src/model/domain/GetTopicAreasUseCase.js
export default class GetTopicAreasUseCase {
    constructor(subjectRepository) {
        this.subjectRepository = subjectRepository;
    }

    async execute({ subjectId, language } = {}) {
        if (!subjectId) {
            return [];
        }

        const topicAreas = await this.subjectRepository.getTopicAreasBySubject(subjectId);
        const localizedTopicAreas = [];

        for (const topicArea of topicAreas) {
            localizedTopicAreas.push({
                key: topicArea.key,
                label: topicArea.label[language] ?? topicArea.label.no,
                iconKey: topicArea.iconKey,
                position: topicArea.position
            });
        }

        localizedTopicAreas.sort(compareTopicAreasByPosition);

        return localizedTopicAreas;
    }
}

function compareTopicAreasByPosition(a, b) {
    return a.position - b.position;
}
