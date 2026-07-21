// src/ui/view/components/GlossaryPage/Shared/HighlightedText.jsx
export default function HighlightedText({ segments }) {
	return segments.map((segment, segmentIndex) => (
		segment.isMatch
			? <mark key={segmentIndex} className="glossary-search-mark">{segment.text}</mark>
			: <span key={segmentIndex}>{segment.text}</span>
	));
}
