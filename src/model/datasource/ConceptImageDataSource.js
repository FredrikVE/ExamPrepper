// src/model/datasource/ConceptImageDataSource.js
export default class ConceptImageDataSource {
    #indexByFullKey;
    #indexByImageId;

    constructor(conceptImageCatalogsBySubjectId = {}) {
        const { byFullKey, byImageId } = this.#buildIndexes(conceptImageCatalogsBySubjectId);
        this.#indexByFullKey = byFullKey;
        this.#indexByImageId = byImageId;
    }

    getConceptImageById(imageId, { subjectId, language } = {}) {
        if (!subjectId || !imageId) {
            return null;
        }

        const key = `${subjectId}/${imageId}`;
        const entry = this.#indexByImageId.get(key);

        if (!entry) {
            return null;
        }

        const ext = entry.ext ?? "svg";

        return {
            id: imageId,
            src: this.#buildSrc(subjectId, entry.moduleId, entry.groupId, imageId, ext),
            alt: this.#getLocalizedText(entry.alt, language, ""),
            title: this.#getLocalizedText(entry.title, language, undefined),
            caption: this.#getLocalizedText(entry.caption, language, undefined)
        };
    }

    getConceptImage({ subjectId, moduleId, groupId, imageId, language } = {}) {
        if (!subjectId || !moduleId || !groupId || !imageId) {
            return null;
        }

        const key = this.#toFullKey(subjectId, moduleId, groupId, imageId);
        const entry = this.#indexByFullKey.get(key);

        if (!entry) {
            return null;
        }

        const ext = entry.ext ?? "svg";

        return {
            id: imageId,
            src: this.#buildSrc(subjectId, moduleId, groupId, imageId, ext),
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
            const image = typeof imageRef === "string"
                ? this.getConceptImageById(imageRef, context)
                : this.getConceptImage({
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

    #buildIndexes(catalogsBySubjectId) {
        const byFullKey = new Map();
        const byImageId = new Map();

        for (const subjectId of Object.keys(catalogsBySubjectId)) {
            const entries = catalogsBySubjectId[subjectId];

            if (!Array.isArray(entries)) {
                continue;
            }

            for (const entry of entries) {
                byFullKey.set(
                    this.#toFullKey(subjectId, entry.moduleId, entry.groupId, entry.imageId),
                    entry
                );
                byImageId.set(`${subjectId}/${entry.imageId}`, entry);
            }
        }

        return { byFullKey, byImageId };
    }

    #toFullKey(subjectId, moduleId, groupId, imageId) {
        return `${subjectId}/${moduleId}/${groupId}/${imageId}`;
    }

    #buildSrc(subjectId, moduleId, groupId, imageId, ext) {
        return `/subjects/${subjectId}/${moduleId}/${groupId}/${imageId}.${ext}`;
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
