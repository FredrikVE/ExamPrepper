// src/constants/GlossaryRelationType.js
export const GLOSSARY_RELATION_TYPE = Object.freeze({
	RELATED: "related",
	CONTRASTS_WITH: "contrasts-with",
	PREREQUISITE: "prerequisite",
	PART_OF: "part-of"
});

export const DIRECTED_GLOSSARY_RELATION_TYPES = Object.freeze([
	GLOSSARY_RELATION_TYPE.PREREQUISITE,
	GLOSSARY_RELATION_TYPE.PART_OF
]);
