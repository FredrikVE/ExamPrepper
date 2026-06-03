// src/model/domain/utils/normalizeAnswer.js
export default function normalizeAnswer(value) {
	const text = String(value || "");

	const trimmedText = text.trim();
	const lowerCaseText = trimmedText.toLowerCase();
	const textWithoutPunctuation = removePunctuation(lowerCaseText);
	const normalizedWhitespaceText = normalizeWhitespace(textWithoutPunctuation);

	return normalizedWhitespaceText;
}

function removePunctuation(text) {
	return text.replace(/[.!?,;:]/g, "");
}

function normalizeWhitespace(text) {
	return text.replace(/\s+/g, " ");
}
