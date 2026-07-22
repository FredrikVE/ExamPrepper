// src/ui/presentation/formattedText.js
const BOLD_TEXT_PATTERN = /(\*\*[^*]+?\*\*)/g;

export function createFormattedTextSegments(text) {
	const textValue = createPlainFormattedTextInput(text);
	const textParts = textValue.split(BOLD_TEXT_PATTERN);
	const segments = [];
	let sourceCursor = 0;

	for (const textPart of textParts) {
		if (textPart.length === 0) {
			continue;
		}

		const isBold = isBoldPart(textPart);
		const markerLength = isBold ? 2 : 0;
		const segmentText = isBold ? textPart.slice(markerLength, -markerLength) : textPart;
		const sourceStart = sourceCursor + markerLength;

		segments.push({
			text: segmentText,
			isBold,
			sourceStart,
			sourceEnd: sourceStart + segmentText.length
		});

		sourceCursor += textPart.length;
	}

	return segments;
}

export function createHighlightedFormattedTextSegments(highlightSegments) {
	const sourceText = highlightSegments.map((segment) => String(segment.text ?? "")).join("");
	const matchRanges = createMatchRanges(highlightSegments);
	const formattedSegments = createFormattedTextSegments(sourceText);
	const renderedSegments = [];

	for (const formattedSegment of formattedSegments) {
		appendFormattedSegment(renderedSegments, formattedSegment, matchRanges);
	}

	return renderedSegments;
}

export function createPlainFormattedText(text) {
	return createPlainFormattedTextInput(text).replaceAll("**", "");
}

function createMatchRanges(highlightSegments) {
	const matchRanges = [];
	let sourceCursor = 0;

	for (const highlightSegment of highlightSegments) {
		const segmentText = String(highlightSegment.text ?? "");
		const sourceEnd = sourceCursor + segmentText.length;

		if (highlightSegment.isMatch && segmentText.length > 0) {
			matchRanges.push({
				start: sourceCursor,
				end: sourceEnd
			});
		}

		sourceCursor = sourceEnd;
	}

	return matchRanges;
}

function appendFormattedSegment(renderedSegments, formattedSegment, matchRanges) {
	let segmentCursor = formattedSegment.sourceStart;

	for (const matchRange of matchRanges) {
		const matchStart = Math.max(matchRange.start, formattedSegment.sourceStart);
		const matchEnd = Math.min(matchRange.end, formattedSegment.sourceEnd);

		if (matchEnd <= matchStart) {
			continue;
		}

		if (matchStart > segmentCursor) {
			appendRenderedSegment(renderedSegments, formattedSegment, segmentCursor, matchStart, false);
		}

		const renderedMatchStart = Math.max(segmentCursor, matchStart);

		if (matchEnd > renderedMatchStart) {
			appendRenderedSegment(renderedSegments, formattedSegment, renderedMatchStart, matchEnd, true);
		}

		segmentCursor = Math.max(segmentCursor, matchEnd);
	}

	if (segmentCursor < formattedSegment.sourceEnd) {
		appendRenderedSegment(renderedSegments, formattedSegment, segmentCursor, formattedSegment.sourceEnd, false);
	}
}

function appendRenderedSegment(renderedSegments, formattedSegment, sourceStart, sourceEnd, isMatch) {
	const textStart = sourceStart - formattedSegment.sourceStart;
	const textEnd = sourceEnd - formattedSegment.sourceStart;
	const text = formattedSegment.text.slice(textStart, textEnd);

	if (text.length === 0) {
		return;
	}

	const previousSegment = renderedSegments.at(-1);

	if (previousSegment?.isBold === formattedSegment.isBold && previousSegment.isMatch === isMatch) {
		previousSegment.text += text;
		return;
	}

	renderedSegments.push({
		text,
		isBold: formattedSegment.isBold,
		isMatch
	});
}

function createPlainFormattedTextInput(text) {
	return String(text ?? "");
}

function isBoldPart(part) {
	return part.startsWith("**") && part.endsWith("**") && part.length > 4;
}
