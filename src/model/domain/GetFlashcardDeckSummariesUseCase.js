// src/model/domain/GetFlashcardDeckSummariesUseCase.js
import { buildFlashcardDeckSummaries } from "./utils/buildFlashcardDeckSummaries.js";

export default class GetFlashcardDeckSummariesUseCase {
    constructor(flashcardRepository, subjectRepository) {
        this.flashcardRepository = flashcardRepository;
        this.subjectRepository = subjectRepository;
    }

    async execute({ subjectId, language } = {}) {
        if (!subjectId) {
            return [];
        }

        const flashcards = await this.flashcardRepository.getFlashcardsBySubject({ subjectId, language });
        const topicAreas = await this.subjectRepository.getTopicAreasBySubject(subjectId);
        const localizedTopicAreas = this.localizeTopicAreas(topicAreas, language);
        const deckSummaries = buildFlashcardDeckSummaries(flashcards, localizedTopicAreas);
        const deckSummaryModels = [];

        for (const deckSummary of deckSummaries) {
            const topicArea = findTopicAreaByKey(localizedTopicAreas, deckSummary.topicAreaKey);

            if (!topicArea) {
                continue;
            }

            deckSummaryModels.push({
                key: deckSummary.topicAreaKey,
                topicAreaKey: deckSummary.topicAreaKey,
                title: topicArea.label,
                cardCount: deckSummary.cardCount,
                estimatedMinutes: deckSummary.estimatedMinutes,
                iconKey: topicArea.iconKey,
                position: topicArea.position
            });
        }

        deckSummaryModels.sort(compareDeckSummariesByTopicAreaPosition);

        return deckSummaryModels;
    }

    localizeTopicAreas(topicAreas, language = "no") {
        const localizedTopicAreas = [];

        for (const topicArea of topicAreas) {
            localizedTopicAreas.push({
                key: topicArea.key,
                label: topicArea.label[language] ?? topicArea.label.no,
                iconKey: topicArea.iconKey,
                position: topicArea.position
            });
        }

        return localizedTopicAreas;
    }
}

function findTopicAreaByKey(topicAreas, topicAreaKey) {
    for (const topicArea of topicAreas) {
        if (topicArea.key === topicAreaKey) {
            return topicArea;
        }
    }

    return null;
}

function compareDeckSummariesByTopicAreaPosition(a, b) {
    return a.position - b.position;
}
