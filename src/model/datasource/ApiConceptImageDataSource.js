// src/model/datasource/ApiConceptImageDataSource.js
import ApiDataSource from "./ApiDataSource.js";

export default class ApiConceptImageDataSource extends ApiDataSource {
    #catalogPromisesBySubjectId;
    #imageBaseUrl;

    constructor({ baseUrl, imageBaseUrl }) {
        super({ baseUrl });
        this.#catalogPromisesBySubjectId = new Map();
        this.#imageBaseUrl = this.#normalizeBaseUrl(
            imageBaseUrl ?? this.#deriveImageBaseUrl(baseUrl)
        );
    }

    async getConceptImageById(imageId, { subjectId, language } = {}) {
        if (!subjectId || !imageId) {
            return null;
        }

        const catalog = await this.#loadCatalog(subjectId);
        const entry = catalog.byImageId.get(imageId);

        if (!entry) {
            return null;
        }

        return this.#toFrontendImage(entry, language);
    }

    async getConceptImage({ subjectId, moduleId, groupId, imageId, language } = {}) {
        if (!subjectId || !imageId) {
            return null;
        }

        const catalog = await this.#loadCatalog(subjectId);
        const fullKey = moduleId && groupId
            ? this.#toFullKey(moduleId, groupId, imageId)
            : null;
        const entry = fullKey
            ? catalog.byFullKey.get(fullKey) ?? catalog.byImageId.get(imageId)
            : catalog.byImageId.get(imageId);

        if (!entry) {
            return null;
        }

        return this.#toFrontendImage(entry, language);
    }

    async getConceptImages(imageRefs = [], context = {}) {
        if (!Array.isArray(imageRefs) || imageRefs.length === 0) {
            return [];
        }

        const results = [];

        for (const imageRef of imageRefs) {
            const image = typeof imageRef === "string"
                ? await this.getConceptImageById(imageRef, context)
                : await this.getConceptImage({
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

    async #loadCatalog(subjectId) {
        if (!this.#catalogPromisesBySubjectId.has(subjectId)) {
            this.#catalogPromisesBySubjectId.set(subjectId, this.#fetchCatalog(subjectId));
        }

        return await this.#catalogPromisesBySubjectId.get(subjectId);
    }

    async #fetchCatalog(subjectId) {
        const entries = await this.get(`/subjects/${encodeURIComponent(subjectId)}/concept-images`);
        const byFullKey = new Map();
        const byImageId = new Map();

        for (const entry of entries) {
            byImageId.set(entry.imageId, entry);
            byFullKey.set(
                this.#toFullKey(entry.moduleId, entry.groupId, entry.imageId),
                entry
            );
        }

        return { byFullKey, byImageId };
    }

    #toFrontendImage(entry, language) {
        return {
            id: entry.imageId,
            src: this.#toImageSrc(entry.src),
            alt: this.#getLocalizedText(entry.alt, language, ""),
            title: this.#getLocalizedText(entry.title, language, undefined),
            caption: this.#getLocalizedText(entry.caption, language, undefined)
        };
    }

    #toImageSrc(src) {
        if (!src || /^https?:\/\//.test(src)) {
            return src;
        }

        if (!this.#imageBaseUrl) {
            return src;
        }

        return `${this.#imageBaseUrl}${src.startsWith("/") ? src : `/${src}`}`;
    }

    #deriveImageBaseUrl(baseUrl) {
        if (!baseUrl) {
            return "";
        }

        return baseUrl.replace(/\/api\/?$/, "");
    }

    #normalizeBaseUrl(baseUrl) {
        return baseUrl ? baseUrl.replace(/\/$/, "") : "";
    }

    #toFullKey(moduleId, groupId, imageId) {
        return `${moduleId}/${groupId}/${imageId}`;
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
