// src/utils/questionutils/optionExplanationUtils.js
export function getExtendedExplanationPoints(option) {
    return Array.isArray(option?.whyExtended) ? option.whyExtended : [];
}

export function hasExtendedExplanation(option) {
    return getExtendedExplanationPoints(option).length > 0;
}
