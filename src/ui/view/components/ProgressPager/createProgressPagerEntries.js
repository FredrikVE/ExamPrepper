// src/ui/view/components/ProgressPager/createProgressPagerEntries.js
const FIRST_ENTRY_INDEX = 0;
const ENTRY_NUMBER_OFFSET = 1;
const ENTRY_INDEX_STEP = 1;

export default function createProgressPagerEntries({ count, activeIndex, keyPrefix, resolveIsCorrect }) {
	const lastIndex = Math.max(count - ENTRY_INDEX_STEP, FIRST_ENTRY_INDEX);
	const safeActiveIndex = Math.min(Math.max(activeIndex, FIRST_ENTRY_INDEX), lastIndex);
	const entries = [];

	for (let index = FIRST_ENTRY_INDEX; index < count; index += ENTRY_INDEX_STEP) {
		entries.push({
			key: `${keyPrefix}-${index}`,
			entryNumber: index + ENTRY_NUMBER_OFFSET,
			entryIndex: index,
			isActive: index === safeActiveIndex,
			isCorrect: resolveIsCorrect(index)
		});
	}

	return entries;
}
