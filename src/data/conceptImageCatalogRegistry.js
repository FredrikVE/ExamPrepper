// src/data/conceptImageCatalogRegistry.js
// Composition-level registry that maps subject ids to their concept-image catalogs.
// Keep subject-specific imports here, not inside model/datasource classes or UI code.

import { in5431ConceptImages } from "./subjects/in5431/conceptImages.js";

export const conceptImageCatalogsBySubjectId = Object.freeze({
    in5431: in5431ConceptImages
});
