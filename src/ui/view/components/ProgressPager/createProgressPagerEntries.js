// src/ui/view/components/ProgressPager/createProgressPagerEntries.js
export default function createProgressPagerEntries({ count, activeIndex, keyPrefix, resolveIsCorrect }) {
    const lastIndex = Math.max(count - 1, 0);
    const safeActiveIndex = Math.min(Math.max(activeIndex, 0), lastIndex);

    return Array.from({ length: count }, (_item, index) => ({
        key: `${keyPrefix}-${index}`,
        questionNumber: index + 1,
        questionIndex: index,
        isActive: index === safeActiveIndex,
        isCorrect: resolveIsCorrect(index)
    }));
}
