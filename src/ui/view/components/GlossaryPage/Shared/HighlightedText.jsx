// src/ui/view/components/GlossaryPage/Shared/HighlightedText.jsx
import { createHighlightedFormattedTextSegments } from "../../../../presentation/formattedText.js";

export default function HighlightedText({ segments }) {
	const formattedSegments = createHighlightedFormattedTextSegments(segments);

	return formattedSegments.map((segment, segmentIndex) => {
		if (segment.isMatch && segment.isBold) {
			return (
				<mark key={segmentIndex} className="glossary-search-mark">
					<strong>{segment.text}</strong>
				</mark>
			);
		}

		if (segment.isMatch) {
			return <mark key={segmentIndex} className="glossary-search-mark">{segment.text}</mark>;
		}

		if (segment.isBold) {
			return <strong key={segmentIndex}>{segment.text}</strong>;
		}

		return <span key={segmentIndex}>{segment.text}</span>;
	});
}
