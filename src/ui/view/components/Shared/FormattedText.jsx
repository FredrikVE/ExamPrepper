// src/ui/view/components/Shared/FormattedText.jsx
import { createFormattedTextSegments } from "../../../presentation/formattedText.js";

export default function FormattedText({ text }) {
	const segments = createFormattedTextSegments(text);

	return (
		<>
			{segments.map((segment, index) => (
				segment.isBold
					? <strong key={index}>{segment.text}</strong>
					: <span key={index}>{segment.text}</span>
			))}
		</>
	);
}
