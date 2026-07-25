// src/ui/viewmodel/FlipcardsPage/createFlipcardTermPresentation.js
import { insertNorwegianCompoundBreaks } from "./norwegianCompoundSegmentation.js";

const TRAILING_PARENTHETICAL_PATTERN = /^(.*?)\s+(\([^()]+\))$/u;

export default function createFlipcardTermPresentation(term, lexicon) {
	const text = String(term);
	const match = text.match(TRAILING_PARENTHETICAL_PATTERN);
	const primaryText = match === null ? text : match[1];

	return {
		primaryText: insertNorwegianCompoundBreaks(primaryText, lexicon),
		parentheticalText: match === null ? null : match[2]
	};
}
