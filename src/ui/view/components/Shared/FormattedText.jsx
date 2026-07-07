// src/ui/view/components/Shared/FormattedText.jsx
const BOLD_TEXT_PATTERN = /(\*\*[^*]+?\*\*)/g;

export default function FormattedText({ text }) {
	const textValue = createPlainFormattedTextInput(text);
	const parts = textValue.split(BOLD_TEXT_PATTERN);

	return (
		<>
			{parts.map((part, index) => {
				if (isBoldPart(part)) {
					return <strong key={index}>{part.slice(2, -2)}</strong>;
				}

				return <span key={index}>{part}</span>;
			})}
		</>
	);
}

export function createPlainFormattedText(text) {
	const textValue = createPlainFormattedTextInput(text);

	return textValue.replaceAll("**", "");
}

function createPlainFormattedTextInput(text) {
	return String(text ?? "");
}

function isBoldPart(part) {
	return part.startsWith("**") && part.endsWith("**") && part.length > 4;
}
