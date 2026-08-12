// src/model/domain/utils/localizedText.js
export function resolveLocalizedText(localizedText, language) {
	const text = localizedText[language];

	if (typeof text !== "string") {
		throw new Error(`Missing localized text for language: ${String(language)}`);
	}

	return text;
}
