// src/constants/GlossaryContracts.js
export const MASTERY_STATUS = Object.freeze({
	NOT_ASSESSED: "not-assessed",
	PRACTICE: "practice",
	PROGRESS: "progress",
	UNDERSTOOD: "understood"
});

export const MASTERY_STATUSES = Object.freeze(Object.values(MASTERY_STATUS));

export const GLOSSARY_RELATION_TYPE = Object.freeze({
	RELATED: "related",
	CONTRASTS_WITH: "contrasts-with",
	PREREQUISITE: "prerequisite",
	PART_OF: "part-of"
});

export const GLOSSARY_RELATION_TYPES = Object.freeze(Object.values(GLOSSARY_RELATION_TYPE));

export const DIRECTED_GLOSSARY_RELATION_TYPES = Object.freeze([
	GLOSSARY_RELATION_TYPE.PREREQUISITE,
	GLOSSARY_RELATION_TYPE.PART_OF
]);
