// src/ui/viewmodel/ExamSelectPage/flashcardDeckFilters.js
import { ALL_TOPIC_AREAS } from "../../../model/domain/utils/topicAreaFilters.js";

export function filterDeckSummaries(deckSummaries, searchTerm, topicAreaKey) {
    const normalizedSearchTerm = searchTerm.trim().toLowerCase();
    const filteredDeckSummaries = [];

    for (const deckSummary of deckSummaries) {
        if (!deckMatchesTopicArea(deckSummary, topicAreaKey)) {
            continue;
        }

        if (!deckMatchesSearchTerm(deckSummary, normalizedSearchTerm)) {
            continue;
        }

        filteredDeckSummaries.push(deckSummary);
    }

    return filteredDeckSummaries;
}

function deckMatchesTopicArea(deckSummary, topicAreaKey) {
    return topicAreaKey === ALL_TOPIC_AREAS || deckSummary.topicAreaKey === topicAreaKey;
}

function deckMatchesSearchTerm(deckSummary, normalizedSearchTerm) {
    if (!normalizedSearchTerm) {
        return true;
    }

    return deckSummary.title?.toLowerCase().includes(normalizedSearchTerm);
}
