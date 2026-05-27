// src/model/datasource/ConceptImageDataSource.js
export default class ConceptImageDataSource {
    constructor(conceptImageCatalogsBySubjectId = {}) {
        this.conceptImageCatalogsBySubjectId = conceptImageCatalogsBySubjectId;
    }

    getConceptImage({ subjectId, moduleId, groupId, imageId, language } = {}) {
        if (!subjectId || !moduleId || !groupId || !imageId) {
            return null;
        }

        const image = this.conceptImageCatalogsBySubjectId
            ?.[subjectId]
            ?.[moduleId]
            ?.[groupId]
            ?.[imageId];

        if (!image?.src) {
            return null;
        }

        return {
            id: image.id ?? imageId,
            src: image.src,
            alt: getLocalizedText(image.alt, language, ""),
            title: getLocalizedText(image.title, language, undefined),
            caption: getLocalizedText(image.caption, language, undefined)
        };
    }

    getConceptImages(imageRefs = [], context = {}) {
        if (!Array.isArray(imageRefs) || imageRefs.length === 0) {
            return [];
        }

        return imageRefs
            .map((imageRef) => this.getConceptImage({
                subjectId: imageRef.subjectId ?? context.subjectId,
                moduleId: imageRef.moduleId ?? context.moduleId,
                groupId: imageRef.groupId ?? context.groupId,
                imageId: imageRef.imageId,
                language: imageRef.language ?? context.language
            }))
            .filter(Boolean);
    }
}

function getLocalizedText(value, language, fallbackValue) {
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
