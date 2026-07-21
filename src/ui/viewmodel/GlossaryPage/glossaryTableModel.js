// src/ui/viewmodel/GlossaryPage/glossaryTableModel.js
export function createGlossaryTableRows({ localizedEntries, normalizedSearchTerm }) {
	return localizedEntries.map((localizedEntry) => ({
		glossaryEntryKey: localizedEntry.glossaryEntryKey,
		topicAreaKey: localizedEntry.topicAreaKey,
		term: localizedEntry.term,
		explanation: localizedEntry.explanation,
		termSegments: splitTextIntoHighlightSegments(localizedEntry.term, normalizedSearchTerm),
		explanationSegments: splitTextIntoHighlightSegments(localizedEntry.explanation, normalizedSearchTerm)
	}));
}

export function splitTextIntoHighlightSegments(text, normalizedSearchTerm) {
	const safeText = String(text ?? "");

	if (!normalizedSearchTerm) {
		return [{ text: safeText, isMatch: false }];
	}

	const escapedSearchTerm = escapeRegularExpression(normalizedSearchTerm);
	const searchExpression = new RegExp(escapedSearchTerm, "gi");
	const segments = [];
	let textCursor = 0;
	let match = searchExpression.exec(safeText);

	while (match !== null) {
		if (match.index > textCursor) {
			segments.push({
				text: safeText.slice(textCursor, match.index),
				isMatch: false
			});
		}

		segments.push({
			text: match[0],
			isMatch: true
		});

		textCursor = match.index + match[0].length;
		match = searchExpression.exec(safeText);
	}

	if (textCursor < safeText.length) {
		segments.push({
			text: safeText.slice(textCursor),
			isMatch: false
		});
	}

	if (segments.length === 0) {
		return [{ text: safeText, isMatch: false }];
	}

	return segments;
}

const escapeRegularExpression = (value) => {
	return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
};
