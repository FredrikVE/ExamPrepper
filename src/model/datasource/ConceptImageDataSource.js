// src/model/datasource/ConceptImageDataSource.js
export default class ConceptImageDataSource {
    #index;

    constructor(conceptImageCatalogsBySubjectId = {}) {
        this.#index = this.#buildIndex(conceptImageCatalogsBySubjectId);
    }

    getConceptImage({ subjectId, moduleId, groupId, imageId, language } = {}) {
        if (!subjectId || !moduleId || !groupId || !imageId) {
            return null;
        }

        const key = this.#toKey(subjectId, moduleId, groupId, imageId);
        const entry = this.#index.get(key);

        if (!entry) {
            return null;
        }

        return {
            id: imageId,
            src: this.#buildSrc(subjectId, moduleId, groupId, imageId),
            alt: this.#getLocalizedText(entry.alt, language, ""),
            title: this.#getLocalizedText(entry.title, language, undefined),
            caption: this.#getLocalizedText(entry.caption, language, undefined)
        };
    }

    getConceptImages(imageRefs = [], context = {}) {
        if (!Array.isArray(imageRefs) || imageRefs.length === 0) {
            return [];
        }

        const results = [];

        for (const imageRef of imageRefs) {
            const image = this.getConceptImage({
                subjectId: imageRef.subjectId ?? context.subjectId,
                moduleId: imageRef.moduleId ?? context.moduleId,
                groupId: imageRef.groupId ?? context.groupId,
                imageId: imageRef.imageId,
                language: imageRef.language ?? context.language
            });

            if (image) {
                results.push(image);
            }
        }

        return results;
    }

    #buildIndex(catalogsBySubjectId) {
        const index = new Map();

        for (const subjectId of Object.keys(catalogsBySubjectId)) {
            const entries = catalogsBySubjectId[subjectId];

            if (!Array.isArray(entries)) {
                continue;
            }

            for (const entry of entries) {
                const key = this.#toKey(subjectId, entry.moduleId, entry.groupId, entry.imageId);

                index.set(key, entry);
            }
        }

        return index;
    }

    #toKey(subjectId, moduleId, groupId, imageId) {
        return `${subjectId}/${moduleId}/${groupId}/${imageId}`;
    }

    #buildSrc(subjectId, moduleId, groupId, imageId) {
        return `/subjects/${subjectId}/${moduleId}/${groupId}/${imageId}.svg`;
    }

    #getLocalizedText(value, language, fallbackValue) {
        if (typeof value === "string") {
            return value;
        }

        if (!value || typeof value !== "object") {
            return fallbackValue;
        }

        return value[language]
            ?? value.no
            ?? value.en
            ?? Object.values(value).find((entry) => typeof entry === "string")
            ?? fallbackValue;
    }
}