// src/ui/viewmodel/FlipcardsPage/norwegianCompoundSegmentation.js
const SOFT_HYPHEN = "\u00AD";
const TOKEN_PATTERN = /\p{L}{2,}/gu;
const MINIMUM_FRAGMENT_LENGTH = 4;
const MINIMUM_WORD_LENGTH = 8;
const MAXIMUM_SEGMENT_COUNT = 4;
const SEGMENT_PENALTY = 7;
const PRODUCTIVE_PREFIXES = new Set([
	"be",
	"de",
	"for",
	"fram",
	"frem",
	"gjen",
	"mis",
	"mot",
	"om",
	"opp",
	"over",
	"post",
	"pre",
	"re",
	"sam",
	"til",
	"u",
	"under",
	"ut"
]);
const LINKING_LETTERS = new Set(["e", "s"]);

function normalizeWord(value) {
	return String(value).toLocaleLowerCase("nb-NO");
}

function readWords(text) {
	const matches = String(text).match(TOKEN_PATTERN);

	if (matches === null) {
		return [];
	}

	const words = [];

	for (const match of matches) {
		words.push(normalizeWord(match));
	}

	return words;
}

function noteWordScore(wordScoreByValue, word, score) {
	const existingScore = wordScoreByValue.get(word) ?? 0;

	if (score > existingScore) {
		wordScoreByValue.set(word, score);
	}
}

function findLongestSharedPrefix(firstWord, secondWord) {
	const maximumLength = Math.min(firstWord.length, secondWord.length);
	let length = 0;

	while (length < maximumLength && firstWord[length] === secondWord[length]) {
		length += 1;
	}

	return firstWord.slice(0, length);
}

function findLongestSharedSuffix(firstWord, secondWord) {
	const maximumLength = Math.min(firstWord.length, secondWord.length);
	let length = 0;

	while (
		length < maximumLength
		&& firstWord[firstWord.length - length - 1] === secondWord[secondWord.length - length - 1]
	) {
		length += 1;
	}

	return firstWord.slice(firstWord.length - length);
}

function canUseSharedFragment(fragment, firstWord, secondWord) {
	if (fragment.length < MINIMUM_FRAGMENT_LENGTH) {
		return false;
	}

	if (fragment.length === firstWord.length || fragment.length === secondWord.length) {
		return false;
	}

	return fragment.length * 2 > Math.min(firstWord.length, secondWord.length);
}

function noteRepeatedTermFragments(wordScoreByValue, termWords) {
	for (let firstIndex = 0; firstIndex < termWords.length; firstIndex += 1) {
		const firstWord = termWords[firstIndex];

		for (let secondIndex = firstIndex + 1; secondIndex < termWords.length; secondIndex += 1) {
			const secondWord = termWords[secondIndex];
			const sharedPrefix = findLongestSharedPrefix(firstWord, secondWord);
			const sharedSuffix = findLongestSharedSuffix(firstWord, secondWord);

			if (canUseSharedFragment(sharedPrefix, firstWord, secondWord)) {
				noteWordScore(wordScoreByValue, sharedPrefix, 2);
			}

			if (canUseSharedFragment(sharedSuffix, firstWord, secondWord)) {
				noteWordScore(wordScoreByValue, sharedSuffix, 2);
			}
		}
	}
}

export function createNorwegianCompoundLexicon({ terms, supportingTexts }) {
	const wordScoreByValue = new Map();
	const termWordSet = new Set();

	for (const term of terms) {
		for (const word of readWords(term)) {
			termWordSet.add(word);
			noteWordScore(wordScoreByValue, word, 4);
		}
	}

	for (const supportingText of supportingTexts) {
		for (const word of readWords(supportingText)) {
			noteWordScore(wordScoreByValue, word, 4);
		}
	}

	noteRepeatedTermFragments(wordScoreByValue, Array.from(termWordSet));

	return {
		wordScoreByValue,
		productivePrefixes: PRODUCTIVE_PREFIXES
	};
}

function readLexicalSegment(word, startIndex, endIndex, lexicon) {
	const segment = word.slice(startIndex, endIndex);
	const directScore = lexicon.wordScoreByValue.get(segment);

	if (directScore !== undefined) {
		return {
			endIndex,
			score: directScore * 10 + Math.min(segment.length, 12)
		};
	}

	if (startIndex === 0 && lexicon.productivePrefixes.has(segment)) {
		return {
			endIndex,
			score: 5 + segment.length
		};
	}

	const linkingLetter = segment[segment.length - 1];

	if (!LINKING_LETTERS.has(linkingLetter)) {
		return null;
	}

	const base = segment.slice(0, -1);
	const baseScore = lexicon.wordScoreByValue.get(base);

	if (baseScore === undefined) {
		return null;
	}

	return {
		endIndex,
		score: baseScore * 10 + Math.min(base.length, 12) + 3
	};
}

function findBestSegmentation(word, lexicon) {
	const memo = new Map();

	function visit(startIndex, segmentCount) {
		const memoKey = `${startIndex}:${segmentCount}`;

		if (memo.has(memoKey)) {
			return memo.get(memoKey);
		}

		if (segmentCount >= MAXIMUM_SEGMENT_COUNT) {
			return null;
		}

		let best = null;

		for (let endIndex = startIndex + 1; endIndex <= word.length; endIndex += 1) {
			if (startIndex === 0 && endIndex === word.length) {
				continue;
			}

			const segment = readLexicalSegment(word, startIndex, endIndex, lexicon);

			if (segment === null) {
				continue;
			}

			if (endIndex === word.length) {
				const candidate = {
					boundaries: [],
					score: segment.score - SEGMENT_PENALTY
				};

				if (best === null || candidate.score > best.score) {
					best = candidate;
				}

				continue;
			}

			const remainder = visit(endIndex, segmentCount + 1);

			if (remainder === null) {
				continue;
			}

			const candidate = {
				boundaries: [endIndex, ...remainder.boundaries],
				score: segment.score + remainder.score - SEGMENT_PENALTY
			};

			if (best === null || candidate.score > best.score) {
				best = candidate;
			}
		}

		memo.set(memoKey, best);
		return best;
	}

	return visit(0, 0);
}

function chooseDisplayBoundary(wordLength, boundaries) {
	let bestBoundary = null;
	let bestDistance = Number.POSITIVE_INFINITY;

	for (const boundary of boundaries) {
		const leftLength = boundary;
		const rightLength = wordLength - boundary;

		if (leftLength < 2 || rightLength < 4) {
			continue;
		}

		const distance = Math.abs(leftLength - rightLength);

		if (distance < bestDistance || (distance === bestDistance && boundary > bestBoundary)) {
			bestBoundary = boundary;
			bestDistance = distance;
		}
	}

	return bestBoundary;
}

function insertWordBreak(word, lexicon) {
	if (word.length < MINIMUM_WORD_LENGTH) {
		return word;
	}

	const normalizedWord = normalizeWord(word);
	const segmentation = findBestSegmentation(normalizedWord, lexicon);

	if (segmentation === null || segmentation.boundaries.length === 0) {
		return word;
	}

	const boundary = chooseDisplayBoundary(word.length, segmentation.boundaries);

	if (boundary === null) {
		return word;
	}

	return `${word.slice(0, boundary)}${SOFT_HYPHEN}${word.slice(boundary)}`;
}

export function insertNorwegianCompoundBreaks(text, lexicon) {
	if (lexicon === null) {
		return String(text);
	}

	return String(text).replace(TOKEN_PATTERN, (word) => insertWordBreak(word, lexicon));
}
