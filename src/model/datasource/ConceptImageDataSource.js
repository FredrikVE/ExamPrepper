// src/model/datasource/ConceptImageDataSource.js
import DataSource from "./DataSource.js";

const FALLBACK_LANGUAGE_CODES = ["no", "en"];

export default class ConceptImageDataSource extends DataSource {
	#catalogPromisesBySubjectId;
	#imageBaseUrl;

	constructor({ baseUrl, imageBaseUrl }) {
		super({ baseUrl });

		if (!imageBaseUrl) {
			throw new Error("ConceptImageDataSource requires imageBaseUrl");
		}

		this.#catalogPromisesBySubjectId = new Map();
		this.#imageBaseUrl = normalizeBaseUrl(imageBaseUrl);
	}

	async fetchConceptImageById(imageId, context) {
		const { subjectId, language } = context;

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

	async fetchConceptImage(input) {
		const { subjectId, moduleId, groupId, imageId, language } = input;

		if (!subjectId || !imageId) {
			return null;
		}

		const catalog = await this.#loadCatalog(subjectId);
		let entry = catalog.byImageId.get(imageId);

		if (moduleId && groupId) {
			const fullKey = this.#toFullKey(moduleId, groupId, imageId);
			const scopedEntry = catalog.byFullKey.get(fullKey);

			if (scopedEntry) {
				entry = scopedEntry;
			}
		}

		if (!entry) {
			return null;
		}

		return this.#toFrontendImage(entry, language);
	}

	async fetchConceptImages(imageRefs, context) {
		if (!Array.isArray(imageRefs)) {
			throw new Error("ConceptImageDataSource requires imageRefs to be an array");
		}

		if (imageRefs.length === 0) {
			return [];
		}

		const results = [];

		for (const imageRef of imageRefs) {
			let image;

			if (typeof imageRef === "string") {
				image = await this.fetchConceptImageById(imageRef, context);
			}

			else {
				const lookup = createImageLookup(imageRef, context);
				image = await this.fetchConceptImage(lookup);
			}

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

		return {
			byFullKey,
			byImageId
		};
	}

	#toFrontendImage(entry, language) {
		let alt = this.#findLocalizedText(entry.alt, language);

		if (alt === undefined) {
			alt = "";
		}

		return {
			id: entry.imageId,
			src: this.#toImageSrc(entry.src),
			alt,
			title: this.#findLocalizedText(entry.title, language),
			caption: this.#findLocalizedText(entry.caption, language)
		};
	}

	#toImageSrc(src) {
		if (!src || isAbsoluteHttpUrl(src)) {
			return src;
		}

		let imagePath = src;

		if (!imagePath.startsWith("/")) {
			imagePath = `/${imagePath}`;
		}

		return `${this.#imageBaseUrl}${imagePath}`;
	}

	#toFullKey(moduleId, groupId, imageId) {
		return `${moduleId}/${groupId}/${imageId}`;
	}

	#findLocalizedText(value, language) {
		if (typeof value === "string") {
			return value;
		}

		if (!value || typeof value !== "object") {
			return undefined;
		}

		if (typeof value[language] === "string") {
			return value[language];
		}

		for (const fallbackLanguage of FALLBACK_LANGUAGE_CODES) {
			if (typeof value[fallbackLanguage] === "string") {
				return value[fallbackLanguage];
			}
		}

		for (const localizedValue of Object.values(value)) {
			if (typeof localizedValue === "string") {
				return localizedValue;
			}
		}

		return undefined;
	}
}

function createImageLookup(imageRef, context) {
	const lookup = {
		subjectId: context.subjectId,
		moduleId: context.moduleId,
		groupId: context.groupId,
		imageId: imageRef.imageId,
		language: context.language
	};

	if (typeof imageRef.subjectId === "string") {
		lookup.subjectId = imageRef.subjectId;
	}

	if (typeof imageRef.moduleId === "string") {
		lookup.moduleId = imageRef.moduleId;
	}

	if (typeof imageRef.groupId === "string") {
		lookup.groupId = imageRef.groupId;
	}

	if (typeof imageRef.language === "string") {
		lookup.language = imageRef.language;
	}

	return lookup;
}

function normalizeBaseUrl(baseUrl) {
	return baseUrl.replace(/\/$/, "");
}

function isAbsoluteHttpUrl(src) {
	return /^https?:\/\//.test(src);
}
